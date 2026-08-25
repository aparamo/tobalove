"use client";

import Image from "next/image";
import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "@/lib/timeline";
import { cn } from "@/lib/utils";
import { TimelineNavigation } from "./TimelineNavigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type {
  PeopleGroup,
  ConferenceItem,
  LayoutMode,
} from "@/app/types/timeline";

interface VerticalPopulationTimelineProps {
  peoples: PeopleGroup[];
  conferencesMap?: Map<string, ConferenceItem>;
}

const PAGE_SIZE = 10;
const CONTAINER_HEIGHT = 1600;
const CARD_HEIGHT = 104;
const MIN_GAP = 20;

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
  yearToPercent: (year: number) => number
): LayoutItem[] {
  const sorted = [...peoples].sort((a, b) => a.peakYear - b.peakYear);
  const items: LayoutItem[] = [];
  let lastBottom = -Infinity;

  for (let i = 0; i < sorted.length; i++) {
    const people = sorted[i];
    const baseTop = (yearToPercent(people.peakYear) / 100) * CONTAINER_HEIGHT;
    const top = Math.max(baseTop, lastBottom + MIN_GAP);
    lastBottom = top + CARD_HEIGHT;

    items.push({
      people,
      top,
      side: i % 2 === 0 ? "right" : "left",
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
}: {
  conference: ConferenceItem;
}) {
  const youtubeUrl = getYouTubeUrl(conference);
  const videoId = getYouTubeId(youtubeUrl);
  const resourceUrl = youtubeUrl ?? conference.url;
  const mediaType = getMediaType(resourceUrl);

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/50 p-3 transition-colors hover:bg-card">
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
        {resourceUrl && (
          <a
            href={resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {videoId ? "Ver en YouTube" : "Ver recurso"}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      {videoId && (
        <div className="hidden shrink-0 sm:block">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-16 w-28 overflow-hidden rounded-md bg-muted"
          >
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
          </a>
        </div>
      )}
    </div>
  );
}

interface PeopleCardProps {
  people: PeopleGroup;
  widthPercent: number;
  expanded: boolean;
  onClick: () => void;
  className?: string;
}

function PeopleCard({
  people,
  widthPercent,
  expanded,
  onClick,
  className,
}: PeopleCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:shadow-md",
        expanded ? "bg-card/95" : "bg-card/75",
        className
      )}
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
        <div className="flex items-center justify-between text-[10px] text-muted-foreground sm:text-xs">
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
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {people.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function PeopleDetailDialog({
  people,
  conferencesMap,
  open,
  onOpenChange,
}: {
  people: PeopleGroup | null;
  conferencesMap?: Map<string, ConferenceItem>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
                      <RelatedVideoCard key={conf.id} conference={conf} />
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
}: VerticalPopulationTimelineProps) {
  const [selectedPeople, setSelectedPeople] = useState<PeopleGroup | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState<TimelineScale>("adapted");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("classic");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const layout = useMemo(() => {
    return layoutPeoples(visiblePeoples, maxPopulation, yearToPercent);
  }, [visiblePeoples, maxPopulation, yearToPercent]);

  const floatingLayout = useMemo(() => {
    return layoutFloatingPeoples(
      visiblePeoples,
      maxPopulation,
      yearToPercent,
      CONTAINER_HEIGHT,
      CARD_HEIGHT,
      MIN_GAP
    );
  }, [visiblePeoples, maxPopulation, yearToPercent]);

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
        { rootMargin: "200px" }
      );

      observerRef.current.observe(node);
    },
    [hasMore, loadMore]
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, visiblePeoples.length - 1));
      setCurrentIndex(clamped);

      const element = itemRefs.current[clamped];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      // Fallback: calculamos la posición desde el layout actual.
      const layoutItem =
        layoutMode === "floating"
          ? floatingLayout[clamped]
          : layout[clamped];
      if (!layoutItem || !wrapperRef.current) return;

      const wrapperTop =
        wrapperRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: wrapperTop + layoutItem.top - window.innerHeight / 3,
        behavior: "smooth",
      });
    },
    [floatingLayout, layout, layoutMode, visiblePeoples.length]
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

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (activeObserverRef.current) activeObserverRef.current.disconnect();
    };
  }, []);

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
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((el) => {
      if (el) activeObserverRef.current?.observe(el);
    });

    return () => activeObserverRef.current?.disconnect();
  }, [visiblePeoples, scale, layoutMode]);

  const legend = useRegionLegend(filteredPeoples);

  const ticks = useMemo(() => {
    const list: number[] = [];
    for (let year = MIN_YEAR; year <= MAX_YEAR; year += 1000) {
      list.push(year);
    }
    return list;
  }, []);

  const totalHeight = useMemo(() => {
    if (layout.length === 0) return CONTAINER_HEIGHT;
    const last = layout[layout.length - 1];
    return Math.max(CONTAINER_HEIGHT, last.top + CARD_HEIGHT + MIN_GAP);
  }, [layout]);

  const { bands: laneBands, laneCount } = useMemo(() => {
    return computeLaneBands(visiblePeoples, totalHeight, yearToPercent);
  }, [visiblePeoples, totalHeight, yearToPercent]);

  const axisWidth = Math.max(2, laneCount * LANE_WIDTH + (laneCount - 1) * LANE_GAP);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
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
                setScale(checked ? "linear" : "adapted")
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

          <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-card/50 p-1">
            {[
              { value: "classic" as LayoutMode, label: "Clásico" },
              { value: "floating" as LayoutMode, label: "Flotante" },
              { value: "levitating" as LayoutMode, label: "Levitación" },
            ].map((mode) => (
              <button
                key={mode.value}
                type="button"
                onClick={() => setLayoutMode(mode.value)}
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
        className="relative overflow-hidden rounded-xl border border-border/60 bg-card/50 p-4 shadow-sm sm:p-6"
      >
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

          {/* Center dots for each item (clásico y levitación) */}
          {layoutMode !== "floating" &&
            layout.map(({ people, top }, index) => (
              <motion.div
                key={`dot-${people.id}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: (index % PAGE_SIZE) * 0.04,
                }}
                className="absolute left-1/2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-sm"
                style={{ top: `${top + CARD_HEIGHT / 2 - 6}px` }}
              />
            ))}

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

          {/* People cards — modo levitación */}
          {layoutMode === "levitating" &&
            layout.map(({ people, top, side, width }, index) => {
              const isLeft = side === "left";
              const isExpanded = index === expandedIndex;
              const floatDuration = 2.8 + (index % 5) * 0.4;
              return (
                <motion.div
                  key={people.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={{
                    opacity: isExpanded ? 1 : 0.85,
                    x: 0,
                    y: [0, -10, 0],
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
                  whileHover={{ scale: 1.04, zIndex: 50 }}
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
                return (
                  <motion.div
                    key={people.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: isExpanded ? 1 : 0.85,
                      scale: 1,
                      y: [0, -12, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      scale: {
                        duration: 0.5,
                        delay: (index % PAGE_SIZE) * 0.04,
                      },
                      y: {
                        repeat: Infinity,
                        duration: 2.5 + floatPhase * 2,
                        ease: "easeInOut",
                      },
                    }}
                    whileHover={{ scale: 1.05, zIndex: 50 }}
                    whileDrag={{ scale: 1.05, zIndex: 50 }}
                    drag
                    dragConstraints={{
                      left: -40,
                      right: 40,
                      top: -30,
                      bottom: 30,
                    }}
                    dragElastic={0.25}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                    className="absolute z-10 origin-top"
                    style={{
                      top: `${top}px`,
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  >
                    <PeopleCard
                      people={people}
                      widthPercent={widthPercent}
                      expanded={isExpanded}
                      onClick={() => setSelectedPeople(people)}
                      className={isExpanded ? "shadow-lg" : "shadow-sm"}
                    />
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
      />
    </div>
  );
}
