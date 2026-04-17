"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Wifi,
  Bluetooth,
  Plane,
  Focus,
  Moon,
  Sun,
  Volume2,
  Music2,
  Airplay,
  Palette,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { ActionCenterProps } from "./types";

export function MacOSControlCenter({ open, onClose }: ActionCenterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airplane, setAirplane] = useState(false);
  const [focus, setFocus] = useState(false);
  const [dark, setDark] = useState(true);
  const { reset: resetTheme } = useTheme();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const t = window.setTimeout(() => window.addEventListener("mousedown", handler), 0);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("mousedown", handler);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ y: -10, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -10, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className={cn(
            "fixed top-10 right-3 z-50 w-[320px] overflow-hidden rounded-2xl",
            "bg-neutral-800/60 p-3 text-white ring-1 ring-white/10",
            "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-180",
          )}
        >
          {/* Connectivity group */}
          <Group>
            <ToggleRow
              icon={<Wifi className="h-4 w-4" />}
              label="Wi-Fi"
              sub="Home Network"
              on={wifi}
              onClick={() => setWifi((v) => !v)}
            />
            <ToggleRow
              icon={<Bluetooth className="h-4 w-4" />}
              label="Bluetooth"
              sub="On"
              on={bluetooth}
              onClick={() => setBluetooth((v) => !v)}
            />
            <ToggleRow
              icon={<Plane className="h-4 w-4" />}
              label="AirDrop"
              sub={airplane ? "On" : "Contacts Only"}
              on={airplane}
              onClick={() => setAirplane((v) => !v)}
            />
          </Group>

          {/* Modes group */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <ModeTile
              icon={<Focus className="h-4 w-4" />}
              label="Focus"
              on={focus}
              onClick={() => setFocus((v) => !v)}
            />
            <ModeTile
              icon={<Moon className="h-4 w-4" />}
              label="Dark Mode"
              on={dark}
              onClick={() => setDark((v) => !v)}
            />
          </div>

          {/* Sliders */}
          <Group className="mt-2">
            <SliderRow icon={<Sun className="h-4 w-4" />} label="Display" defaultValue={85} />
            <SliderRow icon={<Volume2 className="h-4 w-4" />} label="Sound" defaultValue={70} />
          </Group>

          {/* Now playing */}
          <div className="mt-2 flex items-center gap-3 rounded-xl bg-black/30 p-2.5 ring-1 ring-white/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-rose-500 to-amber-500">
              <Music2 className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium">Khalid&apos;s Portfolio</div>
              <div className="truncate text-[11px] text-white/60">Developer Suite</div>
            </div>
            <Airplay className="h-4 w-4 text-white/70" />
          </div>

          <button
            onClick={() => {
              resetTheme();
              onClose();
              window.location.href = "/";
            }}
            className="mt-2 flex w-full items-center gap-2 rounded-xl bg-black/30 px-3 py-2 text-[12px] ring-1 ring-white/5 hover:bg-black/40"
          >
            <Palette className="h-4 w-4" />
            Change theme…
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Group({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "divide-y divide-white/5 rounded-xl bg-black/30 ring-1 ring-white/5",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ToggleRow({
  icon,
  label,
  sub,
  on,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-3 py-2 text-left"
    >
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full",
          on ? "bg-[#0a84ff] text-white" : "bg-white/10 text-white/70",
        )}
      >
        {icon}
      </span>
      <div className="flex-1">
        <div className="text-[12px] font-medium">{label}</div>
        <div className="text-[11px] text-white/60">{sub}</div>
      </div>
    </button>
  );
}

function ModeTile({
  icon,
  label,
  on,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl bg-black/30 px-3 py-3 text-left text-[12px] ring-1 ring-white/5 hover:bg-black/40"
    >
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full",
          on ? "bg-[#0a84ff] text-white" : "bg-white/10 text-white/70",
        )}
      >
        {icon}
      </span>
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-[10px] text-white/50">{on ? "On" : "Off"}</div>
      </div>
    </button>
  );
}

function SliderRow({
  icon,
  label,
  defaultValue,
}: {
  icon: React.ReactNode;
  label: string;
  defaultValue: number;
}) {
  return (
    <div className="px-3 py-3">
      <div className="mb-1 flex items-center gap-2 text-[11px] text-white/70">
        {icon}
        {label}
      </div>
      <Slider defaultValue={[defaultValue]} max={100} step={1} />
    </div>
  );
}
