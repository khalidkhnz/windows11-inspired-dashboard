"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TitleBarProps } from "./types";

/** GNOME client-side decoration (CSD): title centered, only close on the right. */
export function LinuxTitleBar({
  title,
  active,
  onDragStart,
  onDoubleClick,
  onClose,
}: TitleBarProps) {
  return (
    <div
      onMouseDown={onDragStart}
      onDoubleClick={onDoubleClick}
      className={cn(
        "relative flex h-10 select-none items-center justify-between px-2 text-xs",
        "cursor-grab active:cursor-grabbing",
        active
          ? "bg-[linear-gradient(180deg,#3b3b3b,#2d2d2d)] border-b border-black/40"
          : "bg-[#2d2d2d] border-b border-black/40",
      )}
    >
      <span className="w-6" />
      <span
        className={cn(
          "truncate text-[13px] font-medium",
          active ? "text-white/95" : "text-white/55",
        )}
      >
        {title}
      </span>
      <button
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
