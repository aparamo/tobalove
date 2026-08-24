"use client";

import { Video, Headphones, Globe } from "lucide-react";
import type { MediaType } from "@/app/types/timeline";

export function getYouTubeId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

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
