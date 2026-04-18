"use client";

import { format } from "date-fns";
import {
  Wifi,
  Volume2,
  BatteryMedium,
  Power,
  Accessibility,
  Grid2x2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { useShellUI } from "@/context/ShellUIContext";
import { AppIcon } from "@/components/desktop/AppIcon";
import { StartMenu } from "@/components/desktop/StartMenu";
import { ClockPopover } from "@/components/desktop/ClockPopover";
import { ActionCenter } from "@/components/desktop/ActionCenter";
import { useClock } from "@/hooks/useClock";

export function LinuxShell() {
  const { apps, windows, activeWindowId, openApp, restoreOrMinimize } = useOs();
  const { popover, open, toggle, close } = useShellUI();
  const activitiesOpen = popover === "launcher";
  const clockOpen = popover === "clock";
  const systemOpen = popover === "action";
  const now = useClock();

  const dashApps = apps.filter((a) => a.pinnedInTaskbar);

  return (
    <>
      {/* Top panel */}
      <header
        className="fixed inset-x-0 top-0 z-50 flex h-8 items-center justify-between bg-black/70 px-3 text-[12px] font-medium text-white"
      >
        <button
          onClick={() => toggle("launcher")}
          className={cn(
            "rounded px-2 py-0.5 hover:bg-white/15",
            activitiesOpen && "bg-white/15",
          )}
        >
          Activities
        </button>
        <button
          onClick={() => toggle("clock")}
          className={cn(
            "rounded px-2 py-0.5 tabular-nums hover:bg-white/15",
            clockOpen && "bg-white/15",
          )}
        >
          {format(now, "EEE MMM d  HH:mm")}
        </button>
        <button
          onClick={() => toggle("action")}
          className={cn(
            "flex items-center gap-2 rounded px-2 py-0.5 hover:bg-white/15",
            systemOpen && "bg-white/15",
          )}
          aria-label="System menu"
        >
          <Accessibility className="h-3.5 w-3.5" />
          <Volume2 className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <BatteryMedium className="h-3.5 w-3.5" />
          <Power className="h-3.5 w-3.5" />
        </button>
      </header>

      {/* Bottom dash */}
      <footer className="fixed inset-x-0 bottom-3 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 rounded-lg bg-black/70 p-1 ring-1 ring-white/10 backdrop-blur">
          {dashApps.map((app) => {
            const instances = windows.filter((w) => w.appId === app.id);
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
                <AppIcon
                  icon={app.icon}
                  className="h-7 w-7"
                  glyphClassName="h-4 w-4"
                  rounded="rounded-md"
                />
                {hasWindow && (
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-sm",
                      isActive ? "bg-[#e95420]" : "bg-white/40",
                    )}
                  />
                )}
              </button>
            );
          })}
          <div className="mx-1 h-6 w-px bg-white/15" />
          <button
            onClick={() => open("launcher")}
            className="flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10"
            aria-label="Show apps"
          >
            <Grid2x2 className="h-4 w-4" />
          </button>
        </div>
      </footer>

      <StartMenu open={activitiesOpen} onClose={close} />
      <ClockPopover open={clockOpen} onClose={close} now={now} />
      <ActionCenter open={systemOpen} onClose={close} />
    </>
  );
}
