"use client";

import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useWallpaper } from "@/context/WallpaperContext";

/**
 * Feeds the resolved wallpaper theme into WallpaperContext so it can pick a
 * sensible default per-OS when the user hasn't set one explicitly.
 */
export function ThemeWallpaperBridge() {
  const { resolve } = useTheme();
  const { setThemeHint } = useWallpaper();
  const wallpaperTheme = resolve("wallpaper");
  useEffect(() => {
    setThemeHint(wallpaperTheme);
  }, [wallpaperTheme, setThemeHint]);
  return null;
}
