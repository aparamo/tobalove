"use client";

import { useState, useCallback } from "react";
import { toggleWatchedConference } from "@/app/actions/watched";
import {
  toggleFavoriteConference,
  toggleWatchlistConference,
} from "@/app/actions/videos";
import { toast } from "sonner";

export interface UseVideoActionsOptions {
  watchedIds: Set<string>;
  favoriteIds: Set<string>;
  watchlistIds: Set<string>;
  isAuthenticated: boolean;
}

export type ToggleType = "watched" | "favorite" | "watchlist";

export function useVideoActions({
  watchedIds: initialWatchedIds,
  favoriteIds: initialFavoriteIds,
  watchlistIds: initialWatchlistIds,
  isAuthenticated,
}: UseVideoActionsOptions) {
  const [watchedIds, setWatchedIds] = useState<Set<string>>(initialWatchedIds);
  const [favoriteIds, setFavoriteIds] =
    useState<Set<string>>(initialFavoriteIds);
  const [watchlistIds, setWatchlistIds] =
    useState<Set<string>>(initialWatchlistIds);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const toggleOne = useCallback(
    async (conferenceId: string, type: ToggleType) => {
      if (!isAuthenticated || togglingId) return false;

      setTogglingId(conferenceId);
      try {
        switch (type) {
          case "watched": {
            const wasWatched = watchedIds.has(conferenceId);
            await toggleWatchedConference(conferenceId);
            setWatchedIds((prev) => {
              const next = new Set(prev);
              if (next.has(conferenceId)) next.delete(conferenceId);
              else next.add(conferenceId);
              return next;
            });
            toast.success(
              wasWatched ? "Marcado como no visto" : "Marcado como visto"
            );
            break;
          }
          case "favorite": {
            const wasFavorite = favoriteIds.has(conferenceId);
            await toggleFavoriteConference(conferenceId);
            setFavoriteIds((prev) => {
              const next = new Set(prev);
              if (next.has(conferenceId)) next.delete(conferenceId);
              else next.add(conferenceId);
              return next;
            });
            toast.success(
              wasFavorite
                ? "Eliminado de favoritos"
                : "Añadido a favoritos"
            );
            break;
          }
          case "watchlist": {
            const wasWatchlist = watchlistIds.has(conferenceId);
            await toggleWatchlistConference(conferenceId);
            setWatchlistIds((prev) => {
              const next = new Set(prev);
              if (next.has(conferenceId)) next.delete(conferenceId);
              else next.add(conferenceId);
              return next;
            });
            toast.success(
              wasWatchlist
                ? "Eliminado de la lista de siguientes"
                : "Añadido a la lista de siguientes"
            );
            break;
          }
        }
        return true;
      } catch {
        toast.error("No se pudo actualizar el video");
        return false;
      } finally {
        setTogglingId(null);
      }
    },
    [isAuthenticated, togglingId, watchedIds, favoriteIds, watchlistIds]
  );

  const handleToggleWatched = useCallback(
    (conferenceId: string) => toggleOne(conferenceId, "watched"),
    [toggleOne]
  );
  const handleToggleFavorite = useCallback(
    (conferenceId: string) => toggleOne(conferenceId, "favorite"),
    [toggleOne]
  );
  const handleToggleWatchlist = useCallback(
    (conferenceId: string) => toggleOne(conferenceId, "watchlist"),
    [toggleOne]
  );

  return {
    watchedIds,
    favoriteIds,
    watchlistIds,
    togglingId,
    handleToggleWatched,
    handleToggleFavorite,
    handleToggleWatchlist,
    isWatched: useCallback(
      (id: string) => watchedIds.has(id),
      [watchedIds]
    ),
    isFavorite: useCallback(
      (id: string) => favoriteIds.has(id),
      [favoriteIds]
    ),
    isWatchlist: useCallback(
      (id: string) => watchlistIds.has(id),
      [watchlistIds]
    ),
  };
}
