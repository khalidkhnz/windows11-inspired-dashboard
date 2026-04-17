"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Shuffle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemePreview } from "./ThemePreview";
import {
  DEFAULT_CHOICES,
  THEMABLE_COMPONENTS,
  THEMES,
  THEME_LABELS,
  type Theme,
  type ThemableComponent,
  type ThemeChoices,
} from "@/types/theme";

const COMPONENT_LABELS: Record<ThemableComponent, string> = {
  taskbar: "Taskbar / Dock / Panel",
  window: "Window chrome",
  icons: "App icons",
  lockscreen: "Lock screen",
  startMenu: "Launcher",
  terminal: "Terminal",
  fileExplorer: "File Explorer",
  contextMenu: "Context menus",
  clockPopover: "Clock popover",
  actionCenter: "Action / Control Center",
  desktopIcons: "Desktop icons",
  wallpaper: "Wallpaper",
  fonts: "Fonts",
  cursors: "Cursors",
  scrollbars: "Scrollbars",
};

type CustomPickerProps = {
  choices: ThemeChoices;
  onChange: (next: ThemeChoices) => void;
};

export function CustomPicker({ choices, onChange }: CustomPickerProps) {
  const mostCommon = useMemo<Theme>(() => {
    const tally: Record<Theme, number> = { windows: 0, macos: 0, linux: 0 };
    for (const c of Object.values(choices)) tally[c]++;
    return (Object.entries(tally) as [Theme, number][]).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
  }, [choices]);

  function setOne(key: ThemableComponent, theme: Theme) {
    onChange({ ...choices, [key]: theme });
  }

  function randomize() {
    const next = { ...choices };
    for (const key of THEMABLE_COMPONENTS) {
      next[key] = THEMES[Math.floor(Math.random() * THEMES.length)];
    }
    onChange(next);
  }

  function resetAll() {
    onChange({ ...DEFAULT_CHOICES });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full w-full flex-col"
    >
      <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10 backdrop-blur">
        <div className="h-14 w-24 overflow-hidden rounded-md ring-1 ring-white/10">
          <ThemePreview theme={mostCommon} />
        </div>
        <div className="flex-1 text-left">
          <div className="text-xs text-white/60">Live preview mix</div>
          <div className="text-sm font-medium text-white/90">
            Mostly {THEME_LABELS[mostCommon]}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={randomize}
            className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
          >
            <Shuffle className="h-3.5 w-3.5" />
            Randomize
          </button>
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <ul className="space-y-1.5">
          {THEMABLE_COMPONENTS.map((key) => (
            <li
              key={key}
              className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/5 hover:bg-white/10"
            >
              <span className="text-sm text-white/90">{COMPONENT_LABELS[key]}</span>
              <SegmentedControl
                value={choices[key]}
                onChange={(t) => setOne(key, t)}
              />
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function SegmentedControl({
  value,
  onChange,
}: {
  value: Theme;
  onChange: (t: Theme) => void;
}) {
  return (
    <div
      role="radiogroup"
      className="flex rounded-md bg-black/40 p-0.5 ring-1 ring-white/5"
    >
      {THEMES.map((t) => (
        <button
          key={t}
          role="radio"
          aria-checked={value === t}
          onClick={() => onChange(t)}
          className={cn(
            "rounded-[5px] px-2.5 py-1 text-[11px] font-medium transition",
            value === t
              ? "bg-white/20 text-white shadow-sm"
              : "text-white/60 hover:text-white/90",
          )}
        >
          {THEME_LABELS[t]}
        </button>
      ))}
    </div>
  );
}
