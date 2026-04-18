"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useOs } from "@/context/OsContext";

type Popover = "launcher" | "clock" | "action" | "recents" | null;

type ShellUIContextValue = {
  popover: Popover;
  open: (p: Exclude<Popover, null>) => void;
  toggle: (p: Exclude<Popover, null>) => void;
  close: () => void;
};

const ShellUIContext = createContext<ShellUIContextValue | null>(null);

export function ShellUIProvider({ children }: { children: React.ReactNode }) {
  const [popover, setPopover] = useState<Popover>(null);
  const { windows, activeWindowId, focusWindow } = useOs();

  const open = useCallback(
    (p: Exclude<Popover, null>) => setPopover(p),
    [],
  );
  const toggle = useCallback(
    (p: Exclude<Popover, null>) => setPopover((prev) => (prev === p ? null : p)),
    [],
  );
  const close = useCallback(() => setPopover(null), []);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Esc closes popovers only if one is open (don't eat the key otherwise).
      if (e.key === "Escape" && popover) {
        e.preventDefault();
        setPopover(null);
        return;
      }

      const isMac =
        typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

      // Win / Cmd+Space / Super → open launcher
      const isLauncherChord =
        e.key === "Meta" ||
        (isMac && e.metaKey && e.code === "Space") ||
        (e.key === "OS" && !e.metaKey);

      if (isLauncherChord) {
        e.preventDefault();
        setPopover((prev) => (prev === "launcher" ? null : "launcher"));
        return;
      }

      // Alt+Tab / Cmd+` → cycle windows
      const isCycleChord =
        (e.altKey && e.key === "Tab") || (e.metaKey && e.key === "`");
      if (isCycleChord && windows.length > 0) {
        e.preventDefault();
        const visible = windows.filter((w) => !w.minimized);
        if (visible.length === 0) return;
        const idx = visible.findIndex((w) => w.id === activeWindowId);
        const nextIdx = e.shiftKey
          ? (idx - 1 + visible.length) % visible.length
          : (idx + 1) % visible.length;
        focusWindow(visible[nextIdx].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [popover, windows, activeWindowId, focusWindow]);

  const value = useMemo(
    () => ({ popover, open, toggle, close }),
    [popover, open, toggle, close],
  );

  return <ShellUIContext.Provider value={value}>{children}</ShellUIContext.Provider>;
}

export function useShellUI() {
  const ctx = useContext(ShellUIContext);
  if (!ctx) throw new Error("useShellUI must be used within ShellUIProvider");
  return ctx;
}
