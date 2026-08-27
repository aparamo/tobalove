import { prisma } from '../lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

function loadJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function saveJson(p: string, data: unknown) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

interface TimelineEvent {
  id: string;
  title: string;
  sourceConference: {
    title: string;
    organization: string;
    url: string | null;
    date?: string | null;
  };
  relatedConferences: string[];
  [key: string]: unknown;
}

const conferenceFixes: Record<
  string,
  { sourceConference?: TimelineEvent['sourceConference']; relatedConferences: string[] }
> = {
  'pueblos-del-mar': {
    sourceConference: {
      title: 'LOS PUEBLOS DEL MAR. El gran misterio de la Antigüedad (Mesopotamia y su entorno 4). EVA TOBALINA',
      organization: 'Raices de Europa',
      url: 'https://www.youtube.com/watch?v=0wl4ubC_ptk',
      date: '2021-04-23',
    },
    relatedConferences: [
      'los-pueblos-del-mar-el-gran-misterio-de-la-antiguedad-mesopo',
      'egipto-pueblos-del-mar-faraones-griegos',
      'el-imperio-hitita-ii-su-expansion-hasta-egipto-mesopotamia-y',
      'grandes-yacimientos-v-micenas-la-mitica-e-imponente-ciudad-d',
      'fenicios-origen-desarrollo',
    ],
  },
  'imperio-hitita': {
    sourceConference: {
      title: 'Los hititas',
      organization: 'Raíces de Europa',
      url: null,
      date: null,
    },
    relatedConferences: [
      'imperio-hitita-i',
      'el-imperio-hitita-ii-su-expansion-hasta-egipto-mesopotamia-y',
    ],
  },
  'batalla-qadesh': {
    sourceConference: {
      title: 'Los hititas',
      organization: 'Raíces de Europa',
      url: null,
      date: null,
    },
    relatedConferences: [
      'el-imperio-hitita-ii-su-expansion-hasta-egipto-mesopotamia-y',
      'egipto-imperio-nuevo-ramses-ii',
    ],
  },
  'codigo-hammurabi': {
    sourceConference: {
      title: 'Babilonia y sus imperios',
      organization: 'Raíces de Europa',
      url: null,
      date: null,
    },
    relatedConferences: ['babilonia-neobabilonico'],
  },
  'imperio-neobabilonico': {
    sourceConference: {
      title: 'BABILONIA. De Hammurabi al esplendor Neobabilónico con Nabucodonosor (Mesopotamia 4)',
      organization: 'Raices de Europa',
      url: 'https://www.youtube.com/watch?v=ALiwM44-Krw',
      date: '2021-04-23',
    },
    relatedConferences: ['babilonia-neobabilonico'],
  },
  'caida-babilonia': {
    sourceConference: {
      title: 'El Imperio Persa: el primer imperio \'mundial\' de la historia',
      organization: 'Raíces de Europa',
      url: 'https://www.youtube.com/watch?v=r0iqgEKUbDE',
      date: '2021-04-23',
    },
    relatedConferences: [
      'imperio-persa',
      'babilonia-neobabilonico',
    ],
  },
  'ruta-de-la-seda': {
    relatedConferences: [
      'ruta-de-la-seda-intro',
      'ruta-de-la-seda-origen',
      'ruta-de-la-seda-productos',
      'ruta-de-la-seda-califatos',
      'ruta-de-la-seda-gengis',
      'ruta-de-la-seda-tamerlan',
      'ruta-seda-xuanzang-tang-2024',
      'oiasso-imperio-romano-seda-china',
      'value-tree-china-plata-galeon-manila',
      'alejandria-ruta-seda-reyes-magos',
      'ruta-seda-fascinante',
    ],
  },
  'atenas-clasica': {
    relatedConferences: [
      'atenas-fidias-pericles',
      'tragedia-griega-i',
    ],
  },
  'imperio-acad': {
    sourceConference: {
      title: 'Mesopotamia y sus imperios: de Sumer a Babilonia',
      organization: 'Raíces de Europa',
      url: null,
      date: null,
    },
    relatedConferences: [],
  },
};

async function main() {
  const cwd = process.cwd();
  const timelinePath = path.join(cwd, 'data', 'linea-de-tiempo-eva-tobalina.json');
  const timelineData = loadJson<{ items: TimelineEvent[] }>(timelinePath);

  let updatedCount = 0;
  for (const e of timelineData.items) {
    const fix = conferenceFixes[e.id];
    if (!fix) continue;

    if (fix.sourceConference) {
      e.sourceConference = fix.sourceConference;
    }
    e.relatedConferences = fix.relatedConferences;
    updatedCount++;

    // Sincronizar BD
    await prisma.timelineEvent.update({
      where: { id: e.id },
      data: {
        sourceConference: e.sourceConference as never,
        relatedConferences: e.relatedConferences,
      },
    });
  }

  saveJson(timelinePath, timelineData);
  console.log(`✅ ${updatedCount} eventos de ciclo corregidos y sincronizados`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
