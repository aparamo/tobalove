"use client";

import { motion } from "framer-motion";
import { Play, Calendar, Building2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getYouTubeId, getYouTubeUrl } from "@/lib/media";
import type { ConferenceItem } from "@/app/types/timeline";

interface VideoCardProps {
  conference: ConferenceItem;
  relatedEvents: { id: string; title: string }[];
  relatedPeoples: { id: string; name: string }[];
  onSelect: (conference: ConferenceItem) => void;
  index: number;
}

export function VideoCard({
  conference,
  relatedEvents,
  relatedPeoples,
  onSelect,
  index,
}: VideoCardProps) {
  const youtubeUrl = getYouTubeUrl(conference);
  const videoId = getYouTubeId(youtubeUrl);
  if (!videoId) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md"
      onClick={() => onSelect(conference)}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt={conference.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 fill-current" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
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
