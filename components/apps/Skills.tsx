"use client";

import { skills } from "@/lib/portfolio";

export default function Skills() {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-neutral-950 text-neutral-100">
      <header className="border-b border-white/5 bg-white/[0.02] px-8 py-6">
        <p className="text-xs uppercase tracking-widest text-neutral-400">Skills</p>
        <h1 className="mt-1 text-2xl font-semibold">Tools I reach for, day to day</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Self-rated — numbers are vibes, not benchmarks.
        </p>
      </header>

      <div className="grid flex-1 gap-6 px-8 py-6 md:grid-cols-3">
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
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
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
