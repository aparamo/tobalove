import { Metadata } from "next";
import { ConferenceDatabase } from "@/app/components/ConferenceDatabase";
import type { EnrichedConferenceItem } from "@/app/components/ConferenceDatabase";
import conferencesData from "@/data/conferencias-eva-tobalina.json";
import timelineData from "@/data/linea-de-tiempo-eva-tobalina.json";
import peoplesData from "@/data/pueblos-coexistientes.json";
import type {
  ConferenceItem,
  TimelineData,
  PeoplesData,
  TimelineEvent,
} from "@/app/types/timeline";

export const metadata: Metadata = {
  title: "Base de datos | Eva Tobalina",
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

export default function DatabasePage() {
  const conferences = conferencesData as unknown as { items: ConferenceItem[] };
  const timeline = timelineData as TimelineData;
  const peoples = peoplesData as PeoplesData;

  // Mapa inverso: conferencia -> eventos históricos relacionados
  const eventsByConference = new Map<string, TimelineEvent[]>();
  for (const ev of timeline.items) {
    for (const cid of ev.relatedConferences) {
      const list = eventsByConference.get(cid) ?? [];
      list.push(ev);
      eventsByConference.set(cid, list);
    }
  }

  // Mapa inverso: conferencia -> nombres de pueblos relacionados
  const peoplesByConference = new Map<string, string[]>();
  for (const p of peoples.items) {
    for (const cid of p.relatedConferences) {
      const list = peoplesByConference.get(cid) ?? [];
      list.push(p.name);
      peoplesByConference.set(cid, list);
    }
  }

  const enriched: EnrichedConferenceItem[] = conferences.items.map((conf) => {
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

    return {
      ...conf,
      historicalStartYear: startYear,
      historicalEndYear: endYear,
      historicalDateLabel,
      historicalPeriod,
      relatedPeoples: peoplesByConference.get(conf.id) ?? [],
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
        <ConferenceDatabase conferences={enriched} />
      </section>
    </main>
  );
}
