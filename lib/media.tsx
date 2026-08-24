"use client";

import { Video, Headphones, Globe } from "lucide-react";
import type { MediaType } from "@/app/types/timeline";

export { getYouTubeId, getYouTubeUrl, isYouTubeUrl } from "@/lib/youtube";

export function getMediaType(url: string | null): MediaType {
  if (!url) return null;
  if (/youtube\.com|youtu\.be/i.test(url)) return "video";
  if (
    /ivoox\.com|spotify\.com|apple\.com\/podcast|rtve\.es\/play\/audios/i.test(
      url
    )
  )
    return "audio";
  return "web";
}

export function MediaIcon({ type }: { type: MediaType }) {
  if (type === "video") return <Video className="h-3.5 w-3.5" />;
  if (type === "audio") return <Headphones className="h-3.5 w-3.5" />;
  return <Globe className="h-3.5 w-3.5" />;
}
