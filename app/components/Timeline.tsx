"use client";

import { motion } from "framer-motion";
import { TimelineEvent } from "./TimelineEvent";
import type { TimelineEvent as TimelineEventType } from "@/app/types/timeline";

interface TimelineProps {
  events: TimelineEventType[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <section className="relative py-12 md:py-20">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

      <div className="relative space-y-10 md:space-y-16">
        {events.map((event, index) => {
          const side = index % 2 === 0 ? "right" : "left";
          return (
            <TimelineEvent
              key={event.id}
              event={event}
              index={index}
              side={side}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mt-16 flex justify-center md:mt-24"
      >
        <div className="h-3 w-3 rounded-full bg-border" />
      </motion.div>
    </section>
  );
}
