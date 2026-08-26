"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, Video, Filter } from "lucide-react";
import { getYouTubeId, getMediaType, MediaIcon, getYouTubeUrl } from "@/lib/media";
import { cn } from "@/lib/utils";
import {
  hasConferenceCoverage,
  MIN_YEAR,
  MAX_YEAR,
  yearToPercentLinear,
  yearToPercentAdapted,
  type TimelineScale,
} from "@/lib/timeline";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { VideoPlayerSheet } from "./VideoPlayerSheet";
import { VideoActions } from "./VideoActions";
import { useVideoActions } from "@/app/hooks/useVideoActions";
import type { PeopleGroup, ConferenceItem } from "@/app/types/timeline";

interface PopulationTimelineProps {
  peoples: PeopleGroup[];
  conferencesMap?: Map<string, ConferenceItem>;
  watchedIds?: Set<string>;
  favoriteIds?: Set<string>;
  watchlistIds?: Set<string>;
  isAuthenticated?: boolean;
  onToggleWatched?: (conferenceId: string) => void | Promise<void>;
  onToggleFavorite?: (conferenceId: string) => void | Promise<void>;
  onToggleWatchlist?: (conferenceId: string) => void | Promise<void>;
}

const ROW_HEIGHT = 56;
const MIN_BAR_HEIGHT = 8;
const MAX_BAR_HEIGHT = 40;

function formatYear(year: number): string {
  return year < 0 ? `${Math.abs(year)} a.C.` : `${year} d.C.`;
}

function formatPopulation(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} k`;
  return value.toLocaleString("es-ES");
}

function populationHeight(peakPopulation: number, maxPopulation: number): number {
  const ratio = Math.sqrt(peakPopulation) / Math.sqrt(maxPopulation);
  return Math.max(MIN_BAR_HEIGHT, Math.round(MIN_BAR_HEIGHT + ratio * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT)));
}

function useRegionLegend(peoples: PeopleGroup[]) {
  return useMemo(() => {
    const map = new Map<string, { color: string; count: number }>();
    for (const people of peoples) {
      const existing = map.get(people.region);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(people.region, { color: people.color, count: 1 });
      }
    }
    return Array.from(map.entries()).sort((a, b) => b[1].count - a[1].count);
  }, [peoples]);
}

function RelatedConferenceLinks({
  relatedConferences,
  conferencesMap,
  onSelect,
  isAuthenticated,
  togglingId,
  onToggleWatched,
  onToggleFavorite,
  onToggleWatchlist,
  isWatched,
  isFavorite,
  isWatchlist,
}: {
  relatedConferences: string[];
  conferencesMap?: Map<string, ConferenceItem>;
  onSelect: (conf: ConferenceItem) => void;
  isAuthenticated?: boolean;
  togglingId?: string | null;
  onToggleWatched?: (id: string) => void | Promise<void> | Promise<unknown>;
  onToggleFavorite?: (id: string) => void | Promise<void> | Promise<unknown>;
  onToggleWatchlist?: (id: string) => void | Promise<void> | Promise<unknown>;
  isWatched: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  isWatchlist: (id: string) => boolean;
}) {
  const conferences = useMemo(() => {
    const list: ConferenceItem[] = [];
    for (const id of relatedConferences) {
      const conf = conferencesMap?.get(id);
      if (conf) list.push(conf);
    }
    return list;
  }, [relatedConferences, conferencesMap]);

  if (conferences.length === 0) return null;

  const hasActions =
    isAuthenticated &&
    onToggleWatched !== undefined &&
    onToggleFavorite !== undefined &&
    onToggleWatchlist !== undefined;

  return (
    <div className="mt-3 space-y-1.5">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Conferencias relacionadas
      </p>
      <div className="space-y-1">
        {conferences.slice(0, 4).map((conf) => {
          const youtubeUrl = getYouTubeUrl(conf);
          const resourceUrl = youtubeUrl ?? conf.url;
          const mediaType = getMediaType(resourceUrl);
          const videoId = getYouTubeId(youtubeUrl);

          function handleClick() {
            if (videoId) {
              onSelect(conf);
            } else if (resourceUrl) {
              window.open(resourceUrl, "_blank", "noopener,noreferrer");
            }
          }

          return (
            <div
              key={conf.id}
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
                "flex w-full cursor-pointer items-center gap-2 rounded px-1.5 py-1 text-xs text-background/90 text-left transition-colors hover:bg-background/10",
                isWatched(conf.id) && "border-l-2 border-primary"
              )}
            >
              <MediaIcon type={mediaType} />
              <span className="line-clamp-1 flex-1">{conf.title}</span>
              {videoId && <Video className="h-3 w-3 opacity-70" />}
              {hasActions && (
                <span
                  className="shrink-0"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <VideoActions
                    conferenceId={conf.id}
                    isWatched={isWatched(conf.id)}
                    isFavorite={isFavorite(conf.id)}
                    isWatchlist={isWatchlist(conf.id)}
                    isAuthenticated={isAuthenticated}
                    onToggleWatched={onToggleWatched}
                    onToggleFavorite={onToggleFavorite}
                    onToggleWatchlist={onToggleWatchlist}
                    togglingId={togglingId}
                    orientation="horizontal"
                    size="sm"
                  />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PopulationTimeline({
  peoples,
  conferencesMap,
  watchedIds: initialWatchedIds = new Set(),
  favoriteIds: initialFavoriteIds = new Set(),
  watchlistIds: initialWatchlistIds = new Set(),
  isAuthenticated = false,
}: PopulationTimelineProps) {
  const [showAll, setShowAll] = useState(false);
  const [scale, setScale] = useState<TimelineScale>("adapted");
  const [selectedVideo, setSelectedVideo] = useState<ConferenceItem | null>(null);

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

  const yearToPercent = useMemo(
    () => (year: number) =>
      scale === "linear" ? yearToPercentLinear(year) : yearToPercentAdapted(year),
    [scale]
  );

  const sortedPeoples = useMemo(() => {
    return [...peoples].sort((a, b) => a.startYear - b.startYear);
  }, [peoples]);

  const filteredPeoples = useMemo(() => {
    if (showAll) return sortedPeoples;
    const map = conferencesMap ?? new Map<string, ConferenceItem>();
    return sortedPeoples.filter((people) => hasConferenceCoverage(people, map));
  }, [sortedPeoples, conferencesMap, showAll]);

  const maxPopulation = useMemo(() => {
    return Math.max(...filteredPeoples.map((p) => p.peakPopulation), 1);
  }, [filteredPeoples]);

  const legend = useRegionLegend(filteredPeoples);
  const hiddenCount = sortedPeoples.length - filteredPeoples.length;

  const ticks = useMemo(() => {
    const list: number[] = [];
    for (let year = MIN_YEAR; year <= MAX_YEAR; year += 1000) {
      list.push(year);
    }
    return list;
  }, []);

  return (
    <TooltipProvider delay={100}>
      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-base text-muted-foreground sm:text-lg">
              Visualización de civilizaciones y pueblos a lo largo del tiempo.
              Por defecto se muestran solo los que tienen conferencias de Eva
              Tobalina en video.
            </p>
            <p className="mt-1 text-sm text-muted-foreground/80">
              {filteredPeoples.length} de {sortedPeoples.length} mostrados
              {hiddenCount > 0 ? ` · ${hiddenCount} ocultos` : ""}
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/50 px-3 py-2">
              <Switch
                id="scale-toggle-horizontal"
                checked={scale === "linear"}
                onCheckedChange={(checked) =>
                  setScale(checked ? "linear" : "adapted")
                }
                aria-label="Cambiar escala temporal"
              />
              <Label
                htmlFor="scale-toggle-horizontal"
                className="cursor-pointer text-sm text-muted-foreground"
              >
                {scale === "linear" ? "Escala lineal" : "Escala adaptada"}
              </Label>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll((prev) => !prev)}
              className="gap-2 text-sm"
            >
              <Filter className="h-4 w-4" />
              {showAll
                ? "Solo con conferencias de Eva"
                : "Incluir pueblos sin conferencias"}
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-card/50 p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {formatYear(MIN_YEAR)}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {formatYear(MAX_YEAR)}
            </span>
          </div>

          <div className="relative">
            {/* Axis ticks */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
              {ticks.map((year) => {
                const left = yearToPercent(year);
                return (
                  <div
                    key={year}
                    className="absolute top-0 bottom-0 border-l border-dashed border-border/40"
                    style={{ left: `${left}%` }}
                  >
                    <span className="absolute -top-5 left-1 text-[10px] text-muted-foreground/70">
                      {formatYear(year)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Rows */}
            <div className="relative pt-6">
              {filteredPeoples.map((people, index) => {
                const left = yearToPercent(people.startYear);
                const width = yearToPercent(people.endYear) - left;
                const height = populationHeight(people.peakPopulation, maxPopulation);
                const rowCenter = ROW_HEIGHT / 2;

                return (
                  <div
                    key={people.id}
                    className="group relative flex items-center"
                    style={{ height: ROW_HEIGHT }}
                  >
                    {/* Label */}
                    <div className="w-32 shrink-0 pr-3 sm:w-40 md:w-48">
                      <p className="truncate text-xs font-medium text-foreground sm:text-sm">
                        {people.name}
                      </p>
                      <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
                        {formatYear(people.startYear)} — {formatYear(people.endYear)}
                      </p>
                    </div>

                    {/* Bar track */}
                    <div className="relative flex-1">
                      <Tooltip>
                        <TooltipTrigger
                          render={(props) => (
                            <div
                              {...props}
                              className="absolute cursor-pointer"
                              style={{
                                left: `${left}%`,
                                width: `${width}%`,
                                height,
                                top: rowCenter - height / 2,
                              }}
                            >
                              <motion.div
                                initial={{ scaleX: 0, opacity: 0 }}
                                whileInView={{ scaleX: 1, opacity: 1 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                  duration: 0.7,
                                  delay: index * 0.04,
                                  ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                whileHover={{ scaleY: 1.15, y: -1 }}
                                className="h-full w-full rounded-full shadow-sm"
                                style={{
                                  backgroundColor: people.color,
                                  transformOrigin: "left center",
                                }}
                              />
                            </div>
                          )}
                        />
                        <TooltipContent
                          side="top"
                          align="start"
                          sideOffset={8}
                          className="max-w-sm bg-foreground text-background"
                        >
                          <div className="space-y-2 p-1">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold">{people.name}</p>
                                <p className="text-xs text-background/80">
                                  {people.region}
                                </p>
                              </div>
                              <Badge
                                variant="secondary"
                                className="bg-background/20 text-background"
                              >
                                <Users className="mr-1 h-3 w-3" />
                                {formatPopulation(people.peakPopulation)}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2 text-[11px] text-background/85">
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatYear(people.startYear)} —{" "}
                                {formatYear(people.endYear)}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Año de apogeo: {formatYear(people.peakYear)}
                              </span>
                            </div>

                            <p className="text-xs leading-relaxed text-background/90">
                              {people.description}
                            </p>

                            {people.civilizations.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {people.civilizations.map((civ) => (
                                  <span
                                    key={civ}
                                    className="rounded bg-background/15 px-1.5 py-0.5 text-[10px]"
                                  >
                                    {civ}
                                  </span>
                                ))}
                              </div>
                            )}

                            <RelatedConferenceLinks
                              relatedConferences={people.relatedConferences}
                              conferencesMap={conferencesMap}
                              onSelect={setSelectedVideo}
                              isAuthenticated={isAuthenticated}
                              togglingId={togglingId}
                              onToggleWatched={handleToggleWatched}
                              onToggleFavorite={handleToggleFavorite}
                              onToggleWatchlist={handleToggleWatchlist}
                              isWatched={isWatched}
                              isFavorite={isFavorite}
                              isWatchlist={isWatchlist}
                            />
                          </div>
                        </TooltipContent>
                      </Tooltip>

                      {/* Peak marker */}
                      <div
                        className="pointer-events-none absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-background ring-2 ring-background/50"
                        style={{
                          left: `${yearToPercent(people.peakYear)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Regiones
          </p>
          <div className="flex flex-wrap gap-2">
            {legend.map(([region, { color, count }]) => (
              <div
                key={region}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-2.5 py-1 text-xs"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-foreground">{region}</span>
                <span className="text-muted-foreground">({count})</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            Los valores de población son estimaciones históricas aproximadas y
            sirven únicamente como referencia visual. El grosor de cada franja se
            calcula con una escala de raíz cuadrada para que civilizaciones muy
            grandes no oculten a las más pequeñas.
          </p>
        </div>
      </div>

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
    </TooltipProvider>
  );
}
