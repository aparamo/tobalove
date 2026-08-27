import { prisma } from '../lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

interface JsonConference {
  id: string;
  title: string;
  type: string;
  date: string | null;
  year: number | null;
  organization: string;
  url: string | null;
  description: string;
  summary: string;
  topics: string[];
  characters: string[];
  civilizations: string[];
  duration: string | null;
  language: string;
  source: string;
  mediaType: string | null;
  youtube_url: string | null;
  info_adicional: string | null;
}

interface MdEntry {
  title: string;
  url: string;
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function extractYoutubeId(url: string): string | null {
  const m = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function cleanTitle(title: string): string {
  return title
    .replace(/[([{]\s*$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parse4md(content: string): MdEntry[] {
  const lines = content.split(/\r?\n/).map((l) => l.trim().replace(/<br\s*\/?>/gi, ''));
  const entries: MdEntry[] = [];
  let pendingTitle: string | null = null;
  const urlRegex = /https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/g;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      pendingTitle = null;
      continue;
    }
    const allUrls = Array.from(line.matchAll(urlRegex)).map((m) => m[0]);
    const seenUrls = new Set<string>();
    const urls = allUrls.filter((u) => {
      if (seenUrls.has(u)) return false;
      seenUrls.add(u);
      return true;
    });
    if (urls.length === 0) {
      pendingTitle = line;
      continue;
    }

    if (urls.length === 1 && pendingTitle) {
      entries.push({ title: cleanTitle(pendingTitle), url: urls[0] });
      pendingTitle = null;
      continue;
    }

    let remaining = line;
    for (const url of urls) {
      const idx = remaining.indexOf(url);
      let title = cleanTitle(remaining.slice(0, idx).replace(/[-:–]\s*$/, '').trim());
      if (!title) title = pendingTitle ? cleanTitle(pendingTitle) : '(sin título)';
      entries.push({ title, url });
      remaining = remaining.slice(idx + url.length);
      pendingTitle = null;
    }
  }

  return entries;
}

function slugify(title: string, existingIds: Set<string>): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  let id = base;
  let counter = 1;
  while (existingIds.has(id)) {
    id = `${base}-${counter}`;
    counter++;
  }
  return id;
}

function detectLanguage(title: string): string {
  const englishWords = /\b(the|and|of|in|on|at|to|for|with|from|by|a|an|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|may|might|can|this|that|these|those|i|you|he|she|it|we|they|my|your|his|her|its|our|their)\b/gi;
  const matches = title.match(englishWords) || [];
  return matches.length >= 3 ? 'en' : 'es';
}

async function fetchOembedTitle(url: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.title === 'string' ? data.title : null;
  } catch {
    return null;
  }
}

async function fetchOembedAuthor(url: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.author_name === 'string' ? data.author_name : null;
  } catch {
    return null;
  }
}

async function main() {
  const cwd = process.cwd();
  const jsonPath = path.join(cwd, 'data', 'conferencias-eva-tobalina.json');
  const md4Path = path.join(cwd, '..', 'docs', 'fb', '4.md');

  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const jsonItems: JsonConference[] = jsonData.items ?? [];

  const md4Content = fs.readFileSync(md4Path, 'utf8');
  const md4Entries = parse4md(md4Content);

  const jsonByUrl = new Map<string, JsonConference>();
  for (const c of jsonItems) {
    const id = extractYoutubeId(c.youtube_url ?? '');
    if (id) jsonByUrl.set(id, c);
  }

  const missing = md4Entries.filter((e) => {
    const id = extractYoutubeId(e.url);
    return id ? !jsonByUrl.has(id) : false;
  });

  console.log(`🔗 URLs de 4.md no presentes en JSON: ${missing.length}`);

  if (missing.length === 0) {
    console.log('No hay nada que agregar.');
    return;
  }

  const existingIds = new Set(jsonItems.map((c) => c.id));
  const newItems: JsonConference[] = [];

  // Obtener metadata de YouTube en paralelo
  const metadata = await Promise.all(
    missing.map(async (e) => {
      const [oembedTitle, author] = await Promise.all([
        fetchOembedTitle(e.url),
        fetchOembedAuthor(e.url),
      ]);
      return { entry: e, oembedTitle, author };
    })
  );

  for (const { entry, oembedTitle, author } of metadata) {
    const title = oembedTitle && oembedTitle.trim() ? oembedTitle.trim() : entry.title;
    const id = slugify(title, existingIds);
    existingIds.add(id);

    const item: JsonConference = {
      id,
      title,
      type: 'conferencia',
      date: null,
      year: null,
      organization: author && author.trim() ? author.trim() : 'Raíces de Europa',
      url: entry.url,
      description: '',
      summary: '',
      topics: [],
      characters: [],
      civilizations: [],
      duration: null,
      language: detectLanguage(title),
      source: 'docs/fb/4.md',
      mediaType: 'video',
      youtube_url: entry.url,
      info_adicional: null,
    };
    newItems.push(item);
  }

  // Agregar al JSON
  jsonData.items.push(...newItems);
  jsonData.meta.total_conferencias_estimadas = jsonData.items.length;
  jsonData.meta.ultima_actualizacion = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8');
  console.log(`✅ Agregadas ${newItems.length} conferencias al JSON`);

  // Insertar en BD
  for (const item of newItems) {
    await prisma.conference.create({
      data: {
        id: item.id,
        title: item.title,
        type: item.type,
        date: item.date,
        year: item.year,
        organization: item.organization,
        url: item.url,
        youtubeUrl: item.youtube_url,
        infoAdicional: item.info_adicional,
        description: item.description,
        summary: item.summary,
        topics: item.topics,
        characters: item.characters,
        civilizations: item.civilizations,
        duration: item.duration,
        language: item.language,
        source: item.source,
        mediaType: item.mediaType,
      },
    });
  }
  console.log(`✅ Insertadas ${newItems.length} conferencias en la BD`);

  // Mostrar resumen
  console.log('\nNuevas conferencias agregadas:');
  for (const item of newItems) {
    console.log(`  - ${item.title} (${item.organization})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
