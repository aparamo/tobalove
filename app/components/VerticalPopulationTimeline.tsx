"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Users,
  Calendar,
  MapPin,
  Play,
  ExternalLink,
  Video,
  Filter,
  Globe,
} from "lucide-react";
import { getYouTubeId, getYouTubeUrl } from "@/lib/youtube";
import { getMediaType, MediaIcon } from "@/lib/media";
import {
  hasConferenceCoverage,
  MIN_YEAR,
  MAX_YEAR,
  yearToPercentLinear,
  yearToPercentAdapted,
  populationWidthPercent,
  layoutFloatingPeoples,
  type TimelineScale,
  type FloatingLayoutItem,
} from "@/lib/timeline";
import { cn } from "@/lib/utils";
import { TimelineNavigation } from "./TimelineNavigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { VideoPlayerSheet } from "./VideoPlayerSheet";
import { VideoActions } from "./VideoActions";
import { useVideoActions } from "@/app/hooks/useVideoActions";
import type {
  PeopleGroup,
  ConferenceItem,
  LayoutMode,
} from "@/app/types/timeline";

interface VerticalPopulationTimelineProps {
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

const PAGE_SIZE = 10;
const CARD_HEIGHT = 96;
const MIN_GAP = 16;
const BOTTOM_PADDING = 320;

type TimelineHeight = "normal" | "long" | "extra";

const HEIGHT_PRESETS: Record<TimelineHeight, { base: number; multiplier: number }> = {
  normal: { base: 3600, multiplier: 100 },
  long: { base: 4800, multiplier: 120 },
  extra: { base: 6000, multiplier: 140 },
};

function formatYear(year: number): string {
  return year < 0 ? `${Math.abs(year)} a.C.` : `${year} d.C.`;
}

function formatPopulation(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} k`;
  return value.toLocaleString("es-ES");
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function mixWithWhite(hex: string, colorRatio: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const mixedR = Math.round(r * colorRatio + 255 * (1 - colorRatio));
  const mixedG = Math.round(g * colorRatio + 255 * (1 - colorRatio));
  const mixedB = Math.round(b * colorRatio + 255 * (1 - colorRatio));
  return `rgb(${mixedR}, ${mixedG}, ${mixedB})`;
}

function mixWithBlack(hex: string, colorRatio: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const mixedR = Math.round(r * colorRatio);
  const mixedG = Math.round(g * colorRatio);
  const mixedB = Math.round(b * colorRatio);
  return `rgb(${mixedR}, ${mixedG}, ${mixedB})`;
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

interface LayoutItem {
  people: PeopleGroup;
  top: number;
  side: "left" | "right";
  width: number;
}

function layoutPeoples(
  peoples: PeopleGroup[],
  maxPopulation: number,
  yearToPercent: (year: number) => number,
  containerHeight: number
): LayoutItem[] {
  const sorted = [...peoples].sort((a, b) => a.peakYear - b.peakYear);
  const items: LayoutItem[] = [];
  const lastTops: { left: number; right: number } = {
    left: -Infinity,
    right: -Infinity,
  };

  for (let i = 0; i < sorted.length; i++) {
    const people = sorted[i];
    const baseTop = (yearToPercent(people.peakYear) / 100) * containerHeight;
    const side = i % 2 === 0 ? "right" : "left";

    // Respetamos la posición real del año de apogeo. Solo empujamos hacia abajo
    // si la card se solaparía demasiado con la anterior del mismo lado.
    const lastTop = lastTops[side];
    const minPush = lastTop + CARD_HEIGHT - MIN_GAP;
    const overlap = Math.max(0, minPush - baseTop);
    const top = overlap > CARD_HEIGHT * 0.5 ? minPush : baseTop;

    lastTops[side] = top;

    items.push({
      people,
      top,
      side,
      width: populationWidthPercent(people.peakPopulation, maxPopulation),
    });
  }

  return items;
}

interface LaneBand {
  people: PeopleGroup;
  lane: number;
  top: number;
  height: number;
}

const LANE_WIDTH = 10;
const LANE_GAP = 3;

function computeLaneBands(
  peoples: PeopleGroup[],
  totalHeight: number,
  yearToPercent: (year: number) => number
): { bands: LaneBand[]; laneCount: number } {
  const sorted = [...peoples].sort((a, b) => a.startYear - b.startYear);
  const lanesEnd: number[] = [];
  let laneCount = 0;

  const bands = sorted.map((people) => {
    let laneIndex = lanesEnd.findIndex((end) => people.startYear > end);
    if (laneIndex === -1) {
      laneIndex = lanesEnd.length;
      lanesEnd.push(people.endYear);
      laneCount = lanesEnd.length;
    } else {
      lanesEnd[laneIndex] = people.endYear;
    }

    const top = (yearToPercent(people.startYear) / 100) * totalHeight;
    const height = Math.max(
      4,
      ((yearToPercent(people.endYear) - yearToPercent(people.startYear)) /
        100) *
        totalHeight
    );

    return { people, lane: laneIndex, top, height };
  });

  return { bands, laneCount };
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
  conference: ConferenceItem;
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
  const youtubeUrl = getYouTubeUrl(conference);
  const videoId = getYouTubeId(youtubeUrl);
  const resourceUrl = youtubeUrl ?? conference.url;
  const mediaType = getMediaType(resourceUrl);
  const hasActions =
    isAuthenticated &&
    onToggleWatched !== undefined &&
    onToggleFavorite !== undefined &&
    onToggleWatchlist !== undefined;

  function handleClick() {
    if (videoId) {
      onSelect(conference);
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
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MediaIcon type={mediaType} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug text-foreground sm:text-base">
          {conference.title}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {conference.organization}
          {conference.date ? ` · ${conference.date}` : null}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {resourceUrl && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              {videoId ? "Ver conferencia" : "Ver recurso"}
              {videoId && <ExternalLink className="h-3.5 w-3.5" />}
            </span>
          )}
          {hasActions && (
            <span onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
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
                orientation="horizontal"
                size="sm"
              />
            </span>
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

interface PeopleCardProps {
  people: PeopleGroup;
  widthPercent: number;
  expanded: boolean;
  hovered?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "mamertino";
}

function PeopleCard({
  people,
  widthPercent,
  expanded,
  hovered = false,
  onClick,
  className,
  variant = "default",
}: PeopleCardProps) {
  const isMamertino = variant === "mamertino";
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const mutedTextClass = isMamertino
    ? isLight
      ? "text-stone-900"
      : "text-stone-100"
    : "text-muted-foreground";
  return (
    <Card
      className={cn(
        "cursor-pointer overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-md",
        isMamertino
          ? cn(
              "border-transparent",
              isLight ? "text-stone-950" : "text-white"
            )
          : "border-border/60 bg-card/75 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800",
        className
      )}
      style={
        isMamertino
          ? {
              backgroundColor: isLight
                ? mixWithWhite(
                    people.color,
                    hovered ? 0.55 : expanded ? 0.38 : 0.28
                  )
                : mixWithBlack(
                    people.color,
                    hovered ? 0.78 : expanded ? 0.62 : 0.48
                  ),
              borderColor: isLight
                ? mixWithWhite(people.color, hovered ? 0.75 : 0.55)
                : mixWithBlack(people.color, hovered ? 0.9 : 0.72),
              boxShadow: `0 0 16px ${hexToRgba(people.color, hovered ? 0.35 : 0.2)}`,
            }
          : undefined
      }
      onClick={onClick}
    >
      <CardHeader
        className={cn(
          "transition-all",
          expanded ? "space-y-1.5 pb-2 pt-3" : "space-y-1 py-1.5"
        )}
      >
        <div className="flex flex-wrap items-center gap-1">
          <Badge
            variant="secondary"
            className="gap-1 text-[10px] sm:text-xs"
          >
            <Calendar className="h-2.5 w-2.5" />
            {formatYear(people.startYear)} — {formatYear(people.endYear)}
          </Badge>
          <Badge variant="outline" className="gap-1 text-[10px] sm:text-xs">
            <MapPin className="h-2.5 w-2.5" />
            {formatYear(people.peakYear)}
          </Badge>
        </div>
        <CardTitle
          className={cn(
            "font-semibold leading-tight transition-all",
            expanded ? "text-sm sm:text-base" : "text-xs sm:text-sm"
          )}
        >
          {people.name}
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          "pt-0 transition-all",
          expanded ? "space-y-2 pb-3" : "space-y-1 pb-1.5"
        )}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-muted",
            expanded ? "h-2 sm:h-2.5" : "h-1 sm:h-1.5"
          )}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${widthPercent}%`,
              background: `linear-gradient(90deg, ${hexToRgba(
                people.color,
                0.85
              )} 0%, ${people.color} 60%, ${hexToRgba(
                people.color,
                0.9
              )} 100%)`,
              boxShadow: `0 0 6px ${hexToRgba(people.color, 0.35)}`,
            }}
          />
        </div>
        <div
          className={cn(
            "flex items-center justify-between text-[10px] sm:text-xs",
            mutedTextClass
          )}
        >
          <span className="inline-flex items-center gap-1">
            <Globe className="h-2.5 w-2.5" />
            {people.region}
          </span>
          <span className="inline-flex items-center gap-1 font-medium">
            <Users className="h-2.5 w-2.5" />
            {formatPopulation(people.peakPopulation)}
          </span>
        </div>
        {expanded && (
          <p
            className={cn(
              "line-clamp-2 text-xs leading-relaxed sm:text-sm",
              mutedTextClass
            )}
          >
            {people.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface PeopleCardCompactProps {
  people: PeopleGroup;
  leftPercent: number;
  widthPercent: number;
  onSelect: (people: PeopleGroup) => void;
}

function PeopleCardCompact({
  people,
  leftPercent,
  widthPercent,
  onSelect,
}: PeopleCardCompactProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.25 }}
      type="button"
      onClick={() => onSelect(people)}
      className="pointer-events-auto relative flex w-full flex-col items-start overflow-hidden rounded-md border px-2 py-1 text-left shadow-sm backdrop-blur-sm transition-opacity hover:opacity-100"
      style={{
        marginLeft: `${leftPercent}%`,
        width: `${widthPercent}%`,
        backgroundColor: hexToRgba(people.color, 0.22),
        borderColor: hexToRgba(people.color, 0.5),
      }}
    >
      <span className="w-full truncate text-[10px] font-semibold leading-tight text-foreground sm:text-xs">
        {people.name}
      </span>
      <span className="w-full truncate text-[9px] text-foreground/80 sm:text-[10px]">
        {formatYear(people.startYear)} — {formatYear(people.endYear)}
      </span>
    </motion.button>
  );
}

const MAX_MAMERTINO_EXPANDED_CARDS = 4;

interface MamertinoCard {
  people: PeopleGroup;
  leftPercent: number;
  widthPercent: number;
  displayTop: number;
  progress: number;
  peakCloseness: number;
  visibilityFactor: number;
  isFull: boolean;
}

function computeMamertinoCards(
  items: FloatingLayoutItem[],
  visibleTop: number,
  visibleBottom: number,
  totalHeight: number,
  yearToPercent: (year: number) => number
): MamertinoCard[] {
  if (visibleBottom <= visibleTop || items.length === 0) return [];

  const viewportHeight = visibleBottom - visibleTop;
  const viewportCenter = (visibleTop + visibleBottom) / 2;
  const usableHeight = Math.max(1, viewportHeight - CARD_HEIGHT);

  const scored = items
    .map((item) => {
      const bandTop =
        (yearToPercent(item.people.startYear) / 100) * totalHeight;
      const bandBottom =
        (yearToPercent(item.people.endYear) / 100) * totalHeight;

      // Margen para animar entrada/salida suave de una altura de card.
      const margin = CARD_HEIGHT;
      if (bandBottom < visibleTop - margin || bandTop > visibleBottom + margin) {
        return null;
      }

      const peakPos =
        (yearToPercent(item.people.peakYear) / 100) * totalHeight;
      const bandSpan = Math.max(1, bandBottom - bandTop);

      // Progreso continuo de la línea a través del viewport:
      // 0 cuando el inicio de la línea está abajo del todo,
      // 1 cuando el final de la línea está arriba del todo.
      // Valores < 0 o > 1 permiten la animación de entrada/salida.
      const progress = (viewportCenter - bandTop) / bandSpan;

      // Proximidad al apogeo: 1 cuando el apogeo está en el centro del viewport.
      const peakDistance = Math.abs(peakPos - viewportCenter);
      const peakCloseness = Math.max(
        0,
        1 - peakDistance / (viewportHeight * 0.6)
      );

      // La card viaja de abajo (inicio de línea) a arriba (final de línea)
      // y continúa subiendo para salir por arriba cuando la línea desaparece.
      const displayTop = visibleBottom - CARD_HEIGHT - progress * usableHeight;

      // Factor de visibilidad: fade in al entrar por abajo, fade out al salir por arriba.
      const visibilityFactor =
        Math.max(0, Math.min(1, progress + 0.35)) *
        Math.max(0, Math.min(1, 1.35 - progress));

      const score =
        peakCloseness * 10_000_000 +
        visibilityFactor * 100_000 +
        item.people.peakPopulation;
      return {
        item,
        progress,
        peakCloseness,
        displayTop,
        visibilityFactor,
        score,
      };
    })
    .filter(
      (entry): entry is NonNullable<typeof entry> => entry !== null
    );

  // Ordenamos por score para priorizar civilizaciones relevantes en el viewport.
  scored.sort((a, b) => b.score - a.score);

  // De esas, las 4 más cercanas a su apogeo se muestran expandidas.
  // El resto de cards visibles se muestran compactas.
  const sortedByPeak = [...scored].sort(
    (a, b) => b.peakCloseness - a.peakCloseness
  );
  const expandedIds = new Set(
    sortedByPeak
      .slice(0, MAX_MAMERTINO_EXPANDED_CARDS)
      .map((s) => s.item.people.id)
  );

  return scored.map((s) => ({
    people: s.item.people,
    leftPercent: s.item.leftPercent,
    widthPercent: s.item.widthPercent,
    displayTop: s.displayTop,
    progress: s.progress,
    peakCloseness: s.peakCloseness,
    visibilityFactor: s.visibilityFactor,
    isFull: expandedIds.has(s.item.people.id),
  }));
}

function PeopleDetailDialog({
  people,
  conferencesMap,
  open,
  onOpenChange,
  onSelectVideo,
  isAuthenticated,
  togglingId,
  onToggleWatched,
  onToggleFavorite,
  onToggleWatchlist,
  isWatched,
  isFavorite,
  isWatchlist,
}: {
  people: PeopleGroup | null;
  conferencesMap?: Map<string, ConferenceItem>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectVideo: (conference: ConferenceItem) => void;
  isAuthenticated?: boolean;
  togglingId?: string | null;
  onToggleWatched?: (id: string) => void | Promise<void> | Promise<unknown>;
  onToggleFavorite?: (id: string) => void | Promise<void> | Promise<unknown>;
  onToggleWatchlist?: (id: string) => void | Promise<void> | Promise<unknown>;
  isWatched: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  isWatchlist: (id: string) => boolean;
}) {
  const relatedVideos = useMemo(() => {
    if (!people) return [];
    const list: ConferenceItem[] = [];
    for (const id of people.relatedConferences) {
      const conf = conferencesMap?.get(id);
      if (conf && getYouTubeUrl(conf)) {
        list.push(conf);
      }
    }
    return list;
  }, [people, conferencesMap]);

  if (!people) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        <div
          className="h-2 w-full"
          style={{ backgroundColor: people.color }}
        />
        <div className="px-6 pt-2">
          <DialogHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="gap-1 text-sm"
                style={{ borderColor: people.color, color: people.color }}
              >
                <Globe className="h-3.5 w-3.5" />
                {people.region}
              </Badge>
              <Badge variant="secondary" className="gap-1 text-sm">
                <Users className="h-3.5 w-3.5" />
                {formatPopulation(people.peakPopulation)}
              </Badge>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl">
              {people.name}
            </DialogTitle>
            <DialogDescription className="flex flex-wrap items-center gap-3 text-base">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatYear(people.startYear)} — {formatYear(people.endYear)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                Apogeo: {formatYear(people.peakYear)}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
              {people.description}
            </p>

            {people.civilizations.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Civilizaciones
                </span>
                {people.civilizations.map((civ) => (
                  <Badge key={civ} variant="outline" className="text-sm">
                    {civ}
                  </Badge>
                ))}
              </div>
            )}

            {relatedVideos.length > 0 && (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-base font-semibold text-foreground">
                    <Video className="h-5 w-5 text-primary" />
                    <span>
                      Conferencias relacionadas{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        ({relatedVideos.length} video
                        {relatedVideos.length > 1 ? "s" : ""})
                      </span>
                    </span>
                  </div>
                  <div className="grid gap-3">
                    {relatedVideos.map((conf) => (
                      <RelatedVideoCard
                        key={conf.id}
                        conference={conf}
                        onSelect={onSelectVideo}
                        isAuthenticated={isAuthenticated}
                        togglingId={togglingId}
                        onToggleWatched={onToggleWatched}
                        onToggleFavorite={onToggleFavorite}
                        onToggleWatchlist={onToggleWatchlist}
                        isWatched={isWatched(conf.id)}
                        isFavorite={isFavorite(conf.id)}
                        isWatchlist={isWatchlist(conf.id)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {relatedVideos.length === 0 && (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
                <p className="text-muted-foreground">
                  No hay videos de YouTube relacionados con este pueblo.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function VerticalPopulationTimeline({
  peoples,
  conferencesMap,
  watchedIds: initialWatchedIds = new Set(),
  favoriteIds: initialFavoriteIds = new Set(),
  watchlistIds: initialWatchlistIds = new Set(),
  isAuthenticated = false,
}: VerticalPopulationTimelineProps) {
  const [selectedPeople, setSelectedPeople] = useState<PeopleGroup | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<ConferenceItem | null>(null);
  const [showAll, setShowAll] = useState(false);

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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState<TimelineScale>("adapted");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("classic");
  const [timelineHeight, setTimelineHeight] = useState<TimelineHeight>("normal");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggedOffsets, setDraggedOffsets] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [scrollTop, setScrollTop] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [wrapperOffsetTop, setWrapperOffsetTop] = useState(0);
  const [wrapperClientHeight, setWrapperClientHeight] = useState(0);
  const [scrolledContainer, setScrolledContainer] = useState(false);

  const handleSetScale = useCallback((value: TimelineScale) => {
    setDraggedOffsets({});
    setScale(value);
  }, []);

  const handleSetLayoutMode = useCallback((value: LayoutMode) => {
    setDraggedOffsets({});
    setLayoutMode(value);
  }, []);

  const handleSetTimelineHeight = useCallback((value: TimelineHeight) => {
    setDraggedOffsets({});
    setTimelineHeight(value);
  }, []);

  const mamertinoDraggingMapRef = useRef<Map<string, boolean>>(new Map());

  const expandedIndex = hoveredIndex ?? currentIndex;
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const activeObserverRef = useRef<IntersectionObserver | null>(null);

  const yearToPercent = useCallback(
    (year: number) =>
      scale === "linear" ? yearToPercentLinear(year) : yearToPercentAdapted(year),
    [scale]
  );

  const sortedPeoples = useMemo(() => {
    return [...peoples].sort((a, b) => a.startYear - b.startYear);
  }, [peoples]);

  const maxPopulation = useMemo(() => {
    return Math.max(...sortedPeoples.map((p) => p.peakPopulation), 1);
  }, [sortedPeoples]);

  const filteredPeoples = useMemo(() => {
    if (showAll) return sortedPeoples;
    const map = conferencesMap ?? new Map<string, ConferenceItem>();
    return sortedPeoples.filter((people) => hasConferenceCoverage(people, map));
  }, [sortedPeoples, conferencesMap, showAll]);

  const visiblePeoples = useMemo(() => {
    return filteredPeoples.slice(0, visibleCount);
  }, [filteredPeoples, visibleCount]);

  // La altura del contenedor crece con la cantidad de pueblos visibles para
  // evitar que las cards se amontonen en periodos densos de la línea de tiempo.
  // El usuario puede elegir entre tres presets de altura.
  const containerHeight = useMemo(() => {
    const preset = HEIGHT_PRESETS[timelineHeight];
    return Math.max(
      preset.base,
      filteredPeoples.length * preset.multiplier + CARD_HEIGHT * 2
    );
  }, [filteredPeoples.length, timelineHeight]);

  const layout = useMemo(() => {
    return layoutPeoples(
      visiblePeoples,
      maxPopulation,
      yearToPercent,
      containerHeight
    );
  }, [visiblePeoples, maxPopulation, yearToPercent, containerHeight]);

  const floatingLayout = useMemo(() => {
    return layoutFloatingPeoples(
      visiblePeoples,
      maxPopulation,
      yearToPercent,
      containerHeight,
      CARD_HEIGHT,
      MIN_GAP
    );
  }, [visiblePeoples, maxPopulation, yearToPercent, containerHeight]);

  const hasMore = visiblePeoples.length < filteredPeoples.length;
  const remainingCount = filteredPeoples.length - visiblePeoples.length;
  const totalHiddenCount = sortedPeoples.length - filteredPeoples.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) =>
      Math.min(prev + PAGE_SIZE, filteredPeoples.length)
    );
  }, [filteredPeoples.length]);

  const setSentinel = useCallback(
    (node: HTMLDivElement | null) => {
      sentinelRef.current = node;
      if (observerRef.current) observerRef.current.disconnect();

      if (!node || !hasMore) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            loadMore();
          }
        },
        {
          root: scrolledContainer ? wrapperRef.current : null,
          rootMargin: "200px",
        }
      );

      observerRef.current.observe(node);
    },
    [hasMore, loadMore, scrolledContainer]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (activeObserverRef.current) activeObserverRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const update = () => {
      if (!wrapperRef.current) return;
      if (scrolledContainer) {
        setScrollTop(wrapperRef.current.scrollTop);
        setWrapperHeight(wrapperRef.current.clientHeight);
        setWrapperClientHeight(wrapperRef.current.clientHeight);
        setWrapperOffsetTop(0);
      } else {
        const rect = wrapperRef.current.getBoundingClientRect();
        setScrollTop(window.scrollY);
        setWrapperHeight(window.innerHeight);
        setWrapperClientHeight(wrapperRef.current.clientHeight);
        setWrapperOffsetTop(rect.top + window.scrollY);
      }
    };

    update();
    const target = scrolledContainer ? wrapperRef.current : window;
    if (!target) return;

    target.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      target.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrolledContainer]);

  useEffect(() => {
    if (activeObserverRef.current) activeObserverRef.current.disconnect();

    activeObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setCurrentIndex(idx);
          }
        });
      },
      {
        root: scrolledContainer ? wrapperRef.current : null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) activeObserverRef.current?.observe(el);
    });

    return () => activeObserverRef.current?.disconnect();
  }, [visiblePeoples, scale, layoutMode, scrolledContainer]);

  const legend = useRegionLegend(filteredPeoples);

  const ticks = useMemo(() => {
    const list: number[] = [];
    for (let year = MIN_YEAR; year <= MAX_YEAR; year += 1000) {
      list.push(year);
    }
    return list;
  }, []);

  // El layout activo depende del modo: clásico usa el layout lateral,
  // flotante/levitación usa el layout libre, que puede empujar cards más abajo.
  const activeLayout = layoutMode === "classic" ? layout : floatingLayout;

  const totalHeight = useMemo(() => {
    if (activeLayout.length === 0) return containerHeight + BOTTOM_PADDING;
    const last = activeLayout[activeLayout.length - 1];
    return Math.max(
      containerHeight,
      last.top + CARD_HEIGHT + MIN_GAP + BOTTOM_PADDING
    );
  }, [activeLayout, containerHeight]);

  const { bands: laneBands, laneCount } = useMemo(() => {
    return computeLaneBands(visiblePeoples, totalHeight, yearToPercent);
  }, [visiblePeoples, totalHeight, yearToPercent]);

  const axisWidth = Math.max(2, laneCount * LANE_WIDTH + (laneCount - 1) * LANE_GAP);

  const { visibleTop, visibleBottom } = useMemo(() => {
    if (wrapperHeight === 0 || wrapperClientHeight === 0) {
      return { visibleTop: 0, visibleBottom: 0 };
    }
    if (scrolledContainer) {
      // El wrapper mismo es el scroll container: las coordenadas ya son relativas
      // al contenido scrolleable.
      return {
        visibleTop: scrollTop,
        visibleBottom: scrollTop + wrapperHeight,
      };
    }
    // En scroll libre, el viewport es la ventana. Convertimos a coordenadas
    // relativas al contenido del wrapper para comparar con bandTop/bandBottom.
    const scrollViewportTop = scrollTop;
    const scrollViewportBottom = scrollTop + wrapperHeight;
    return {
      visibleTop: Math.max(0, scrollViewportTop - wrapperOffsetTop),
      visibleBottom: Math.min(
        wrapperClientHeight,
        scrollViewportBottom - wrapperOffsetTop
      ),
    };
  }, [
    scrollTop,
    wrapperHeight,
    wrapperOffsetTop,
    wrapperClientHeight,
    scrolledContainer,
  ]);

  const mamertinoCards = useMemo<MamertinoCard[]>(() => {
    if (layoutMode !== "levitating") return [];
    return computeMamertinoCards(
      floatingLayout,
      visibleTop,
      visibleBottom,
      totalHeight,
      yearToPercent
    );
  }, [
    layoutMode,
    floatingLayout,
    visibleTop,
    visibleBottom,
    totalHeight,
    yearToPercent,
  ]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, visiblePeoples.length - 1));
      setCurrentIndex(clamped);

      const element = itemRefs.current[clamped];
      if (element && wrapperRef.current) {
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const relativeTop =
          elementRect.top -
          wrapperRect.top +
          (scrolledContainer ? wrapperRef.current.scrollTop : 0);
        const viewportHeight = scrolledContainer
          ? wrapperRect.height
          : window.innerHeight;
        const targetTop = relativeTop - viewportHeight / 2 + CARD_HEIGHT / 2;

        if (scrolledContainer) {
          wrapperRef.current.scrollTo({
            top: targetTop,
            behavior: "smooth",
          });
        } else {
          window.scrollTo({
            top: window.scrollY + targetTop,
            behavior: "smooth",
          });
        }
        return;
      }

      // Fallback: calculamos la posición desde el layout actual.
      const layoutItem =
        layoutMode === "levitating" || layoutMode === "floating"
          ? floatingLayout[clamped]
          : layout[clamped];
      if (!layoutItem || !wrapperRef.current) return;

      const viewportHeight = scrolledContainer
        ? wrapperRef.current.clientHeight
        : window.innerHeight;
      const targetTop = layoutItem.top - viewportHeight / 2 + CARD_HEIGHT / 2;

      if (scrolledContainer) {
        wrapperRef.current.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: wrapperOffsetTop + targetTop,
          behavior: "smooth",
        });
      }
    },
    [
      floatingLayout,
      layout,
      layoutMode,
      scrolledContainer,
      visiblePeoples.length,
      wrapperOffsetTop,
    ]
  );

  const goNext = useCallback(
    () => scrollToIndex(currentIndex + 1),
    [scrollToIndex, currentIndex]
  );
  const goPrev = useCallback(
    () => scrollToIndex(currentIndex - 1),
    [scrollToIndex, currentIndex]
  );
  const goStart = useCallback(() => scrollToIndex(0), [scrollToIndex]);
  const goEnd = useCallback(() => {
    setVisibleCount(filteredPeoples.length);
    setTimeout(() => {
      scrollToIndex(filteredPeoples.length - 1);
    }, 50);
  }, [filteredPeoples.length, scrollToIndex]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <p className="text-base text-muted-foreground sm:text-lg">
            Línea del tiempo de pueblos y civilizaciones. Cada tarjeta se
            posiciona en su año de apogeo y el ancho de la franja de color
            representa su población aproximada.
          </p>
          <p className="mt-1 text-sm text-muted-foreground/80">
            {visiblePeoples.length} de {filteredPeoples.length} mostrados ·{" "}
            {filteredPeoples.length} con conferencias
            {totalHiddenCount > 0 ? ` · ${totalHiddenCount} ocultos` : ""}
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/50 px-3 py-2">
            <Switch
              id="scale-toggle"
              checked={scale === "linear"}
              onCheckedChange={(checked) =>
                handleSetScale(checked ? "linear" : "adapted")
              }
              aria-label="Cambiar escala temporal"
            />
            <Label
              htmlFor="scale-toggle"
              className="cursor-pointer text-sm text-muted-foreground"
            >
              {scale === "linear" ? "Escala lineal" : "Escala adaptada"}
            </Label>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/50 px-3 py-2">
            <Switch
              id="scroll-toggle"
              checked={scrolledContainer}
              onCheckedChange={setScrolledContainer}
              aria-label="Usar contenedor scrolleable"
            />
            <Label
              htmlFor="scroll-toggle"
              className="cursor-pointer text-sm text-muted-foreground"
            >
              {scrolledContainer ? "Contenedor fijo" : "Scroll libre"}
            </Label>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-card/50 p-1">
            {[
              { value: "classic" as LayoutMode, label: "Clásico" },
              { value: "floating" as LayoutMode, label: "Flotante" },
              { value: "levitating" as LayoutMode, label: "Mamertino" },
            ].map((mode) => (
              <button
                key={mode.value}
                type="button"
                onClick={() => handleSetLayoutMode(mode.value)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                  layoutMode === mode.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-card/50 p-1">
            {[
              { value: "normal" as TimelineHeight, label: "Normal" },
              { value: "long" as TimelineHeight, label: "Larga" },
              { value: "extra" as TimelineHeight, label: "Muy larga" },
            ].map((height) => (
              <button
                key={height.value}
                type="button"
                onClick={() => handleSetTimelineHeight(height.value)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                  timelineHeight === height.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {height.label}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowAll((prev) => !prev);
              setVisibleCount(PAGE_SIZE);
              setCurrentIndex(0);
            }}
            className="gap-2 text-sm"
          >
            <Filter className="h-4 w-4" />
            {showAll
              ? "Solo con conferencias de Eva"
              : "Incluir pueblos sin conferencias"}
          </Button>
        </div>
      </div>

      <div
        ref={wrapperRef}
        onScroll={() => {
          if (!scrolledContainer || !wrapperRef.current) return;
          setScrollTop(wrapperRef.current.scrollTop);
          setWrapperHeight(wrapperRef.current.clientHeight);
        }}
        className={cn(
          "relative rounded-xl border border-border/60 bg-card/50 p-4 shadow-sm sm:p-6",
          scrolledContainer
            ? "h-[75vh] overflow-y-auto overflow-x-hidden sm:h-[80vh]"
            : "overflow-hidden"
        )}
      >
        <LayoutGroup id="population-timeline">
          {/* Year labels */}
        <div className="mb-4 flex justify-between text-sm font-medium text-muted-foreground sm:text-base">
          <span>{formatYear(MIN_YEAR)}</span>
          <span>{formatYear(MAX_YEAR)}</span>
        </div>

        <div className="relative" style={{ height: `${totalHeight}px` }}>
          {/* Central axis track */}
          <div
            className="absolute left-1/2 top-0 bottom-0 z-0 -translate-x-1/2 rounded-full bg-border/30"
            style={{ width: `${axisWidth}px` }}
          />

          {/* Colored period bands on the central timeline */}
          <div
            className="absolute left-1/2 top-0 bottom-0 z-0 -translate-x-1/2 opacity-100"
            style={{ width: `${axisWidth}px` }}
          >
            {laneBands.map(({ people, lane, top, height }, index) => {
              const laneLeft = lane * (LANE_WIDTH + LANE_GAP);
              return (
                <TooltipProvider key={`band-${people.id}`} delay={100}>
                  <Tooltip>
                    <TooltipTrigger
                      render={(triggerProps) => (
                        <div
                          {...triggerProps}
                          className={cn(
                            triggerProps.className,
                            "absolute top-0 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          )}
                          style={{
                            ...triggerProps.style,
                            top: `${top}px`,
                            height: `${height}px`,
                            width: `${LANE_WIDTH}px`,
                            left: `${laneLeft}px`,
                          }}
                          onClick={() => setSelectedPeople(people)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setSelectedPeople(people);
                            }
                          }}
                          aria-label={`${people.name}: ${formatYear(
                            people.startYear
                          )} — ${formatYear(
                            people.endYear
                          )}. Ver detalles y videos.`}
                        >
                          <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            whileHover={{ scaleX: 1.5 }}
                            transition={{
                              duration: 0.5,
                              delay: (index % PAGE_SIZE) * 0.03,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="h-full w-full origin-center rounded-full"
                            style={{
                              background: `linear-gradient(180deg, ${people.color} 0%, ${hexToRgba(
                                people.color,
                                0.75
                              )} 100%)`,
                              boxShadow: `0 0 10px ${hexToRgba(
                                people.color,
                                0.35
                              )}, inset 0 1px 0 ${hexToRgba(
                                "#ffffff",
                                0.25
                              )}`,
                            }}
                          />
                        </div>
                      )}
                    />
                    <TooltipContent
                      side="top"
                      align="center"
                      sideOffset={8}
                      className="max-w-xs bg-foreground px-3 py-2 text-background"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-semibold sm:text-base">
                          {people.name}
                        </p>
                        <p className="text-xs text-background/80 sm:text-sm">
                          {formatYear(people.startYear)} —{" "}
                          {formatYear(people.endYear)}
                        </p>
                        <p className="text-xs text-background/70 sm:text-sm">
                          Apogeo: {formatYear(people.peakYear)} ·{" "}
                          {people.region}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>

          {/* Axis ticks */}
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0">
            {ticks.map((year) => {
              const top = yearToPercent(year);
              if (top <= 0 || top >= 100) return null;
              return (
                <div
                  key={year}
                  className="absolute left-0 right-0 border-t border-dashed border-border/40"
                  style={{ top: `${(top / 100) * totalHeight}px` }}
                >
                  <span className="absolute -top-5 left-0 text-xs text-muted-foreground/70 sm:text-sm">
                    {formatYear(year)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* People cards — modo clásico */}
          {layoutMode === "classic" &&
            layout.map(({ people, top, side, width }, index) => {
              const isLeft = side === "left";
              const isExpanded = index === expandedIndex;
              const floatDuration = 3.5 + (index % 5) * 0.35;
              return (
                <motion.div
                  key={people.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={{
                    opacity: isExpanded ? 1 : 0.9,
                    x: 0,
                    y: [0, -4, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    x: { duration: 0.5, delay: (index % PAGE_SIZE) * 0.04 },
                    y: {
                      repeat: Infinity,
                      duration: floatDuration,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{ scale: 1.03, zIndex: 30 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  className="absolute w-[calc(50%-1.5rem)] origin-top sm:w-[calc(50%-2rem)]"
                  style={{
                    top: `${top}px`,
                    left: isLeft ? 0 : "auto",
                    right: isLeft ? "auto" : 0,
                  }}
                >
                  <PeopleCard
                    people={people}
                    widthPercent={width}
                    expanded={isExpanded}
                    onClick={() => setSelectedPeople(people)}
                    className={isExpanded ? "shadow-lg" : "shadow-sm"}
                  />
                </motion.div>
              );
            })}

          {/* People cards — modo flotante */}
          {layoutMode === "floating" &&
            floatingLayout.map(
              ({ people, top, leftPercent, widthPercent, floatPhase }, index) => {
                const isExpanded = index === expandedIndex;
                const floatDuration = 3 + floatPhase * 2;
                const offset = draggedOffsets[people.id] ?? { x: 0, y: 0 };
                return (
                  <motion.div
                    key={people.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    drag
                    dragConstraints={{
                      left: -40,
                      right: 40,
                      top: -30,
                      bottom: 30,
                    }}
                    dragElastic={0.25}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.05, zIndex: 50 }}
                    whileHover={{ zIndex: 50 }}
                    animate={{
                      x: offset.x,
                      y: offset.y,
                    }}
                    onTap={() => setSelectedPeople(people)}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex((prev) =>
                      prev === index ? null : prev
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={`${people.name}: ${formatYear(
                      people.startYear
                    )} — ${formatYear(
                      people.endYear
                    )}. Ver detalles y videos.`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedPeople(people);
                      }
                    }}
                    className="absolute z-10 origin-top"
                    style={{
                      top: `${top}px`,
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{
                        opacity: isExpanded ? 1 : 0.8,
                        scale: isExpanded ? 1.02 : 1,
                        y: isExpanded ? [0, -6, 0] : [0, -14, 0],
                      }}
                      transition={{
                        opacity: { duration: 0.3 },
                        scale: {
                          duration: 0.5,
                          delay: (index % PAGE_SIZE) * 0.04,
                        },
                        y: {
                          repeat: Infinity,
                          duration: floatDuration,
                          ease: "easeInOut",
                        },
                      }}
                      whileHover={{ scale: 1.05, y: 0, zIndex: 50 }}
                      className="h-full w-full"
                    >
                      <PeopleCard
                        people={people}
                        widthPercent={widthPercent}
                        expanded={isExpanded}
                        className={isExpanded ? "shadow-lg" : "shadow-sm"}
                      />
                    </motion.div>
                  </motion.div>
                );
              }
            )}

          {/* People cards — modo Mamertino */}
          {layoutMode === "levitating" &&
            mamertinoCards.map(
              ({ people, displayTop, leftPercent, widthPercent, peakCloseness, visibilityFactor, isFull }, index) => {
                const isHovered = index === hoveredIndex;
                const isExpanded = index === expandedIndex;
                const shouldShowFull =
                  isFull || isHovered || mamertinoCards.length < MAX_MAMERTINO_EXPANDED_CARDS;
                const offset = draggedOffsets[people.id] ?? { x: 0, y: 0 };
                return (
                  <motion.div
                    key={people.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    drag
                    dragConstraints={{
                      left: -120,
                      right: 120,
                      top: -120,
                      bottom: 120,
                    }}
                    dragElastic={0.2}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.05, zIndex: 50 }}
                    whileHover={{ zIndex: 100 }}
                    onDragStart={() => {
                      mamertinoDraggingMapRef.current.set(people.id, true);
                    }}
                    onDragEnd={(_, info) => {
                      setDraggedOffsets((prev) => ({
                        ...prev,
                        [people.id]: {
                          x: (prev[people.id]?.x ?? 0) + info.offset.x,
                          y: (prev[people.id]?.y ?? 0) + info.offset.y,
                        },
                      }));
                      setTimeout(() => {
                        mamertinoDraggingMapRef.current.set(people.id, false);
                      }, 80);
                    }}
                    animate={{
                      top: displayTop,
                      x: offset.x,
                      y: offset.y,
                      opacity: isHovered
                        ? 1
                        : visibilityFactor * (0.55 + peakCloseness * 0.45),
                      scale: shouldShowFull ? 1 : 0.92 + peakCloseness * 0.08,
                    }}
                    transition={{
                      top: { duration: 0.45, ease: "easeOut" },
                      x: { duration: 0.2 },
                      y: { duration: 0.2 },
                      opacity: { duration: 0.35 },
                      scale: { duration: 0.35 },
                    }}
                    onTap={() => {
                      if (mamertinoDraggingMapRef.current.get(people.id)) return;
                      setSelectedPeople(people);
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex((prev) =>
                      prev === index ? null : prev
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={`${people.name}: ${formatYear(
                      people.startYear
                    )} — ${formatYear(
                      people.endYear
                    )}. Ver detalles y videos.`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedPeople(people);
                      }
                    }}
                    className="absolute z-10 origin-top cursor-grab active:cursor-grabbing"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  >
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{
                        opacity: isExpanded ? 1 : 0.9,
                      }}
                      transition={{
                        opacity: { duration: 0.3 },
                        layout: { duration: 0.4, ease: "easeOut" },
                      }}
                      whileHover={{ scale: 1.03, zIndex: 50 }}
                      className="h-full w-full"
                    >
                      {shouldShowFull ? (
                        <PeopleCard
                          people={people}
                          widthPercent={widthPercent}
                          expanded={isExpanded}
                          hovered={isHovered}
                          className={isExpanded ? "shadow-lg" : "shadow-sm"}
                          variant="mamertino"
                        />
                      ) : (
                        <PeopleCardCompact
                          people={people}
                          leftPercent={0}
                          widthPercent={100}
                          onSelect={(people) => setSelectedPeople(people)}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                );
              }
            )}

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div
              ref={setSentinel}
              className="absolute left-0 right-0 h-4"
              style={{ top: `${totalHeight}px` }}
            />
          )}
        </div>

        {/* Load more button */}
        {hasMore && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={loadMore}
              className="gap-2 text-sm"
            >
              Ver más
              <span className="text-muted-foreground">
                ({remainingCount} restantes)
              </span>
            </Button>
          </div>
        )}

        </LayoutGroup>
      </div>

      {/* Floating navigation */}
      <TimelineNavigation
        currentIndex={currentIndex}
        totalItems={visiblePeoples.length}
        onGoStart={goStart}
        onGoEnd={goEnd}
        onGoPrev={goPrev}
        onGoNext={goNext}
      />

      {/* Legend */}
      {legend.length > 0 && (
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground sm:text-base">
            Regiones
          </p>
          <div className="flex flex-wrap gap-2">
            {legend.map(([region, { color, count }]) => (
              <div
                key={region}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-2.5 py-1 text-sm"
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
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Los valores de población son estimaciones históricas aproximadas.
            El ancho de cada franja se calcula con una escala de raíz cuadrada
            para que pueblos muy grandes no oculten a los más pequeños.
          </p>
        </div>
      )}

      <PeopleDetailDialog
        people={selectedPeople}
        conferencesMap={conferencesMap}
        open={selectedPeople !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedPeople(null);
        }}
        onSelectVideo={setSelectedVideo}
        isAuthenticated={isAuthenticated}
        togglingId={togglingId}
        onToggleWatched={handleToggleWatched}
        onToggleFavorite={handleToggleFavorite}
        onToggleWatchlist={handleToggleWatchlist}
        isWatched={isWatched}
        isFavorite={isFavorite}
        isWatchlist={isWatchlist}
      />

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
    </div>
  );
}
