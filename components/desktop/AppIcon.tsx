"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeChoice } from "@/context/ThemeContext";
import { NATIVE_ICONS, type NativeIconKey } from "./NativeIcons";

export type AppIconGradient = {
  from: string;
  to: string;
};

export type AppIconSpec = {
  glyph: LucideIcon;
  gradient: AppIconGradient;
  /**
   * Render a native platform icon for this app instead of the generic
   * gradient + glyph tile. The resolved icons theme picks which variant
   * (Windows / macOS / Linux) is shown.
   */
  native?: NativeIconKey;
};

type Props = {
  icon: AppIconSpec;
  /** Tailwind size classes for the tile (e.g. "h-10 w-10"). */
  className?: string;
  /** Tailwind size classes for the inner glyph (e.g. "h-5 w-5"). */
  glyphClassName?: string;
  /** Corner radius override. If unset, each theme picks its own shape. */
  rounded?: string;
  /** Opt out of theming and use a specific theme's look. */
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

  if (icon.native) {
    const Native = NATIVE_ICONS[icon.native][theme];
    return (
      <div className={cn("relative flex items-center justify-center", className)}>
        <Native size={64} />
      </div>
    );
  }

  const Glyph = icon.glyph;

  if (theme === "linux") {
    // Papirus-style: flat circle with a two-tone symbol
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-full",
          "bg-[radial-gradient(circle_at_30%_25%,#3a3a3a,#1a1a1a_70%)]",
          "ring-1 ring-black/60",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_10px_rgba(0,0,0,0.45)]",
          rounded,
          className,
        )}
      >
        <Glyph
          className={cn("relative text-[#e95420]", glyphClassName)}
          strokeWidth={2.2}
        />
      </div>
    );
  }

  if (theme === "macos") {
    // macOS squircle with inner highlight + thin black hairline
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
          "shadow-[0_8px_18px_-4px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.08)_inset]",
          "ring-[0.5px] ring-black/40",
          rounded ?? "rounded-[22%]",
          icon.gradient.from,
          icon.gradient.to,
          className,
        )}
      >
        {/* specular highlight */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-white/5 to-transparent",
            rounded ?? "rounded-[22%]",
          )}
        />
        {/* bottom inner shadow */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent",
            rounded ?? "rounded-[22%]",
          )}
        />
        <Glyph
          className={cn("relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]", glyphClassName)}
          strokeWidth={2}
        />
      </div>
    );
  }

  // Windows 11 Fluent tile — softer gradient, fine bezel, subtle depth
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        "shadow-[0_4px_14px_-4px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.15)]",
        "ring-1 ring-white/10",
        rounded ?? "rounded-[9px]",
        icon.gradient.from,
        icon.gradient.to,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_45%)]",
          rounded ?? "rounded-[9px]",
        )}
      />
      <Glyph
        className={cn("relative text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]", glyphClassName)}
        strokeWidth={2}
      />
    </div>
  );
}
