import { Metadata } from "next";
import { ConferenceDatabase } from "@/app/components/ConferenceDatabase";
import type { EnrichedConferenceItem } from "@/app/components/ConferenceDatabase";
import {
  getConferences,
  getPeoples,
  getTimelineEvents,
  getWatchedConferenceIds,
  getFavoriteConferenceIds,
  getWatchlistConferenceIds,
} from "@/lib/data";
import { toggleWatchedConference } from "@/app/actions/watched";
import {
  toggleFavoriteConference,
  toggleWatchlistConference,
} from "@/app/actions/videos";
import { auth } from "@/auth";
import type { ConferenceItem, TimelineEvent } from "@/app/types/timeline";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Base de datos | Tobalove",
  description:
    "Catálogo completo de conferencias de Eva Tobalina ordenable por fecha histórica, período, civilización, título y organización.",
};

function formatYear(year: number): string {
  if (year === 0) return "0";
  return year < 0 ? `${Math.abs(year)} a.C.` : `${year} d.C.`;
}

function formatYearRange(start: number, end: number): string {
  if (start === end) return formatYear(start);
  return `${formatYear(start)} - ${formatYear(end)}`;
}

function getHistoricalPeriod(year: number): string {
  if (year < -3500) return "Prehistoria";
  if (year < 476) return "Edad Antigua";
  if (year < 1453) return "Edad Media";
  if (year < 1789) return "Edad Moderna";
  return "Edad Contemporánea";
}

export default async function DatabasePage() {
  const session = await auth();
  const conferences = (await getConferences()) as unknown as ConferenceItem[];
  const timelineEvents = (await getTimelineEvents()) as unknown as TimelineEvent[];
  const peoples = await getPeoples();
  const userId = session?.user?.id;
  const [watchedIds, favoriteIds, watchlistIds] = userId
    ? await Promise.all([
        getWatchedConferenceIds(userId),
        getFavoriteConferenceIds(userId),
        getWatchlistConferenceIds(userId),
      ])
    : [new Set<string>(), new Set<string>(), new Set<string>()];

  // Mapa inverso: conferencia -> eventos históricos relacionados
  const eventsByConference = new Map<string, TimelineEvent[]>();
  for (const ev of timelineEvents) {
    for (const cid of ev.relatedConferences) {
      const list = eventsByConference.get(cid) ?? [];
      list.push(ev);
      eventsByConference.set(cid, list);
    }
  }

  // Mapa inverso: conferencia -> nombres de pueblos relacionados
  const peoplesByConference = new Map<string, string[]>();
  for (const p of peoples) {
    for (const cid of p.relatedConferences) {
      const list = peoplesByConference.get(cid) ?? [];
      list.push(p.name);
      peoplesByConference.set(cid, list);
    }
  }

  const enriched: EnrichedConferenceItem[] = conferences.map((conf) => {
    const events = eventsByConference.get(conf.id) ?? [];

    const startYear =
      events.length > 0
        ? Math.min(...events.map((ev) => ev.startYear))
        : null;
    const endYear =
      events.length > 0 ? Math.max(...events.map((ev) => ev.endYear)) : null;

    let historicalDateLabel: string | null = null;
    if (events.length === 1) {
      historicalDateLabel =
        events[0].dateLabel ??
        (startYear !== null ? formatYear(startYear) : null);
    } else if (events.length > 1 && startYear !== null && endYear !== null) {
      historicalDateLabel =
        startYear === endYear
          ? formatYear(startYear)
          : formatYearRange(startYear, endYear);
    }

    const historicalPeriod =
      startYear !== null ? getHistoricalPeriod(startYear) : null;

    const relatedLocations = Array.from(
      new Set(
        events.map((ev) => ev.location).filter((loc): loc is string => Boolean(loc))
      )
    );

    return {
      ...conf,
      historicalStartYear: startYear,
      historicalEndYear: endYear,
      historicalDateLabel,
      historicalPeriod,
      relatedPeoples: peoplesByConference.get(conf.id) ?? [],
      relatedLocations,
    };
  });

  return (
    <main className="flex-1">
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Base de datos
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Listado completo de las conferencias de Eva Tobalina, con fechas
            históricas, períodos, civilizaciones y opciones de ordenación.
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            {enriched.length} conferencias
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <ConferenceDatabase
          conferences={enriched}
          watchedIds={watchedIds}
          favoriteIds={favoriteIds}
          watchlistIds={watchlistIds}
          isAuthenticated={!!session?.user}
          onToggleWatched={toggleWatchedConference}
          onToggleFavorite={toggleFavoriteConference}
          onToggleWatchlist={toggleWatchlistConference}
        />
      </section>
    </main>
  );
}
