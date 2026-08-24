import { Metadata } from "next";
import { TimelineViewSelector } from "@/app/components/TimelineViewSelector";
import timelineData from "@/data/linea-de-tiempo-eva-tobalina.json";
import conferencesData from "@/data/conferencias-eva-tobalina.json";
import peoplesData from "@/data/pueblos-coexistientes.json";
import type {
  TimelineData,
  ConferenceItem,
  PeoplesData,
} from "@/app/types/timeline";

export const metadata: Metadata = {
  title: "Línea de tiempo | Eva Tobalina",
  description:
    "Recorrido cronológico por los hechos, civilizaciones y personajes de la Antigüedad tratados en las conferencias de Eva Tobalina.",
};

export default function TimelinePage() {
  const data = timelineData as TimelineData;
  const conferences = conferencesData as { items: ConferenceItem[] };
  const peoples = peoplesData as PeoplesData;

  const sortedEvents = [...data.items].sort(
    (a, b) => a.startYear - b.startYear
  );

  const conferencesMap = new Map<string, ConferenceItem>();
  for (const conf of conferences.items) {
    conferencesMap.set(conf.id, conf);
  }

  return (
    <main className="flex-1">
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Línea de tiempo
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {data.meta.enfoque}
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            {data.meta.cobertura_cronologica} · {data.meta.total_eventos}{" "}
            eventos · {peoples.meta.total_pueblos} pueblos
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <TimelineViewSelector
          events={sortedEvents}
          peoples={peoples.items}
          conferencesMap={conferencesMap}
          eventsMeta={data.meta}
          peoplesMeta={peoples.meta}
        />
      </section>
    </main>
  );
}
