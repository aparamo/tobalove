"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoCard } from "./VideoCard";
import { VideoPlayerSheet } from "./VideoPlayerSheet";
import { toggleWatchedConference } from "@/app/actions/watched";
import {
  toggleFavoriteConference,
  toggleWatchlistConference,
} from "@/app/actions/videos";
import { toast } from "sonner";
import type {
  ConferenceItem,
  TimelineEvent,
  PeopleGroup,
} from "@/app/types/timeline";

type SortOption = "date-asc" | "date-desc" | "title-asc" | "title-desc";

const PAGE_SIZE = 12;

interface VideoCompanionProps {
  videos: ConferenceItem[];
  events: TimelineEvent[];
  peoples: PeopleGroup[];
  watchedIds: Set<string>;
  favoriteIds: Set<string>;
  watchlistIds: Set<string>;
  isAuthenticated: boolean;
}

export function VideoCompanion({
  videos,
  events,
  peoples,
  watchedIds: initialWatchedIds,
  favoriteIds: initialFavoriteIds,
  watchlistIds: initialWatchlistIds,
  isAuthenticated,
}: VideoCompanionProps) {
  const [search, setSearch] = useState("");
  const [selectedCiv, setSelectedCiv] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<ConferenceItem | null>(null);
  const [watchedIds, setWatchedIds] = useState<Set<string>>(initialWatchedIds);
  const [favoriteIds, setFavoriteIds] =
    useState<Set<string>>(initialFavoriteIds);
  const [watchlistIds, setWatchlistIds] =
    useState<Set<string>>(initialWatchlistIds);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("date-asc");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const loadingMoreRef = useRef(false);

  const eventsByConf = useMemo(() => {
    const map = new Map<string, TimelineEvent[]>();
    for (const ev of events) {
      for (const cid of ev.relatedConferences) {
        const list = map.get(cid) ?? [];
        list.push(ev);
        map.set(cid, list);
      }
    }
    return map;
  }, [events]);

  const peoplesByConf = useMemo(() => {
    const map = new Map<string, PeopleGroup[]>();
    for (const p of peoples) {
      for (const cid of p.relatedConferences) {
        const list = map.get(cid) ?? [];
        list.push(p);
        map.set(cid, list);
      }
    }
    return map;
  }, [peoples]);

  const allCivilizations = useMemo(() => {
    const set = new Set<string>();
    for (const v of videos) {
      for (const c of v.civilizations) set.add(c);
    }
    return Array.from(set).sort();
  }, [videos]);

  const allTopics = useMemo(() => {
    const set = new Set<string>();
    for (const v of videos) {
      for (const t of v.topics) set.add(t);
    }
    return Array.from(set).sort();
  }, [videos]);

  const filteredVideos = useMemo(() => {
    const term = search.toLowerCase().trim();
    return videos.filter((v) => {
      const matchesSearch =
        !term ||
        v.title.toLowerCase().includes(term) ||
        v.description.toLowerCase().includes(term) ||
        v.summary.toLowerCase().includes(term) ||
        v.characters.some((c) => c.toLowerCase().includes(term)) ||
        v.topics.some((t) => t.toLowerCase().includes(term));
      const matchesCiv = !selectedCiv || v.civilizations.includes(selectedCiv);
      const matchesTopic = !selectedTopic || v.topics.includes(selectedTopic);
      return matchesSearch && matchesCiv && matchesTopic;
    });
  }, [videos, search, selectedCiv, selectedTopic]);

  const sortedVideos = useMemo(() => {
    function getHistoricalStartYear(confId: string): number | null {
      const relatedEvents = eventsByConf.get(confId) ?? [];
      if (relatedEvents.length === 0) return null;
      return Math.min(...relatedEvents.map((ev) => ev.startYear));
    }

    const sorted = [...filteredVideos];
    switch (sortBy) {
      case "date-asc":
        return sorted.sort(
          (a, b) =>
            (getHistoricalStartYear(a.id) ?? Infinity) -
            (getHistoricalStartYear(b.id) ?? Infinity)
        );
      case "date-desc":
        return sorted.sort(
          (a, b) =>
            (getHistoricalStartYear(b.id) ?? -Infinity) -
            (getHistoricalStartYear(a.id) ?? -Infinity)
        );
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  }, [filteredVideos, sortBy, eventsByConf]);

  const visibleVideos = sortedVideos.slice(0, visibleCount);
  const hasMore = visibleCount < sortedVideos.length;

  function resetPagination() {
    setVisibleCount(PAGE_SIZE);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    resetPagination();
  }

  function handleCivChange(civ: string) {
    setSelectedCiv((prev) => (prev === civ ? null : civ));
    resetPagination();
  }

  function handleTopicChange(topic: string) {
    setSelectedTopic((prev) => (prev === topic ? null : topic));
    resetPagination();
  }

  function handleSortChange(value: SortOption) {
    setSortBy(value);
    resetPagination();
  }

  function handleClearFilters() {
    setSearch("");
    setSelectedCiv(null);
    setSelectedTopic(null);
    setSortBy("date-asc");
    resetPagination();
  }

  function handleLoadMore() {
    if (loadingMoreRef.current || !hasMore) return;
    loadingMoreRef.current = true;
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, sortedVideos.length));
    requestAnimationFrame(() => {
      loadingMoreRef.current = false;
    });
  }

  async function handleToggleWatched(conferenceId: string) {
    if (!isAuthenticated || togglingId) return;
    const wasWatched = watchedIds.has(conferenceId);
    setTogglingId(conferenceId);
    try {
      await toggleWatchedConference(conferenceId);
      setWatchedIds((prev) => {
        const next = new Set(prev);
        if (next.has(conferenceId)) {
          next.delete(conferenceId);
        } else {
          next.add(conferenceId);
        }
        return next;
      });
      toast.success(
        wasWatched ? "Marcado como no visto" : "Marcado como visto"
      );
    } catch {
      toast.error("No se pudo actualizar el estado de visto");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleToggleFavorite(conferenceId: string) {
    if (!isAuthenticated || togglingId) return;
    const wasFavorite = favoriteIds.has(conferenceId);
    setTogglingId(conferenceId);
    try {
      await toggleFavoriteConference(conferenceId);
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (next.has(conferenceId)) {
          next.delete(conferenceId);
        } else {
          next.add(conferenceId);
        }
        return next;
      });
      toast.success(
        wasFavorite ? "Eliminado de favoritos" : "Añadido a favoritos"
      );
    } catch {
      toast.error("No se pudo actualizar favoritos");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleToggleWatchlist(conferenceId: string) {
    if (!isAuthenticated || togglingId) return;
    const wasWatchlist = watchlistIds.has(conferenceId);
    setTogglingId(conferenceId);
    try {
      await toggleWatchlistConference(conferenceId);
      setWatchlistIds((prev) => {
        const next = new Set(prev);
        if (next.has(conferenceId)) {
          next.delete(conferenceId);
        } else {
          next.add(conferenceId);
        }
        return next;
      });
      toast.success(
        wasWatchlist
          ? "Eliminado de la lista de siguientes"
          : "Añadido a la lista de siguientes"
      );
    } catch {
      toast.error("No se pudo actualizar la lista de siguientes");
    } finally {
      setTogglingId(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header and filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar por título, personaje, tema..."
            className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {search && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {allCivilizations.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Civilizaciones
              </span>
              {allCivilizations.map((civ) => (
                <button
                  key={civ}
                  onClick={() => handleCivChange(civ)}
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    selectedCiv === civ
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/60 bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {civ}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Ordenar
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                aria-label="Ordenar videos"
                className="appearance-none rounded-lg border border-border/60 bg-background py-2 pl-3 pr-8 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="date-asc">Fecha: antiguas → recientes</option>
                <option value="date-desc">Fecha: recientes → antiguas</option>
                <option value="title-asc">Título: A-Z</option>
                <option value="title-desc">Título: Z-A</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {allTopics.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Temas
            </span>
            {allTopics.slice(0, 20).map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicChange(topic)}
                className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  selectedTopic === topic
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/60 bg-background text-foreground hover:bg-muted"
                }`}
              >
                {topic}
              </button>
            ))}
            {allTopics.length > 20 && (
              <span className="text-xs text-muted-foreground">
                +{allTopics.length - 20} más
              </span>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Mostrando {visibleVideos.length} de {filteredVideos.length} videos
          {filteredVideos.length !== videos.length && ` (filtrados de ${videos.length})`}
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {visibleVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              conference={video}
              relatedEvents={
                eventsByConf
                  .get(video.id)
                  ?.map((ev) => ({ id: ev.id, title: ev.title })) ?? []
              }
              relatedPeoples={
                peoplesByConf
                  .get(video.id)
                  ?.map((p) => ({ id: p.id, name: p.name })) ?? []
              }
              onSelect={setSelectedVideo}
              index={index}
              isWatched={watchedIds.has(video.id)}
              onToggleWatched={handleToggleWatched}
              isFavorite={favoriteIds.has(video.id)}
              onToggleFavorite={handleToggleFavorite}
              isWatchlist={watchlistIds.has(video.id)}
              onToggleWatchlist={handleToggleWatchlist}
              isAuthenticated={isAuthenticated}
              togglingId={togglingId}
              mode="link"
            />
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <motion.div
          onViewportEnter={handleLoadMore}
          viewport={{ once: false, amount: 0, margin: "200px" }}
          className="flex items-center justify-center py-8"
          aria-hidden="true"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </motion.div>
      )}

      {filteredVideos.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground">
            No se encontraron videos con los filtros actuales.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={handleClearFilters}
          >
            Limpiar filtros
          </Button>
        </div>
      )}

      <VideoPlayerSheet
        selectedVideo={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isWatched={selectedVideo ? watchedIds.has(selectedVideo.id) : false}
        isFavorite={selectedVideo ? favoriteIds.has(selectedVideo.id) : false}
        isWatchlist={selectedVideo ? watchlistIds.has(selectedVideo.id) : false}
        isAuthenticated={isAuthenticated}
        onToggleWatched={handleToggleWatched}
        onToggleFavorite={handleToggleFavorite}
        onToggleWatchlist={handleToggleWatchlist}
        togglingId={togglingId}
      />
    </div>
  );
}
