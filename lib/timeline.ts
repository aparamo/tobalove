import { getYouTubeUrl } from "@/lib/youtube";
import type { PeopleGroup, ConferenceItem } from "@/app/types/timeline";

export type TimelineScale = "linear" | "adapted";

export const MIN_YEAR = -3500;
export const MAX_YEAR = 1500;
export const YEAR_RANGE = MAX_YEAR - MIN_YEAR;

export interface FloatingLayoutItem {
  people: PeopleGroup;
  top: number;
  leftPercent: number;
  widthPercent: number;
  floatPhase: number;
}

/**
 * Calcula el ancho de una barra de población en porcentaje (30-90%)
 * usando una escala de raíz cuadrada para que pueblos grandes no oculten
 * a los pequeños.
 */
export function populationWidthPercent(
  peakPopulation: number,
  maxPopulation: number
): number {
  const ratio = Math.sqrt(peakPopulation) / Math.sqrt(maxPopulation);
  return Math.max(30, Math.round(35 + ratio * 55));
}

/**
 * Genera una fase de animación determinista [0, 1) a partir del id del pueblo.
 */
function floatPhaseFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

interface FloatingLane {
  side: 1 | -1; // 1 = derecha, -1 = izquierda
  offset: number; // % desde el centro
  lastTop: number;
}

/**
 * Layout libre 2D para modos Flotante y Levitación.
 * - Eje Y: año de apogeo usando `yearToPercent`.
 * - Eje X: carriles (lanes) a ambos lados del eje central. Cada card elige el
 *   carril con más espacio vertical libre, permitiendo posicionamiento libre
 *   sin quedar atado a estrictamente izquierda o derecha.
 * - Se respeta el hueco central para que las líneas de color sigan visibles.
 */
export function layoutFloatingPeoples(
  peoples: PeopleGroup[],
  maxPopulation: number,
  yearToPercent: (year: number) => number,
  containerHeight: number,
  cardHeight: number,
  minGap: number
): FloatingLayoutItem[] {
  const sorted = [...peoples].sort((a, b) => a.peakYear - b.peakYear);
  const items: FloatingLayoutItem[] = [];

  // Múltiples carriles a cada lado del centro. Los offsets dejan un hueco
  // central para las bandas de color del eje.
  const lanes: FloatingLane[] = [
    { side: 1, offset: 22, lastTop: -Infinity },
    { side: -1, offset: 22, lastTop: -Infinity },
    { side: 1, offset: 34, lastTop: -Infinity },
    { side: -1, offset: 34, lastTop: -Infinity },
    { side: 1, offset: 44, lastTop: -Infinity },
    { side: -1, offset: 44, lastTop: -Infinity },
  ];

  for (let i = 0; i < sorted.length; i++) {
    const people = sorted[i];
    const baseTop = (yearToPercent(people.peakYear) / 100) * containerHeight;

    const widthPercent = Math.min(
      22,
      populationWidthPercent(people.peakPopulation, maxPopulation)
    );

    // Elegir el carril con más espacio vertical libre respecto a la posición
    // real del año de apogeo.
    let bestLaneIndex = 0;
    let bestRoom = -Infinity;
    for (let j = 0; j < lanes.length; j++) {
      const room = baseTop - lanes[j].lastTop;
      if (room > bestRoom) {
        bestRoom = room;
        bestLaneIndex = j;
      }
    }

    const lane = lanes[bestLaneIndex];

    // La posición vertical respeta el año de apogeo. Solo se empuja hacia abajo
    // si la card se solaparía demasiado con la última colocada en ese carril.
    const minPush = lane.lastTop + cardHeight - minGap;
    const overlap = Math.max(0, minPush - baseTop);
    const top = overlap > cardHeight * 0.55 ? minPush : baseTop;

    lane.lastTop = top;

    const leftPercent = 50 + lane.side * lane.offset - widthPercent / 2;

    items.push({
      people,
      top,
      leftPercent: Math.max(1, Math.min(leftPercent, 99 - widthPercent)),
      widthPercent,
      floatPhase: floatPhaseFromId(people.id),
    });
  }

  return items;
}

/**
 * Transformación lineal de año a porcentaje [0, 100] dentro del rango
 * [MIN_YEAR, MAX_YEAR].
 */
export function yearToPercentLinear(year: number): number {
  return ((year - MIN_YEAR) / YEAR_RANGE) * 100;
}

/**
 * Transformación de potencia (no lineal) de año a porcentaje. Expande
 * visualmente los periodos recientes dentro del mismo rango [0, 100].
 * `p = 0.7` ofrece un equilibrio entre antigüedad y épocas tardías.
 */
export function yearToPercentAdapted(year: number, p = 0.7): number {
  const ratio = (year - MIN_YEAR) / YEAR_RANGE;
  return Math.pow(ratio, p) * 100;
}

/**
 * Determina si un pueblo/civilización tiene cobertura en conferencia de video
 * de Eva Tobalina. Se considera cubierto cuando al menos uno de sus
 * `relatedConferences` existe en el mapa de conferencias, es de tipo
 * "conferencia" y tiene URL de YouTube disponible.
 *
 * Nota: entrevistas, presentaciones, cursos y otros formatos no cuentan como
 * cobertura por defecto, ya que el foco de la app son las conferencias en video.
 */
export function hasConferenceCoverage(
  people: PeopleGroup,
  conferencesMap: Map<string, ConferenceItem>
): boolean {
  return people.relatedConferences.some((id) => {
    const conf = conferencesMap.get(id);
    return (
      conf !== undefined &&
      conf.type === "conferencia" &&
      getYouTubeUrl(conf) !== null
    );
  });
}

/**
 * Filtra un listado de pueblos según si tienen cobertura de conferencias.
 * Cuando `showAll` es true se devuelve el listado completo.
 */
export function filterPeoplesByCoverage(
  peoples: PeopleGroup[],
  conferencesMap: Map<string, ConferenceItem>,
  showAll: boolean
): PeopleGroup[] {
  if (showAll) return peoples;
  return peoples.filter((people) => hasConferenceCoverage(people, conferencesMap));
}
