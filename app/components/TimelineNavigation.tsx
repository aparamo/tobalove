"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUp,
  ChevronsDown,
} from "lucide-react";

interface TimelineNavigationProps {
  currentIndex: number;
  totalItems: number;
  onGoStart: () => void;
  onGoEnd: () => void;
  onGoPrev: () => void;
  onGoNext: () => void;
}

export function TimelineNavigation({
  currentIndex,
  totalItems,
  onGoStart,
  onGoEnd,
  onGoPrev,
  onGoNext,
}: TimelineNavigationProps) {
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < totalItems - 1 && totalItems > 0;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 rounded-full border border-border/60 bg-background/95 p-1.5 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Button
        variant="secondary"
        size="icon"
        onClick={onGoStart}
        disabled={!canGoBack}
        aria-label="Ir al inicio"
        className="h-10 w-10 rounded-full"
      >
        <ChevronsUp className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onGoPrev}
        disabled={!canGoBack}
        aria-label="Anterior"
        className="h-10 w-10 rounded-full"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onGoNext}
        disabled={!canGoForward}
        aria-label="Siguiente"
        className="h-10 w-10 rounded-full"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onGoEnd}
        disabled={!canGoForward}
        aria-label="Ir al final"
        className="h-10 w-10 rounded-full"
      >
        <ChevronsDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
