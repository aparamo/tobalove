"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Play, Calendar, Building2, Clock, Users, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VideoCard } from "./VideoCard";
import { getYouTubeId, getYouTubeUrl } from "@/lib/media";
import type {
  ConferenceItem,
  TimelineEvent,
  PeopleGroup,
} from "@/app/types/timeline";

interface VideoCompanionProps {
  videos: ConferenceItem[];
  events: TimelineEvent[];
  peoples: PeopleGroup[];
}

export function VideoCompanion({ videos, events, peoples }: VideoCompanionProps) {
  const [search, setSearch] = useState("");
  const [selectedCiv, setSelectedCiv] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<ConferenceItem | null>(null);

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

  const selectedVideoId = selectedVideo
    ? getYouTubeId(getYouTubeUrl(selectedVideo))
    : null;

  return (
    <div className="space-y-8">
      {/* Header and filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título, personaje, tema..."
            className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="space-y-3">
          {allCivilizations.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Civilizaciones
              </span>
              {allCivilizations.map((civ) => (
                <button
                  key={civ}
                  onClick={() =>
                    setSelectedCiv((prev) => (prev === civ ? null : civ))
                  }
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

          {allTopics.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Temas
              </span>
              {allTopics.slice(0, 20).map((topic) => (
                <button
                  key={topic}
                  onClick={() =>
                    setSelectedTopic((prev) => (prev === topic ? null : topic))
                  }
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
        </div>

        <p className="text-sm text-muted-foreground">
          Mostrando {filteredVideos.length} de {videos.length} videos
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredVideos.map((video, index) => (
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
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredVideos.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground">
            No se encontraron videos con los filtros actuales.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearch("");
              setSelectedCiv(null);
              setSelectedTopic(null);
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* Sheet player */}
      <Sheet open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <SheetContent side="right" className="w-full sm:max-w-xl">
          {selectedVideo && selectedVideoId && (
            <>
              <SheetHeader>
                <SheetTitle className="line-clamp-2 pr-8">
                  {selectedVideo.title}
                </SheetTitle>
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

              <div className="space-y-5 px-4 pb-6">
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideoId}`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>

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
                  href={getYouTubeUrl(selectedVideo) ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  <Play className="h-4 w-4" />
                  Ver en YouTube
                </a>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
