"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ContextMenuProps } from "./types";

/** Flat, hover-fill, no icons — GNOME-ish. */
export function LinuxContextMenu({ x, y, items, onItemClick }: ContextMenuProps) {
  return (
    <motion.ul
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.1 }}
      style={{ left: x, top: y }}
      className={cn(
        "fixed z-50 min-w-[220px] overflow-hidden rounded-md",
        "bg-[#2d2d2d] p-1 text-[13px] text-white/90 ring-1 ring-black/50",
        "shadow-[0_16px_40px_-8px_rgba(0,0,0,0.65)]",
      )}
    >
      {items.map((item) => (
        <li key={item.label}>
          <button
            onClick={() => onItemClick(item)}
            className="flex w-full items-center justify-between rounded-sm px-3 py-1.5 text-left hover:bg-[#e95420] hover:text-white"
          >
            <span>{item.label}</span>
            {item.shortcut && (
              <span className="text-[11px] text-white/40">{item.shortcut}</span>
            )}
          </button>
        </li>
      ))}
    </motion.ul>
  );
}
