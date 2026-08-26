"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Play,
  Calendar,
  Building2,
  Clock,
  Info,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getYouTubeId, getYouTubeUrl } from "@/lib/media";
import { VideoActions } from "./VideoActions";
import { cn } from "@/lib/utils";
import type { ConferenceItem } from "@/app/types/timeline";
interface VideoCardProps {
  conference: ConferenceItem;
  relatedEvents: { id: string; title: string }[];
  relatedPeoples: { id: string; name: string }[];
  onSelect: (conference: ConferenceItem) => void;
  index: number;
  isWatched?: boolean;
  onToggleWatched?: (conferenceId: string) => void | Promise<void>;
  isFavorite?: boolean;
  onToggleFavorite?: (conferenceId: string) => void | Promise<void>;
  isWatchlist?: boolean;
  onToggleWatchlist?: (conferenceId: string) => void | Promise<void>;
  isAuthenticated?: boolean;
  togglingId?: string | null;
  mode?: "link" | "details";
}

export function VideoCard({
  conference,
  relatedEvents,
  relatedPeoples,
  onSelect,
  index,
  isWatched,
  onToggleWatched,
  isFavorite,
  onToggleFavorite,
  isWatchlist,
  onToggleWatchlist,
  isAuthenticated,
  togglingId,
  mode = "details",
}: VideoCardProps) {
  const youtubeUrl = getYouTubeUrl(conference);
  const videoId = getYouTubeId(youtubeUrl);
  if (!videoId) return null;

  const isLinkMode = mode === "link" && youtubeUrl;
  const hasActions =
    isAuthenticated &&
    onToggleWatched !== undefined &&
    onToggleFavorite !== undefined &&
    onToggleWatchlist !== undefined;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md",
        isWatched && "border-l-2 border-primary bg-primary/[0.03]"
      )}
      onClick={isLinkMode ? undefined : () => onSelect(conference)}
    >
      {/* Invisible link layer for link mode: covers the whole card */}
      {isLinkMode && (
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label={`Ir al video: ${conference.title}`}
        />
      )}

      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt={conference.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 opacity-0 transition-all group-hover:opacity-100 group-hover:bg-black/40">
          {isLinkMode ? (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(conference);
                }}
                className="relative z-30 gap-1.5 text-xs shadow-lg"
              >
                <Info className="h-3.5 w-3.5" />
                Más detalles
              </Button>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative z-30 inline-flex h-7 items-center justify-center gap-1.5 rounded-[min(var(--radius-md),12px)] bg-primary px-2.5 text-xs font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/80"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Ir al video
              </a>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onSelect(conference)}
              className="relative z-30 flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform group-hover:scale-110"
              aria-label={`Ver detalles de ${conference.title}`}
            >
              <Play className="h-5 w-5 fill-current" />
            </button>
          )}
        </div>

        {hasActions && (
          <div className="absolute right-2 top-2 z-30 flex flex-col gap-1.5">
            <VideoActions
              conferenceId={conference.id}
              isWatched={!!isWatched}
              isFavorite={!!isFavorite}
              isWatchlist={!!isWatchlist}
              isAuthenticated={isAuthenticated}
              onToggleWatched={onToggleWatched}
              onToggleFavorite={onToggleFavorite}
              onToggleWatchlist={onToggleWatchlist}
              togglingId={togglingId}
              orientation="vertical"
              size="sm"
            />
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
          {conference.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {conference.year && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {conference.year}
            </span>
          )}
          {conference.organization && (
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              {conference.organization}
            </span>
          )}
          {conference.duration && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {conference.duration}
            </span>
          )}
        </div>

        {conference.civilizations.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {conference.civilizations.slice(0, 3).map((civ) => (
              <Badge key={civ} variant="outline" className="text-[10px]">
                {civ}
              </Badge>
            ))}
          </div>
        )}

        {(relatedEvents.length > 0 || relatedPeoples.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-1">
            {relatedEvents.slice(0, 2).map((ev) => (
              <Badge
                key={ev.id}
                variant="secondary"
                className="text-[10px] font-normal"
              >
                {ev.title}
              </Badge>
            ))}
            {relatedPeoples.slice(0, 2).map((p) => (
              <Badge
                key={p.id}
                variant="secondary"
                className="text-[10px] font-normal"
              >
                {p.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
