import * as fs from 'fs';
import * as path from 'path';

interface Conference {
  id: string;
  title: string;
  youtube_url: string | null;
  url: string | null;
  year: number | null;
  topics: string[];
  characters: string[];
  civilizations: string[];
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  summary: string;
  startYear: number;
  endYear: number;
  period: string;
  characters: string[];
  civilizations: string[];
  topics: string[];
  relatedConferences: string[];
  sourceConference?: { title?: string; url?: string } | null;
}

function loadJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .join(' ');
}

function extractWords(str: string): string[] {
  return Array.from(new Set(normalize(str).split(/\s+/)));
}

function main() {
  const cwd = process.cwd();
  const confPath = path.join(cwd, 'data', 'conferencias-eva-tobalina.json');
  const timelinePath = path.join(cwd, 'data', 'linea-de-tiempo-eva-tobalina.json');
  const outDir = path.join(cwd, '..', 'docs', 'fb');

  const confData = loadJson<{ items: Conference[] }>(confPath);
  const timelineData = loadJson<{ items: TimelineEvent[] }>(timelinePath);

  const confById = new Map(confData.items.map((c) => [c.id, c]));

  const issues: { eventId: string; eventTitle: string; type: string; details: string }[] = [];

  for (const e of timelineData.items) {
    const eventWords = new Set([
      ...extractWords(e.title),
      ...extractWords(e.description),
      ...extractWords(e.summary),
      ...e.topics.flatMap((t) => extractWords(t)),
      ...e.civilizations.flatMap((c) => extractWords(c)),
      ...e.characters.flatMap((c) => extractWords(c)),
    ]);

    // Palabras clave históricas propias del evento
    const keyTerms = new Set([
      ...extractWords(e.title),
      ...e.topics,
      ...e.civilizations,
      ...e.characters,
    ]);

    for (const confId of e.relatedConferences) {
      const conf = confById.get(confId);
      if (!conf) {
        issues.push({
          eventId: e.id,
          eventTitle: e.title,
          type: 'referencia rota',
          details: confId,
        });
        continue;
      }

      const confTitleWords = extractWords(conf.title);
      const confWords = new Set([
        ...confTitleWords,
        ...conf.topics.flatMap((t) => extractWords(t)),
        ...conf.civilizations.flatMap((c) => extractWords(c)),
        ...conf.characters.flatMap((c) => extractWords(c)),
      ]);

      // Coincidencia temática: al menos una palabra clave del evento en la conferencia
      const matches = Array.from(keyTerms).filter((term) =>
        Array.from(confWords).some((cw) => cw.includes(term) || term.includes(cw))
      );

      if (matches.length === 0) {
        issues.push({
          eventId: e.id,
          eventTitle: e.title,
          type: 'posible desconexión temática',
          details: `${conf.id} | ${conf.title}`,
        });
      }

      // Anacronismo grosero: diferencia > 1500 años entre el evento y el año de la conferencia
      const eventCenterYear = Math.round((e.startYear + e.endYear) / 2);
      if (conf.year !== null && conf.year !== undefined) {
        const diff = Math.abs(conf.year - eventCenterYear);
        if (diff > 1500) {
          issues.push({
            eventId: e.id,
            eventTitle: e.title,
            type: 'posible anacronismo',
            details: `${conf.id} | ${conf.title} (año ${conf.year}, evento ~${eventCenterYear})`,
          });
        }
      }
    }

    // Eventos sin conferencias relacionadas
    if (e.relatedConferences.length === 0 && (!e.sourceConference?.url)) {
      issues.push({
        eventId: e.id,
        eventTitle: e.title,
        type: 'sin conferencias relacionadas',
        details: 'No tiene relatedConferences ni sourceConference con URL',
      });
    }
  }

  // Agrupar por tipo
  const grouped = new Map<string, typeof issues>();
  for (const issue of issues) {
    if (!grouped.has(issue.type)) grouped.set(issue.type, []);
    grouped.get(issue.type)!.push(issue);
  }

  const lines: string[] = [];
  lines.push('# Auditoría de asociaciones de eventos\n');
  lines.push(`- **Eventos auditados:** ${timelineData.items.length}`);
  lines.push(`- **Problemas detectados:** ${issues.length}\n`);

  for (const [type, items] of grouped) {
    lines.push(`## ${type} (${items.length})`);
    for (const item of items) {
      lines.push(`- **${item.eventId}** (${item.eventTitle})`);
      lines.push(`  - ${item.details}`);
    }
    lines.push('');
  }

  fs.writeFileSync(path.join(outDir, 'auditoria-asociaciones-eventos.md'), lines.join('\n'), 'utf8');
  console.log(`✅ Generado docs/fb/auditoria-asociaciones-eventos.md`);
  console.log(`   Problemas detectados: ${issues.length}`);
}

main();
