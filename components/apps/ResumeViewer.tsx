"use client";

import { resume } from "@/lib/portfolio";
import { Download, ExternalLink } from "lucide-react";

export default function ResumeViewer() {
  return (
    <div className="flex h-full w-full flex-col bg-neutral-950 text-neutral-100">
      <header className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-medium">Resume.pdf</span>
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
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-500/90 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-500"
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
