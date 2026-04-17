"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { AppIcon } from "@/components/desktop/AppIcon";
import type { LauncherProps } from "./types";

const PAGE_SIZE = 28;

export function MacOSLaunchpad({ open, onClose }: LauncherProps) {
  const { apps, openApp } = useOs();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setPage(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = apps.filter((a) => a.Content);
    return q
      ? base.filter((a) => a.title.toLowerCase().includes(q))
      : base;
  }, [apps, query]);

  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const pageApps = visible.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-2xl"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="mb-8 w-80">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full rounded-full bg-white/15 px-9 py-1.5 text-sm text-white placeholder:text-white/50 outline-none ring-1 ring-white/20 focus:ring-white/40"
              />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-x-10 gap-y-8">
            {pageApps.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  openApp(app.id);
                  onClose();
                }}
                className="group flex w-20 flex-col items-center gap-1.5"
              >
                <AppIcon
                  icon={app.icon}
                  className="h-16 w-16 transition-transform group-hover:scale-110"
                  glyphClassName="h-8 w-8"
                  rounded="rounded-[18px]"
                />
                <span className="line-clamp-1 text-center text-[12px] text-white/90 [text-shadow:_0_1px_2px_rgb(0_0_0_/_60%)]">
                  {app.title}
                </span>
              </button>
            ))}
          </div>
          {pages > 1 && (
            <div className="mt-10 flex items-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    i === page ? "bg-white" : "bg-white/30",
                  )}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
