import { prisma } from '../lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

interface JsonConference {
  id: string;
  title: string;
  youtube_url?: string | null;
  year?: number | null;
  date?: string | null;
  organization?: string | null;
}

interface DbConference {
  id: string;
  title: string;
  youtubeUrl: string | null;
  date: string | null;
  year: number | null;
  organization: string;
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function extractYoutubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function findDuplicates<T>(items: T[], keyFn: (item: T) => string | null): { key: string; items: T[] }[] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    if (!key) continue;
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }
  return Array.from(map.entries())
    .filter(([, list]) => list.length > 1)
    .map(([key, list]) => ({ key, items: list }));
}

function cleanTitle(title: string): string {
  return title
    .replace(/[([{]\s*$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parse4md(content: string): { title: string; url: string; raw: string }[] {
  const lines = content.split(/\r?\n/).map((l) => l.trim().replace(/<br\s*\/?>/gi, ''));
  const entries: { title: string; url: string; raw: string }[] = [];
  let pendingTitle: string | null = null;
  const urlRegex = /https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/g;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      pendingTitle = null;
      continue;
    }
    const allUrls = Array.from(line.matchAll(urlRegex)).map((m) => m[0]);
    // Eliminar URLs repetidas dentro de la misma línea (p. ej. [URL]URL)
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
      const title = cleanTitle(pendingTitle);
      entries.push({ title, url: urls[0], raw: `${title}: ${urls[0]}` });
      pendingTitle = null;
      continue;
    }

    let remaining = line;
    for (const url of urls) {
      const idx = remaining.indexOf(url);
      let title = cleanTitle(remaining.slice(0, idx).replace(/[-:–]\s*$/, '').trim());
      if (!title) title = pendingTitle ? cleanTitle(pendingTitle) : '(sin título)';
      entries.push({ title, url, raw: `${title}: ${url}` });
      remaining = remaining.slice(idx + url.length);
      pendingTitle = null;
    }
  }

  return entries;
}

async function main() {
  const cwd = process.cwd();
  const jsonPath = path.join(cwd, 'data', 'conferencias-eva-tobalina.json');
  const fbDir = path.join(cwd, '..', 'docs', 'fb');
  const md4Path = path.join(fbDir, '4.md');

  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const jsonItems: JsonConference[] = jsonData.items ?? [];

  console.log(`📦 JSON: ${jsonItems.length} conferencias`);

  const dbConfs: DbConference[] = await prisma.conference.findMany({
    select: {
      id: true,
      title: true,
      youtubeUrl: true,
      date: true,
      year: true,
      organization: true,
    },
  });

  console.log(`🗄️  BD: ${dbConfs.length} conferencias`);

  // Índices
  const jsonById = new Map(jsonItems.map((c) => [c.id, c]));
  const dbById = new Map(dbConfs.map((c) => [c.id, c]));
  const jsonByTitle = new Map(jsonItems.map((c) => [normalizeTitle(c.title), c]));
  const dbByTitle = new Map(dbConfs.map((c) => [normalizeTitle(c.title), c]));
  const jsonByUrl = new Map<string, JsonConference>();
  for (const c of jsonItems) {
    const id = extractYoutubeId(c.youtube_url);
    if (id) jsonByUrl.set(id, c);
  }
  const dbByUrl = new Map<string, DbConference>();
  for (const c of dbConfs) {
    const id = extractYoutubeId(c.youtubeUrl);
    if (id) dbByUrl.set(id, c);
  }

  // Diagnóstico BD vs JSON
  const onlyInJsonById = jsonItems.filter((c) => !dbById.has(c.id));
  const onlyInDbById = dbConfs.filter((c) => !jsonById.has(c.id));

  const onlyInJsonByTitle: JsonConference[] = [];
  for (const c of jsonItems) {
    const nt = normalizeTitle(c.title);
    if (!dbByTitle.has(nt)) onlyInJsonByTitle.push(c);
  }

  const onlyInDbByTitle: DbConference[] = [];
  for (const c of dbConfs) {
    const nt = normalizeTitle(c.title);
    if (!jsonByTitle.has(nt)) onlyInDbByTitle.push(c);
  }

  const mismatchedUrls: { id?: string; title: string; jsonUrl?: string | null; dbUrl?: string | null }[] = [];
  for (const c of jsonItems) {
    const dbC = dbByTitle.get(normalizeTitle(c.title));
    if (dbC) {
      const jsonId = extractYoutubeId(c.youtube_url);
      const dbId = extractYoutubeId(dbC.youtubeUrl);
      if (jsonId && dbId && jsonId !== dbId) {
        mismatchedUrls.push({ title: c.title, jsonUrl: c.youtube_url, dbUrl: dbC.youtubeUrl });
      }
    }
  }

  const duplicateJsonByUrl = findDuplicates(jsonItems, (c) => extractYoutubeId(c.youtube_url));
  const duplicateJsonByTitle = findDuplicates(jsonItems, (c) => normalizeTitle(c.title));
  const duplicateDbByUrl = findDuplicates(dbConfs, (c) => extractYoutubeId(c.youtubeUrl));
  const duplicateDbByTitle = findDuplicates(dbConfs, (c) => normalizeTitle(c.title));

  // Generar docs/fb/conferencias-completas.json (unión de JSON + BD, preferencia JSON)
  const unionMap = new Map<string, { nombre: string; youtube_url: string | null; fuente: string }>();
  for (const c of jsonItems) {
    const key = c.id;
    unionMap.set(key, { nombre: c.title, youtube_url: c.youtube_url ?? null, fuente: 'json' });
  }
  for (const c of dbConfs) {
    const key = c.id;
    if (!unionMap.has(key)) {
      unionMap.set(key, { nombre: c.title, youtube_url: c.youtubeUrl ?? null, fuente: 'bd' });
    }
  }
  const conferenciasCompletas = Array.from(unionMap.values()).sort((a, b) => a.nombre.localeCompare(b.nombre));
  fs.writeFileSync(
    path.join(fbDir, 'conferencias-completas.json'),
    JSON.stringify({ total: conferenciasCompletas.length, items: conferenciasCompletas }, null, 2),
    'utf8'
  );
  console.log(`✅ Generado docs/fb/conferencias-completas.json (${conferenciasCompletas.length} conferencias)`);

  // Procesar docs/fb/4.md
  const md4Content = fs.existsSync(md4Path) ? fs.readFileSync(md4Path, 'utf8') : '';
  const md4Entries = parse4md(md4Content);
  console.log(`📝 docs/fb/4.md: ${md4Entries.length} entradas detectadas`);

  const md4DuplicatesByUrl = findDuplicates(md4Entries, (e) => extractYoutubeId(e.url));

  // Quitar duplicados por youtube_url: prioridad mantener primera aparición
  const seenUrlIds = new Set<string>();
  const uniqueMd4Entries: typeof md4Entries = [];
  const removedDuplicates: typeof md4Entries = [];
  for (const e of md4Entries) {
    const urlId = extractYoutubeId(e.url);
    if (urlId && seenUrlIds.has(urlId)) {
      removedDuplicates.push(e);
      continue;
    }
    if (urlId) seenUrlIds.add(urlId);
    uniqueMd4Entries.push(e);
  }

  const organizedMd4 = uniqueMd4Entries
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }))
    .map((e) => `${e.title}: ${e.url}`)
    .join('\n\n');
  fs.writeFileSync(md4Path, organizedMd4 + '\n', 'utf8');
  console.log(`✅ Actualizado docs/fb/4.md (${uniqueMd4Entries.length} entradas únicas)`);

  // Diagnóstico docs/fb/4.md vs conferencias (por youtube_url)
  const md4Urls = new Set(uniqueMd4Entries.map((e) => extractYoutubeId(e.url)).filter(Boolean));

  const inMd4NotInJsonByUrl = uniqueMd4Entries.filter((e) => {
    const id = extractYoutubeId(e.url);
    return id ? !jsonByUrl.has(id) : false;
  });
  const inJsonNotInMd4ByUrl = jsonItems.filter((c) => {
    const id = extractYoutubeId(c.youtube_url);
    return id ? !md4Urls.has(id) : false;
  });

  // Generar reportes markdown
  const reportLines: string[] = [];
  reportLines.push('# Diagnóstico: Base de datos vs conferencias-eva-tobalina.json\n');
  reportLines.push(`- **Conferencias en JSON:** ${jsonItems.length}`);
  reportLines.push(`- **Conferencias en BD:** ${dbConfs.length}`);
  reportLines.push(`- **Solo en JSON (por ID):** ${onlyInJsonById.length}`);
  reportLines.push(`- **Solo en BD (por ID):** ${onlyInDbById.length}`);
  reportLines.push(`- **Solo en JSON (por título):** ${onlyInJsonByTitle.length}`);
  reportLines.push(`- **Solo en BD (por título):** ${onlyInDbByTitle.length}`);
  reportLines.push(`- **URLs de YouTube divergentes para mismo título:** ${mismatchedUrls.length}`);
  reportLines.push(`- **Duplicados en JSON por URL:** ${duplicateJsonByUrl.length}`);
  reportLines.push(`- **Duplicados en JSON por título:** ${duplicateJsonByTitle.length}`);
  reportLines.push(`- **Duplicados en BD por URL:** ${duplicateDbByUrl.length}`);
  reportLines.push(`- **Duplicados en BD por título:** ${duplicateDbByTitle.length}\n`);

  function section(lines: string[], name: string, items: { title?: string; nombre?: string }[]) {
    lines.push(`## ${name} (${items.length})`);
    if (items.length === 0) {
      lines.push('Ninguno.\n');
      return;
    }
    for (const item of items) {
      lines.push(`- ${item.title ?? (item as { nombre: string }).nombre}`);
    }
    lines.push('');
  }

  section(reportLines, 'Solo en JSON (por título)', onlyInJsonByTitle);
  section(reportLines, 'Solo en BD (por título)', onlyInDbByTitle);

  reportLines.push(`## URLs de YouTube divergentes para mismo título (${mismatchedUrls.length})`);
  if (mismatchedUrls.length === 0) reportLines.push('Ninguna.\n');
  else {
    for (const m of mismatchedUrls) {
      reportLines.push(`- ${m.title}`);
      reportLines.push(`  - JSON: ${m.jsonUrl}`);
      reportLines.push(`  - BD: ${m.dbUrl}`);
    }
    reportLines.push('');
  }

  reportLines.push(`## Duplicados en JSON por URL (${duplicateJsonByUrl.length})`);
  if (duplicateJsonByUrl.length === 0) reportLines.push('Ninguno.\n');
  else {
    for (const d of duplicateJsonByUrl) {
      reportLines.push(`- ID: ${d.key}`);
      for (const c of d.items) reportLines.push(`  - ${c.title}`);
    }
    reportLines.push('');
  }

  reportLines.push(`## Duplicados en JSON por título (${duplicateJsonByTitle.length})`);
  if (duplicateJsonByTitle.length === 0) reportLines.push('Ninguno.\n');
  else {
    for (const d of duplicateJsonByTitle) {
      reportLines.push(`- Título normalizado: ${d.key}`);
      for (const c of d.items) reportLines.push(`  - ID ${c.id}`);
    }
    reportLines.push('');
  }

  reportLines.push(`## Duplicados en BD por URL (${duplicateDbByUrl.length})`);
  if (duplicateDbByUrl.length === 0) reportLines.push('Ninguno.\n');
  else {
    for (const d of duplicateDbByUrl) {
      reportLines.push(`- ID: ${d.key}`);
      for (const c of d.items) reportLines.push(`  - ${c.title}`);
    }
    reportLines.push('');
  }

  reportLines.push(`## Duplicados en BD por título (${duplicateDbByTitle.length})`);
  if (duplicateDbByTitle.length === 0) reportLines.push('Ninguno.\n');
  else {
    for (const d of duplicateDbByTitle) {
      reportLines.push(`- Título normalizado: ${d.key}`);
      for (const c of d.items) reportLines.push(`  - ${c.id}`);
    }
    reportLines.push('');
  }

  // Análisis cruzado de youtube_url entre JSON y BD
  const jsonVideoIds = Array.from(jsonByUrl.keys());
  const dbVideoIds = Array.from(dbByUrl.keys());
  const sharedVideoIds = jsonVideoIds.filter((id) => dbByUrl.has(id));
  const onlyJsonVideoIds = jsonVideoIds.filter((id) => !dbByUrl.has(id));
  const onlyDbVideoIds = dbVideoIds.filter((id) => !jsonByUrl.has(id));

  reportLines.push(`## URLs de YouTube compartidas entre JSON y BD (${sharedVideoIds.length})`);
  if (sharedVideoIds.length === 0) reportLines.push('Ninguna.\n');
  else {
    for (const id of sharedVideoIds) {
      const jsonC = jsonByUrl.get(id)!;
      const dbC = dbByUrl.get(id)!;
      reportLines.push(`- ${id}`);
      reportLines.push(`  - JSON: ${jsonC.title}`);
      reportLines.push(`  - BD: ${dbC.title}`);
    }
    reportLines.push('');
  }

  reportLines.push(`## URLs de YouTube solo en JSON (${onlyJsonVideoIds.length})`);
  if (onlyJsonVideoIds.length === 0) reportLines.push('Ninguna.\n');
  else {
    for (const id of onlyJsonVideoIds) {
      const c = jsonByUrl.get(id)!;
      reportLines.push(`- ${id}: ${c.title}`);
    }
    reportLines.push('');
  }

  reportLines.push(`## URLs de YouTube solo en BD (${onlyDbVideoIds.length})`);
  if (onlyDbVideoIds.length === 0) reportLines.push('Ninguna.\n');
  else {
    for (const id of onlyDbVideoIds) {
      const c = dbByUrl.get(id)!;
      reportLines.push(`- ${id}: ${c.title}`);
    }
    reportLines.push('');
  }

  fs.writeFileSync(path.join(fbDir, 'diagnostico-bd-vs-json.md'), reportLines.join('\n'), 'utf8');
  console.log(`✅ Generado docs/fb/diagnostico-bd-vs-json.md`);

  // Reporte 4.md
  const report4Lines: string[] = [];
  report4Lines.push('# Diagnóstico: docs/fb/4.md vs conferencias guardadas\n');
  report4Lines.push(`- **Entradas detectadas en 4.md:** ${md4Entries.length}`);
  report4Lines.push(`- **Entradas únicas tras limpieza:** ${uniqueMd4Entries.length}`);
  report4Lines.push(`- **Duplicados por URL eliminados:** ${md4DuplicatesByUrl.reduce((acc, d) => acc + d.items.length - 1, 0)}`);
  report4Lines.push(`- **En 4.md pero no en JSON:** ${inMd4NotInJsonByUrl.length}`);
  report4Lines.push(`- **En JSON pero no en 4.md:** ${inJsonNotInMd4ByUrl.length}\n`);

  report4Lines.push(`## Entradas eliminadas por duplicado (${removedDuplicates.length})`);
  if (removedDuplicates.length === 0) report4Lines.push('Ninguna.\n');
  else {
    for (const e of removedDuplicates) report4Lines.push(`- ${e.title}: ${e.url}`);
    report4Lines.push('');
  }

  section(report4Lines, 'En 4.md pero no en JSON', inMd4NotInJsonByUrl);
  section(report4Lines, 'En JSON pero no en 4.md', inJsonNotInMd4ByUrl);

  fs.writeFileSync(path.join(fbDir, 'diagnostico-4md-vs-json.md'), report4Lines.join('\n'), 'utf8');
  console.log(`✅ Generado docs/fb/diagnostico-4md-vs-json.md`);

  // Resumen por consola
  console.log('\n📊 Resumen:');
  console.log(`  JSON: ${jsonItems.length} | BD: ${dbConfs.length}`);
  console.log(`  Solo en JSON: ${onlyInJsonByTitle.length} | Solo en BD: ${onlyInDbByTitle.length}`);
  console.log(`  URLs divergentes: ${mismatchedUrls.length}`);
  console.log(`  Duplicados JSON: URL=${duplicateJsonByUrl.length} Título=${duplicateJsonByTitle.length}`);
  console.log(`  Duplicados BD: URL=${duplicateDbByUrl.length} Título=${duplicateDbByTitle.length}`);
  console.log(`  4.md: ${md4Entries.length} detectadas → ${uniqueMd4Entries.length} únicas`);
  console.log(`  4.md vs JSON: faltan en 4.md=${inJsonNotInMd4ByUrl.length} | extras en 4.md=${inMd4NotInJsonByUrl.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
