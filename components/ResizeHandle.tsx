"use client";

import { cn } from "@/lib/utils";

interface ResizeHandleProps {
  direction:
    | "n"
    | "s"
    | "e"
    | "w"
    | "ne"
    | "nw"
    | "se"
    | "sw";
  onMouseDown: (e: React.MouseEvent, direction: string) => void;
}

export default function ResizeHandle({
  direction,
  onMouseDown,
}: ResizeHandleProps) {
  const cursorClasses = {
    n: "cursor-ns-resize",
    s: "cursor-ns-resize",
    e: "cursor-ew-resize",
    w: "cursor-ew-resize",
    ne: "cursor-nesw-resize",
    nw: "cursor-nwse-resize",
    se: "cursor-nwse-resize",
    sw: "cursor-nesw-resize",
  };

  const positionClasses = {
    n: "top-0 left-0 right-0 h-1",
    s: "bottom-0 left-0 right-0 h-1",
    e: "top-0 right-0 bottom-0 w-1",
    w: "top-0 left-0 bottom-0 w-1",
    ne: "top-0 right-0 h-3 w-3",
    nw: "top-0 left-0 h-3 w-3",
    se: "bottom-0 right-0 h-3 w-3",
    sw: "bottom-0 left-0 h-3 w-3",
  };

  return (
    <div
      onMouseDown={(e) => onMouseDown(e, direction)}
      className={cn(
        "absolute z-50 hover:bg-blue-500/20",
        cursorClasses[direction],
        positionClasses[direction],
      )}
    />
  );
}
