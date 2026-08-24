import { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/app/components/RegisterForm";

export const metadata: Metadata = {
  title: "Registro | Tobalove",
};

export default function RegisterPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Crear cuenta
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Regístrate para guardar tu progreso y marcar conferencias vistas.
          </p>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
