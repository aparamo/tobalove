import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Clock, Home, PlaySquare, Database } from "lucide-react";
import { auth } from "@/auth";
import type { Session } from "next-auth";
import { UserNav } from "@/app/components/UserNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tobalove | Línea de tiempo histórica",
  description:
    "Recorrido interactivo por los hechos, civilizaciones y personajes de la Antigüedad explicados en las conferencias de Eva Tobalina.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  let session: Session | null = null;
  try {
    // Cast temporal: en runtime auth() devuelve Session | null, pero la
    // tipificación de next-auth v5 beta en este proyecto se resuelve como
    // NextMiddleware. Se corrige explícitamente hasta que la librería
    // estabilice los tipos.
    session = (await auth()) as Session | null;
  } catch {
    // La cookie de sesión puede estar cifrada con un secreto anterior o ser
    // inválida. Ignoramos el error para que la app siga renderizando; el
    // usuario puede limpiar cookies y volver a iniciar sesión.
  }
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-semibold tracking-tight"
              >
                <Clock className="h-4 w-4" />
                <span>Tobalove</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Inicio</span>
                </Link>
                <Link
                  href="/timeline"
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Línea de tiempo</span>
                </Link>
                <Link
                  href="/videos"
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <PlaySquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Videos</span>
                </Link>
                <Link
                  href="/database"
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Database className="h-4 w-4" />
                  <span className="hidden sm:inline">Base de datos</span>
                </Link>
              </div>
              <UserNav user={session?.user} />
            </nav>
          </header>
          {children}
          <footer className="border-t bg-muted/30 py-8">
            <div className="mx-auto max-w-5xl space-y-3 px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
              <p>
                Basado en las conferencias y entrevistas de{" "}
                <strong className="text-foreground">Eva Tobalina</strong>.
              </p>
              <p className="text-xs leading-relaxed">
                Este sitio es un proyecto de fans en reconocimiento a la labor
                divulgativa de Eva Tobalina. No está afiliado, avalado ni
                gestionado por ella.
              </p>
              <p className="mt-1">
                Última actualización: {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </TooltipProvider>
      </body>
    </html>
  );
}
