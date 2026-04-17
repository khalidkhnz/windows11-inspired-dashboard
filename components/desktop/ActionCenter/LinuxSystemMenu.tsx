"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Wifi,
  Bluetooth,
  Sun,
  Volume2,
  Settings,
  Lock,
  Power,
  Palette,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/context/ThemeContext";
import { owner } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import type { ActionCenterProps } from "./types";

export function LinuxSystemMenu({ open, onClose }: ActionCenterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
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
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "fixed top-10 right-3 z-50 w-[300px] overflow-hidden rounded-lg",
            "bg-[#2d2d2d] text-white ring-1 ring-black/50",
            "shadow-[0_20px_60px_-10px_rgba(0,0,0,0.75)]",
          )}
        >
          <div className="divide-y divide-black/40">
            <Row
              icon={<Volume2 className="h-4 w-4" />}
              label={<Slider defaultValue={[70]} max={100} step={1} className="flex-1" />}
            />
            <Row
              icon={<Sun className="h-4 w-4" />}
              label={<Slider defaultValue={[85]} max={100} step={1} className="flex-1" />}
            />
            <Toggle
              icon={<Wifi className="h-4 w-4" />}
              label="Home Network"
              on={wifi}
              onClick={() => setWifi((v) => !v)}
            />
            <Toggle
              icon={<Bluetooth className="h-4 w-4" />}
              label={bluetooth ? "Bluetooth On" : "Bluetooth Off"}
              on={bluetooth}
              onClick={() => setBluetooth((v) => !v)}
            />
            <SimpleRow
              icon={<Palette className="h-4 w-4" />}
              label="Change theme…"
              onClick={() => {
                resetTheme();
                onClose();
                window.location.href = "/";
              }}
            />
            <SimpleRow icon={<Settings className="h-4 w-4" />} label="Settings" />
          </div>

          {/* User + power actions */}
          <div className="flex items-center justify-between gap-3 border-t border-black/40 bg-black/30 p-3">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/10">
                <Image src={owner.avatar} alt={owner.name} fill className="object-cover" />
              </div>
              <span className="text-[12px]">{owner.handle}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconButton label="Lock"><Lock className="h-4 w-4" /></IconButton>
              <IconButton label="Power"><Power className="h-4 w-4" /></IconButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 text-[12px]">
      <span className="text-white/75">{icon}</span>
      <div className="flex-1">{label}</div>
    </div>
  );
}

function Toggle({
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
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[12px] hover:bg-white/5"
    >
      <span className={cn("text-white/75", on && "text-[#e95420]")}>{icon}</span>
      <span className="flex-1">{label}</span>
      <span
        className={cn(
          "h-4 w-7 rounded-full p-0.5 transition-colors",
          on ? "bg-[#e95420]" : "bg-white/15",
        )}
      >
        <span
          className={cn(
            "block h-3 w-3 rounded-full bg-white transition-transform",
            on ? "translate-x-3" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}

function SimpleRow({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[12px] hover:bg-white/5"
    >
      <span className="text-white/75">{icon}</span>
      <span className="flex-1">{label}</span>
    </button>
  );
}

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}
