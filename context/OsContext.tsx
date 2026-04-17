"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type {
  AppDefinition,
  AppId,
  OsContextValue,
  WindowState,
} from "@/types/os";
import { getApps } from "@/lib/apps";

const OsContext = createContext<OsContextValue | null>(null);

const DEFAULT_SIZE = { width: 900, height: 620 };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function pickSpawnPosition(existing: WindowState[], size: { width: number; height: number }) {
  if (typeof window === "undefined") {
    return { x: 80, y: 60 };
  }
  const margin = 24;
  const maxX = Math.max(margin, window.innerWidth - size.width - margin);
  const maxY = Math.max(margin, window.innerHeight - size.height - 72 /* taskbar */);
  const offset = (existing.length % 6) * 32;
  return {
    x: clamp(80 + offset, margin, maxX),
    y: clamp(60 + offset, margin, maxY),
  };
}

export function OsProvider({ children }: { children: React.ReactNode }) {
  const apps = useMemo(() => getApps(), []);
  const appsById = useMemo(
    () => Object.fromEntries(apps.map((a) => [a.id, a])) as Record<AppId, AppDefinition>,
    [apps],
  );

  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<number | null>(null);
  const idRef = useRef(1);
  const zRef = useRef(10);

  const focusWindow = useCallback((id: number) => {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id);
      if (!target) return prev;
      zRef.current += 1;
      return prev.map((w) =>
        w.id === id ? { ...w, zIndex: zRef.current, minimized: false } : w,
      );
    });
    setActiveWindowId(id);
  }, []);

  const openApp = useCallback(
    (appId: AppId) => {
      const app = appsById[appId];
      if (!app) return;
      if (app.action && !app.Content) {
        app.action();
        return;
      }
      setWindows((prev) => {
        if (!app.multiInstance) {
          const existing = prev.find((w) => w.appId === appId);
          if (existing) {
            zRef.current += 1;
            setActiveWindowId(existing.id);
            return prev.map((w) =>
              w.id === existing.id
                ? { ...w, zIndex: zRef.current, minimized: false }
                : w,
            );
          }
        }
        const size = app.defaultSize ?? DEFAULT_SIZE;
        const pos = pickSpawnPosition(prev, size);
        const id = idRef.current++;
        zRef.current += 1;
        setActiveWindowId(id);
        return [
          ...prev,
          {
            id,
            appId,
            title: app.title,
            icon: app.icon,
            x: pos.x,
            y: pos.y,
            width: size.width,
            height: size.height,
            minimized: false,
            maximized: false,
            zIndex: zRef.current,
          },
        ];
      });
    },
    [appsById],
  );

  const closeWindow = useCallback((id: number) => {
    setWindows((prev) => {
      const next = prev.filter((w) => w.id !== id);
      if (next.length === 0) {
        setActiveWindowId(null);
      } else {
        const top = next.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
        setActiveWindowId(top.id);
      }
      return next;
    });
  }, []);

  const minimizeWindow = useCallback((id: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setActiveWindowId((current) => (current === id ? null : current));
  }, []);

  const restoreOrMinimize = useCallback(
    (id: number) => {
      setWindows((prev) => {
        const win = prev.find((w) => w.id === id);
        if (!win) return prev;
        if (win.minimized) {
          zRef.current += 1;
          setActiveWindowId(id);
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, zIndex: zRef.current } : w,
          );
        }
        if (activeWindowId === id) {
          setActiveWindowId(null);
          return prev.map((w) => (w.id === id ? { ...w, minimized: true } : w));
        }
        zRef.current += 1;
        setActiveWindowId(id);
        return prev.map((w) => (w.id === id ? { ...w, zIndex: zRef.current } : w));
      });
    },
    [activeWindowId],
  );

  const toggleMaximize = useCallback((id: number) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.restore) {
          return { ...w, maximized: false, ...w.restore, restore: undefined };
        }
        return {
          ...w,
          maximized: true,
          restore: { x: w.x, y: w.y, width: w.width, height: w.height },
        };
      }),
    );
  }, []);

  const moveWindow = useCallback((id: number, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resizeWindow = useCallback((id: number, width: number, height: number) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, width: Math.max(360, width), height: Math.max(240, height) }
          : w,
      ),
    );
  }, []);

  const value: OsContextValue = {
    apps,
    appsById,
    windows,
    activeWindowId,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
    restoreOrMinimize,
  };

  return <OsContext.Provider value={value}>{children}</OsContext.Provider>;
}

export function useOs() {
  const ctx = useContext(OsContext);
  if (!ctx) throw new Error("useOs must be used within an OsProvider");
  return ctx;
}
