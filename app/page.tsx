import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, MapPin, Users, Globe } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            Desde c. 3500 a.C. hasta 1453 d.C.
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Línea de tiempo histórica
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Recorrido interactivo por los hechos, civilizaciones y personajes de
            la Antigüedad explicados en las conferencias de Eva Tobalina.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/timeline"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              <Clock className="h-4 w-4" />
              Explorar la línea de tiempo
            </Link>
          </div>

          <div className="grid gap-4 pt-8 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <Globe className="mx-auto h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">Civilizaciones</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sumeria, Roma, Persia, Mongolia y más.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <Users className="mx-auto h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">Personajes</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Alejandro, Augusto, Atila, Tamerlán y otros.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <MapPin className="mx-auto h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">Ubicaciones</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                De Mesopotamia a la Ruta de la Seda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
