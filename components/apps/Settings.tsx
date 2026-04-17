"use client";

import { useState } from "react";
import { useWallpaper, WALLPAPERS } from "@/context/WallpaperContext";
import { cn } from "@/lib/utils";
import { Monitor, Palette, Info, User } from "lucide-react";
import { owner } from "@/lib/portfolio";
import Image from "next/image";

const sections = [
  { id: "personalization", label: "Personalization", icon: Palette },
  { id: "display", label: "Display", icon: Monitor },
  { id: "account", label: "Account", icon: User },
  { id: "about", label: "About", icon: Info },
] as const;

export default function Settings() {
  const [active, setActive] = useState<(typeof sections)[number]["id"]>("personalization");
  const { wallpaperId, setWallpaperId } = useWallpaper();

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
                active === s.id
                  ? "bg-white/10 text-white"
                  : "text-neutral-300 hover:bg-white/5",
              )}
            >
              <Icon className="h-4 w-4" />
              {s.label}
            </button>
          );
        })}
      </aside>

      <section className="flex-1 overflow-y-auto px-8 py-6">
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
                      ? "border-blue-400 ring-2 ring-blue-400/30"
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
                Motion. No database — all content lives in code.
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs">
                <dt className="text-neutral-500">Build</dt>
                <dd>Portfolio 11 · 2.0.0</dd>
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
