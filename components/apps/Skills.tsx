"use client";

import { skills } from "@/lib/portfolio";
import { useThemeChoice } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const PROGRESS_CLASS_BY_THEME = {
  windows: "bg-gradient-to-r from-sky-400 to-violet-400 rounded-full",
  macos: "bg-gradient-to-r from-[#0a84ff] to-[#64d2ff] rounded-[3px]",
  linux: "bg-[#e95420] rounded-none",
} as const;

export default function Skills() {
  const theme = useThemeChoice("window");
  const barClass = PROGRESS_CLASS_BY_THEME[theme];
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto text-neutral-100">
      <header className="border-b border-white/5 bg-white/[0.02] px-4 py-5 sm:px-8 sm:py-6">
        <p className="text-xs uppercase tracking-widest text-neutral-400">Skills</p>
        <h1 className="mt-1 text-2xl font-semibold">Tools I reach for, day to day</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Self rated. Numbers are vibes, not benchmarks.
        </p>
      </header>

      <div className="grid flex-1 gap-4 px-4 py-5 sm:gap-6 sm:px-8 sm:py-6 md:grid-cols-3">
        {skills.map((group) => (
          <section
            key={group.category}
            className="rounded-xl border border-white/5 bg-white/[0.03] p-5"
          >
            <h2 className="text-sm font-medium text-neutral-100">{group.category}</h2>
            <ul className="mt-4 space-y-3">
              {group.items.map((it) => (
                <li key={it.name}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-200">{it.name}</span>
                    <span className="text-neutral-500">{it.level}%</span>
                  </div>
                  <div
                    className={cn(
                      "mt-1 h-1.5 overflow-hidden bg-white/5",
                      theme === "linux" ? "rounded-none" : "rounded-full",
                    )}
                  >
                    <div
                      className={cn("h-full", barClass)}
                      style={{ width: `${it.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
