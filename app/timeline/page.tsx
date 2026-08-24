import { Metadata } from "next";
import { TimelineViewSelector } from "@/app/components/TimelineViewSelector";
import {
  getConferences,
  getPeoples,
  getTimelineEvents,
  getTimelineMeta,
  getPeoplesMeta,
} from "@/lib/data";
import type {
  ConferenceItem,
  TimelineEvent,
  PeopleGroup,
  TimelineMeta,
  PeoplesMeta,
} from "@/app/types/timeline";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Línea de tiempo | Tobalove",
  description:
    "Recorrido cronológico por los hechos, civilizaciones y personajes de la Antigüedad tratados en las conferencias de Eva Tobalina.",
};

export default async function TimelinePage() {
  const events = (await getTimelineEvents()) as unknown as TimelineEvent[];
  const conferences = (await getConferences()) as unknown as ConferenceItem[];
  const peoples = (await getPeoples()) as unknown as PeopleGroup[];
  const rawEventsMeta = (await getTimelineMeta()) as unknown as TimelineMeta | null;
  const rawPeoplesMeta = (await getPeoplesMeta()) as unknown as PeoplesMeta | null;

  const eventsMeta: TimelineMeta = rawEventsMeta ?? {
    autorContenido: "",
    enfoque:
      "Recorrido cronológico por los hechos, civilizaciones y personajes de la Antigüedad.",
    coberturaCronologica: "Cobertura amplia",
    totalEventos: events.length,
    fuentesPrincipales: [],
    ultimaActualizacion: "",
  };

  const peoplesMeta: PeoplesMeta = rawPeoplesMeta ?? {
    autorContenido: "",
    enfoque: "",
    coberturaCronologica: "Cobertura amplia",
    totalPueblos: peoples.length,
    unidadPoblacion: "",
    fuentesPrincipales: [],
    ultimaActualizacion: "",
  };

  const sortedEvents = [...events].sort((a, b) => a.startYear - b.startYear);

  const conferencesMap = new Map<string, ConferenceItem>();
  for (const conf of conferences) {
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
            {eventsMeta?.enfoque ??
              "Recorrido cronológico por los hechos, civilizaciones y personajes de la Antigüedad."}
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            {eventsMeta?.coberturaCronologica ?? "Cobertura amplia"} ·{" "}
            {eventsMeta?.totalEventos ?? sortedEvents.length} eventos ·{" "}
            {peoplesMeta?.totalPueblos ?? peoples.length} pueblos
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <TimelineViewSelector
          events={sortedEvents}
          peoples={peoples}
          conferencesMap={conferencesMap}
          peoplesMeta={peoplesMeta}
        />
      </section>
    </main>
  );
}
