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
import { Cloud, Sun, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClockPopoverProps } from "./types";

/** Mac Notification Center — two columns of widgets. */
export function MacOSClockPopover({ open, onClose, now }: ClockPopoverProps) {
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
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          className="fixed right-3 top-10 z-50 w-[320px] space-y-3"
        >
          {/* Calendar widget */}
          <Widget>
            <div className="flex items-baseline justify-between">
              <div className="text-[11px] uppercase tracking-wider text-rose-400">
                {format(now, "EEEE")}
              </div>
              <div className="text-[10px] text-white/40">Calendar</div>
            </div>
            <div className="mt-1 text-4xl font-bold">{format(now, "d")}</div>
            <div className="mt-0.5 text-sm text-white/70">
              {format(now, "MMMM yyyy")}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-white/40">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1 text-center text-[11px]">
              {Array.from({ length: leadingBlanks }).map((_, i) => (
                <span key={`b-${i}`} />
              ))}
              {days.map((d) => (
                <span
                  key={d.toISOString()}
                  className={cn(
                    "flex h-5 items-center justify-center rounded-full",
                    isSameDay(d, now)
                      ? "bg-rose-500 font-semibold text-white"
                      : "text-white/70",
                  )}
                >
                  {format(d, "d")}
                </span>
              ))}
            </div>
          </Widget>

          {/* Weather widget */}
          <Widget>
            <div className="flex items-baseline justify-between">
              <div className="text-[11px] uppercase tracking-wider text-sky-300">
                Bangalore
              </div>
              <div className="text-[10px] text-white/40">Weather</div>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <Sun className="h-10 w-10 text-amber-300" />
              <div>
                <div className="text-3xl font-semibold">27°</div>
                <div className="text-xs text-white/60">Sunny</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-white/50">
              <Cloud className="h-3.5 w-3.5" />
              H:31° · L:22°
            </div>
          </Widget>

          {/* World clock widget */}
          <Widget>
            <div className="flex items-baseline justify-between">
              <div className="text-[11px] uppercase tracking-wider text-violet-300">
                World Clock
              </div>
              <div className="text-[10px] text-white/40">
                <Clock className="h-3 w-3" />
              </div>
            </div>
            <div className="mt-2 space-y-1.5 text-[12px]">
              <Row label="Bangalore" time={format(now, "h:mm a")} />
              <Row
                label="London"
                time={format(
                  new Date(now.getTime() - 4.5 * 60 * 60 * 1000),
                  "h:mm a",
                )}
              />
              <Row
                label="New York"
                time={format(
                  new Date(now.getTime() - 9.5 * 60 * 60 * 1000),
                  "h:mm a",
                )}
              />
            </div>
          </Widget>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-neutral-800/60 p-3 ring-1 ring-white/10 backdrop-blur-xl backdrop-saturate-180 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.5)]">
      {children}
    </div>
  );
}

function Row({ label, time }: { label: string; time: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-white/70">{label}</span>
      <span className="tabular-nums text-white">{time}</span>
    </div>
  );
}
