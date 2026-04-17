"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** The animated 4-tile mark that fades in on the welcome screen. */
export function IntroLogo({ className }: { className?: string }) {
  const tiles = [
    { color: "bg-sky-400", delay: 0 },
    { color: "bg-emerald-400", delay: 0.08 },
    { color: "bg-amber-400", delay: 0.16 },
    { color: "bg-rose-400", delay: 0.24 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn("grid h-14 w-14 grid-cols-2 gap-1.5", className)}
      aria-hidden
    >
      {tiles.map((t, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: t.delay, ease: [0.22, 1, 0.36, 1] }}
          className={cn("h-full w-full rounded-[4px]", t.color)}
        />
      ))}
    </motion.div>
  );
}
