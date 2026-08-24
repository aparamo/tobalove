import { Metadata } from "next";
import { VideoCompanion } from "@/app/components/VideoCompanion";
import conferencesData from "@/data/conferencias-eva-tobalina.json";
import timelineData from "@/data/linea-de-tiempo-eva-tobalina.json";
import peoplesData from "@/data/pueblos-coexistientes.json";
import { getYouTubeUrl } from "@/lib/youtube";
import type {
  ConferenceItem,
  TimelineData,
  PeoplesData,
} from "@/app/types/timeline";

export const metadata: Metadata = {
  title: "Videos | Eva Tobalina",
  description:
    "Acompañamiento a los videos de YouTube de Eva Tobalina: conferencias, personajes, civilizaciones y contexto histórico.",
};

export default function VideosPage() {
  const conferences = conferencesData as unknown as { items: ConferenceItem[] };
  const timeline = timelineData as TimelineData;
  const peoples = peoplesData as PeoplesData;

  const videos = conferences.items
    .filter((conf) => getYouTubeUrl(conf) !== null)
    .sort((a, b) => {
      const yearA = a.year ?? 0;
      const yearB = b.year ?? 0;
      return yearB - yearA;
    });

  return (
    <main className="flex-1">
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Acompañamiento a los videos
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Todos los videos de YouTube de Eva Tobalina organizados con su
            contexto histórico: personajes, civilizaciones, temas y relación con
            la línea de tiempo.
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            {videos.length} videos disponibles
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <VideoCompanion
          videos={videos}
          events={timeline.items}
          peoples={peoples.items}
        />
      </section>
    </main>
  );
}
