"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Power } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useOs } from "@/context/OsContext";
import { owner } from "@/lib/portfolio";

export function StartMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    // defer so the opening click doesn't immediately close it
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
            "fixed bottom-[60px] left-1/2 z-50 w-[640px] max-w-[92vw] -translate-x-1/2 overflow-hidden rounded-xl",
            "border border-white/10 bg-neutral-950/90 text-neutral-100 shadow-2xl backdrop-blur-2xl",
          )}
        >
          <div className="px-7 pt-7">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps"
                className="h-10 rounded-full border-white/10 bg-white/5 pl-10 text-sm placeholder:text-neutral-500 focus-visible:ring-sky-500/40"
              />
            </div>
          </div>

          <div className="px-7 pb-3 pt-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xs font-medium text-neutral-200">Pinned</h2>
              <span className="text-[11px] text-neutral-500">All apps &gt;</span>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-1">
              {filteredPinned.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    openApp(app.id);
                    onClose();
                  }}
                  className="group flex flex-col items-center gap-1 rounded-md px-2 py-3 transition-colors hover:bg-white/5"
                >
                  <div className="relative h-10 w-10">
                    <Image
                      src={app.icon}
                      alt=""
                      fill
                      className={cn("object-contain", app.iconClassName)}
                    />
                  </div>
                  <span className="line-clamp-1 text-center text-[11px] text-neutral-200">
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
            <div className="px-7 pb-5">
              <h2 className="text-xs font-medium text-neutral-200">Recommended</h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {recommended.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      openApp(app.id);
                      onClose();
                    }}
                    className="flex items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-white/5"
                  >
                    <div className="relative h-8 w-8 flex-shrink-0">
                      <Image
                        src={app.icon}
                        alt=""
                        fill
                        className={cn("object-contain", app.iconClassName)}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-xs text-neutral-100">{app.title}</div>
                      <div className="truncate text-[10px] text-neutral-500">Recently used</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-white/10 bg-neutral-950/80 px-7 py-3">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/10">
                <Image src={owner.avatar} alt={owner.name} fill className="object-cover" />
              </div>
              <span className="text-sm">{owner.name}</span>
            </div>
            <button
              className="rounded-md p-1.5 text-neutral-300 transition-colors hover:bg-white/10"
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
