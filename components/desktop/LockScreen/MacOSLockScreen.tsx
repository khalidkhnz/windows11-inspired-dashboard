"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { Wifi, BatteryMedium, Search } from "lucide-react";
import Wallpaper from "@/components/desktop/Wallpaper";
import { owner } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { BootAnimation } from "./BootAnimation";
import type { LockVariantProps } from "./types";

export function MacOSLockScreen({ stage, signingIn, now, onSignIn }: LockVariantProps) {
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (stage !== "signin") return;
    const onKey = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key) && pin.length < 4) setPin((p) => p + e.key);
      if (e.key === "Backspace") setPin((p) => p.slice(0, -1));
      if (e.key === "Enter") onSignIn();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, pin, onSignIn]);

  return (
    <main
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      style={{ fontFamily: "var(--font-sans), -apple-system, system-ui, sans-serif" }}
    >
      <Wallpaper blur={stage !== "lock"} />

      {/* macOS menu bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center justify-between bg-black/30 px-4 text-[12px] backdrop-blur-md">
        <div className="flex items-center gap-4 font-medium">
          <span>{format(now, "EEEE")}</span>
          <span className="text-white/70">{format(now, "MMM d")}</span>
        </div>
        <div className="flex items-center gap-3 text-white/90">
          <BatteryMedium className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <Search className="h-3.5 w-3.5" />
          <span className="tabular-nums">{format(now, "h:mm a")}</span>
        </div>
      </div>

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
            <div className="text-[112px] font-semibold leading-none tabular-nums [text-shadow:_0_4px_30px_rgba(0,0,0,0.45)]">
              {format(now, "h:mm")}
            </div>
            <div className="mt-2 text-lg font-medium text-white/90">
              {format(now, "EEEE, MMMM d")}
            </div>
          </motion.section>
        )}

        {stage === "signin" && (
          <motion.section
            key="signin"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-10 flex h-full w-full flex-col items-center justify-center"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-1 ring-white/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
              <Image src={owner.avatar} alt={owner.name} fill className="object-cover" />
            </div>
            <h1 className="mt-4 text-lg font-medium">{owner.name}</h1>

            <div className="mt-4 flex items-center gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border border-white/50",
                    i < pin.length && "bg-white",
                  )}
                />
              ))}
            </div>
            <button
              onClick={onSignIn}
              disabled={signingIn}
              className="mt-6 text-xs text-white/80 underline-offset-4 hover:underline disabled:opacity-60"
            >
              {signingIn ? "Signing in…" : "Enter password · or click here"}
            </button>
            <p className="mt-2 text-[11px] text-white/50">Touch ID / Enter to continue</p>
          </motion.section>
        )}
      </AnimatePresence>

      {signingIn && <BootAnimation />}
    </main>
  );
}
