import * as fs from 'fs';
import * as path from 'path';

interface Conference {
  id: string;
  title: string;
  youtube_url: string | null;
  url: string | null;
  topics: string[];
  characters: string[];
  civilizations: string[];
}

interface TimelineEvent {
  id: string;
  title: string;
  startYear: number;
  endYear: number;
  characters: string[];
  civilizations: string[];
  topics: string[];
  sourceConference?: {
    title?: string;
    url?: string;
  } | null;
  relatedConferences: string[];
}

interface PeopleGroup {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  civilizations: string[];
  relatedConferences: string[];
}

function extractYoutubeId(url: string | null): string | null {
  if (!url) return null;
  const m = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function loadJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function main() {
  const cwd = process.cwd();
  const confPath = path.join(cwd, 'data', 'conferencias-eva-tobalina.json');
  const timelinePath = path.join(cwd, 'data', 'linea-de-tiempo-eva-tobalina.json');
  const peoplesPath = path.join(cwd, 'data', 'pueblos-coexistientes.json');
  const outDir = path.join(cwd, '..', 'docs', 'fb');

  const confData = loadJson<{ items: Conference[]; meta: Record<string, unknown> }>(confPath);
  const timelineData = loadJson<{ items: TimelineEvent[]; meta: Record<string, unknown> }>(timelinePath);
  const peoplesData = loadJson<{ items: PeopleGroup[]; meta: Record<string, unknown> }>(peoplesPath);

  const conferences = confData.items;
  const events = timelineData.items;
  const peoples = peoplesData.items;

  const confIds = new Set(conferences.map((c) => c.id));
  const confByUrl = new Map<string, Conference>();
  for (const c of conferences) {
    const id = extractYoutubeId(c.youtube_url ?? c.url);
    if (id) confByUrl.set(id, c);
  }

  // IDs duplicados
  const dupEventIds = findDuplicates(events.map((e) => e.id));
  const dupPeopleIds = findDuplicates(peoples.map((p) => p.id));

  // Fechas incoherentes
  const badEventDates = events.filter((e) => e.startYear > e.endYear);
  const badPeopleDates = peoples.filter((p) => p.startYear > p.endYear);

  // Referencias rotas en eventos
  const eventBrokenRefs: { eventId: string; refs: string[] }[] = [];
  const eventSourceConfIssues: { eventId: string; title: string; issues: string[] }[] = [];
  for (const e of events) {
    const broken = e.relatedConferences.filter((ref) => !confIds.has(ref));
    if (broken.length) eventBrokenRefs.push({ eventId: e.id, refs: broken });

    const issues: string[] = [];
    if (e.sourceConference) {
      const urlId = extractYoutubeId(e.sourceConference.url ?? null);
      if (urlId && !confByUrl.has(urlId)) {
        issues.push(`sourceConference URL no encontrada: ${e.sourceConference.url}`);
      }
      const match = conferences.find((c) => c.title === e.sourceConference?.title);
      if (!match && e.sourceConference.title) {
        issues.push(`sourceConference título no coincide exactamente: ${e.sourceConference.title}`);
      }
    }
    if (issues.length) eventSourceConfIssues.push({ eventId: e.id, title: e.title, issues });
  }

  // Referencias rotas en pueblos
  const peopleBrokenRefs: { peopleId: string; refs: string[] }[] = [];
  for (const p of peoples) {
    const broken = p.relatedConferences.filter((ref) => !confIds.has(ref));
    if (broken.length) peopleBrokenRefs.push({ peopleId: p.id, refs: broken });
  }

  // Temas/civilizaciones/personajes de conferencias no representados en timeline/pueblos
  const confTopics = new Set<string>();
  const confCivs = new Set<string>();
  const confChars = new Set<string>();
  for (const c of conferences) {
    c.topics.forEach((t) => confTopics.add(t));
    c.civilizations.forEach((civ) => confCivs.add(civ));
    c.characters.forEach((ch) => confChars.add(ch));
  }

  const eventTopics = new Set<string>();
  const eventCivs = new Set<string>();
  const eventChars = new Set<string>();
  for (const e of events) {
    e.topics.forEach((t) => eventTopics.add(t));
    e.civilizations.forEach((civ) => eventCivs.add(civ));
    e.characters.forEach((ch) => eventChars.add(ch));
  }

  const peopleCivs = new Set<string>();
  for (const p of peoples) {
    p.civilizations.forEach((civ) => peopleCivs.add(civ));
  }

  const topicsNotInEvents = Array.from(confTopics).filter((t) => !eventTopics.has(t));
  const civsNotInEvents = Array.from(confCivs).filter((c) => !eventCivs.has(c));
  const charsNotInEvents = Array.from(confChars).filter((c) => !eventChars.has(c));
  const civsNotInPeoples = Array.from(confCivs).filter((c) => !peopleCivs.has(c));

  // Reporte
  const lines: string[] = [];
  lines.push('# Diagnóstico: línea de tiempo y pueblos\n');
  lines.push(`- **Conferencias:** ${conferences.length}`);
  lines.push(`- **Eventos de línea de tiempo:** ${events.length}`);
  lines.push(`- **Pueblos:** ${peoples.length}\n`);

  lines.push(`## IDs duplicados`);
  lines.push(`- Eventos: ${dupEventIds.length}`);
  lines.push(`- Pueblos: ${dupPeopleIds.length}\n`);

  lines.push(`## Fechas incoherentes (startYear > endYear)`);
  lines.push(`- Eventos: ${badEventDates.length}`);
  lines.push(`- Pueblos: ${badPeopleDates.length}\n`);

  lines.push(`## Referencias rotas en eventos (${eventBrokenRefs.length} eventos)`);
  for (const x of eventBrokenRefs) {
    lines.push(`- ${x.eventId}: ${x.refs.join(', ')}`);
  }
  lines.push('');

  lines.push(`## Problemas de sourceConference en eventos (${eventSourceConfIssues.length} eventos)`);
  for (const x of eventSourceConfIssues) {
    lines.push(`- ${x.eventId} (${x.title})`);
    for (const issue of x.issues) lines.push(`  - ${issue}`);
  }
  lines.push('');

  lines.push(`## Referencias rotas en pueblos (${peopleBrokenRefs.length} pueblos)`);
  for (const x of peopleBrokenRefs) {
    lines.push(`- ${x.peopleId}: ${x.refs.join(', ')}`);
  }
  lines.push('');

  lines.push(`## Temas de conferencias no presentes en eventos (${topicsNotInEvents.length})`);
  for (const t of topicsNotInEvents.sort()) lines.push(`- ${t}`);
  lines.push('');

  lines.push(`## Civilizaciones de conferencias no presentes en eventos (${civsNotInEvents.length})`);
  for (const c of civsNotInEvents.sort()) lines.push(`- ${c}`);
  lines.push('');

  lines.push(`## Civilizaciones de conferencias no presentes en pueblos (${civsNotInPeoples.length})`);
  for (const c of civsNotInPeoples.sort()) lines.push(`- ${c}`);
  lines.push('');

  lines.push(`## Personajes de conferencias no presentes en eventos (${charsNotInEvents.length})`);
  for (const c of charsNotInEvents.slice(0, 50).sort()) lines.push(`- ${c}`);
  if (charsNotInEvents.length > 50) lines.push(`- ... y ${charsNotInEvents.length - 50} más`);
  lines.push('');

  fs.writeFileSync(path.join(outDir, 'diagnostico-timeline-peoples.md'), lines.join('\n'), 'utf8');
  console.log(`✅ Generado docs/fb/diagnostico-timeline-peoples.md`);

  console.log('\n📊 Resumen:');
  console.log(`  IDs duplicados: eventos=${dupEventIds.length}, pueblos=${dupPeopleIds.length}`);
  console.log(`  Fechas incoherentes: eventos=${badEventDates.length}, pueblos=${badPeopleDates.length}`);
  console.log(`  Referencias rotas: eventos=${eventBrokenRefs.length}, pueblos=${peopleBrokenRefs.length}`);
  console.log(`  Problemas sourceConference: ${eventSourceConfIssues.length}`);
  console.log(`  Temas sin evento: ${topicsNotInEvents.length}`);
  console.log(`  Civilizaciones sin evento: ${civsNotInEvents.length}`);
  console.log(`  Civilizaciones sin pueblo: ${civsNotInPeoples.length}`);
  console.log(`  Personajes sin evento: ${charsNotInEvents.length}`);
}

function findDuplicates(arr: string[]): string[] {
  const seen = new Set<string>();
  const dups = new Set<string>();
  for (const x of arr) {
    if (seen.has(x)) dups.add(x);
    seen.add(x);
  }
  return Array.from(dups);
}

main();
