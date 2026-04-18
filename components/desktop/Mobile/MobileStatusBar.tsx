"use client";

import { useRef } from "react";
import { format } from "date-fns";
import { Wifi, Signal, BatteryMedium } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClock } from "@/hooks/useClock";
import { useShellUI } from "@/context/ShellUIContext";
import type { Theme } from "@/types/theme";

const SWIPE_DOWN_PX = 20;

/**
 * Top status bar for mobile shells. Pulls down the theme's action panel
 * when the user swipes down from the top edge. macOS also paints a
 * Dynamic Island-style notch centered at the top.
 */
export function MobileStatusBar({ theme }: { theme: Theme }) {
  const now = useClock();
  const { open } = useShellUI();
  const startY = useRef(0);
  const consumed = useRef(false);

  function handlePointerDown(e: React.PointerEvent<HTMLElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    startY.current = e.clientY;
    consumed.current = false;
  }

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (consumed.current) return;
    const dy = e.clientY - startY.current;
    if (dy >= SWIPE_DOWN_PX) {
      consumed.current = true;
      open("action");
    }
  }

  const sharedHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    style: { touchAction: "none" as const },
  };

  if (theme === "macos") {
    return (
      <>
        <header
          {...sharedHandlers}
          className="fixed inset-x-0 top-0 z-50 flex h-8 items-center justify-between px-6 text-[12px] font-semibold text-white"
        >
          <span className="tabular-nums">{format(now, "h:mm")}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryMedium className="h-3.5 w-3.5" />
          </div>
        </header>
        {/* Dynamic Island */}
        <div
          aria-hidden
          className="pointer-events-none fixed left-1/2 top-1.5 z-[51] h-[22px] w-[108px] -translate-x-1/2 rounded-full bg-black"
        />
      </>
    );
  }

  return (
    <header
      {...sharedHandlers}
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
