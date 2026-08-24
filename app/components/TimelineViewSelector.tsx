"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Users } from "lucide-react";
import { Timeline } from "./Timeline";
import { PopulationTimeline } from "./PopulationTimeline";
import { cn } from "@/lib/utils";
import type {
  TimelineEvent,
  ConferenceItem,
  PeopleGroup,
  TimelineMeta,
  PeoplesMeta,
} from "@/app/types/timeline";

interface TimelineViewSelectorProps {
  events: TimelineEvent[];
  peoples: PeopleGroup[];
  conferencesMap: Map<string, ConferenceItem>;
  eventsMeta: TimelineMeta;
  peoplesMeta: PeoplesMeta;
}

type View = "events" | "peoples";

export function TimelineViewSelector({
  events,
  peoples,
  conferencesMap,
  eventsMeta,
  peoplesMeta,
}: TimelineViewSelectorProps) {
  const [view, setView] = useState<View>("events");

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="inline-flex rounded-full border border-border/60 bg-muted/50 p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setView("events")}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              view === "events"
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {view === "events" && (
              <motion.div
                layoutId="activeTimelineView"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Eventos históricos
            </span>
          </button>
          <button
            type="button"
            onClick={() => setView("peoples")}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              view === "peoples"
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {view === "peoples" && (
              <motion.div
                layoutId="activeTimelineView"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-2">
              <Users className="h-4 w-4" />
              Pueblos coexistientes
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "events" ? (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <Timeline events={events} conferencesMap={conferencesMap} />
          </motion.div>
        ) : (
          <motion.div
            key="peoples"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Pueblos coexistientes
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                Visualización de civilizaciones y pueblos que convivieron a lo
                largo de la historia. El grosor de cada franja representa su
                población aproximada en el momento de mayor apogeo.
              </p>
              <p className="mt-2 text-sm text-muted-foreground/80">
                {peoplesMeta.cobertura_cronologica} ·{" "}
                {peoplesMeta.total_pueblos} pueblos
              </p>
            </div>
            <PopulationTimeline
              peoples={peoples}
              conferencesMap={conferencesMap}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
