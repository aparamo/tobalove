import { getYouTubeUrl } from "@/lib/youtube";
import type { PeopleGroup, ConferenceItem } from "@/app/types/timeline";

export type TimelineScale = "linear" | "adapted";

export const MIN_YEAR = -3500;
export const MAX_YEAR = 1500;
export const YEAR_RANGE = MAX_YEAR - MIN_YEAR;

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
