"use client";

import { cn } from "@/lib/utils";
import type { Theme } from "@/types/theme";

/**
 * Tiny OS preview rendered inside picker tiles. Stylized, not pixel-accurate —
 * just enough visual differentiation between the three presets.
 */
export function ThemePreview({ theme, className }: { theme: Theme; className?: string }) {
  if (theme === "windows") return <WindowsPreview className={className} />;
  if (theme === "macos") return <MacOSPreview className={className} />;
  return <LinuxPreview className={className} />;
}

function WindowsPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-md",
        "bg-gradient-to-br from-sky-700 via-indigo-800 to-fuchsia-900",
        className,
      )}
    >
      {/* window */}
      <div className="absolute left-3 top-3 h-[52%] w-[60%] rounded-md bg-neutral-800/80 ring-1 ring-white/10 backdrop-blur-sm">
        <div className="flex h-4 items-center justify-end gap-1 px-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        </div>
      </div>
      {/* taskbar */}
      <div className="absolute inset-x-3 bottom-2 flex h-5 items-center justify-center gap-1 rounded bg-neutral-900/70 ring-1 ring-white/10 backdrop-blur">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 w-2 rounded-sm",
              i === 0 ? "bg-sky-400" : "bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function MacOSPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-md",
        "bg-gradient-to-br from-rose-300 via-amber-200 to-sky-300",
        className,
      )}
    >
      {/* menu bar */}
      <div className="absolute inset-x-0 top-0 flex h-3 items-center gap-1 bg-black/30 px-1.5 backdrop-blur">
        <span className="h-1 w-1 rounded-full bg-white/80" />
        <span className="ml-1 h-1 w-5 rounded-sm bg-white/50" />
      </div>
      {/* window with traffic lights */}
      <div className="absolute left-3 top-5 h-[48%] w-[62%] rounded-md bg-white/80 ring-1 ring-black/10">
        <div className="flex h-3.5 items-center gap-1 px-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </div>
      </div>
      {/* dock */}
      <div className="absolute inset-x-4 bottom-1.5 flex h-5 items-center justify-center gap-1 rounded-md bg-white/40 ring-1 ring-black/5 backdrop-blur-md">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-3 w-3 rounded-md",
              ["bg-sky-500", "bg-emerald-500", "bg-rose-500", "bg-amber-500", "bg-violet-500"][i],
            )}
          />
        ))}
      </div>
    </div>
  );
}

function LinuxPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-md",
        "bg-gradient-to-br from-[#2d1b2b] via-[#4a2530] to-[#e95420]",
        className,
      )}
    >
      {/* top panel */}
      <div className="absolute inset-x-0 top-0 flex h-3.5 items-center justify-between bg-black/50 px-1.5">
        <span className="text-[6px] font-medium tracking-wide text-white/80">Activities</span>
        <span className="h-1 w-6 rounded-sm bg-white/40" />
      </div>
      {/* GNOME window with single close button */}
      <div className="absolute left-3 top-5 h-[48%] w-[62%] rounded-md bg-[#2d2d2d] ring-1 ring-white/10">
        <div className="flex h-3.5 items-center justify-end gap-1 px-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </div>
      </div>
      {/* dash */}
      <div className="absolute bottom-1.5 left-1/2 flex h-5 -translate-x-1/2 items-center gap-1 rounded bg-black/60 px-1 ring-1 ring-white/10">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-sm bg-[#e95420]/80"
            style={{ opacity: 1 - i * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}
