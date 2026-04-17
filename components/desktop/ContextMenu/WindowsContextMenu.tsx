"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ContextMenuProps } from "./types";

export function WindowsContextMenu({ x, y, items, onItemClick }: ContextMenuProps) {
  return (
    <motion.ul
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.1 }}
      style={{ left: x, top: y }}
      className={cn(
        "fixed z-50 min-w-[220px] overflow-hidden rounded-lg border border-white/10",
        "bg-neutral-900/95 p-1.5 text-sm text-neutral-100 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150",
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.label}>
            <button
              onClick={() => onItemClick(item)}
              className="flex w-full items-center gap-3 rounded-md px-2.5 py-1.5 text-left text-[13px] text-neutral-200 hover:bg-white/10"
            >
              <Icon className="h-4 w-4 text-neutral-400" />
              {item.label}
              {item.shortcut && (
                <span className="ml-auto text-[11px] text-neutral-500">{item.shortcut}</span>
              )}
            </button>
          </li>
        );
      })}
    </motion.ul>
  );
}
