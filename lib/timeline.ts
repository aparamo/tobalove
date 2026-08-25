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

  // Última posición vertical colocada en cada lado para evitar solapamientos.
  const lastPlacedTops: { left: number; right: number } = {
    left: -Infinity,
    right: -Infinity,
  };

  for (let i = 0; i < sorted.length; i++) {
    const people = sorted[i];
    const baseTop = (yearToPercent(people.peakYear) / 100) * containerHeight;

    const popRatio = Math.sqrt(people.peakPopulation) / Math.sqrt(maxPopulation);
    const widthPercent = Math.min(
      26,
      populationWidthPercent(people.peakPopulation, maxPopulation)
    );

    // Decidir lado priorizando el que tenga más espacio vertical libre.
    const rightRoom = baseTop - lastPlacedTops.right;
    const leftRoom = baseTop - lastPlacedTops.left;
    const preferRight = rightRoom >= leftRoom;

    const side = preferRight ? ("right" as const) : ("left" as const);
    const opposite: "left" | "right" = side === "right" ? "left" : "right";

    // Si el lado preferido sigue solapando mucho, cambiamos al contrario.
    const sideRoom = side === "right" ? rightRoom : leftRoom;
    const finalSide: "left" | "right" =
      sideRoom < cardHeight * 0.25 ? (side === "right" ? "left" : "right") : side;
    const finalSign = finalSide === "right" ? 1 : -1;

    // La posición vertical intenta respetar el año de apogeo. Solo se empuja
    // hacia abajo si la card entraría por completo detrás de la anterior del
    // mismo lado, conservando la sensación de línea del tiempo.
    const lastTop = lastPlacedTops[finalSide];
    const minPush = lastTop + cardHeight - minGap;
    const overlap = Math.max(0, minPush - baseTop);
    const top = overlap > cardHeight * 0.5 ? minPush : baseTop;

    // Offset horizontal proporcional a la población y al solapamiento. Cuanto
    // más cerca están dos cards consecutivas del mismo lado, más se aleja la
    // nueva del centro para evitar que tapen las líneas de color.
    const minOffset = 22; // % mínimo desde el centro
    const maxOffset = 42; // % máximo desde el centro
    const overlapRatio = Math.min(1, overlap / cardHeight);
    const offset =
      finalSign *
      (minOffset +
        (popRatio * 0.6 + overlapRatio * 0.4) * (maxOffset - minOffset));
    const leftPercent = 50 + offset - widthPercent / 2;

    items.push({
      people,
      top,
      leftPercent: Math.max(2, Math.min(leftPercent, 98 - widthPercent)),
      widthPercent,
      floatPhase: floatPhaseFromId(people.id),
    });

    lastPlacedTops[finalSide] = top;
    // También actualizamos el lado opuesto con una marca conservadora para que
    // cards muy cercanas en años alternen aunque vengan del mismo lado.
    lastPlacedTops[opposite] = Math.max(
      lastPlacedTops[opposite],
      top - cardHeight * 0.65
    );
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
