"use client";

import { Triangle, Circle, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { useShellUI } from "@/context/ShellUIContext";

type Props = {
  accent: string;
  background: string;
};

/** Android-style 3-button nav: back, home, recent apps. */
export function AndroidNavBar({ accent, background }: Props) {
  const { activeWindowId, closeWindow, minimizeAll } = useOs();
  const { toggle } = useShellUI();

  return (
    <footer
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex h-14 items-center justify-around px-8 text-white",
        background,
      )}
    >
      <button
        onClick={() => {
          if (activeWindowId != null) closeWindow(activeWindowId);
        }}
        className="flex h-10 w-12 items-center justify-center rounded-full transition-colors active:bg-white/10"
        aria-label="Back"
      >
        <Triangle className={cn("h-4 w-4 -rotate-90", accent)} strokeWidth={2.5} />
      </button>
      <button
        onClick={minimizeAll}
        className="flex h-10 w-12 items-center justify-center rounded-full transition-colors active:bg-white/10"
        aria-label="Home"
      >
        <Circle className="h-5 w-5" strokeWidth={2} />
      </button>
      <button
        onClick={() => toggle("recents")}
        className="flex h-10 w-12 items-center justify-center rounded-full transition-colors active:bg-white/10"
        aria-label="Recent apps"
      >
        <Square className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </footer>
  );
}
