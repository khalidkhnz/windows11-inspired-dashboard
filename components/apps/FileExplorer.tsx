"use client";

import { useState } from "react";
import {
  FileText,
  Folder,
  Image as ImageIcon,
  HardDrive,
  ChevronRight,
} from "lucide-react";
import { resume } from "@/lib/portfolio";
import { useThemeChoice } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

type FileNode = {
  name: string;
  kind: "file" | "folder";
  size?: string;
  updated?: string;
  href?: string;
  locked?: boolean;
  icon?: "pdf" | "image" | "folder";
};

const tree: Record<string, FileNode[]> = {
  "This PC": [
    { name: "Documents", kind: "folder", icon: "folder" },
    { name: "Pictures", kind: "folder", icon: "folder", locked: true },
    { name: "Projects", kind: "folder", icon: "folder" },
  ],
  Documents: [
    {
      name: "Resume.pdf",
      kind: "file",
      icon: "pdf",
      size: resume.sizeLabel,
      updated: resume.updated,
      href: resume.url,
    },
    {
      name: "Cover-Letter.pdf",
      kind: "file",
      icon: "pdf",
      size: "112 KB",
      updated: "2024-06-10",
      locked: true,
    },
  ],
  Pictures: [],
  Projects: [
    { name: "portfolio-v2", kind: "folder", icon: "folder" },
    { name: "sportjacks", kind: "folder", icon: "folder" },
    { name: "hotel-deepali", kind: "folder", icon: "folder" },
    { name: "win11-dashboard", kind: "folder", icon: "folder" },
  ],
};

function iconFor(node: FileNode, folderColor: string) {
  if (node.kind === "folder")
    return <Folder className={cn("h-5 w-5", folderColor)} />;
  if (node.icon === "pdf") return <FileText className="h-5 w-5 text-red-400" />;
  if (node.icon === "image") return <ImageIcon className="h-5 w-5 text-sky-300" />;
  return <FileText className="h-5 w-5 text-neutral-300" />;
}

const SIDEBAR_LABEL_BY_THEME = {
  windows: "Quick access",
  macos: "Favorites",
  linux: "Places",
} as const;

const FOLDER_ICON_COLOR_BY_THEME = {
  windows: "text-amber-300",
  macos: "text-sky-400",
  linux: "text-[#e95420]",
} as const;

export default function FileExplorer() {
  const [path, setPath] = useState<string[]>(["This PC"]);
  const current = path[path.length - 1];
  const items = tree[current] ?? [];
  const theme = useThemeChoice("fileExplorer");

  const sidebarLabel = SIDEBAR_LABEL_BY_THEME[theme];
  const folderColor = FOLDER_ICON_COLOR_BY_THEME[theme];

  return (
    <div className="flex h-full w-full overflow-hidden text-neutral-100">
      <aside
        className={cn(
          "w-52 border-r p-3",
          theme === "macos"
            ? "border-white/5 bg-neutral-900/40 backdrop-blur"
            : theme === "linux"
              ? "border-black/30 bg-[#242424]"
              : "border-white/[0.06] bg-white/[0.02]",
        )}
      >
        <p
          className={cn(
            "px-2 pb-1 text-[10px] uppercase tracking-widest",
            theme === "linux" ? "text-white/50" : "text-neutral-500",
          )}
        >
          {sidebarLabel}
        </p>
        {Object.keys(tree).map((folder) => (
          <button
            key={folder}
            onClick={() => setPath([folder])}
            className={cn(
              "mb-0.5 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
              current === folder
                ? theme === "linux"
                  ? "bg-[#e95420] text-white"
                  : theme === "macos"
                    ? "bg-[#0a84ff]/80 text-white"
                    : "bg-white/10 text-white"
                : "text-neutral-300 hover:bg-white/5",
            )}
          >
            {folder === "This PC" ? (
              <HardDrive className="h-4 w-4" />
            ) : (
              <Folder className={cn("h-4 w-4", folderColor)} />
            )}
            {folder}
          </button>
        ))}
      </aside>

      <section className="flex flex-1 flex-col">
        <div
          className={cn(
            "flex items-center gap-1 border-b px-3 py-2 text-xs",
            theme === "linux"
              ? "border-black/30 bg-[#2d2d2d] text-white/75"
              : "border-white/5 bg-white/[0.02] text-neutral-400",
          )}
        >
          {path.map((p, i) => (
            <span key={p} className="flex items-center gap-1">
              <button
                onClick={() => setPath(path.slice(0, i + 1))}
                className={cn(
                  "rounded px-1.5 py-0.5 hover:bg-white/5 hover:text-neutral-200",
                  theme === "linux" && "rounded-sm bg-white/5",
                )}
              >
                {p}
              </button>
              {i < path.length - 1 && (
                <ChevronRight className="h-3 w-3 text-neutral-600" />
              )}
            </span>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-neutral-500">
              This folder is empty.
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <li key={item.name}>
                  {item.kind === "folder" ? (
                    <button
                      onDoubleClick={() => {
                        if (item.locked) return;
                        setPath([...path, item.name]);
                      }}
                      onClick={() => {
                        if (item.locked) return;
                        setPath([...path, item.name]);
                      }}
                      className="group flex w-full flex-col items-center gap-2 rounded-lg border border-transparent p-3 text-xs text-neutral-200 hover:border-white/10 hover:bg-white/5"
                    >
                      {iconFor(item, folderColor)}
                      <span className="truncate">{item.name}</span>
                      {item.locked && (
                        <span className="text-[10px] text-neutral-500">Private</span>
                      )}
                    </button>
                  ) : item.href && !item.locked ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex w-full flex-col items-center gap-2 rounded-lg border border-transparent p-3 text-xs text-neutral-200 hover:border-white/10 hover:bg-white/5"
                    >
                      {iconFor(item, folderColor)}
                      <span className="truncate">{item.name}</span>
                      <span className="text-[10px] text-neutral-500">{item.size}</span>
                    </a>
                  ) : (
                    <div
                      className="flex w-full cursor-not-allowed flex-col items-center gap-2 rounded-lg p-3 text-xs text-neutral-500 opacity-70"
                      title="Private"
                    >
                      {iconFor(item, folderColor)}
                      <span className="truncate">{item.name}</span>
                      <span className="text-[10px]">Private</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
