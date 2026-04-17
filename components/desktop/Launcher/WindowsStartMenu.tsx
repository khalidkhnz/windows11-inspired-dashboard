"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Power } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useOs } from "@/context/OsContext";
import { owner } from "@/lib/portfolio";
import { AppIcon } from "@/components/desktop/AppIcon";
import type { LauncherProps } from "./types";

export function WindowsStartMenu({ open, onClose }: LauncherProps) {
  const { apps, openApp } = useOs();
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) onClose();
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const t = window.setTimeout(() => {
      window.addEventListener("mousedown", handleClick);
      window.addEventListener("keydown", handleEsc);
    }, 0);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  const pinned = apps.filter((a) => a.pinnedInStart);
  const recommended = apps.filter((a) => a.recommended);

  const filteredPinned = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pinned;
    return pinned.filter((a) => a.title.toLowerCase().includes(q));
  }, [pinned, query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed bottom-[60px] left-1/2 z-50 w-[620px] max-w-[92vw] -translate-x-1/2 overflow-hidden rounded-[10px]",
            "border border-white/[0.08] bg-[rgba(20,20,22,0.92)] text-neutral-100",
            "shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7),0_0_0_0.5px_rgba(255,255,255,0.04)]",
            "backdrop-blur-2xl backdrop-saturate-150",
          )}
        >
          {/* top inner highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(96,205,255,0.08),transparent_60%)]" />
          <div className="relative px-7 pt-7">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps, settings, and documents"
                className="h-10 rounded-[6px] border-white/[0.08] bg-white/[0.03] pl-10 text-sm placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-sky-400/50"
              />
            </div>
          </div>

          <div className="relative px-7 pb-4 pt-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[13px] font-semibold text-neutral-100">Pinned</h2>
              <button className="text-[11px] text-neutral-400 hover:text-neutral-200">
                All apps &rsaquo;
              </button>
            </div>
            <div className="mt-4 grid grid-cols-6 gap-1">
              {filteredPinned.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    openApp(app.id);
                    onClose();
                  }}
                  className="group flex flex-col items-center gap-2 rounded-md px-2 py-3 transition-colors hover:bg-white/[0.07]"
                >
                  <AppIcon icon={app.icon} className="h-10 w-10" glyphClassName="h-5 w-5" />
                  <span className="line-clamp-1 text-center text-[11px] tracking-tight text-neutral-200">
                    {app.title}
                  </span>
                </button>
              ))}
              {filteredPinned.length === 0 && (
                <div className="col-span-6 py-8 text-center text-xs text-neutral-500">
                  No apps match &ldquo;{query}&rdquo;.
                </div>
              )}
            </div>
          </div>

          {recommended.length > 0 && !query && (
            <div className="relative px-7 pb-6">
              <div className="flex items-baseline justify-between">
                <h2 className="text-[13px] font-semibold text-neutral-100">Recommended</h2>
                <button className="text-[11px] text-neutral-400 hover:text-neutral-200">
                  More &rsaquo;
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-1">
                {recommended.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      openApp(app.id);
                      onClose();
                    }}
                    className="flex items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-white/[0.07]"
                  >
                    <AppIcon icon={app.icon} className="h-8 w-8" glyphClassName="h-4 w-4" />
                    <div className="min-w-0">
                      <div className="truncate text-[12px] tracking-tight text-neutral-100">
                        {app.title}
                      </div>
                      <div className="truncate text-[10px] text-neutral-500">
                        Recently used
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative flex items-center justify-between border-t border-white/[0.07] bg-white/[0.015] px-7 py-3">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/10">
                <Image src={owner.avatar} alt={owner.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-medium">{owner.name}</span>
                <span className="text-[10px] text-neutral-500">{owner.email}</span>
              </div>
            </div>
            <button
              className="rounded-md p-2 text-neutral-300 transition-colors hover:bg-white/10"
              aria-label="Power"
              onClick={() => onClose()}
            >
              <Power className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
