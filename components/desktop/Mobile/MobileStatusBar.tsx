"use client";

import { format } from "date-fns";
import { Wifi, Signal, BatteryMedium } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClock } from "@/hooks/useClock";
import type { Theme } from "@/types/theme";

/**
 * Top status bar shown on every mobile shell. The layout mimics the active
 * OS: iOS centers the notch with time on the left, Android/Windows-phone
 * use a single-row layout.
 */
export function MobileStatusBar({ theme }: { theme: Theme }) {
  const now = useClock();

  if (theme === "macos") {
    return (
      <header className="fixed inset-x-0 top-0 z-50 flex h-8 items-center justify-between px-6 text-[12px] font-semibold text-white">
        <span className="tabular-nums">{format(now, "h:mm")}</span>
        <div className="flex items-center gap-1.5">
          <Signal className="h-3 w-3" />
          <Wifi className="h-3 w-3" />
          <BatteryMedium className="h-3.5 w-3.5" />
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex h-7 items-center justify-between px-4 text-[11px] font-medium text-white",
        theme === "linux" ? "bg-black/40" : "bg-black/30",
      )}
    >
      <span className="tabular-nums">{format(now, "h:mm")}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <BatteryMedium className="h-3.5 w-3.5" />
      </div>
    </header>
  );
}
