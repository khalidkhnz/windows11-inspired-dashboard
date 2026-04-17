"use client";

import { useState } from "react";
import { useWallpaper, WALLPAPERS } from "@/context/WallpaperContext";
import { useTheme, useThemeChoice } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Monitor, Palette, Info, User, Paintbrush } from "lucide-react";
import { owner } from "@/lib/portfolio";
import { THEMES, THEME_LABELS, type Theme } from "@/types/theme";
import Image from "next/image";

const sections = [
  { id: "theme", label: "Theme", icon: Paintbrush },
  { id: "personalization", label: "Personalization", icon: Palette },
  { id: "display", label: "Display", icon: Monitor },
  { id: "account", label: "Account", icon: User },
  { id: "about", label: "About", icon: Info },
] as const;

const ACTIVE_ROW_BY_THEME = {
  windows: "bg-white/10 text-white",
  macos: "bg-[#0a84ff]/80 text-white",
  linux: "bg-[#e95420] text-white",
} as const;

const ACCENT_RING_BY_THEME = {
  windows: "border-sky-400 ring-2 ring-sky-400/30",
  macos: "border-[#0a84ff] ring-2 ring-[#0a84ff]/30",
  linux: "border-[#e95420] ring-2 ring-[#e95420]/30",
} as const;

export default function Settings() {
  const [active, setActive] = useState<(typeof sections)[number]["id"]>("theme");
  const { wallpaperId, setWallpaperId } = useWallpaper();
  const {
    mode,
    preset,
    choices,
    setPreset,
    setMode,
    setChoice,
    reset,
  } = useTheme();
  const theme = useThemeChoice("window");
  const activeRow = ACTIVE_ROW_BY_THEME[theme];
  const accentRing = ACCENT_RING_BY_THEME[theme];

  return (
    <div className="flex h-full w-full overflow-hidden text-neutral-100">
      <aside className="w-56 border-r border-white/[0.06] bg-white/[0.02] p-3">
        <p className="px-2 pb-2 pt-1 text-[11px] uppercase tracking-widest text-neutral-500">
          Settings
        </p>
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "mb-0.5 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                active === s.id ? activeRow : "text-neutral-300 hover:bg-white/5",
              )}
            >
              <Icon className="h-4 w-4" />
              {s.label}
            </button>
          );
        })}
      </aside>

      <section className="flex-1 overflow-y-auto px-8 py-6">
        {active === "theme" && (
          <div>
            <h2 className="text-xl font-semibold">Theme</h2>
            <p className="text-sm text-neutral-400">
              Pick a preset or mix components per OS. Changes apply live.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setPreset(t)}
                  className={cn(
                    "rounded-lg border-2 bg-white/[0.03] p-3 text-left transition-colors",
                    mode === "preset" && preset === t
                      ? accentRing
                      : "border-white/10 hover:border-white/20",
                  )}
                >
                  <div className="text-sm font-medium">{THEME_LABELS[t]}</div>
                  <div className="text-[11px] text-neutral-400">
                    {t === "windows" && "Fluent · Mica · 8px"}
                    {t === "macos" && "Vibrant · Traffic lights · 10px"}
                    {t === "linux" && "GNOME · Adwaita · 12px"}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
              <span>Mode:</span>
              <button
                onClick={() => setMode("preset")}
                className={cn(
                  "rounded px-2 py-1",
                  mode === "preset" ? "bg-white/15 text-white" : "hover:bg-white/5",
                )}
              >
                Preset
              </button>
              <button
                onClick={() => setMode("custom")}
                className={cn(
                  "rounded px-2 py-1",
                  mode === "custom" ? "bg-white/15 text-white" : "hover:bg-white/5",
                )}
              >
                Custom
              </button>
              <button
                onClick={reset}
                className="ml-auto rounded px-2 py-1 hover:bg-white/5"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(JSON.stringify(choices, null, 2));
                }}
                className="rounded px-2 py-1 hover:bg-white/5"
              >
                Copy JSON
              </button>
            </div>

            {mode === "custom" && (
              <div className="mt-5 max-h-[380px] space-y-1.5 overflow-y-auto rounded-lg border border-white/5 bg-white/[0.02] p-2">
                {(Object.keys(choices) as Array<keyof typeof choices>).map((key) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-3 rounded-md px-3 py-1.5 text-[12px] hover:bg-white/5"
                  >
                    <span className="text-white/85 capitalize">{key}</span>
                    <div className="flex rounded-md bg-black/40 p-0.5 ring-1 ring-white/5">
                      {THEMES.map((t: Theme) => (
                        <button
                          key={t}
                          onClick={() => setChoice(key, t)}
                          className={cn(
                            "rounded-[4px] px-2 py-0.5 text-[11px]",
                            choices[key] === t
                              ? "bg-white/20 text-white"
                              : "text-white/60 hover:text-white/90",
                          )}
                        >
                          {THEME_LABELS[t]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {active === "personalization" && (
          <div>
            <h2 className="text-xl font-semibold">Personalization</h2>
            <p className="text-sm text-neutral-400">
              Choose a wallpaper for the desktop.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
              {WALLPAPERS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWallpaperId(w.id)}
                  className={cn(
                    "group relative aspect-[16/10] overflow-hidden rounded-lg border-2 transition-all",
                    wallpaperId === w.id
                      ? accentRing
                      : "border-white/5 hover:border-white/20",
                  )}
                >
                  {w.src ? (
                    <Image
                      src={w.src}
                      alt={w.label}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform group-hover:scale-105"
                      style={{ background: w.gradient }}
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 text-left text-[11px] text-white">
                    {w.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {active === "display" && (
          <div>
            <h2 className="text-xl font-semibold">Display</h2>
            <p className="text-sm text-neutral-400">Appearance is locked to dark mode.</p>
            <div className="mt-5 grid gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-5 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">Theme</span>
                <span>Dark</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Scale</span>
                <span>100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Refresh rate</span>
                <span>60 Hz</span>
              </div>
            </div>
          </div>
        )}

        {active === "account" && (
          <div>
            <h2 className="text-xl font-semibold">Account</h2>
            <div className="mt-5 flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/10">
                <Image src={owner.avatar} alt={owner.name} fill className="object-cover" />
              </div>
              <div>
                <div className="text-base font-medium">{owner.name}</div>
                <div className="text-xs text-neutral-400">{owner.email}</div>
                <div className="mt-1 text-[11px] text-neutral-500">
                  Local account · this device
                </div>
              </div>
            </div>
          </div>
        )}

        {active === "about" && (
          <div>
            <h2 className="text-xl font-semibold">About this portfolio</h2>
            <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-5 text-sm text-neutral-300">
              <p>
                A Windows 11 inspired desktop built with Next.js, Tailwind, and Framer
                Motion. No database. All content lives in code.
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs">
                <dt className="text-neutral-500">Build</dt>
                <dd>{owner.name}&apos;s Portfolio · 2.0.0</dd>
                <dt className="text-neutral-500">Owner</dt>
                <dd>{owner.name}</dd>
                <dt className="text-neutral-500">Source</dt>
                <dd>github.com/khalidkhnz</dd>
              </dl>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
