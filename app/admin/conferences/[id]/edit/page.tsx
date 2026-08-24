import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { ConferenceForm } from "@/app/components/ConferenceForm";
import { updateConference } from "@/app/actions/admin";
import { getConferenceById } from "@/lib/data";
import type { ConferenceItem } from "@/app/types/timeline";

export const metadata: Metadata = {
  title: "Editar conferencia | Tobalove",
};

export default async function EditConferencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  const { id } = await params;
  const conference = await getConferenceById(id);

  if (!conference) {
    notFound();
  }

  return (
    <main className="flex-1">
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Editar conferencia
          </h1>
          <p className="mt-2 text-muted-foreground">{conference.title}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <ConferenceForm
          conference={conference as unknown as ConferenceItem}
          action={updateConference}
        />
      </section>
    </main>
  );
}
