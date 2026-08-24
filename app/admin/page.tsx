import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Database, PlusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin | Tobalove",
};

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="flex-1">
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Panel de administración
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Gestiona conferencias, usuarios y contenido del sitio.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/conferences">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <Database className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Conferencias</CardTitle>
                <CardDescription>
                  Ver, editar, eliminar y crear conferencias en la base de datos.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/conferences/new">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <PlusCircle className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Nueva conferencia</CardTitle>
                <CardDescription>
                  Añade una nueva conferencia al catálogo.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <Users className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Usuarios</CardTitle>
                <CardDescription>
                  Gestiona roles y elimina cuentas de usuario.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
}
