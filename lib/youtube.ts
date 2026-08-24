import type { ConferenceItem } from "@/app/types/timeline";

const YOUTUBE_RE =
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;

export function getYouTubeId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(YOUTUBE_RE);
  return match?.[1] ?? null;
}

export function isYouTubeUrl(url: string | null): boolean {
  if (!url) return false;
  return /youtube\.com|youtu\.be/i.test(url);
}

/**
 * Devuelve la URL de YouTube preferente de una conferencia.
 * - Si existe `youtube_url`, se usa directamente.
 * - Si no, se usa `url` solo si parece una URL de YouTube.
 * - Mantiene `url` como enlace a la fuente/evento original.
 */
export function getYouTubeUrl(conf: ConferenceItem): string | null {
  if (conf.youtubeUrl) return conf.youtubeUrl;
  if (isYouTubeUrl(conf.url)) return conf.url;
  return null;
}
