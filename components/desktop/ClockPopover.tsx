"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from "date-fns";
import { cn } from "@/lib/utils";

export function ClockPopover({
  open,
  onClose,
  now,
}: {
  open: boolean;
  onClose: () => void;
  now: Date;
}) {
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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.16 }}
          className={cn(
            "fixed bottom-[60px] right-3 z-50 w-[320px] overflow-hidden rounded-xl",
            "border border-white/10 bg-neutral-950/90 text-neutral-100 shadow-2xl backdrop-blur-2xl",
          )}
        >
          <div className="border-b border-white/5 px-5 pb-4 pt-5">
            <div className="text-4xl font-light tabular-nums">
              {format(now, "hh:mm")}
              <span className="ml-1 text-xl text-neutral-400">{format(now, "a")}</span>
            </div>
            <div className="mt-1 text-xs text-neutral-400">
              {format(now, "EEEE, MMMM d, yyyy")}
            </div>
          </div>

          <div className="px-5 py-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">{format(now, "MMMM yyyy")}</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-neutral-500">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: leadingBlanks }).map((_, i) => (
                <span key={`b-${i}`} />
              ))}
              {days.map((d) => (
                <span
                  key={d.toISOString()}
                  className={cn(
                    "flex h-7 items-center justify-center rounded-full text-neutral-300",
                    isSameDay(d, now) && "bg-sky-500 font-medium text-white",
                  )}
                >
                  {format(d, "d")}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
