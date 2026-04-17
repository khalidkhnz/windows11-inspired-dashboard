"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { Power, Volume2, Wifi, BatteryMedium, Accessibility } from "lucide-react";
import Wallpaper from "@/components/desktop/Wallpaper";
import { owner } from "@/lib/portfolio";
import { BootAnimation } from "./BootAnimation";
import type { LockVariantProps } from "./types";

export function LinuxLockScreen({ stage, signingIn, now, onSignIn }: LockVariantProps) {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white">
      <Wallpaper blur={stage !== "lock"} />

      {/* GNOME top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center justify-between bg-black/55 px-4 text-[12px] backdrop-blur">
        <span className="font-medium">Activities</span>
        <span className="font-medium tabular-nums">
          {format(now, "EEE MMM d  HH:mm")}
        </span>
        <div className="flex items-center gap-3">
          <Accessibility className="h-3.5 w-3.5" />
          <Volume2 className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <BatteryMedium className="h-3.5 w-3.5" />
          <Power className="h-3.5 w-3.5" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {stage === "lock" && (
          <motion.section
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex h-full w-full flex-col items-center justify-center"
          >
            <div className="text-[112px] font-light leading-none tabular-nums">
              {format(now, "HH:mm")}
            </div>
            <div className="mt-2 text-base text-white/80">
              {format(now, "EEEE, d MMMM")}
            </div>
            <div className="mt-12 text-xs text-white/60">
              Click to unlock
            </div>
          </motion.section>
        )}

        {stage === "signin" && (
          <motion.section
            key="signin"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 flex h-full w-full flex-col items-center justify-center"
          >
            <div className="w-[340px] rounded-xl bg-[#2d2d2d]/95 p-6 ring-1 ring-white/10 shadow-2xl">
              <div className="flex flex-col items-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-white/15">
                  <Image src={owner.avatar} alt={owner.name} fill className="object-cover" />
                </div>
                <h1 className="mt-4 text-base font-medium">{owner.name}</h1>
                <p className="text-xs text-white/60">{owner.handle}</p>
              </div>

              <input
                type="password"
                placeholder="Password"
                className="mt-5 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none ring-[#e95420]/0 focus:ring-2 focus:ring-[#e95420]/60"
              />
              <button
                onClick={onSignIn}
                disabled={signingIn}
                className="mt-3 w-full rounded-md bg-[#e95420] px-3 py-2 text-sm font-medium text-white hover:bg-[#f0602f] disabled:opacity-60"
              >
                {signingIn ? "Signing in…" : "Sign In"}
              </button>
              <button className="mt-3 w-full text-center text-xs text-white/60 hover:text-white/90">
                Not listed?
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {signingIn && <BootAnimation />}
    </main>
  );
}
