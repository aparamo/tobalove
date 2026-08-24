import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Clock, Home } from "lucide-react";
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
  title: "Eva Tobalina | Línea de tiempo histórica",
  description:
    "Recorrido interactivo por los hechos, civilizaciones y personajes de la Antigüedad explicados en las conferencias de Eva Tobalina.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
                <span>Eva Tobalina</span>
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
              </div>
            </nav>
          </header>
          {children}
          <footer className="border-t bg-muted/30 py-8">
            <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
              <p>
                Basado en las conferencias y entrevistas de{" "}
                <strong className="text-foreground">Eva Tobalina</strong>.
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
