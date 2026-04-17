"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ContextMenuProps } from "./types";

/** Narrow rows, right-aligned shortcuts, heavy translucency. */
export function MacOSContextMenu({ x, y, items, onItemClick }: ContextMenuProps) {
  return (
    <motion.ul
      initial={{ opacity: 0, scale: 0.98, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -4 }}
      transition={{ duration: 0.1 }}
      style={{ left: x, top: y }}
      className={cn(
        "fixed z-50 min-w-[220px] overflow-hidden rounded-md",
        "bg-neutral-800/70 p-1 text-[12px] text-white/90 ring-1 ring-black/40",
        "shadow-[0_18px_50px_-10px_rgba(0,0,0,0.55)] backdrop-blur-2xl backdrop-saturate-180",
      )}
    >
      {items.map((item) => (
        <li key={item.label}>
          <button
            onClick={() => onItemClick(item)}
            className="group flex w-full items-center gap-3 rounded-[4px] px-2 py-1 text-left hover:bg-[#0a84ff] hover:text-white"
          >
            <span className="flex-1 truncate">{item.label}</span>
            {item.shortcut && (
              <span className="text-[11px] text-white/45 group-hover:text-white/80">
                {item.shortcut}
              </span>
            )}
          </button>
        </li>
      ))}
    </motion.ul>
  );
}
