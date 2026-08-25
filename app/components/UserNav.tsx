"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import type { User } from "next-auth";

interface UserNavProps {
  user?: User & { role?: "USER" | "ADMIN" };
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.refresh();
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          Iniciar sesión
        </Link>
        <Link
          href="/register"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium text-foreground">
          {user.name || user.email}
        </p>
        {user.role === "ADMIN" && (
          <p className="text-xs text-muted-foreground">Admin</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/mis-videos"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <Heart className="mr-1.5 h-4 w-4" />
          Mis videos
        </Link>
        {user.role === "ADMIN" && (
          <Link
            href="/admin"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Admin
          </Link>
        )}
        <button
          onClick={handleLogout}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          Salir
        </button>
      </div>
    </div>
  );
}
