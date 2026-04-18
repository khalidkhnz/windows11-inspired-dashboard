"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Wifi,
  Bluetooth,
  Plane,
  Moon,
  Sun,
  Volume2,
  BatteryMedium,
  RotateCw,
  Focus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Theme } from "@/types/theme";

type Props = {
  open: boolean;
  onClose: () => void;
  theme: Theme;
};

/**
 * Pull-down status / control panel shown on mobile shells. Style varies
 * per OS (iOS Control Centre, Android shade, Windows quick settings).
 */
export function MobileActionPanel({ open, onClose, theme }: Props) {
  const isMac = theme === "macos";
  const title = isMac
    ? "Control Centre"
    : theme === "linux"
      ? "Quick settings"
      : "Quick actions";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-[54] bg-black/40 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ y: "-110%" }}
            animate={{ y: 0 }}
            exit={{ y: "-110%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className={cn(
              "fixed inset-x-0 top-0 z-[56] overflow-hidden px-4 pb-7 pt-10",
              isMac
                ? "rounded-b-[28px] bg-[rgba(30,30,34,0.75)] backdrop-blur-2xl backdrop-saturate-150"
                : theme === "linux"
                  ? "bg-[#1d1d1d]/95 backdrop-blur-xl"
                  : "rounded-b-2xl bg-neutral-950/90 backdrop-blur-xl",
            )}
          >
            <div className="mb-4 flex items-center justify-between text-white">
              <span className="text-sm font-medium">{title}</span>
              <span className="text-[11px] text-white/50">swipe up to close</span>
            </div>

            <QuickToggles theme={theme} />
            <SlidersBlock theme={theme} />
            <StatusRow />

            <button
              onClick={onClose}
              aria-label="Close"
              className="mx-auto mt-4 block h-1 w-10 rounded-full bg-white/30"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const TOGGLES = [
  { id: "wifi", label: "Wi-Fi", Icon: Wifi, defaultOn: true },
  { id: "bluetooth", label: "Bluetooth", Icon: Bluetooth, defaultOn: true },
  { id: "airplane", label: "Airplane", Icon: Plane, defaultOn: false },
  { id: "dnd", label: "Do Not Disturb", Icon: Moon, defaultOn: false },
  { id: "rotation", label: "Rotation lock", Icon: RotateCw, defaultOn: false },
  { id: "focus", label: "Focus", Icon: Focus, defaultOn: false },
] as const;

function QuickToggles({ theme }: { theme: Theme }) {
  const [on, setOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(TOGGLES.map((t) => [t.id, t.defaultOn])),
  );

  const activeBg =
    theme === "macos"
      ? "bg-[#0a84ff] text-white"
      : theme === "linux"
        ? "bg-[#e95420] text-white"
        : "bg-sky-500 text-white";

  return (
    <div className="grid grid-cols-3 gap-2">
      {TOGGLES.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => setOn((prev) => ({ ...prev, [id]: !prev[id] }))}
          className={cn(
            "flex flex-col items-start gap-2 rounded-xl p-3 text-left transition-colors",
            on[id] ? activeBg : "bg-white/[0.06] text-white/75",
          )}
        >
          <Icon className="h-4 w-4" />
          <span className="text-[11px] leading-tight">{label}</span>
        </button>
      ))}
    </div>
  );
}

function SlidersBlock({ theme }: { theme: Theme }) {
  const [brightness, setBrightness] = useState(72);
  const [volume, setVolume] = useState(48);

  const track =
    theme === "macos"
      ? "bg-white/20"
      : theme === "linux"
        ? "bg-white/15"
        : "bg-white/15";
  const fill =
    theme === "macos"
      ? "bg-white"
      : theme === "linux"
        ? "bg-[#e95420]"
        : "bg-sky-400";

  return (
    <div className="mt-3 space-y-2">
      <Slider
        icon={<Sun className="h-4 w-4" />}
        value={brightness}
        onChange={setBrightness}
        track={track}
        fill={fill}
      />
      <Slider
        icon={<Volume2 className="h-4 w-4" />}
        value={volume}
        onChange={setVolume}
        track={track}
        fill={fill}
      />
    </div>
  );
}

function Slider({
  icon,
  value,
  onChange,
  track,
  fill,
}: {
  icon: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  track: string;
  fill: string;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-2.5">
      <span className="text-white/80">{icon}</span>
      <div className={cn("relative h-1.5 flex-1 overflow-hidden rounded-full", track)}>
        <div className={cn("h-full", fill)} style={{ width: `${value}%` }} />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="sr-only"
      />
    </label>
  );
}

function StatusRow() {
  return (
    <div className="mt-3 flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 text-[11px] text-white/70">
      <span className="flex items-center gap-1.5">
        <BatteryMedium className="h-3.5 w-3.5" /> 84%
      </span>
      <span>LTE · TechnoTribes</span>
    </div>
  );
}
