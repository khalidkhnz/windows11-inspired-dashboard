"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  LogOut,
  Settings as SettingsIcon,
  Terminal as TerminalIcon,
  Palette,
} from "lucide-react";
import { useOs } from "@/context/OsContext";
import { useTheme } from "@/context/ThemeContext";
import { ThemedContextMenu, type ContextMenuItem } from "./ContextMenu";

type Menu = { x: number; y: number } | null;

/**
 * Selector used to tag DOM regions that should show the native browser context
 * menu instead of ours (windows, forms, shell chrome). If the right-click
 * target is inside any of these, we bail out and let the browser handle it.
 */
const NATIVE_MENU_ZONES =
  "[data-native-ctx-menu], [data-app-window], input, textarea, [contenteditable='true']";

export default function DesktopContextMenu({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<Menu>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openApp } = useOs();
  const { reset: resetTheme } = useTheme();
  const router = useRouter();

  // Global contextmenu handler — far more reliable than relying on a static
  // wrapper <div> receiving the event through Wallpaper / ShellFrame layering.
  useEffect(() => {
    const onCtx = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(NATIVE_MENU_ZONES)) return;
      e.preventDefault();
      const padX = 240;
      const padY = 260;
      setMenu({
        x: Math.min(e.clientX, window.innerWidth - padX),
        y: Math.min(e.clientY, window.innerHeight - padY),
      });
    };
    document.addEventListener("contextmenu", onCtx);
    return () => document.removeEventListener("contextmenu", onCtx);
  }, []);

  // Dismiss on outside pointerdown / Esc.
  useEffect(() => {
    if (!menu) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target || !menuRef.current?.contains(target)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    // Defer so the pointer event that just opened the menu doesn't close it.
    const id = window.setTimeout(() => {
      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("keydown", onKey);
    }, 0);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const items: ContextMenuItem[] = [
    { label: "Refresh", icon: RefreshCw, onClick: () => window.location.reload() },
    { label: "Open Terminal", icon: TerminalIcon, onClick: () => openApp("terminal") },
    {
      label: "Display settings",
      icon: SettingsIcon,
      onClick: () => openApp("settings"),
    },
    {
      label: "Change theme",
      icon: Palette,
      onClick: () => {
        resetTheme();
        router.push("/");
      },
    },
    { label: "Lock", icon: LogOut, onClick: () => router.push("/") },
  ];

  return (
    <>
      {children}
      <AnimatePresence>
        {menu && (
          <div ref={menuRef}>
            <ThemedContextMenu
              x={menu.x}
              y={menu.y}
              items={items}
              onItemClick={(item) => {
                item.onClick();
                setMenu(null);
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
