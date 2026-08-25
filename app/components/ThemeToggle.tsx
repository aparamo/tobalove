"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  function cycleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  }

  const label =
    theme === "dark"
      ? "Modo oscuro"
      : theme === "light"
        ? "Modo claro"
        : "Tema del sistema";

  return (
    <Tooltip>
      <TooltipTrigger
        render={(triggerProps) => (
          <button
            {...triggerProps}
            type="button"
            onClick={cycleTheme}
            aria-label={label}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {resolvedTheme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">{label}</span>
          </button>
        )}
      />
      <TooltipContent side="bottom">
        <p>{label} (clic para cambiar)</p>
      </TooltipContent>
    </Tooltip>
  );
}
