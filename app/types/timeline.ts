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
  youtubeUrl: string | null;
  infoAdicional: string | null;
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
  period: string;
  location: string;
  description: string;
  summary: string;
  consequences: string[];
  characters: string[];
  civilizations: string[];
  topics: string[];
  sourceConference: SourceConference;
  relatedConferences: string[];
  isSecondary?: boolean;
  isYoutubeConference?: boolean;
}

export interface TimelineMeta {
  autorContenido: string;
  enfoque: string;
  coberturaCronologica: string;
  totalEventos: number;
  fuentesPrincipales: string[];
  ultimaActualizacion: string;
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
  isSecondary?: boolean;
}

export interface PeoplesMeta {
  autorContenido: string;
  enfoque: string;
  coberturaCronologica: string;
  totalPueblos: number;
  unidadPoblacion: string;
  fuentesPrincipales: string[];
  ultimaActualizacion: string;
}

export interface PeoplesData {
  meta: PeoplesMeta;
  items: PeopleGroup[];
}

export type LayoutMode = "classic" | "floating" | "levitating";
