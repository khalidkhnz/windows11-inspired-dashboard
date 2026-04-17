"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import WindowsLoading from "@/components/WindowsLoading/WindowsLoading";
import { owner } from "@/lib/portfolio";
import { useThemeChoice } from "@/context/ThemeContext";

/** Theme-aware boot/sign-in overlay. */
export function BootAnimation() {
  const theme = useThemeChoice("lockscreen");
  if (theme === "macos") return <MacBoot />;
  if (theme === "linux") return <LinuxBoot />;
  return <WindowsBoot />;
}

function WindowsBoot() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative h-28 w-28 overflow-hidden rounded-full ring-1 ring-white/20">
        <Image src={owner.avatar} alt={owner.name} fill className="object-cover" />
      </div>
      <div className="mt-6">
        <WindowsLoading />
      </div>
      <div className="mt-20 text-sm text-white/90">Welcome</div>
    </div>
  );
}

function MacBoot() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Apple className="h-16 w-16 text-white" fill="currentColor" />
      </motion.div>
      <div className="mt-10 h-1 w-44 overflow-hidden rounded-full bg-white/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-full bg-white"
        />
      </div>
    </div>
  );
}

function LinuxBoot() {
  const lines = [
    "[  OK  ] Reached target Graphical Interface.",
    "[  OK  ] Started Session 1 of user khalid.",
    "[  OK  ] Mounted /home/khalid.",
    "[  OK  ] Starting GNOME Shell…",
    `Welcome to Ubuntu 24.04 LTS (${owner.handle})`,
  ];
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black font-mono text-[12px] text-neutral-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-6 text-2xl font-semibold text-[#e95420]"
      >
        ubuntu
      </motion.div>
      <div className="w-[520px] max-w-[80vw] space-y-1">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.18 }}
          >
            {l}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
