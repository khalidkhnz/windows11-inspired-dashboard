"use client";

import { resume } from "@/lib/portfolio";
import { Download, ExternalLink } from "lucide-react";
import { useThemeChoice } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const DL_BY_THEME = {
  windows: "bg-sky-500/90 hover:bg-sky-500",
  macos: "bg-[#0a84ff] hover:bg-[#1a8fff]",
  linux: "bg-[#e95420] hover:bg-[#f06434]",
} as const;

export default function ResumeViewer() {
  const theme = useThemeChoice("window");
  const dlClass = DL_BY_THEME[theme];
  return (
    <div className="flex h-full w-full flex-col text-neutral-100">
      <header className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-medium">KHALID_KHAN_RESUME.pdf</span>
          <span className="text-xs text-neutral-500">
            Updated {resume.updated} · {resume.sizeLabel}
          </span>
        </div>
        <div className="flex gap-2">
          <a
            href={resume.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white hover:bg-white/10"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Open
          </a>
          <a
            href={resume.url}
            download
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-white",
              dlClass,
            )}
          >
            <Download className="h-3.5 w-3.5" /> Download
          </a>
        </div>
      </header>
      <div className="flex-1 bg-neutral-800">
        <iframe
          title="Resume"
          src={resume.url}
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
