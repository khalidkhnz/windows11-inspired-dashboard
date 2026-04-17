"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Check, Sparkles, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { owner } from "@/lib/portfolio";
import {
  THEMES,
  THEME_LABELS,
  buildPresetChoices,
  type Theme,
  type ThemeChoices,
} from "@/types/theme";
import { IntroLogo } from "./IntroLogo";
import { ThemePreview } from "./ThemePreview";
import { CustomPicker } from "./CustomPicker";

type Stage = "presets" | "custom";

type Selection =
  | { kind: "preset"; theme: Theme }
  | { kind: "custom"; choices: ThemeChoices };

export function ThemePicker({ onDone }: { onDone: () => void }) {
  const { setPreset, setChoices, choices: initialChoices } = useTheme();
  const [stage, setStage] = useState<Stage>("presets");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [customChoices, setCustomChoices] = useState<ThemeChoices>(initialChoices);

  function confirm() {
    if (!selection) return;
    if (selection.kind === "preset") {
      setPreset(selection.theme);
    } else {
      setChoices(selection.choices);
    }
    onDone();
  }

  return (
    <main className="relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0b] text-white">
      {/* Subtle ambient lighting — kept understated to feel premium */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(96,205,255,0.08),transparent_50%),radial-gradient(circle_at_82%_85%,rgba(168,85,247,0.07),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.6))]" />

      <header className="relative z-10 flex items-center justify-between px-8 pt-8">
        <div className="flex items-center gap-3">
          <IntroLogo className="h-9 w-9" />
          <div>
            <div className="text-xs uppercase tracking-widest text-white/50">
              {owner.name}&apos;s Portfolio
            </div>
            <div className="text-lg font-medium">Pick your look</div>
          </div>
        </div>
        {stage === "custom" && (
          <button
            onClick={() => setStage("presets")}
            className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to presets
          </button>
        )}
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          {stage === "presets" ? (
            <motion.div
              key="presets"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-5xl"
            >
              <div className="mb-10 text-center">
                <h1 className="text-[44px] font-light leading-none tracking-tight">
                  Welcome.
                </h1>
                <p className="mt-3 text-sm text-white/55">
                  Choose the desktop style you want to explore. You can mix and
                  match later.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {THEMES.map((t) => (
                  <PresetTile
                    key={t}
                    theme={t}
                    selected={selection?.kind === "preset" && selection.theme === t}
                    onSelect={() => setSelection({ kind: "preset", theme: t })}
                  />
                ))}
                <CustomTile
                  selected={selection?.kind === "custom"}
                  onSelect={() => {
                    const next = buildPresetChoices("windows");
                    setCustomChoices(next);
                    setSelection({ kind: "custom", choices: next });
                    setStage("custom");
                  }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="custom"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-[70vh] w-full max-w-3xl flex-col"
            >
              <CustomPicker
                choices={customChoices}
                onChange={(next) => {
                  setCustomChoices(next);
                  setSelection({ kind: "custom", choices: next });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="relative z-10 flex items-center justify-between px-8 pb-8">
        <div className="text-xs text-white/40">
          You can re-open this from Action Center anytime.
        </div>
        <button
          onClick={confirm}
          disabled={!selection}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition",
            selection
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/10 text-white/40",
          )}
        >
          Continue
          <ChevronRight className="h-4 w-4" />
        </button>
      </footer>
    </main>
  );
}

function PresetTile({
  theme,
  selected,
  onSelect,
}: {
  theme: Theme;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-2xl text-left ring-1 ring-white/8 transition-all duration-200",
        "bg-white/[0.025] hover:bg-white/[0.05] hover:ring-white/15",
        "shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]",
        selected && "ring-[1.5px] ring-white/90 bg-white/[0.06]",
      )}
    >
      <div className="aspect-[4/3] p-2.5">
        <ThemePreview theme={theme} className="shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]" />
      </div>
      <div className="flex items-center justify-between px-4 pb-4 pt-1">
        <div>
          <div className="text-[15px] font-medium tracking-tight">{THEME_LABELS[theme]}</div>
          <div className="mt-0.5 text-[11px] text-white/45">
            {theme === "windows" && "Fluent · Mica · 8px"}
            {theme === "macos" && "Vibrant · Traffic lights · 10px"}
            {theme === "linux" && "GNOME · Adwaita · 12px"}
          </div>
        </div>
        {selected && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </button>
  );
}

function CustomTile({
  selected,
  onSelect,
}: {
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-2xl text-left ring-1 ring-white/8 transition-all duration-200",
        "bg-white/[0.025] hover:bg-white/[0.05] hover:ring-white/15",
        "shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]",
        selected && "ring-[1.5px] ring-white/90 bg-white/[0.06]",
      )}
    >
      <div className="aspect-[4/3] p-2.5">
        <div className="relative grid h-full w-full grid-cols-3 gap-1 overflow-hidden rounded-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]">
          <ThemePreview theme="windows" />
          <ThemePreview theme="macos" />
          <ThemePreview theme="linux" />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pb-4 pt-1">
        <div>
          <div className="flex items-center gap-1.5 text-[15px] font-medium tracking-tight">
            <Sparkles className="h-3.5 w-3.5" />
            Custom
          </div>
          <div className="mt-0.5 text-[11px] text-white/45">Mix per component</div>
        </div>
        {selected && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </button>
  );
}
