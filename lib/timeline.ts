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

/**
 * Layout flotante 2D para la vista Gráfica vertical.
 * - Eje Y: año de apogeo usando `yearToPercent`.
 * - Eje X: centrado con offset por población e importancia; se alterna el lado
 *   para evitar solapamientos verticales.
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
  let lastBottom = -Infinity;

  for (let i = 0; i < sorted.length; i++) {
    const people = sorted[i];
    const baseTop = (yearToPercent(people.peakYear) / 100) * containerHeight;
    const top = Math.max(baseTop, lastBottom + minGap);
    lastBottom = top + cardHeight;

    const popRatio = Math.sqrt(people.peakPopulation) / Math.sqrt(maxPopulation);
    // Offset horizontal proporcional a la población, alternando lado.
    const side = i % 2 === 0 ? 1 : -1;
    const maxOffset = 30; // % del ancho a cada lado del centro
    const offset = side * (0.15 + popRatio * maxOffset);
    const widthPercent = populationWidthPercent(people.peakPopulation, maxPopulation);
    const leftPercent = 50 + offset - widthPercent / 2;

    items.push({
      people,
      top,
      leftPercent: Math.max(2, Math.min(leftPercent, 98 - widthPercent)),
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
