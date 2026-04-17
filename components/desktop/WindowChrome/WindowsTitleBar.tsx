"use client";

import { Minus, Square, Copy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/desktop/AppIcon";
import type { TitleBarProps } from "./types";

export function WindowsTitleBar({
  title,
  icon,
  active,
  maximized,
  onDragStart,
  onDoubleClick,
  onMinimize,
  onMaximize,
  onClose,
}: TitleBarProps) {
  return (
    <div
      className={cn(
        "relative flex h-9 items-center justify-between border-b border-white/[0.06] pl-3 pr-0 text-xs",
        active ? "bg-white/[0.04]" : "bg-transparent",
      )}
    >
      <div
        onMouseDown={onDragStart}
        onDoubleClick={onDoubleClick}
        className="flex h-full flex-1 cursor-grab items-center gap-2 select-none active:cursor-grabbing"
      >
        <AppIcon icon={icon} className="h-4 w-4" glyphClassName="h-2.5 w-2.5" rounded="rounded-[4px]" />
        <span className="truncate text-[12px] text-neutral-200">{title}</span>
      </div>
      <div className="flex h-full items-stretch">
        <button
          aria-label="Minimize"
          onClick={onMinimize}
          className="flex h-full w-11 items-center justify-center text-neutral-300 transition-colors hover:bg-white/10"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          aria-label={maximized ? "Restore" : "Maximize"}
          onClick={onMaximize}
          className="flex h-full w-11 items-center justify-center text-neutral-300 transition-colors hover:bg-white/10"
        >
          {maximized ? <Copy className="h-3.5 w-3.5" /> : <Square className="h-3 w-3" />}
        </button>
        <button
          aria-label="Close"
          onClick={onClose}
          className="flex h-full w-11 items-center justify-center text-neutral-300 transition-colors hover:bg-red-500 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
