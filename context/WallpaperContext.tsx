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
  src: StaticImageData | string;
  overlay?: string;
};

export const WALLPAPERS: Wallpaper[] = [
  { id: "bloom", label: "Windows Bloom", src: WALLPAPER_BLOOM },
  { id: "gojo", label: "Infinity", src: WALLPAPER_GOJO },
];

type WallpaperContextValue = {
  wallpaperId: string;
  setWallpaperId: (id: string) => void;
  wallpaper: Wallpaper;
};

const WallpaperContext = createContext<WallpaperContextValue | null>(null);

const STORAGE_KEY = "portfolio-wallpaper";

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  const [wallpaperId, setWallpaperIdState] = useState<string>(WALLPAPERS[0].id);

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

  const wallpaper = useMemo(
    () => WALLPAPERS.find((w) => w.id === wallpaperId) ?? WALLPAPERS[0],
    [wallpaperId],
  );

  return (
    <WallpaperContext.Provider value={{ wallpaperId, setWallpaperId, wallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
}

export function useWallpaper() {
  const ctx = useContext(WallpaperContext);
  if (!ctx) throw new Error("useWallpaper must be used within a WallpaperProvider");
  return ctx;
}
