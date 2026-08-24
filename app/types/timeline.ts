export interface SourceConference {
  title: string;
  organization: string;
  url: string | null;
  date: string | null;
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
