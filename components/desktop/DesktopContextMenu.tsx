"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { RefreshCw, LogOut, Settings as SettingsIcon, Terminal as TerminalIcon } from "lucide-react";
import { useOs } from "@/context/OsContext";
import { ThemedContextMenu, type ContextMenuItem } from "./ContextMenu";

type Menu = { x: number; y: number } | null;

export default function DesktopContextMenu({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<Menu>(null);
  const { openApp } = useOs();
  const router = useRouter();

  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(null);
    window.addEventListener("click", close);
    window.addEventListener("contextmenu", close);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("contextmenu", close);
    };
  }, [menu]);

  const items: ContextMenuItem[] = [
    { label: "Refresh", icon: RefreshCw, onClick: () => window.location.reload() },
    { label: "Open Terminal", icon: TerminalIcon, onClick: () => openApp("terminal") },
    { label: "Display settings", icon: SettingsIcon, onClick: () => openApp("settings") },
    { label: "Lock", icon: LogOut, onClick: () => router.push("/") },
  ];

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        const padX = 220;
        const padY = 240;
        setMenu({
          x: Math.min(e.clientX, window.innerWidth - padX),
          y: Math.min(e.clientY, window.innerHeight - padY),
        });
      }}
      // `relative` (no z-index) lifts this wrapper above the absolute Wallpaper
      // sibling in source order without creating a new stacking context that
      // would trap nested fixed elements (windows, shell chrome).
      className="relative h-full w-full"
    >
      {children}
      <AnimatePresence>
        {menu && (
          <ThemedContextMenu
            x={menu.x}
            y={menu.y}
            items={items}
            onItemClick={(item) => {
              item.onClick();
              setMenu(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
