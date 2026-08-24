import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getConferences } from "@/lib/data";
import { deleteConference } from "@/app/actions/admin";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Admin - Conferencias | Tobalove",
};

export default async function AdminConferencesPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  const conferences = await getConferences();

  return (
    <main className="flex-1">
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Conferencias
              </h1>
              <p className="mt-2 text-muted-foreground">
                {conferences.length} conferencias en la base de datos.
              </p>
            </div>
            <Link
              href="/admin/conferences/new"
              className={cn(buttonVariants())}
            >
              Nueva conferencia
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="min-w-[240px]">Título</TableHead>
                  <TableHead>Año</TableHead>
                  <TableHead>Organización</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conferences.map((conf) => (
                  <TableRow key={conf.id}>
                    <TableCell className="font-medium">{conf.title}</TableCell>
                    <TableCell>{conf.year ?? "—"}</TableCell>
                    <TableCell>{conf.organization}</TableCell>
                    <TableCell>{conf.type}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/conferences/${conf.id}/edit`}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" })
                          )}
                        >
                          Editar
                        </Link>
                        <form action={deleteConference}>
                          <input type="hidden" name="id" value={conf.id} />
                          <Button
                            variant="destructive"
                            size="sm"
                            type="submit"
                          >
                            Eliminar
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </main>
  );
}
