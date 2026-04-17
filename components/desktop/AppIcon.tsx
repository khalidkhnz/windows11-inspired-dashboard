"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeChoice } from "@/context/ThemeContext";

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
  /** Corner radius override. If unset, each theme picks its own shape. */
  rounded?: string;
  /** Opt out of theming and use the Windows tile look. */
  forceTheme?: "windows" | "macos" | "linux";
};

export function AppIcon({
  icon,
  className = "h-10 w-10",
  glyphClassName = "h-1/2 w-1/2",
  rounded,
  forceTheme,
}: Props) {
  const resolved = useThemeChoice("icons");
  const theme = forceTheme ?? resolved;
  const Glyph = icon.glyph;

  if (theme === "linux") {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-full bg-neutral-900 ring-1 ring-white/5 shadow-[0_2px_6px_rgba(0,0,0,0.4)]",
          rounded,
          className,
        )}
      >
        <Glyph
          className={cn("relative text-[#e95420] drop-shadow-sm", glyphClassName)}
        />
      </div>
    );
  }

  if (theme === "macos") {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-br shadow-[0_6px_14px_rgba(0,0,0,0.45)] ring-1 ring-black/20",
          rounded ?? "rounded-[22%]",
          icon.gradient.from,
          icon.gradient.to,
          className,
        )}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 via-white/10 to-transparent",
            rounded ?? "rounded-[22%]",
          )}
        />
        <Glyph
          className={cn("relative text-white drop-shadow-sm", glyphClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br shadow-[0_4px_12px_rgba(0,0,0,0.35)] ring-1 ring-white/10",
        rounded ?? "rounded-[10px]",
        icon.gradient.from,
        icon.gradient.to,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-80",
          rounded ?? "rounded-[10px]",
        )}
      />
      <Glyph className={cn("relative text-white drop-shadow-sm", glyphClassName)} />
    </div>
  );
}
