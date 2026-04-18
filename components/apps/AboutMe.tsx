"use client";

import { useMemo } from "react";
import Image from "next/image";
import { ExternalLink, Code2 } from "lucide-react";
import {
  owner,
  experience,
  socials,
  projects as rawProjects,
  sortProjectsForDisplay,
} from "@/lib/portfolio";
import { useOs } from "@/context/OsContext";
import { getAppIdByWebUrl } from "@/lib/apps";

export default function AboutMe() {
  const projects = useMemo(() => sortProjectsForDisplay(rawProjects), []);
  const { openApp } = useOs();

  function handleVisit(url: string) {
    const appId = getAppIdByWebUrl(url);
    if (appId) {
      openApp(appId);
    } else if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto text-neutral-100">
      <div className="relative px-4 pb-6 pt-8 sm:px-8 sm:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.25),transparent_60%)]"
        />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-end">
          <div className="relative h-24 w-24 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-28 sm:w-28">
            <Image src={owner.avatar} alt={owner.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-400">
              About me
            </p>
            <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">{owner.name}</h1>
            <p className="text-sm text-neutral-400">
              {owner.role} · {owner.location}
            </p>
            <p className="mt-3 max-w-xl text-sm text-neutral-200">{owner.tagline}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-4 pb-6 sm:px-8 md:grid-cols-5">
        <section className="md:col-span-3">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400">Bio</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-200">{owner.bio}</p>

          <h2 className="mt-8 text-xs uppercase tracking-widest text-neutral-400">
            Experience
          </h2>
          <ol className="mt-3 space-y-4">
            {experience.map((job) => (
              <li
                key={`${job.company}-${job.period}`}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-medium text-neutral-100">
                    {job.role} · <span className="text-neutral-400">{job.company}</span>
                  </h3>
                  <span className="text-xs text-neutral-500">{job.period}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-300">{job.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-neutral-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="md:col-span-2">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400">
            Find me online
          </h2>
          <ul className="mt-2 divide-y divide-white/5 rounded-xl border border-white/5 bg-white/[0.03]">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-white/5"
                >
                  <span className="text-neutral-200">{s.label}</span>
                  <span className="text-neutral-500">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4">
            <h3 className="text-sm font-medium text-neutral-100">Want to work together?</h3>
            <p className="mt-1 text-xs text-neutral-300">
              Open the <span className="text-neutral-100">Contact</span> app or email me
              directly.
            </p>
            <a
              href={`mailto:${owner.email}`}
              className="mt-3 inline-flex items-center rounded-md bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
            >
              {owner.email}
            </a>
          </div>
        </section>
      </div>

      <section className="px-4 pb-12 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-neutral-400">
              Projects
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              {projects.length} total · live builds first
            </p>
          </div>
          <button
            type="button"
            onClick={() => openApp("projects")}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-200 hover:bg-white/10"
          >
            Open Projects app
          </button>
        </div>

        <ul className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="group flex h-full flex-col rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
            >
              <div className="flex items-start gap-2">
                <h3 className="flex-1 text-sm font-medium text-neutral-100">{p.name}</h3>
                {p.live && (
                  <span
                    aria-label="Live"
                    title="Live"
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]"
                  />
                )}
              </div>
              <p className="mt-0.5 text-[11px] text-neutral-500">
                {p.role} · {p.year}
              </p>
              <p className="mt-2 line-clamp-2 text-xs text-neutral-300">{p.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
                {p.tags.length > 4 && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-neutral-400">
                    +{p.tags.length - 4}
                  </span>
                )}
              </div>
              {(p.live || p.repo) && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.live && (
                    <button
                      type="button"
                      onClick={() => handleVisit(p.live!)}
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-1 text-[11px] text-emerald-300 hover:bg-emerald-500/25"
                    >
                      <ExternalLink className="h-3 w-3" /> Visit
                    </button>
                  )}
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-neutral-300 hover:bg-white/10"
                    >
                      <Code2 className="h-3 w-3" /> Code
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
