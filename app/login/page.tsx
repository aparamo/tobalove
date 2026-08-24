import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/app/components/LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión | Tobalove",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Accede a tu cuenta para marcar conferencias como vistas.
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}
