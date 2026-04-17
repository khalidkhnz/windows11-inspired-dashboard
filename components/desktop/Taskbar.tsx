"use client";

import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Search, Wifi, Volume2, BatteryMedium } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { useShellUI } from "@/context/ShellUIContext";
import { ICONS } from "@/lib/icons";
import { StartMenu } from "./StartMenu";
import { ClockPopover } from "./ClockPopover";
import { ActionCenter } from "./ActionCenter";
import { AppIcon } from "./AppIcon";
import { useClock } from "@/hooks/useClock";

export default function Taskbar() {
  const { apps, windows, activeWindowId, openApp, restoreOrMinimize } = useOs();
  const { popover, toggle, close } = useShellUI();
  const startOpen = popover === "launcher";
  const clockOpen = popover === "clock";
  const actionOpen = popover === "action";
  const now = useClock();

  const pinned = apps.filter((a) => a.pinnedInTaskbar);
  const running = windows;

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
          "fixed inset-x-0 bottom-0 z-40 flex h-[52px] items-center justify-center",
          // Mica acrylic — more premium translucency and hairline top stroke
          "border-t border-white/[0.07] bg-neutral-950/75 backdrop-blur-2xl backdrop-saturate-150",
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-white/0 before:via-white/[0.12] before:to-white/0",
          "after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%)]",
        )}
      >
        <div className="relative flex items-center gap-1">
          <button
            aria-label="Start"
            onClick={() => toggle("launcher")}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-md transition-colors",
              startOpen ? "bg-white/15" : "hover:bg-white/10",
            )}
          >
            <Image src={ICONS.START} alt="" className="h-6 w-6" />
            {startOpen && (
              <span className="absolute bottom-1 h-0.5 w-4 rounded-full bg-sky-400" />
            )}
          </button>
          <button
            aria-label="Search"
            onClick={() => toggle("launcher")}
            className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-200 transition-colors hover:bg-white/10"
          >
            <Search className="h-4 w-4" />
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
                  isActive ? "bg-white/15" : "hover:bg-white/10",
                )}
              >
                <AppIcon icon={app.icon} className="h-6 w-6" glyphClassName="h-3.5 w-3.5" rounded="rounded-md" />
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
            onClick={() => toggle("action")}
            className={cn(
              "flex h-10 items-center gap-2 rounded-md px-2 text-neutral-200 transition-colors hover:bg-white/10",
              actionOpen && "bg-white/15",
            )}
            aria-label="Quick settings"
          >
            <Wifi className="h-4 w-4" />
            <Volume2 className="h-4 w-4" />
            <BatteryMedium className="h-4 w-4" />
          </button>
          <button
            onClick={() => toggle("clock")}
            className={cn(
              "flex h-10 items-center rounded-md px-3 text-right text-[11px] leading-tight text-neutral-100 transition-colors hover:bg-white/10",
              clockOpen && "bg-white/15",
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

      <StartMenu open={startOpen} onClose={close} />
      <ClockPopover open={clockOpen} onClose={close} now={now} />
      <ActionCenter open={actionOpen} onClose={close} />
    </>
  );
}
