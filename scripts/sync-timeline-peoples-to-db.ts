import { prisma } from '../lib/prisma';
import type { Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

function loadJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

async function main() {
  const cwd = process.cwd();
  const timelinePath = path.join(cwd, 'data', 'linea-de-tiempo-eva-tobalina.json');
  const peoplesPath = path.join(cwd, 'data', 'pueblos-coexistientes.json');

  const timelineData = loadJson<{ items: any[] }>(timelinePath);
  const peoplesData = loadJson<{ items: any[] }>(peoplesPath);

  for (const e of timelineData.items) {
    const data = {
      title: e.title,
      dateLabel: e.dateLabel,
      startYear: e.startYear,
      endYear: e.endYear,
      period: e.period,
      location: e.location,
      description: e.description,
      summary: e.summary,
      consequences: e.consequences,
      characters: e.characters,
      civilizations: e.civilizations,
      topics: e.topics,
      sourceConference: (e.sourceConference ?? null) as Prisma.InputJsonValue,
      relatedConferences: e.relatedConferences,
      isSecondary: e.isSecondary ?? false,
      isYoutubeConference: e.isYoutubeConference ?? true,
    };
    const existing = await prisma.timelineEvent.findUnique({ where: { id: e.id } });
    if (existing) {
      await prisma.timelineEvent.update({ where: { id: e.id }, data });
    } else {
      await prisma.timelineEvent.create({ data: { id: e.id, ...data } });
    }
  }

  for (const p of peoplesData.items) {
    const data = {
      name: p.name,
      startYear: p.startYear,
      endYear: p.endYear,
      peakYear: p.peakYear,
      peakPopulation: p.peakPopulation,
      color: p.color,
      region: p.region,
      description: p.description,
      civilizations: p.civilizations,
      relatedConferences: p.relatedConferences,
      isSecondary: p.isSecondary ?? false,
    };
    const existing = await prisma.peopleGroup.findUnique({ where: { id: p.id } });
    if (existing) {
      await prisma.peopleGroup.update({ where: { id: p.id }, data });
    } else {
      await prisma.peopleGroup.create({ data: { id: p.id, ...data } });
    }
  }

  console.log(`✅ Sincronizados ${timelineData.items.length} eventos y ${peoplesData.items.length} pueblos`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
