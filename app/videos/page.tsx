import { Metadata } from "next";
import { VideoCompanion } from "@/app/components/VideoCompanion";
import {
  getConferences,
  getPeoples,
  getTimelineEvents,
  getWatchedConferenceIds,
} from "@/lib/data";
import { auth } from "@/auth";
import { getYouTubeUrl } from "@/lib/youtube";
import type {
  ConferenceItem,
  TimelineEvent,
  PeopleGroup,
} from "@/app/types/timeline";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Videos | Tobalove",
  description:
    "Acompañamiento a los videos de YouTube de Eva Tobalina: conferencias, personajes, civilizaciones y contexto histórico.",
};

export default async function VideosPage() {
  const session = await auth();
  const conferences = (await getConferences()) as unknown as ConferenceItem[];
  const events = (await getTimelineEvents()) as unknown as TimelineEvent[];
  const peoples = (await getPeoples()) as unknown as PeopleGroup[];

  const videos = conferences
    .filter((conf) => getYouTubeUrl(conf) !== null)
    .sort((a, b) => {
      const yearA = a.year ?? Infinity;
      const yearB = b.year ?? Infinity;
      return yearA - yearB;
    });

  const watchedIds = session?.user?.id
    ? await getWatchedConferenceIds(session.user.id)
    : new Set<string>();

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
          events={events}
          peoples={peoples}
          watchedIds={watchedIds}
          isAuthenticated={!!session?.user}
        />
      </section>
    </main>
  );
}
