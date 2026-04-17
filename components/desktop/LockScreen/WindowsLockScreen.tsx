"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { ChevronRight, Wifi, BatteryMedium, Accessibility } from "lucide-react";
import Wallpaper from "@/components/desktop/Wallpaper";
import { owner } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { BootAnimation } from "./BootAnimation";
import type { LockVariantProps } from "./types";

export function WindowsLockScreen({ stage, signingIn, now, onSignIn }: LockVariantProps) {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white">
      <Wallpaper blur={stage !== "lock"} />

      <AnimatePresence mode="wait">
        {stage === "lock" && (
          <motion.section
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex h-full w-full flex-col items-center justify-center"
          >
            <div className="text-[116px] font-light leading-none tabular-nums [text-shadow:_0_4px_20px_rgba(0,0,0,0.4)]">
              {format(now, "hh:mm")}
            </div>
            <div className="mt-4 text-xl font-light text-white/90">
              {format(now, "EEEE, MMMM d")}
            </div>
            <div className="mt-16 text-sm text-white/70">
              Press any key or click to continue
            </div>
          </motion.section>
        )}

        {stage === "signin" && (
          <motion.section
            key="signin"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-full w-full flex-col items-center justify-center"
          >
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-1 ring-white/20 backdrop-blur">
              <Image src={owner.avatar} alt={owner.name} fill className="object-cover" />
            </div>
            <h1 className="mt-5 text-2xl font-light">{owner.name}</h1>
            <p className="mt-1 text-sm text-white/70">{owner.role}</p>

            <button
              onClick={onSignIn}
              disabled={signingIn}
              className={cn(
                "mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-2.5 text-sm",
                "backdrop-blur-lg transition-all hover:bg-white/25",
                "disabled:opacity-60",
              )}
            >
              {signingIn ? "Signing in…" : "Sign in"}
              {!signingIn && <ChevronRight className="h-4 w-4" />}
            </button>

            <p className="mt-3 text-xs text-white/60">
              Guest access · no password needed
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-between px-6 text-xs text-white/70">
        <span>{owner.handle}.portfolio.os</span>
        <div className="flex items-center gap-3">
          <Accessibility className="h-4 w-4" />
          <Wifi className="h-4 w-4" />
          <BatteryMedium className="h-4 w-4" />
        </div>
      </div>

      {signingIn && <BootAnimation />}
    </main>
  );
}
