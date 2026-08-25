"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Play,
  Calendar,
  Building2,
  Clock,
  Eye,
  EyeOff,
  Heart,
  Bookmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getYouTubeId, getYouTubeUrl } from "@/lib/media";
import type { ConferenceItem } from "@/app/types/timeline";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  conference: ConferenceItem;
  relatedEvents: { id: string; title: string }[];
  relatedPeoples: { id: string; name: string }[];
  onSelect: (conference: ConferenceItem) => void;
  index: number;
  isWatched?: boolean;
  onToggleWatched?: (conferenceId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (conferenceId: string) => void;
  isWatchlist?: boolean;
  onToggleWatchlist?: (conferenceId: string) => void;
  isAuthenticated?: boolean;
}

interface ActionButtonProps {
  active: boolean;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  activeTooltip: string;
  inactiveTooltip: string;
  activeClass?: string;
  onClick: () => void;
}

function ActionButton({
  active,
  activeIcon,
  inactiveIcon,
  activeTooltip,
  inactiveTooltip,
  activeClass = "text-primary",
  onClick,
}: ActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={(triggerProps) => (
          <button
            {...triggerProps}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background"
          >
            <span
              className={cn(
                "h-3.5 w-3.5",
                active ? activeClass : "text-muted-foreground"
              )}
            >
              {active ? activeIcon : inactiveIcon}
            </span>
          </button>
        )}
      />
      <TooltipContent side="top">
        <p>{active ? activeTooltip : inactiveTooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function VideoCard({
  conference,
  relatedEvents,
  relatedPeoples,
  onSelect,
  index,
  isWatched,
  onToggleWatched,
  isFavorite,
  onToggleFavorite,
  isWatchlist,
  onToggleWatchlist,
  isAuthenticated,
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
        <Image
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt={conference.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 fill-current" />
          </div>
        </div>
        {isAuthenticated && (
          <div className="absolute right-2 top-2 flex flex-col gap-1.5">
            {onToggleFavorite && (
              <ActionButton
                active={!!isFavorite}
                activeIcon={<Heart className="h-3.5 w-3.5 fill-current" />}
                inactiveIcon={<Heart className="h-3.5 w-3.5" />}
                activeTooltip="Quitar de favoritos"
                inactiveTooltip="Añadir a favoritos"
                activeClass="text-red-500"
                onClick={() => onToggleFavorite(conference.id)}
              />
            )}
            {onToggleWatchlist && (
              <ActionButton
                active={!!isWatchlist}
                activeIcon={<Bookmark className="h-3.5 w-3.5 fill-current" />}
                inactiveIcon={<Bookmark className="h-3.5 w-3.5" />}
                activeTooltip="Quitar de siguientes"
                inactiveTooltip="Añadir a siguientes"
                activeClass="text-amber-500"
                onClick={() => onToggleWatchlist(conference.id)}
              />
            )}
            {onToggleWatched && (
              <ActionButton
                active={!!isWatched}
                activeIcon={<Eye className="h-3.5 w-3.5" />}
                inactiveIcon={<EyeOff className="h-3.5 w-3.5" />}
                activeTooltip="Marcar como no visto"
                inactiveTooltip="Marcar como visto"
                activeClass="text-primary"
                onClick={() => onToggleWatched(conference.id)}
              />
            )}
          </div>
        )}
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
