"use client";

import { useState } from "react";
import { ExternalLink, RotateCw, ShieldAlert } from "lucide-react";
import { useThemeChoice } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const ACCENT_BY_THEME = {
  windows: "bg-sky-500/90 hover:bg-sky-500",
  macos: "bg-[#0a84ff] hover:bg-[#1a8fff]",
  linux: "bg-[#e95420] hover:bg-[#f06434]",
} as const;

type Props = {
  url: string;
  title: string;
};

export default function WebApp({ url, title }: Props) {
  const [reloadKey, setReloadKey] = useState(0);
  const theme = useThemeChoice("window");
  const accent = ACCENT_BY_THEME[theme];

  let host = url;
  try {
    host = new URL(url).host;
  } catch {
    /* empty */
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-neutral-950 text-neutral-100">
      <div className="flex flex-shrink-0 items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-2 py-2 text-xs sm:gap-2 sm:px-3">
        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-neutral-200 hover:bg-white/10"
          aria-label="Reload"
          title="Reload"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-neutral-300">
          <span className="hidden text-[11px] uppercase tracking-widest text-neutral-500 sm:inline">
            URL
          </span>
          <span className="truncate text-neutral-200">{host}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(
            "inline-flex flex-shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-white",
            accent,
          )}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Open</span>
        </a>
      </div>

      <div className="relative flex-1">
        <iframe
          key={reloadKey}
          src={url}
          title={title}
          className="absolute inset-0 h-full w-full border-0 bg-white"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-downloads"
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
        />
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] text-neutral-300 backdrop-blur">
          <ShieldAlert className="h-3 w-3" /> Some sites block embedding · use Open
        </div>
      </div>
    </div>
  );
}

export function makeWebApp(url: string, title: string) {
  function BoundWebApp() {
    return <WebApp url={url} title={title} />;
  }
  BoundWebApp.displayName = `WebApp(${title})`;
  return BoundWebApp;
}
