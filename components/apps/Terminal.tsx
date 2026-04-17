"use client";

import { useEffect, useRef, useState } from "react";
import { owner, projects, skills, socials } from "@/lib/portfolio";

type Line = { kind: "in" | "out" | "err"; text: string };

const prompt = `${owner.handle}@portfolio:~$`;

const help = [
  "Available commands:",
  "  help              show this help",
  "  whoami            tell me about Khalid",
  "  projects          list featured projects",
  "  skills            list top skills",
  "  socials           show social links",
  "  open <slug>       open a project's live URL (e.g. open sportjacks)",
  "  clear             clear the screen",
  "  echo <text>       echo back",
  "  date              current date/time",
  "  sudo              nice try",
];

function run(command: string): Line[] {
  const trimmed = command.trim();
  if (!trimmed) return [];
  const [cmd, ...rest] = trimmed.split(/\s+/);
  const arg = rest.join(" ");

  switch (cmd) {
    case "help":
      return help.map((t) => ({ kind: "out", text: t }));
    case "whoami":
      return [
        { kind: "out", text: `${owner.name} — ${owner.role} (${owner.location})` },
        { kind: "out", text: owner.tagline },
      ];
    case "projects":
      return projects.map((p) => ({
        kind: "out",
        text: `  ${p.slug.padEnd(22)} ${p.name} — ${p.tagline}`,
      }));
    case "skills":
      return skills.flatMap((group) => [
        { kind: "out" as const, text: `# ${group.category}` },
        ...group.items.map((it) => ({
          kind: "out" as const,
          text: `  ${it.name.padEnd(22)} ${"█".repeat(Math.round(it.level / 10))} ${it.level}%`,
        })),
      ]);
    case "socials":
      return socials.map((s) => ({
        kind: "out",
        text: `  ${s.label.padEnd(14)} ${s.href}`,
      }));
    case "open": {
      if (!arg) return [{ kind: "err", text: "usage: open <slug>" }];
      const project = projects.find((p) => p.slug === arg);
      if (!project) return [{ kind: "err", text: `no project matches '${arg}'` }];
      if (!project.live) return [{ kind: "err", text: `${project.name} has no live URL` }];
      if (typeof window !== "undefined") window.open(project.live, "_blank");
      return [{ kind: "out", text: `opening ${project.live}…` }];
    }
    case "clear":
      return [{ kind: "out", text: "__CLEAR__" }];
    case "echo":
      return [{ kind: "out", text: arg }];
    case "date":
      return [{ kind: "out", text: new Date().toString() }];
    case "sudo":
      return [{ kind: "err", text: "permission denied (this is a portfolio, not a shell)" }];
    default:
      return [{ kind: "err", text: `command not found: ${cmd}. try 'help'.` }];
  }
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: `Welcome to ${owner.handle}'s portfolio shell — type 'help' to begin.` },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const out = run(input);
    const newLines: Line[] = [
      ...lines,
      { kind: "in", text: `${prompt} ${input}` },
      ...out.filter((l) => l.text !== "__CLEAR__"),
    ];
    if (out.some((l) => l.text === "__CLEAR__")) {
      setLines([]);
    } else {
      setLines(newLines);
    }
    if (input.trim()) setHistory((prev) => [...prev, input]);
    setHistoryIdx(null);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(null);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    }
  }

  return (
    <div
      className="flex h-full w-full flex-col bg-black/70 font-mono text-[13px] text-emerald-300"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
        {lines.map((l, i) => (
          <pre
            key={i}
            className={cn(
              "whitespace-pre-wrap break-words",
              l.kind === "err" && "text-red-400",
              l.kind === "in" && "text-neutral-200",
            )}
          >
            {l.text}
          </pre>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-2">
        <span className="text-neutral-400">{prompt}</span>
        <input
          ref={inputRef}
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-emerald-200 outline-none"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}

function cn(...xs: (string | false | undefined)[]) {
  return xs.filter(Boolean).join(" ");
}
