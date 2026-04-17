"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  getDay,
} from "date-fns";
import { Play, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClockPopoverProps } from "./types";

/** GNOME calendar-style popover with a mini media player strip. */
export function LinuxClockPopover({ open, onClose, now }: ClockPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

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

  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const leadingBlanks = getDay(monthStart);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.16 }}
          className={cn(
            "fixed top-10 left-1/2 z-50 w-[360px] -translate-x-1/2 overflow-hidden rounded-lg",
            "bg-[#2d2d2d] text-white ring-1 ring-black/50",
            "shadow-[0_20px_60px_-10px_rgba(0,0,0,0.75)]",
          )}
        >
          {/* Date */}
          <div className="border-b border-black/40 px-4 py-3">
            <div className="text-sm font-medium">
              {format(now, "EEEE, MMMM d")}
            </div>
          </div>

          {/* Mini calendar */}
          <div className="border-b border-black/40 px-4 py-3">
            <div className="mb-2 flex items-center justify-between text-[12px]">
              <span className="font-medium">{format(now, "MMMM yyyy")}</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-white/50">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1 text-center text-[11px]">
              {Array.from({ length: (leadingBlanks + 6) % 7 }).map((_, i) => (
                <span key={`b-${i}`} />
              ))}
              {days.map((d) => (
                <span
                  key={d.toISOString()}
                  className={cn(
                    "flex h-6 items-center justify-center rounded-sm",
                    isSameDay(d, now)
                      ? "bg-[#e95420] font-medium text-white"
                      : "text-white/80 hover:bg-white/10",
                  )}
                >
                  {format(d, "d")}
                </span>
              ))}
            </div>
          </div>

          {/* Media */}
          <div className="px-4 py-3">
            <div className="text-[10px] uppercase tracking-wider text-white/50">
              Media
            </div>
            <div className="mt-2 flex items-center gap-3 rounded-md bg-black/30 px-3 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-br from-[#e95420] to-amber-500">
                <Play className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px]">Portfolio OS</div>
                <div className="truncate text-[10px] text-white/50">
                  Khalid — GNOME Edition
                </div>
              </div>
              <button className="rounded p-1 hover:bg-white/10">
                <SkipBack className="h-3.5 w-3.5" />
              </button>
              <button className="rounded p-1 hover:bg-white/10">
                <SkipForward className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
