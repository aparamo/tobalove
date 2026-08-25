import { Metadata } from "next";
import { redirect } from "next/navigation";
import { MyVideosCompanion } from "@/app/components/MyVideosCompanion";
import {
  getConferences,
  getPeoples,
  getTimelineEvents,
  getWatchedConferenceIds,
  getFavoriteConferenceIds,
  getWatchlistConferenceIds,
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
  title: "Mis videos | Tobalove",
  description:
    "Tus videos favoritos, pendientes y vistos de Eva Tobalina organizados con su contexto histórico.",
};

export default async function MyVideosPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const conferences = (await getConferences()) as unknown as ConferenceItem[];
  const events = (await getTimelineEvents()) as unknown as TimelineEvent[];
  const peoples = (await getPeoples()) as unknown as PeopleGroup[];

  const eventsByConf = new Map<string, TimelineEvent[]>();
  for (const ev of events) {
    for (const cid of ev.relatedConferences) {
      const list = eventsByConf.get(cid) ?? [];
      list.push(ev);
      eventsByConf.set(cid, list);
    }
  }

  function getHistoricalStartYear(confId: string): number | null {
    const relatedEvents = eventsByConf.get(confId) ?? [];
    if (relatedEvents.length === 0) return null;
    return Math.min(...relatedEvents.map((ev) => ev.startYear));
  }

  const videos = conferences
    .filter((conf) => getYouTubeUrl(conf) !== null)
    .sort((a, b) => {
      const yearA = getHistoricalStartYear(a.id) ?? Infinity;
      const yearB = getHistoricalStartYear(b.id) ?? Infinity;
      return yearA - yearB;
    });

  const [watchedIds, favoriteIds, watchlistIds] = await Promise.all([
    getWatchedConferenceIds(userId),
    getFavoriteConferenceIds(userId),
    getWatchlistConferenceIds(userId),
  ]);

  return (
    <main className="flex-1">
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Mis videos
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Administra tus videos favoritos, los que quieres ver más tarde y los
            que ya has visto.
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            {videos.length} videos disponibles
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <MyVideosCompanion
          videos={videos}
          events={events}
          peoples={peoples}
          watchedIds={watchedIds}
          favoriteIds={favoriteIds}
          watchlistIds={watchlistIds}
        />
      </section>
    </main>
  );
}
