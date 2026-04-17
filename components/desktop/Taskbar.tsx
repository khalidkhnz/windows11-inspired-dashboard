"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Search, Wifi, Volume2, BatteryMedium } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { ICONS } from "@/lib/icons";
import { StartMenu } from "./StartMenu";
import { ClockPopover } from "./ClockPopover";
import { ActionCenter } from "./ActionCenter";
import { useClock } from "@/hooks/useClock";

export default function Taskbar() {
  const { apps, windows, activeWindowId, openApp, restoreOrMinimize } = useOs();
  const [startOpen, setStartOpen] = useState(false);
  const [clockOpen, setClockOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const now = useClock();

  const pinned = apps.filter((a) => a.pinnedInTaskbar);
  const running = windows;

  // Merge pinned + running, but only show "running" badge for those that actually have windows.
  const seen = new Set<string>();
  const taskbarApps = [
    ...pinned.map((a) => ({ app: a, instances: running.filter((w) => w.appId === a.id) })),
    ...running
      .filter((w) => !pinned.some((p) => p.id === w.appId))
      .reduce<
        { app: (typeof apps)[number]; instances: typeof running }[]
      >((acc, w) => {
        if (seen.has(w.appId)) return acc;
        seen.add(w.appId);
        const app = apps.find((a) => a.id === w.appId);
        if (!app) return acc;
        acc.push({ app, instances: running.filter((r) => r.appId === w.appId) });
        return acc;
      }, []),
  ];

  return (
    <>
      <footer
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex h-[52px] items-center justify-center border-t border-white/5",
          "bg-neutral-950/70 backdrop-blur-xl",
        )}
      >
        <div className="flex items-center gap-1">
          <button
            aria-label="Start"
            onClick={() => {
              setStartOpen((v) => !v);
              setActionOpen(false);
              setClockOpen(false);
            }}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-md transition-colors",
              startOpen ? "bg-white/10" : "hover:bg-white/5",
            )}
          >
            <Image src={ICONS.START} alt="" className="h-6 w-6" />
            {startOpen && (
              <span className="absolute bottom-1 h-0.5 w-4 rounded-full bg-sky-400" />
            )}
          </button>
          <button
            aria-label="Search"
            onClick={() => {
              setStartOpen((v) => !v);
              setActionOpen(false);
              setClockOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-300 transition-colors hover:bg-white/5"
          >
            <Search className="h-5 w-5" />
          </button>

          {taskbarApps.map(({ app, instances }) => {
            const hasWindow = instances.length > 0;
            const isActive = instances.some((i) => i.id === activeWindowId);
            return (
              <button
                key={app.id}
                onClick={() => {
                  if (hasWindow) restoreOrMinimize(instances[0].id);
                  else openApp(app.id);
                }}
                title={app.title}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                  isActive ? "bg-white/10" : "hover:bg-white/5",
                )}
              >
                <Image src={app.icon} alt="" className={cn("h-6 w-6 object-contain", app.iconClassName)} />
                {hasWindow && (
                  <motion.span
                    layoutId={`indicator-${app.id}`}
                    className={cn(
                      "absolute bottom-1 h-0.5 rounded-full",
                      isActive ? "w-4 bg-sky-400" : "w-1.5 bg-neutral-400",
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <button
            onClick={() => {
              setActionOpen((v) => !v);
              setClockOpen(false);
              setStartOpen(false);
            }}
            className={cn(
              "flex h-10 items-center gap-2 rounded-md px-2 text-neutral-300 transition-colors hover:bg-white/5",
              actionOpen && "bg-white/10",
            )}
            aria-label="Quick settings"
          >
            <Wifi className="h-4 w-4" />
            <Volume2 className="h-4 w-4" />
            <BatteryMedium className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setClockOpen((v) => !v);
              setActionOpen(false);
              setStartOpen(false);
            }}
            className={cn(
              "flex h-10 items-center rounded-md px-3 text-right text-[11px] leading-tight text-neutral-200 transition-colors hover:bg-white/5",
              clockOpen && "bg-white/10",
            )}
            aria-label="Clock"
          >
            <div className="flex flex-col">
              <span>{format(now, "hh:mm a")}</span>
              <span className="text-neutral-400">{format(now, "MMM d, yyyy")}</span>
            </div>
          </button>
        </div>
      </footer>

      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} />
      <ClockPopover open={clockOpen} onClose={() => setClockOpen(false)} now={now} />
      <ActionCenter open={actionOpen} onClose={() => setActionOpen(false)} />
    </>
  );
}
