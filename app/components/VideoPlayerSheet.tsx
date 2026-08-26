"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Calendar,
  Building2,
  Clock,
  Users,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { getYouTubeId, getYouTubeUrl } from "@/lib/media";
import { VideoActions } from "./VideoActions";
import type { ConferenceItem } from "@/app/types/timeline";

interface VideoPlayerSheetProps {
  selectedVideo: ConferenceItem | null;
  onClose: () => void;
  isWatched?: boolean;
  isFavorite?: boolean;
  isWatchlist?: boolean;
  isAuthenticated?: boolean;
  onToggleWatched?: (id: string) => void | Promise<void> | Promise<unknown>;
  onToggleFavorite?: (id: string) => void | Promise<void> | Promise<unknown>;
  onToggleWatchlist?: (id: string) => void | Promise<void> | Promise<unknown>;
  togglingId?: string | null;
}

export function VideoPlayerSheet({
  selectedVideo,
  onClose,
  isWatched,
  isFavorite,
  isWatchlist,
  isAuthenticated,
  onToggleWatched,
  onToggleFavorite,
  onToggleWatchlist,
  togglingId,
}: VideoPlayerSheetProps) {
  const selectedVideoId = selectedVideo
    ? getYouTubeId(getYouTubeUrl(selectedVideo))
    : null;
  const youtubeUrl = selectedVideo ? getYouTubeUrl(selectedVideo) : null;
  const hasActions =
    isAuthenticated &&
    onToggleWatched !== undefined &&
    onToggleFavorite !== undefined &&
    onToggleWatchlist !== undefined;

  return (
    <Sheet open={!!selectedVideo} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-hidden p-0 sm:max-w-xl"
      >
        {selectedVideo && selectedVideoId && (
          <>
            <SheetHeader className="shrink-0 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <SheetTitle className="line-clamp-2 pr-2">
                    {selectedVideo.title}
                  </SheetTitle>
                </div>
                {hasActions && (
                  <VideoActions
                    conferenceId={selectedVideo.id}
                    isWatched={!!isWatched}
                    isFavorite={!!isFavorite}
                    isWatchlist={!!isWatchlist}
                    isAuthenticated={isAuthenticated}
                    onToggleWatched={onToggleWatched}
                    onToggleFavorite={onToggleFavorite}
                    onToggleWatchlist={onToggleWatchlist}
                    togglingId={togglingId}
                    orientation="horizontal"
                    size="sm"
                    className="shrink-0"
                  />
                )}
              </div>
              <SheetDescription>
                <span className="inline-flex flex-wrap items-center gap-2 text-xs">
                  {selectedVideo.year && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {selectedVideo.year}
                    </span>
                  )}
                  {selectedVideo.organization && (
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {selectedVideo.organization}
                    </span>
                  )}
                  {selectedVideo.duration && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {selectedVideo.duration}
                    </span>
                  )}
                </span>
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="min-h-0 flex-1 px-4">
              <div className="space-y-5 pb-6">
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideoId}`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>

                {hasActions && (
                  <VideoActions
                    conferenceId={selectedVideo.id}
                    isWatched={!!isWatched}
                    isFavorite={!!isFavorite}
                    isWatchlist={!!isWatchlist}
                    isAuthenticated={isAuthenticated}
                    onToggleWatched={onToggleWatched}
                    onToggleFavorite={onToggleFavorite}
                    onToggleWatchlist={onToggleWatchlist}
                    togglingId={togglingId}
                    variant="labeled"
                    orientation="horizontal"
                    className="justify-start"
                  />
                )}

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedVideo.description}
                </p>

                {selectedVideo.summary && (
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {selectedVideo.summary}
                    </p>
                  </div>
                )}

                {selectedVideo.characters.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      Personajes
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedVideo.characters.map((c) => (
                        <Badge key={c} variant="secondary" className="text-xs">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedVideo.civilizations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      Civilizaciones
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedVideo.civilizations.map((c) => (
                        <Badge key={c} variant="outline" className="text-xs">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedVideo.topics.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Temas
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedVideo.topics.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-xs font-normal text-muted-foreground"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href={youtubeUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  <Play className="h-4 w-4" />
                  Ver en YouTube
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
