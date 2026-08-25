"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TimelineEvent } from "./TimelineEvent";
import { TimelineNavigation } from "./TimelineNavigation";
import type {
  TimelineEvent as TimelineEventType,
  ConferenceItem,
} from "@/app/types/timeline";

interface TimelineProps {
  events: TimelineEventType[];
  conferencesMap?: Map<string, ConferenceItem>;
}

const PAGE_SIZE = 10;

export function Timeline({ events, conferencesMap }: TimelineProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const visibleEvents = useMemo(
    () => events.slice(0, visibleCount),
    [events, visibleCount]
  );

  const hasMore = visibleCount < events.length;
  const remainingCount = events.length - visibleCount;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, events.length));
  }, [events.length]);

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

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, itemRefs.current.length - 1));
    setCurrentIndex(clamped);
    const element = itemRefs.current[clamped];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const goStart = useCallback(() => scrollToIndex(0), [scrollToIndex]);
  const goEnd = useCallback(
    () => scrollToIndex(visibleEvents.length - 1),
    [scrollToIndex, visibleEvents.length]
  );
  const goPrev = useCallback(
    () => scrollToIndex(currentIndex - 1),
    [scrollToIndex, currentIndex]
  );
  const goNext = useCallback(
    () => scrollToIndex(currentIndex + 1),
    [scrollToIndex, currentIndex]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <section className="relative py-12 md:py-20">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

      <div className="relative space-y-10 md:space-y-16">
        {visibleEvents.map((event, index) => {
          const side = index % 2 === 0 ? "right" : "left";
          return (
            <div
              key={event.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
            >
              <TimelineEvent
                event={event}
                index={index}
                side={side}
                conferencesMap={conferencesMap}
              />
            </div>
          );
        })}

        {/* Infinite scroll sentinel */}
        {hasMore && <div ref={setSentinel} className="h-4" />}
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

      {/* Load more button */}
      {hasMore && (
        <div className="relative mt-10 flex justify-center md:mt-14">
          <Button
            variant="outline"
            size="sm"
            onClick={loadMore}
            className="gap-2 text-sm"
          >
            Ver más
            <span className="text-muted-foreground">({remainingCount} restantes)</span>
          </Button>
        </div>
      )}

      {/* Floating navigation */}
      <TimelineNavigation
        currentIndex={currentIndex}
        totalItems={visibleEvents.length}
        onGoStart={goStart}
        onGoEnd={goEnd}
        onGoPrev={goPrev}
        onGoNext={goNext}
      />
    </section>
  );
}
