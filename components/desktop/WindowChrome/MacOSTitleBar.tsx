"use client";

import { Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TitleBarProps } from "./types";

export function MacOSTitleBar({
  title,
  active,
  onDragStart,
  onDoubleClick,
  onMinimize,
  onMaximize,
  onClose,
}: TitleBarProps) {
  return (
    <div
      onMouseDown={onDragStart}
      onDoubleClick={onDoubleClick}
      className={cn(
        "relative flex h-8 select-none items-center px-3 text-xs",
        active ? "bg-neutral-800/80" : "bg-neutral-800/50",
        "cursor-grab active:cursor-grabbing",
      )}
    >
      <div className="group flex items-center gap-2">
        <TrafficLight color="red" label="Close" onClick={onClose}>
          <X className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100" strokeWidth={3} />
        </TrafficLight>
        <TrafficLight color="amber" label="Minimize" onClick={onMinimize}>
          <Minus className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100" strokeWidth={3} />
        </TrafficLight>
        <TrafficLight color="emerald" label="Zoom" onClick={onMaximize}>
          <Plus className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100" strokeWidth={3} />
        </TrafficLight>
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "truncate text-[12px] font-medium",
            active ? "text-white/95" : "text-white/50",
          )}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

function TrafficLight({
  color,
  label,
  onClick,
  children,
}: {
  color: "red" | "amber" | "emerald";
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const bg = {
    red: "bg-[#ff5f57] hover:bg-[#ff5f57]",
    amber: "bg-[#febc2e] hover:bg-[#febc2e]",
    emerald: "bg-[#28c840] hover:bg-[#28c840]",
  }[color];
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
      className={cn(
        "flex h-3 w-3 items-center justify-center rounded-full ring-1 ring-black/20 transition-transform",
        bg,
      )}
    >
      {children}
    </button>
  );
}
