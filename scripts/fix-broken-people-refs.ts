import * as fs from 'fs';
import * as path from 'path';
import { prisma } from '../lib/prisma';

function loadJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function saveJson(p: string, data: unknown) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

const refFixes: Record<string, string> = {
  'roma-urbe': 'roma-la-urbe',
  'roma-fundacion': 'historia-roma-i-fundacion',
  'tragedia-griega-i-nacimiento': 'tragedia-griega-i',
  'ruta-seda-recorrido': 'ruta-de-la-seda-intro',
  'su-origen-china-tres-imperios': 'ruta-de-la-seda-origen',
};

async function main() {
  const cwd = process.cwd();
  const peoplesPath = path.join(cwd, 'data', 'pueblos-coexistientes.json');
  const peoplesData = loadJson<{ items: any[] }>(peoplesPath);

  for (const p of peoplesData.items) {
    if (p.relatedConferences) {
      p.relatedConferences = p.relatedConferences.map((ref: string) => refFixes[ref] || ref);
    }
  }

  saveJson(peoplesPath, peoplesData);

  // Sincronizar con BD
  for (const p of peoplesData.items) {
    await prisma.peopleGroup.update({
      where: { id: p.id },
      data: { relatedConferences: p.relatedConferences },
    });
  }

  console.log('✅ Referencias de pueblos corregidas y sincronizadas');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
