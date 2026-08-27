import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserPreferences } from "@/lib/data";
import { PreferencesForm } from "@/app/components/PreferencesForm";

export const metadata: Metadata = {
  title: "Preferencias | Tobalove",
  description: "Configura tus preferencias de visualización en Tobalove.",
};

export default async function PreferencesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const preferences = await getUserPreferences(userId);

  return (
    <main className="flex-1">
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Preferencias
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Personaliza cómo se muestra el contenido en tu línea de tiempo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <PreferencesForm
          userId={userId}
          initialShowNonYoutubeEvents={preferences?.showNonYoutubeEvents ?? false}
          initialShowAllPeoples={preferences?.showAllPeoples ?? false}
        />
      </section>
    </main>
  );
}
