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
    <main className="relative flex h-screen w-full flex-col overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(96,205,255,0.18),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(233,84,32,0.14),transparent_55%)]" />

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
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-light">Welcome.</h1>
                <p className="mt-2 text-sm text-white/60">
                  Choose the desktop style you want to explore — you can mix and
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
        "group relative overflow-hidden rounded-2xl text-left ring-1 ring-white/10 transition",
        "bg-white/[0.03] hover:bg-white/[0.06]",
        selected && "ring-2 ring-white/80",
      )}
    >
      <div className="aspect-[4/3] p-3">
        <ThemePreview theme={theme} className="shadow-lg" />
      </div>
      <div className="flex items-center justify-between px-4 pb-4 pt-1">
        <div>
          <div className="text-base font-medium">{THEME_LABELS[theme]}</div>
          <div className="text-xs text-white/50">
            {theme === "windows" && "Fluent · Mica · 8px radii"}
            {theme === "macos" && "Vibrant · Traffic lights · 10px radii"}
            {theme === "linux" && "GNOME · Adwaita · 12px radii"}
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
        "group relative overflow-hidden rounded-2xl text-left ring-1 ring-white/10 transition",
        "bg-gradient-to-br from-sky-500/10 via-fuchsia-500/10 to-amber-500/10 hover:from-sky-500/15 hover:via-fuchsia-500/15 hover:to-amber-500/15",
        selected && "ring-2 ring-white/80",
      )}
    >
      <div className="aspect-[4/3] p-3">
        <div className="relative grid h-full w-full grid-cols-3 gap-1.5 overflow-hidden rounded-md">
          <ThemePreview theme="windows" />
          <ThemePreview theme="macos" />
          <ThemePreview theme="linux" />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pb-4 pt-1">
        <div>
          <div className="flex items-center gap-1.5 text-base font-medium">
            <Sparkles className="h-4 w-4" />
            Custom
          </div>
          <div className="text-xs text-white/50">Mix per component</div>
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
