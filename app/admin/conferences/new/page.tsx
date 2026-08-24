import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ConferenceForm } from "@/app/components/ConferenceForm";
import { createConference } from "@/app/actions/admin";

export const metadata: Metadata = {
  title: "Nueva conferencia | Tobalove",
};

export default async function NewConferencePage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="flex-1">
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nueva conferencia
          </h1>
          <p className="mt-2 text-muted-foreground">
            Añade una nueva conferencia al catálogo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <ConferenceForm action={createConference} />
      </section>
    </main>
  );
}
