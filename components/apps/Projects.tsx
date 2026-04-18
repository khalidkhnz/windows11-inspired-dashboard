"use client";

import { useMemo, useState } from "react";
import { projects as rawProjects, sortProjectsForDisplay } from "@/lib/portfolio";
import { ExternalLink, Code2, Sparkles } from "lucide-react";
import { useThemeChoice } from "@/context/ThemeContext";
import { useOs } from "@/context/OsContext";
import { getAppIdByWebUrl } from "@/lib/apps";
import { cn } from "@/lib/utils";

const ACTIVE_ROW_BY_THEME = {
  windows: "bg-white/10 text-white",
  macos: "bg-[#0a84ff]/80 text-white",
  linux: "bg-[#e95420] text-white",
} as const;

const ACCENT_BY_THEME = {
  windows: "bg-sky-500/90 hover:bg-sky-500",
  macos: "bg-[#0a84ff] hover:bg-[#1a8fff]",
  linux: "bg-[#e95420] hover:bg-[#f06434]",
} as const;

const DOT_BY_THEME = {
  windows: "bg-sky-400",
  macos: "bg-[#0a84ff]",
  linux: "bg-[#e95420]",
} as const;

export default function Projects() {
  const projects = useMemo(() => sortProjectsForDisplay(rawProjects), []);
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);
  const active = projects.find((p) => p.slug === activeSlug) ?? projects[0];
  const { openApp } = useOs();

  function handleVisit(url: string) {
    const appId = getAppIdByWebUrl(url);
    if (appId) {
      openApp(appId);
    } else if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }
  const theme = useThemeChoice("window");
  const activeRow = ACTIVE_ROW_BY_THEME[theme];
  const accent = ACCENT_BY_THEME[theme];
  const dot = DOT_BY_THEME[theme];

  return (
    <div className="flex h-full w-full overflow-hidden text-neutral-100">
      <aside className="flex h-full w-56 flex-shrink-0 flex-col border-r border-white/[0.06] bg-white/[0.02]">
        <div className="px-4 pb-2 pt-4 text-xs uppercase tracking-widest text-neutral-500">
          Projects
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {projects.map((p) => (
            <button
              key={p.slug}
              onClick={() => setActiveSlug(p.slug)}
              className={cn(
                "group mb-1 flex w-full flex-col items-start rounded-md px-3 py-2 text-left text-sm transition-colors",
                p.slug === active?.slug ? activeRow : "text-neutral-300 hover:bg-white/5",
              )}
            >
              <span className="flex w-full items-center gap-1.5">
                <span className="font-medium line-clamp-1">{p.name}</span>
                {p.live && (
                  <span
                    aria-label="Live"
                    title="Live"
                    className="ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]"
                  />
                )}
              </span>
              <span className="text-[11px] text-neutral-500 group-hover:text-neutral-400">
                {p.role} · {p.year}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="flex-1 overflow-y-auto">
        {active && (
          <article className="mx-auto max-w-3xl px-8 py-8">
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400">
              <Sparkles className="h-3.5 w-3.5" /> {active.role} · {active.year}
            </p>
            <h1 className="mt-2 text-3xl font-semibold">{active.name}</h1>
            <p className="mt-1 text-sm text-neutral-400">{active.tagline}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {active.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {active.live && (
                <button
                  type="button"
                  onClick={() => handleVisit(active.live!)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white",
                    accent,
                  )}
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Visit
                </button>
              )}
              {active.repo && (
                <a
                  href={active.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
                >
                  <Code2 className="h-3.5 w-3.5" /> Source
                </a>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-xs uppercase tracking-widest text-neutral-500">
                Overview
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-200">
                {active.description}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-xs uppercase tracking-widest text-neutral-500">
                Highlights
              </h2>
              <ul className="mt-2 space-y-2">
                {active.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-md border border-white/5 bg-white/[0.03] px-4 py-2.5 text-sm text-neutral-200"
                  >
                    <span className={cn("mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full", dot)} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        )}
      </section>
    </div>
  );
}
