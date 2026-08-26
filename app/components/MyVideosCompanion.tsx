"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Heart, Eye, Bookmark, PlaySquare } from "lucide-react";
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

type TabKey = "all" | "unwatched" | "watched" | "watchlist" | "favorites";

interface TabConfig {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabConfig[] = [
  { key: "all", label: "Todos", icon: <PlaySquare className="h-4 w-4" /> },
  { key: "unwatched", label: "No vistos", icon: <Eye className="h-4 w-4" /> },
  { key: "watched", label: "Vistos", icon: <Eye className="h-4 w-4" /> },
  {
    key: "watchlist",
    label: "Siguientes",
    icon: <Bookmark className="h-4 w-4" />,
  },
  {
    key: "favorites",
    label: "Favoritos",
    icon: <Heart className="h-4 w-4" />,
  },
];

const PAGE_SIZE = 12;

interface MyVideosCompanionProps {
  videos: ConferenceItem[];
  events: TimelineEvent[];
  peoples: PeopleGroup[];
  watchedIds: Set<string>;
  favoriteIds: Set<string>;
  watchlistIds: Set<string>;
}

export function MyVideosCompanion({
  videos,
  events,
  peoples,
  watchedIds: initialWatchedIds,
  favoriteIds: initialFavoriteIds,
  watchlistIds: initialWatchlistIds,
}: MyVideosCompanionProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [selectedVideo, setSelectedVideo] = useState<ConferenceItem | null>(null);
  const [watchedIds, setWatchedIds] = useState<Set<string>>(initialWatchedIds);
  const [favoriteIds, setFavoriteIds] =
    useState<Set<string>>(initialFavoriteIds);
  const [watchlistIds, setWatchlistIds] =
    useState<Set<string>>(initialWatchlistIds);
  const [togglingId, setTogglingId] = useState<string | null>(null);
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

  const filteredVideos = useMemo(() => {
    const term = search.toLowerCase().trim();
    const byTab = (() => {
      switch (activeTab) {
        case "unwatched":
          return videos.filter((v) => !watchedIds.has(v.id));
        case "watched":
          return videos.filter((v) => watchedIds.has(v.id));
        case "watchlist":
          return videos.filter((v) => watchlistIds.has(v.id));
        case "favorites":
          return videos.filter((v) => favoriteIds.has(v.id));
        default:
          return videos;
      }
    })();
    return byTab.filter((v) => {
      if (!term) return true;
      return (
        v.title.toLowerCase().includes(term) ||
        v.description.toLowerCase().includes(term) ||
        v.summary.toLowerCase().includes(term) ||
        v.characters.some((c) => c.toLowerCase().includes(term)) ||
        v.topics.some((t) => t.toLowerCase().includes(term)) ||
        v.civilizations.some((c) => c.toLowerCase().includes(term))
      );
    });
  }, [videos, search, activeTab, watchedIds, favoriteIds, watchlistIds]);

  const visibleVideos = filteredVideos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVideos.length;

  function resetPagination() {
    setVisibleCount(PAGE_SIZE);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    resetPagination();
  }

  function handleTabChange(tab: TabKey) {
    setActiveTab(tab);
    resetPagination();
  }

  function handleLoadMore() {
    if (loadingMoreRef.current || !hasMore) return;
    loadingMoreRef.current = true;
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredVideos.length));
    requestAnimationFrame(() => {
      loadingMoreRef.current = false;
    });
  }

  async function handleToggleWatched(conferenceId: string) {
    if (togglingId) return;
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
    if (togglingId) return;
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
    if (togglingId) return;
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

  const emptyMessages: Record<TabKey, string> = {
    all: "No hay videos disponibles.",
    unwatched: "¡Felicidades! Has visto todos los videos.",
    watched: "Aún no has marcado ningún video como visto.",
    watchlist: "Aún no tienes videos en tu lista de siguientes.",
    favorites: "Aún no tienes favoritos. Explora /videos para añadir algunos.",
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar en mis videos..."
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

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Mis listas
          </span>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                activeTab === tab.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-background text-foreground hover:bg-muted"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Mostrando {visibleVideos.length} de {filteredVideos.length} videos
        </p>
      </div>

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
              isAuthenticated
              togglingId={togglingId}
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
          <p className="text-muted-foreground">{emptyMessages[activeTab]}</p>
          {search && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => handleSearchChange("")}
            >
              Limpiar búsqueda
            </Button>
          )}
        </div>
      )}

      <VideoPlayerSheet
        selectedVideo={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isWatched={selectedVideo ? watchedIds.has(selectedVideo.id) : false}
        isFavorite={selectedVideo ? favoriteIds.has(selectedVideo.id) : false}
        isWatchlist={selectedVideo ? watchlistIds.has(selectedVideo.id) : false}
        isAuthenticated
        onToggleWatched={handleToggleWatched}
        onToggleFavorite={handleToggleFavorite}
        onToggleWatchlist={handleToggleWatchlist}
        togglingId={togglingId}
      />
    </div>
  );
}
