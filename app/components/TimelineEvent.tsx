"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, BookOpen, ExternalLink, Play } from "lucide-react";
import type { TimelineEvent as TimelineEventType } from "@/app/types/timeline";

interface TimelineEventProps {
  event: TimelineEventType;
  index: number;
  side: "left" | "right";
}

function getYouTubeId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.25 }}
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
      <div className="p-3">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Play className="h-3 w-3" />
          Conferencia de referencia
        </p>
      </div>
    </motion.div>
  );
}

export function TimelineEvent({ event, index, side }: TimelineEventProps) {
  const isLeft = side === "left";
  const videoId = getYouTubeId(event.sourceConference.url);

  return (
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
      {/* Desktop opposite side: video or metadata label */}
      <div
        className={`hidden md:flex md:w-1/2 ${
          isLeft ? "justify-start" : "justify-end"
        }`}
      >
        <div className={`w-full max-w-md ${isLeft ? "md:pl-12" : "md:pr-12"}`}>
          {videoId ? (
            <VideoEmbed videoId={videoId} title={event.sourceConference.title} />
          ) : (
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 p-6 text-center">
              <span className="text-sm font-medium text-muted-foreground">
                {event.period ? "Período histórico" : "Acontecimiento"}
              </span>
              <p className="mt-2 text-xs text-muted-foreground/80">
                No hay video disponible para este evento.
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
          transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
          className="h-4 w-4 rounded-full border-2 border-background bg-primary shadow-sm md:h-5 md:w-5"
        />
      </div>

      {/* Card */}
      <div className="pl-6 md:w-1/2 md:pl-0">
        <Card className="group overflow-hidden border border-border/60 bg-card/80 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
          <CardHeader className="space-y-3 pb-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className="gap-1 font-medium">
                <Calendar className="h-3 w-3" />
                {event.dateLabel}
              </Badge>
              <Badge variant="outline" className="gap-1 font-normal">
                <MapPin className="h-3 w-3" />
                {event.location}
              </Badge>
            </div>
            <CardTitle className="text-xl font-semibold leading-tight tracking-tight md:text-2xl">
              {event.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <p className="text-base leading-relaxed text-foreground/90">
              {event.description}
            </p>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {event.summary}
              </p>
            </div>

            {event.consequences.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/80">
                  Cambios y consecuencias
                </h4>
                <ul className="space-y-1.5">
                  {event.consequences.map((consequence, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 text-sm text-muted-foreground"
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
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Civilizaciones
                  </span>
                  {event.civilizations.map((civilization) => (
                    <Badge
                      key={civilization}
                      variant="outline"
                      className="text-xs"
                    >
                      {civilization}
                    </Badge>
                  ))}
                </div>
              )}

              {event.characters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Personajes
                  </span>
                  {event.characters.map((character) => (
                    <Badge
                      key={character}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {character}
                    </Badge>
                  ))}
                </div>
              )}

              {event.topics.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Temas
                  </span>
                  {event.topics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="outline"
                      className="text-xs font-normal text-muted-foreground"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Conferencia de referencia</span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {event.sourceConference.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {event.sourceConference.organization}
                {event.sourceConference.date
                  ? ` · ${event.sourceConference.date}`
                  : null}
              </p>
              {event.sourceConference.url ? (
                <a
                  href={event.sourceConference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Ver fuente
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="text-xs italic text-muted-foreground">
                  Registro sin enlace disponible
                </span>
              )}
            </div>

            {/* Mobile video embed */}
            {videoId && (
              <div className="md:hidden">
                <Separator className="mb-5" />
                <VideoEmbed
                  videoId={videoId}
                  title={event.sourceConference.title}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
