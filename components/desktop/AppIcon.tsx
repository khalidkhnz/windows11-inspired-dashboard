"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AppIconGradient = {
  from: string;
  to: string;
};

export type AppIconSpec = {
  glyph: LucideIcon;
  gradient: AppIconGradient;
};

type Props = {
  icon: AppIconSpec;
  /** Tailwind size classes for the tile (e.g. "h-10 w-10"). */
  className?: string;
  /** Tailwind size classes for the inner glyph (e.g. "h-5 w-5"). */
  glyphClassName?: string;
  /** Corner radius. Default is `rounded-lg`. */
  rounded?: string;
};

export function AppIcon({
  icon,
  className = "h-10 w-10",
  glyphClassName = "h-1/2 w-1/2",
  rounded = "rounded-[10px]",
}: Props) {
  const Glyph = icon.glyph;
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br shadow-[0_4px_12px_rgba(0,0,0,0.35)] ring-1 ring-white/10",
        rounded,
        icon.gradient.from,
        icon.gradient.to,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-80",
          rounded,
        )}
      />
      <Glyph className={cn("relative text-white drop-shadow-sm", glyphClassName)} />
    </div>
  );
}
