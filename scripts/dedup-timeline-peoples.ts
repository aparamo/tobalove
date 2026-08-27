import * as fs from 'fs';
import * as path from 'path';

function loadJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function saveJson(p: string, data: unknown) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

function dedupById<T extends { id: string }>(items: T[], merge?: (existing: T, duplicate: T) => T): T[] {
  const seen = new Map<string, T>();
  for (const item of items) {
    if (seen.has(item.id)) {
      const existing = seen.get(item.id)!;
      seen.set(item.id, merge ? merge(existing, item) : existing);
    } else {
      seen.set(item.id, item);
    }
  }
  return Array.from(seen.values());
}

function main() {
  const cwd = process.cwd();
  const timelinePath = path.join(cwd, 'data', 'linea-de-tiempo-eva-tobalina.json');
  const peoplesPath = path.join(cwd, 'data', 'pueblos-coexistientes.json');

  const timelineData = loadJson<{ items: any[]; meta: Record<string, unknown> }>(timelinePath);
  const peoplesData = loadJson<{ items: any[]; meta: Record<string, unknown> }>(peoplesPath);

  const originalEventsCount = timelineData.items.length;
  const originalPeoplesCount = peoplesData.items.length;

  // Para eventos, los duplicados son exactamente iguales; mantener el primero.
  timelineData.items = dedupById(timelineData.items);

  // Para pueblos, fusionar relatedConferences en partos y bizancio.
  peoplesData.items = dedupById(peoplesData.items, (existing, duplicate) => {
    const merged = { ...existing };
    if (duplicate.relatedConferences) {
      const set = new Set([...(existing.relatedConferences || []), ...duplicate.relatedConferences]);
      merged.relatedConferences = Array.from(set);
    }
    // Para partos, preferir nombre más descriptivo del duplicado si aplica
    if (existing.id === 'partos' && duplicate.name && duplicate.name !== existing.name) {
      merged.name = duplicate.name;
    }
    return merged;
  });

  timelineData.meta.totalEventos = timelineData.items.length;
  peoplesData.meta.totalPueblos = peoplesData.items.length;

  saveJson(timelinePath, timelineData);
  saveJson(peoplesPath, peoplesData);

  console.log(`✅ Eventos: ${originalEventsCount} → ${timelineData.items.length} (${originalEventsCount - timelineData.items.length} duplicados eliminados)`);
  console.log(`✅ Pueblos: ${originalPeoplesCount} → ${peoplesData.items.length} (${originalPeoplesCount - peoplesData.items.length} duplicados eliminados)`);
}

main();
