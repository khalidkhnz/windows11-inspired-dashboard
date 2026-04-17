"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { StaticImageData } from "next/image";
import WALLPAPER_BLOOM from "@/public/wallpaper1.jpg";
import WALLPAPER_GOJO from "@/public/GOJO.png";

export type Wallpaper = {
  id: string;
  label: string;
  /** Image source. Mutually exclusive with `gradient`. */
  src?: StaticImageData | string;
  /** Full CSS `background` value used when no image is set. */
  gradient?: string;
  overlay?: string;
};

export const WALLPAPERS: Wallpaper[] = [
  { id: "gojo", label: "Infinity", src: WALLPAPER_GOJO },
  { id: "bloom", label: "Windows Bloom", src: WALLPAPER_BLOOM },
  {
    id: "big-sur",
    label: "Big Sur",
    gradient:
      "linear-gradient(180deg, #3a1f6b 0%, #6b2d87 25%, #b45079 55%, #e98162 78%, #f2b880 100%)",
  },
  {
    id: "ubuntu-warty",
    label: "Ubuntu Warty",
    gradient:
      "radial-gradient(circle at 30% 30%, #7a2d32 0%, #3b1b21 55%, #1a0d10 100%)",
  },
];

export const DEFAULT_WALLPAPER_ID = "gojo";

/** Default wallpaper per theme — used when the user hasn't picked one. */
export const DEFAULT_WALLPAPER_BY_THEME: Record<string, string> = {
  windows: "bloom",
  macos: "big-sur",
  linux: "ubuntu-warty",
};

type WallpaperContextValue = {
  wallpaperId: string | null;
  setWallpaperId: (id: string) => void;
  wallpaper: Wallpaper;
  /** Theme hint used to pick a default when no explicit wallpaper is saved. */
  setThemeHint: (theme: string | null) => void;
};

const WallpaperContext = createContext<WallpaperContextValue | null>(null);

const STORAGE_KEY = "portfolio-wallpaper";

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  const [wallpaperId, setWallpaperIdState] = useState<string | null>(null);
  const [themeHint, setThemeHint] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && WALLPAPERS.some((w) => w.id === stored)) {
        setWallpaperIdState(stored);
      }
    } catch {
      /* localStorage not available — use default */
    }
  }, []);

  const setWallpaperId = useCallback((id: string) => {
    setWallpaperIdState(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const wallpaper = useMemo(() => {
    if (wallpaperId) {
      const hit = WALLPAPERS.find((w) => w.id === wallpaperId);
      if (hit) return hit;
    }
    const themedId = themeHint ? DEFAULT_WALLPAPER_BY_THEME[themeHint] : null;
    return (
      (themedId && WALLPAPERS.find((w) => w.id === themedId)) ||
      WALLPAPERS.find((w) => w.id === DEFAULT_WALLPAPER_ID) ||
      WALLPAPERS[0]
    );
  }, [wallpaperId, themeHint]);

  return (
    <WallpaperContext.Provider
      value={{ wallpaperId, setWallpaperId, wallpaper, setThemeHint }}
    >
      {children}
    </WallpaperContext.Provider>
  );
}

export function useWallpaper() {
  const ctx = useContext(WallpaperContext);
  if (!ctx) throw new Error("useWallpaper must be used within a WallpaperProvider");
  return ctx;
}
