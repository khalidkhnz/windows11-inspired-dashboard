"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { RefreshCw, LogOut, Settings as SettingsIcon, Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";

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

  const items = [
    {
      label: "Refresh",
      icon: RefreshCw,
      onClick: () => window.location.reload(),
    },
    {
      label: "Open Terminal",
      icon: TerminalIcon,
      onClick: () => openApp("terminal"),
    },
    {
      label: "Display settings",
      icon: SettingsIcon,
      onClick: () => openApp("settings"),
    },
    {
      label: "Lock",
      icon: LogOut,
      onClick: () => router.push("/"),
    },
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
      className="h-full w-full"
    >
      {children}
      <AnimatePresence>
        {menu && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.1 }}
            style={{ left: menu.x, top: menu.y }}
            className={cn(
              "fixed z-50 min-w-[220px] rounded-lg border border-white/10",
              "bg-neutral-950/95 p-1.5 text-sm text-neutral-100 shadow-2xl backdrop-blur-xl",
            )}
          >
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      item.onClick();
                      setMenu(null);
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-2.5 py-1.5 text-left text-[13px] text-neutral-200 hover:bg-white/10"
                  >
                    <Icon className="h-4 w-4 text-neutral-400" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
