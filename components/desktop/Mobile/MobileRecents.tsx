"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { AppIcon } from "@/components/desktop/AppIcon";
import type { AppDefinition } from "@/types/os";

/** Virtual viewport size the preview is rendered at, then scaled to fit the card. */
const PREVIEW_VW = 390;
const PREVIEW_VH = 820;

/**
 * Recents carousel: live app previews for every open window. Tap to
 * focus, tap close to dismiss. Tapping the backdrop closes the recents.
 */
export function MobileRecents({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { windows, appsById, focusWindow, closeWindow } = useOs();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[55] flex flex-col bg-black/70 backdrop-blur-xl"
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 pb-3 pt-8 text-white/80">
            <span className="text-sm font-medium">Recents</span>
            <span className="text-[11px] text-white/50">{windows.length} open</span>
          </div>
          <div className="flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8">
            {windows.length === 0 && (
              <div className="flex w-full items-center justify-center text-sm text-white/60">
                No apps running
              </div>
            )}
            {windows.map((w) => {
              const app = appsById[w.appId];
              if (!app) return null;
              return (
                <div
                  key={w.id}
                  className="relative flex h-full w-full flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <WindowPreview app={app} windowId={w.id} />

                  {/* Tap-to-focus overlay sits above the preview */}
                  <button
                    type="button"
                    onClick={() => {
                      focusWindow(w.id);
                      onClose();
                    }}
                    aria-label={`Open ${w.title}`}
                    className="absolute inset-0 z-10"
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(w.id);
                    }}
                    className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-white"
                    aria-label={`Close ${w.title}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  {/* Footer label */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] flex items-center gap-2.5 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-3 pb-3 pt-12">
                    <AppIcon
                      icon={app.icon}
                      className="h-9 w-9 shadow-md"
                      glyphClassName="h-4 w-4"
                      rounded="rounded-[10px]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium text-white">
                        {w.title}
                      </div>
                      <div
                        className={cn(
                          "text-[10px]",
                          w.minimized ? "text-white/50" : "text-emerald-300",
                        )}
                      >
                        {w.minimized ? "Paused" : "Active"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WindowPreview({
  app,
  windowId,
}: {
  app: AppDefinition;
  windowId: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.35);
  const Content = app.Content;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / PREVIEW_VW);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (!Content) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-950">
        <AppIcon
          icon={app.icon}
          className="h-20 w-20 opacity-80"
          glyphClassName="h-8 w-8"
          rounded="rounded-[20px]"
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 overflow-hidden bg-neutral-950"
      aria-hidden
    >
      <div
        style={{
          width: PREVIEW_VW,
          height: PREVIEW_VH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Content windowId={windowId} />
      </div>
    </div>
  );
}
