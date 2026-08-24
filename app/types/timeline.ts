export type MediaType = "video" | "audio" | "web" | null;

export interface SourceConference {
  title: string;
  organization: string;
  url: string | null;
  date: string | null;
}

export interface ConferenceItem {
  id: string;
  title: string;
  type: string;
  date: string | null;
  year: number | null;
  organization: string;
  url: string | null;
  youtube_url: string | null;
  info_adicional: string | null;
  description: string;
  summary: string;
  topics: string[];
  characters: string[];
  civilizations: string[];
  duration: string | null;
  language: string;
  source: string;
  mediaType: MediaType;
}

export interface TimelineEvent {
  id: string;
  title: string;
  dateLabel: string;
  startYear: number;
  endYear: number;
  period: boolean;
  location: string;
  description: string;
  summary: string;
  consequences: string[];
  characters: string[];
  civilizations: string[];
  topics: string[];
  sourceConference: SourceConference;
  relatedConferences: string[];
}

export interface TimelineMeta {
  autor_contenido: string;
  enfoque: string;
  cobertura_cronologica: string;
  total_eventos: number;
  fuentes_principales: string[];
  ultima_actualizacion: string;
}

export interface TimelineData {
  meta: TimelineMeta;
  items: TimelineEvent[];
}

// Tipos para la visualización de pueblos coexistientes
export interface PeopleGroup {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  peakYear: number;
  peakPopulation: number;
  color: string;
  region: string;
  description: string;
  civilizations: string[];
  relatedConferences: string[];
}

export interface PeoplesMeta {
  autor_contenido: string;
  enfoque: string;
  cobertura_cronologica: string;
  total_pueblos: number;
  unidad_poblacion: string;
  fuentes_principales: string[];
  ultima_actualizacion: string;
}

export interface PeoplesData {
  meta: PeoplesMeta;
  items: PeopleGroup[];
}
