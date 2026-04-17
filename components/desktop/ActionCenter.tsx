"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Wifi,
  Bluetooth,
  Plane,
  Sun,
  Volume2,
  Moon,
  Focus,
  Accessibility,
  Palette,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const TILES = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi, on: true },
  { id: "bluetooth", label: "Bluetooth", icon: Bluetooth, on: false },
  { id: "airplane", label: "Airplane", icon: Plane, on: false },
  { id: "focus", label: "Focus", icon: Focus, on: false },
  { id: "night", label: "Night light", icon: Moon, on: false },
  { id: "a11y", label: "Accessibility", icon: Accessibility, on: false },
];

export function ActionCenter({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiles, setTiles] = useState(TILES);
  const { reset: resetTheme } = useTheme();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const t = window.setTimeout(() => window.addEventListener("mousedown", handler), 0);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("mousedown", handler);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.16 }}
          className={cn(
            "fixed bottom-[60px] right-3 z-50 w-[360px] overflow-hidden rounded-xl",
            "border border-white/10 bg-neutral-900/95 p-4 text-neutral-100 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150",
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
          <div className="relative grid grid-cols-3 gap-2">
            {tiles.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() =>
                    setTiles((prev) =>
                      prev.map((x) => (x.id === t.id ? { ...x, on: !x.on } : x)),
                    )
                  }
                  className={cn(
                    "flex h-[58px] flex-col items-start justify-between rounded-lg border p-2 text-left text-[11px] transition-colors",
                    t.on
                      ? "border-sky-400/40 bg-sky-500/20 text-white"
                      : "border-white/10 bg-white/[0.03] text-neutral-300 hover:bg-white/[0.06]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-4 space-y-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center gap-3">
              <Volume2 className="h-4 w-4 text-neutral-400" />
              <Slider defaultValue={[70]} max={100} step={1} className="flex-1" />
            </div>
            <div className="flex items-center gap-3">
              <Sun className="h-4 w-4 text-neutral-400" />
              <Slider defaultValue={[85]} max={100} step={1} className="flex-1" />
            </div>
          </div>

          <button
            onClick={() => {
              resetTheme();
              onClose();
              window.location.href = "/";
            }}
            className="relative mt-3 flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-neutral-200 hover:bg-white/[0.06]"
          >
            <Palette className="h-4 w-4" />
            Change theme…
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
