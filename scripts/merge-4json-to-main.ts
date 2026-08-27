import { prisma } from '../lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

interface Conference {
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

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function mergeField<T>(mainValue: T, json4Value: T): T {
  return isEmpty(mainValue) ? json4Value : mainValue;
}

async function main() {
  const cwd = process.cwd();
  const jsonPath = path.join(cwd, 'data', 'conferencias-eva-tobalina.json');
  const json4Path = path.join(cwd, '..', 'docs', 'fb', '4.json');

  const mainData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const mainItems: Conference[] = mainData.items ?? [];

  const json4Data: Conference[] = JSON.parse(fs.readFileSync(json4Path, 'utf8'));

  const mainByUrl = new Map<string, Conference>();
  for (const item of mainItems) {
    const url = item.youtube_url ?? item.url;
    if (url) mainByUrl.set(url, item);
  }

  let updatedCount = 0;
  let unchangedCount = 0;

  for (const item4 of json4Data) {
    const url4 = item4.youtube_url ?? item4.url;
    if (!url4) continue;
    const mainItem = mainByUrl.get(url4);
    if (!mainItem) {
      console.log(`⚠️ No encontrado en JSON principal: ${item4.title}`);
      continue;
    }

    const before = JSON.stringify(mainItem);

    mainItem.description = mergeField(mainItem.description, item4.description);
    mainItem.summary = mergeField(mainItem.summary, item4.summary);
    mainItem.topics = mergeField(mainItem.topics, item4.topics);
    mainItem.characters = mergeField(mainItem.characters, item4.characters);
    mainItem.civilizations = mergeField(mainItem.civilizations, item4.civilizations);
    mainItem.mediaType = mergeField(mainItem.mediaType, item4.mediaType);
    mainItem.language = mergeField(mainItem.language, item4.language);
    mainItem.duration = mergeField(mainItem.duration, item4.duration);
    mainItem.info_adicional = mergeField(mainItem.info_adicional, item4.info_adicional);
    if (isEmpty(mainItem.youtube_url)) mainItem.youtube_url = item4.youtube_url;
    if (isEmpty(mainItem.url)) mainItem.url = item4.url;

    const after = JSON.stringify(mainItem);
    if (before !== after) {
      updatedCount++;
    } else {
      unchangedCount++;
    }

    // Actualizar BD
    await prisma.conference.update({
      where: { id: mainItem.id },
      data: {
        description: mainItem.description,
        summary: mainItem.summary,
        topics: mainItem.topics,
        characters: mainItem.characters,
        civilizations: mainItem.civilizations,
        mediaType: mainItem.mediaType,
        language: mainItem.language,
        duration: mainItem.duration,
        infoAdicional: mainItem.info_adicional,
        youtubeUrl: mainItem.youtube_url,
        url: mainItem.url,
      },
    });
  }

  mainData.meta.ultima_actualizacion = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(jsonPath, JSON.stringify(mainData, null, 2), 'utf8');

  console.log(`✅ Actualizadas ${updatedCount} conferencias`);
  console.log(`✅ Sin cambios ${unchangedCount} conferencias`);
  console.log(`✅ JSON principal guardado`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
