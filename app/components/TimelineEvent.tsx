"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  BookOpen,
  Play,
  ChevronDown,
  ChevronUp,
  Video,
  MonitorOff,
} from "lucide-react";
import { getYouTubeId, getMediaType, MediaIcon, getYouTubeUrl } from "@/lib/media";
import { cn } from "@/lib/utils";
import { VideoPlayerSheet } from "./VideoPlayerSheet";
import { VideoActions } from "./VideoActions";
import { useVideoActions } from "@/app/hooks/useVideoActions";
import type {
  TimelineEvent as TimelineEventType,
  SourceConference,
  ConferenceItem,
} from "@/app/types/timeline";

const PAGE_SIZE = 10;

interface TimelineEventProps {
  event: TimelineEventType;
  index: number;
  side: "left" | "right";
  conferencesMap?: Map<string, ConferenceItem>;
  watchedIds?: Set<string>;
  favoriteIds?: Set<string>;
  watchlistIds?: Set<string>;
  isAuthenticated?: boolean;
  onToggleWatched?: (conferenceId: string) => void | Promise<void>;
  onToggleFavorite?: (conferenceId: string) => void | Promise<void>;
  onToggleWatchlist?: (conferenceId: string) => void | Promise<void>;
}

function VideoEmbed({
  videoId,
  title,
  conference,
  isAuthenticated,
  videoActions,
}: {
  videoId: string;
  title: string;
  conference?: ConferenceItem | null;
  isAuthenticated?: boolean;
  videoActions?: {
    isWatched: boolean;
    isFavorite: boolean;
    isWatchlist: boolean;
    togglingId: string | null;
    handleToggleWatched: (id: string) => void | Promise<void> | Promise<unknown>;
    handleToggleFavorite: (id: string) => void | Promise<void> | Promise<unknown>;
    handleToggleWatchlist: (id: string) => void | Promise<void> | Promise<unknown>;
  };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="w-full overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm"
    >
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="flex items-center justify-between p-3">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Play className="h-3 w-3" />
          Ver conferencia
        </p>
        {conference && isAuthenticated && videoActions && (
          <VideoActions
            conferenceId={conference.id}
            isWatched={videoActions.isWatched}
            isFavorite={videoActions.isFavorite}
            isWatchlist={videoActions.isWatchlist}
            isAuthenticated={isAuthenticated}
            onToggleWatched={videoActions.handleToggleWatched}
            onToggleFavorite={videoActions.handleToggleFavorite}
            onToggleWatchlist={videoActions.handleToggleWatchlist}
            togglingId={videoActions.togglingId}
            orientation="horizontal"
            size="sm"
          />
        )}
      </div>
    </motion.div>
  );
}

function RelatedVideoCard({
  conference,
  onSelect,
  isAuthenticated,
  isWatched,
  isFavorite,
  isWatchlist,
  togglingId,
  onToggleWatched,
  onToggleFavorite,
  onToggleWatchlist,
}: {
  conference: ConferenceItem | SourceConference;
  onSelect: (conference: ConferenceItem) => void;
  isAuthenticated?: boolean;
  isWatched?: boolean;
  isFavorite?: boolean;
  isWatchlist?: boolean;
  togglingId?: string | null;
  onToggleWatched?: (id: string) => void | Promise<void> | Promise<unknown>;
  onToggleFavorite?: (id: string) => void | Promise<void> | Promise<unknown>;
  onToggleWatchlist?: (id: string) => void | Promise<void> | Promise<unknown>;
}) {
  const isConfItem = "id" in conference && conference.id !== "source";
  const youtubeUrl = isConfItem
    ? getYouTubeUrl(conference as ConferenceItem)
    : getYouTubeId(conference.url)
    ? conference.url
    : null;
  const resourceUrl = youtubeUrl ?? conference.url;
  const videoId = getYouTubeId(youtubeUrl);
  const mediaType = getMediaType(resourceUrl ?? null);
  const hasActions =
    isConfItem &&
    isAuthenticated &&
    onToggleWatched !== undefined &&
    onToggleFavorite !== undefined &&
    onToggleWatchlist !== undefined;

  function handleClick() {
    if (isConfItem) {
      onSelect(conference as ConferenceItem);
    } else if (resourceUrl) {
      window.open(resourceUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        "flex w-full cursor-pointer items-start gap-3 rounded-lg border border-border/60 bg-card/50 p-3 text-left transition-colors hover:bg-card",
        isWatched && "border-l-2 border-primary bg-primary/[0.03]"
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary md:h-9 md:w-9">
        <MediaIcon type={mediaType} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug text-foreground md:text-base">
          {conference.title}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
          {(conference as ConferenceItem).organization ??
            (conference as SourceConference).organization}
          {conference.date ? ` · ${conference.date}` : null}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {resourceUrl && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary md:text-sm">
              {videoId ? "Ver conferencia" : "Ver recurso"}
            </span>
          )}
          {hasActions && (
            <VideoActions
              conferenceId={(conference as ConferenceItem).id}
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
            />
          )}
        </div>
      </div>
      {videoId && (
        <div className="hidden shrink-0 sm:block">
          <div className="relative block h-16 w-28 overflow-hidden rounded-md bg-muted">
            <Image
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt={conference.title}
              width={112}
              height={64}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Play className="h-5 w-5 text-white drop-shadow" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TimelineEvent({
  event,
  index,
  side,
  conferencesMap,
  watchedIds: initialWatchedIds = new Set(),
  favoriteIds: initialFavoriteIds = new Set(),
  watchlistIds: initialWatchlistIds = new Set(),
  isAuthenticated = false,
}: TimelineEventProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<ConferenceItem | null>(null);
  const isLeft = side === "left";

  const {
    togglingId,
    handleToggleWatched,
    handleToggleFavorite,
    handleToggleWatchlist,
    isWatched,
    isFavorite,
    isWatchlist,
  } = useVideoActions({
    watchedIds: initialWatchedIds,
    favoriteIds: initialFavoriteIds,
    watchlistIds: initialWatchlistIds,
    isAuthenticated,
  });

  const sourceConfItem = useMemo(() => {
    if (!conferencesMap) return null;
    for (const conf of conferencesMap.values()) {
      if (conf.title === event.sourceConference.title) return conf;
    }
    return null;
  }, [event.sourceConference.title, conferencesMap]);

  const sourceVideoId = getYouTubeId(
    sourceConfItem
      ? getYouTubeUrl(sourceConfItem)
      : event.sourceConference.url
  );

  const relatedVideos = useMemo(() => {
    const list: ConferenceItem[] = [];
    event.relatedConferences?.forEach((id) => {
      const conf = conferencesMap?.get(id);
      if (conf && !list.find((c) => c.id === conf.id)) {
        list.push(conf);
      }
    });
    // Asegurar que la conferencia fuente aparezca primero si tiene video
    if (
      event.sourceConference.url &&
      !list.find((c) => c.url === event.sourceConference.url)
    ) {
      list.unshift({
        id: "source",
        title: event.sourceConference.title,
        organization: event.sourceConference.organization,
        url: event.sourceConference.url,
        youtubeUrl:
          sourceConfItem?.youtubeUrl ??
          (getYouTubeId(event.sourceConference.url)
            ? event.sourceConference.url
            : null),
        infoAdicional: sourceConfItem?.infoAdicional ?? null,
        date: event.sourceConference.date,
        type: "conferencia",
        description: "",
        summary: "",
        topics: [],
        characters: [],
        civilizations: [],
        duration: null,
        language: "es",
        source: "",
        mediaType: getMediaType(event.sourceConference.url),
        year: null,
      });
    }
    return list;
  }, [event, conferencesMap, sourceConfItem]);

  const videoCount = relatedVideos.filter(
    (c) => getYouTubeUrl(c) !== null
  ).length;
  const hasAnyMedia = relatedVideos.length > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={`relative flex w-full items-start gap-4 md:gap-8 ${
          isLeft ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Desktop opposite side: featured video */}
        <div
          className={`hidden md:flex md:w-1/2 ${
            isLeft ? "justify-start" : "justify-end"
          }`}
        >
          <div className={`w-full max-w-md ${isLeft ? "md:pl-12" : "md:pr-12"}`}>
            {sourceVideoId ? (
              <VideoEmbed
                videoId={sourceVideoId}
                title={event.sourceConference.title}
                conference={sourceConfItem}
                isAuthenticated={isAuthenticated}
                videoActions={
                  sourceConfItem
                    ? {
                        isWatched: isWatched(sourceConfItem.id),
                        isFavorite: isFavorite(sourceConfItem.id),
                        isWatchlist: isWatchlist(sourceConfItem.id),
                        togglingId,
                        handleToggleWatched: handleToggleWatched,
                        handleToggleFavorite: handleToggleFavorite,
                        handleToggleWatchlist: handleToggleWatchlist,
                      }
                    : undefined
                }
              />
            ) : hasAnyMedia && getYouTubeUrl(relatedVideos[0]) ? (
              <VideoEmbed
                videoId={getYouTubeId(getYouTubeUrl(relatedVideos[0])) ?? ""}
                title={relatedVideos[0].title}
                conference={relatedVideos[0]}
                isAuthenticated={isAuthenticated}
                videoActions={
                  relatedVideos[0].id !== "source"
                    ? {
                        isWatched: isWatched(relatedVideos[0].id),
                        isFavorite: isFavorite(relatedVideos[0].id),
                        isWatchlist: isWatchlist(relatedVideos[0].id),
                        togglingId,
                        handleToggleWatched: handleToggleWatched,
                        handleToggleFavorite: handleToggleFavorite,
                        handleToggleWatchlist: handleToggleWatchlist,
                      }
                    : undefined
                }
              />
            ) : (
              <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 p-6 text-center">
                <span className="text-sm font-medium text-muted-foreground">
                  {event.period ? "Período histórico" : "Acontecimiento"}
                </span>
                <p className="mt-2 text-xs text-muted-foreground/80">
                  {hasAnyMedia
                    ? "Hay recursos relacionados disponibles."
                    : "No hay video disponible para este evento."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Center dot */}
        <div className="absolute left-0 top-6 z-10 flex -translate-x-1/2 md:left-1/2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 + (index % PAGE_SIZE) * 0.05 }}
            className="h-4 w-4 rounded-full border-2 border-background bg-primary shadow-sm md:h-5 md:w-5"
          />
        </div>

        {/* Card */}
        <div className="pl-6 md:w-1/2 md:pl-0">
          <Card className="group overflow-hidden border border-border/60 bg-card/80 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground md:text-base">
                <Badge variant="secondary" className="gap-1.5 font-medium text-sm md:text-base">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                  {event.dateLabel}
                </Badge>
                <Badge variant="outline" className="gap-1.5 font-normal text-sm md:text-base">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                  {event.location}
                </Badge>
                {videoCount > 0 && (
                  <Badge
                    variant="default"
                    className="gap-1.5 bg-primary/90 font-medium text-primary-foreground text-sm md:text-base"
                  >
                    <Video className="h-3 w-3 md:h-4 md:w-4" />
                    {videoCount} video{videoCount > 1 ? "s" : ""}
                  </Badge>
                )}
                {event.isYoutubeConference === false && (
                  <Badge
                    variant="outline"
                    className="gap-1.5 border-amber-500/50 text-amber-600 dark:text-amber-400 text-sm md:text-base"
                  >
                    <MonitorOff className="h-3 w-3 md:h-4 md:w-4" />
                    No es conferencia en YouTube
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl font-semibold leading-tight tracking-tight md:text-2xl lg:text-3xl">
                {event.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
                {event.description}
              </p>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-5 pb-2">
                      <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                          {event.summary}
                        </p>
                      </div>

                      {event.consequences.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/80 md:text-base">
                            Cambios y consecuencias
                          </h4>
                          <ul className="space-y-1.5">
                            {event.consequences.map((consequence, idx) => (
                              <li
                                key={idx}
                                className="flex gap-2 text-sm text-muted-foreground md:text-base"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span>{consequence}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Separator />

                      <div className="space-y-3">
                        {event.civilizations.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground md:text-base">
                              Civilizaciones
                            </span>
                            {event.civilizations.map((civilization) => (
                              <Badge
                                key={civilization}
                                variant="outline"
                                className="text-xs md:text-sm"
                              >
                                {civilization}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {event.characters.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground md:text-base">
                              Personajes
                            </span>
                            {event.characters.map((character) => (
                              <Badge
                                key={character}
                                variant="secondary"
                                className="text-xs font-normal md:text-sm"
                              >
                                {character}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {event.topics.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground md:text-base">
                              Temas
                            </span>
                            {event.topics.map((topic) => (
                              <Badge
                                key={topic}
                                variant="outline"
                                className="text-xs font-normal text-muted-foreground md:text-sm"
                              >
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {hasAnyMedia && (
                        <>
                          <Separator />
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground md:text-base">
                              <BookOpen className="h-4 w-4" />
                              <span>Conferencias y recursos relacionados</span>
                            </div>
                            <div className="grid gap-3">
                              {relatedVideos.map((conf) => (
                                <RelatedVideoCard
                                  key={conf.id}
                                  conference={conf}
                                  onSelect={setSelectedVideo}
                                  isAuthenticated={isAuthenticated}
                                  isWatched={conf.id !== "source" ? isWatched(conf.id) : false}
                                  isFavorite={conf.id !== "source" ? isFavorite(conf.id) : false}
                                  isWatchlist={conf.id !== "source" ? isWatchlist(conf.id) : false}
                                  togglingId={togglingId}
                                  onToggleWatched={handleToggleWatched}
                                  onToggleFavorite={handleToggleFavorite}
                                  onToggleWatchlist={handleToggleWatchlist}
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded((prev) => !prev)}
                className="w-full justify-between text-sm font-medium text-muted-foreground hover:text-foreground md:text-base"
              >
                <span>{expanded ? "Menos información" : "Más información y recursos"}</span>
                {expanded ? (
                  <ChevronUp className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                )}
              </Button>

              {/* Mobile video embed */}
              {sourceVideoId && (
                <div className="md:hidden">
                  <Separator className="mb-5" />
                  <VideoEmbed
                    videoId={sourceVideoId}
                    title={event.sourceConference.title}
                    conference={sourceConfItem}
                    isAuthenticated={isAuthenticated}
                    videoActions={
                      sourceConfItem
                        ? {
                            isWatched: isWatched(sourceConfItem.id),
                            isFavorite: isFavorite(sourceConfItem.id),
                            isWatchlist: isWatchlist(sourceConfItem.id),
                            togglingId,
                            handleToggleWatched: handleToggleWatched,
                            handleToggleFavorite: handleToggleFavorite,
                            handleToggleWatchlist: handleToggleWatchlist,
                          }
                        : undefined
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <VideoPlayerSheet
        selectedVideo={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isWatched={selectedVideo ? isWatched(selectedVideo.id) : false}
        isFavorite={selectedVideo ? isFavorite(selectedVideo.id) : false}
        isWatchlist={selectedVideo ? isWatchlist(selectedVideo.id) : false}
        isAuthenticated={isAuthenticated}
        onToggleWatched={handleToggleWatched}
        onToggleFavorite={handleToggleFavorite}
        onToggleWatchlist={handleToggleWatchlist}
        togglingId={togglingId}
      />
    </>
  );
}
