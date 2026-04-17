"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { useThemeChoice } from "@/context/ThemeContext";
import { AppIcon } from "./AppIcon";

export default function DesktopIcons() {
  const { apps, openApp } = useOs();
  const theme = useThemeChoice("desktopIcons");
  const pinned = apps.filter((a) => a.pinnedOnDesktop);

  // Open About Me by default on first desktop mount.
  const bootstrapped = useRef(false);
  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    openApp("about");
  }, [openApp]);

  // macOS: no desktop icons by default.
  if (theme === "macos") return null;

  return (
    <ul
      className={cn(
        "absolute left-4 top-4 grid auto-rows-[92px] grid-cols-1 content-start gap-1",
      )}
      style={{ gridTemplateRows: "repeat(auto-fill, 92px)" }}
    >
      {pinned.map((app) => (
        <li key={app.id}>
          <button
            onDoubleClick={() => openApp(app.id)}
            onKeyDown={(e) => e.key === "Enter" && openApp(app.id)}
            className={cn(
              "group flex h-[92px] w-20 flex-col items-center justify-start gap-1.5 rounded-md border border-transparent px-1 py-2 text-center text-[11px] leading-tight text-white outline-none transition-colors",
              "focus-visible:border-white/30 focus-visible:bg-white/15 hover:bg-white/10",
            )}
          >
            <AppIcon
              icon={app.icon}
              className="h-11 w-11"
              glyphClassName="h-5 w-5"
            />
            <span className="line-clamp-2 px-0.5 [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]">
              {app.title}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
