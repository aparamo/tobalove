"use client";

import { Eye, EyeOff, Heart, Bookmark } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface VideoActionsProps {
  conferenceId: string;
  isWatched: boolean;
  isFavorite: boolean;
  isWatchlist: boolean;
  isAuthenticated: boolean;
  onToggleWatched: (id: string) => void | Promise<void> | Promise<unknown>;
  onToggleFavorite: (id: string) => void | Promise<void> | Promise<unknown>;
  onToggleWatchlist: (id: string) => void | Promise<void> | Promise<unknown>;
  togglingId?: string | null;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md";
  variant?: "icon" | "labeled";
  className?: string;
}

interface ActionConfig {
  key: "watched" | "favorite" | "watchlist";
  active: boolean;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  activeLabel: string;
  inactiveLabel: string;
  activeTooltip: string;
  inactiveTooltip: string;
  activeClass: string;
  activeBgClass: string;
  onClick: (id: string) => void | Promise<void> | Promise<unknown>;
}

export function VideoActions({
  conferenceId,
  isWatched,
  isFavorite,
  isWatchlist,
  isAuthenticated,
  onToggleWatched,
  onToggleFavorite,
  onToggleWatchlist,
  togglingId,
  orientation = "horizontal",
  size = "md",
  variant = "icon",
  className,
}: VideoActionsProps) {
  if (!isAuthenticated) return null;

  const actions: ActionConfig[] = [
    {
      key: "favorite",
      active: isFavorite,
      activeIcon: <Heart className="h-3.5 w-3.5 fill-current" />,
      inactiveIcon: <Heart className="h-3.5 w-3.5" />,
      activeLabel: "En favoritos",
      inactiveLabel: "Añadir a favoritos",
      activeTooltip: "Quitar de favoritos",
      inactiveTooltip: "Añadir a favoritos",
      activeClass: "text-red-500",
      activeBgClass: "bg-red-500/10 border-red-500/30 hover:bg-red-500/20",
      onClick: onToggleFavorite,
    },
    {
      key: "watchlist",
      active: isWatchlist,
      activeIcon: <Bookmark className="h-3.5 w-3.5 fill-current" />,
      inactiveIcon: <Bookmark className="h-3.5 w-3.5" />,
      activeLabel: "En siguientes",
      inactiveLabel: "Ver más tarde",
      activeTooltip: "Quitar de siguientes",
      inactiveTooltip: "Añadir a siguientes",
      activeClass: "text-amber-500",
      activeBgClass: "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20",
      onClick: onToggleWatchlist,
    },
    {
      key: "watched",
      active: isWatched,
      activeIcon: <Eye className="h-3.5 w-3.5" />,
      inactiveIcon: <EyeOff className="h-3.5 w-3.5" />,
      activeLabel: "Visto",
      inactiveLabel: "Marcar como visto",
      activeTooltip: "Marcar como no visto",
      inactiveTooltip: "Marcar como visto",
      activeClass: "text-primary",
      activeBgClass: "bg-primary/10 border-primary/30 hover:bg-primary/20",
      onClick: onToggleWatched,
    },
  ];

  const isToggling = togglingId === conferenceId;

  if (variant === "labeled") {
    return (
      <div
        className={cn(
          "flex flex-wrap gap-2",
          orientation === "vertical" && "flex-col",
          className
        )}
      >
        {actions.map((action) => {
          const label = action.active ? action.activeLabel : action.inactiveLabel;
          return (
            <button
              key={action.key}
              type="button"
              disabled={isToggling}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(conferenceId);
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50",
                action.active
                  ? cn(action.activeBgClass, action.activeClass, "border-current")
                  : "border-border bg-background text-foreground hover:bg-muted"
              )}
            >
              <span className={cn("h-4 w-4", action.active ? action.activeClass : "text-muted-foreground")}>
                {action.active ? action.activeIcon : action.inactiveIcon}
              </span>
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  const buttonSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row items-center gap-1" : "flex-col gap-1.5",
        className
      )}
    >
      {actions.map((action) => (
        <Tooltip key={action.key}>
          <TooltipTrigger
            render={(triggerProps) => (
              <button
                {...triggerProps}
                type="button"
                disabled={isToggling}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(conferenceId);
                }}
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background disabled:opacity-50",
                  buttonSize
                )}
              >
                <span
                  className={cn(
                    iconSize,
                    action.active ? action.activeClass : "text-muted-foreground"
                  )}
                >
                  {action.active ? action.activeIcon : action.inactiveIcon}
                </span>
              </button>
            )}
          />
          <TooltipContent side={orientation === "horizontal" ? "top" : "left"}>
            <p>{action.active ? action.activeTooltip : action.inactiveTooltip}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
