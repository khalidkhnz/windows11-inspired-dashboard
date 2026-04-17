"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { AppIcon } from "@/components/desktop/AppIcon";
import type { LauncherProps } from "./types";

export function LinuxActivities({ open, onClose }: LauncherProps) {
  const { apps, openApp } = useOs();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = apps.filter((a) => a.Content);
    return q
      ? base.filter((a) => a.title.toLowerCase().includes(q))
      : base;
  }, [apps, query]);

  const favorites = apps.filter((a) => a.pinnedInTaskbar);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-xl"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* search + workspace strip */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to search"
                  className="w-full rounded-full bg-white/10 px-9 py-1.5 text-sm text-white placeholder:text-white/50 outline-none ring-1 ring-white/15 focus:ring-[#e95420]/60"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={cn(
                    "flex h-16 w-28 items-center justify-center rounded-md border border-white/20 bg-black/40 text-[10px] text-white/60",
                    n === 1 && "ring-1 ring-white/70",
                  )}
                >
                  Workspace {n}
                </div>
              ))}
            </div>
          </div>

          {/* grid */}
          <div className="flex flex-1 flex-col items-center px-8 py-8">
            <div className="grid w-full max-w-[960px] grid-cols-6 gap-x-8 gap-y-8">
              {filtered.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    openApp(app.id);
                    onClose();
                  }}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 ring-1 ring-white/10">
                    <AppIcon
                      icon={app.icon}
                      className="h-10 w-10"
                      glyphClassName="h-5 w-5"
                      rounded="rounded-full"
                    />
                  </div>
                  <span className="line-clamp-1 text-center text-[12px] text-white/90">
                    {app.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* favorites dock */}
          <div className="flex justify-center pb-6">
            <div className="flex gap-1 rounded-lg bg-black/60 p-1 ring-1 ring-white/10">
              {favorites.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    openApp(app.id);
                    onClose();
                  }}
                  title={app.title}
                  className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10"
                >
                  <AppIcon
                    icon={app.icon}
                    className="h-7 w-7"
                    glyphClassName="h-4 w-4"
                    rounded="rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
