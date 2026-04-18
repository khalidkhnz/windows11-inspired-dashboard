"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  AppDefinition,
  AppId,
  OsContextValue,
  WindowState,
} from "@/types/os";
import { getApps } from "@/lib/apps";

const OsContext = createContext<OsContextValue | null>(null);

const DEFAULT_SIZE = { width: 900, height: 620 };
const TASKBAR_HEIGHT = 52;
const MIN_WIDTH = 380;
const MIN_HEIGHT = 260;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Fit the requested size into the viewport, leaving room for the taskbar
 * and a small breathing margin. Ensures a freshly-opened window is never
 * clipped by the bottom taskbar on small displays.
 */
function fitSize(size: { width: number; height: number }) {
  if (typeof window === "undefined") return size;
  const margin = 16;
  const maxW = window.innerWidth - margin * 2;
  const maxH = window.innerHeight - TASKBAR_HEIGHT - margin * 2;
  return {
    width: Math.max(MIN_WIDTH, Math.min(size.width, maxW)),
    height: Math.max(MIN_HEIGHT, Math.min(size.height, maxH)),
  };
}

/**
 * Place a set of windows in a single horizontal row, centered on screen.
 * Used to fan out auto-open windows so they never spawn on top of each other.
 * Falls back to the original positions if the viewport is too narrow.
 */
function arrangeSideBySide(
  windows: WindowState[],
  ordering: { id: AppId }[],
): WindowState[] {
  if (typeof window === "undefined") return windows;
  // Pick the most recently opened window per appId in `ordering`.
  const targets = ordering
    .map((app) => {
      const matches = windows.filter((w) => w.appId === app.id);
      return matches.length ? matches[matches.length - 1] : undefined;
    })
    .filter((w): w is WindowState => !!w);
  if (targets.length === 0) return windows;

  const margin = 16;
  const gap = 16;
  const totalW =
    targets.reduce((s, w) => s + w.width, 0) + gap * (targets.length - 1);
  const viewportW = window.innerWidth;
  const startX = Math.max(margin, Math.round((viewportW - totalW) / 2));

  let cursor = startX;
  const updates = new Map<number, { x: number; y: number }>();
  for (const t of targets) {
    const y = Math.max(
      margin,
      Math.round((window.innerHeight - TASKBAR_HEIGHT - t.height) / 2),
    );
    updates.set(t.id, { x: cursor, y });
    cursor += t.width + gap;
  }
  return windows.map((w) => {
    const u = updates.get(w.id);
    return u ? { ...w, ...u } : w;
  });
}

function pickSpawnPosition(
  existing: WindowState[],
  size: { width: number; height: number },
) {
  if (typeof window === "undefined") {
    return { x: 80, y: 60 };
  }
  const margin = 16;
  const maxX = Math.max(margin, window.innerWidth - size.width - margin);
  const maxY = Math.max(margin, window.innerHeight - TASKBAR_HEIGHT - size.height - margin);
  const offset = (existing.length % 6) * 28;
  return {
    x: clamp(80 + offset, margin, maxX),
    y: clamp(48 + offset, margin, maxY),
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
        const size = fitSize(app.defaultSize ?? DEFAULT_SIZE);
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

  const autoOpenedRef = useRef(false);
  useEffect(() => {
    if (autoOpenedRef.current) return;
    autoOpenedRef.current = true;
    const autoApps = apps.filter((a) => a.autoOpen);
    if (autoApps.length === 0) return;
    autoApps.forEach((a) => openApp(a.id));
    // openApp's setWindows updates batch — wait one frame, then arrange the
    // newly-opened windows side-by-side so the auto-opens never overlap.
    const raf = requestAnimationFrame(() => {
      setWindows((prev) => arrangeSideBySide(prev, autoApps));
    });
    return () => cancelAnimationFrame(raf);
  }, [apps, openApp]);

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
