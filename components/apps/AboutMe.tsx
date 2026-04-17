"use client";

import Image from "next/image";
import { owner, experience, socials } from "@/lib/portfolio";

export default function AboutMe() {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      <div className="relative px-8 pb-6 pt-10">
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

      <div className="grid gap-6 px-8 pb-10 md:grid-cols-5">
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
    </div>
  );
}
