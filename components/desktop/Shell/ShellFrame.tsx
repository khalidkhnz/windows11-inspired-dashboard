"use client";

import type { CSSProperties, ReactNode } from "react";
import { useThemeChoice } from "@/context/ThemeContext";

/**
 * Theme-aware content frame. Reserves vertical padding for the active shell
 * (bottom taskbar for Windows, top menu bar + bottom dock for macOS, top panel
 * + bottom dash for Linux) so floating windows don't clip into the chrome.
 */
export function ShellFrame({ children }: { children: ReactNode }) {
  const theme = useThemeChoice("taskbar");

  const style: CSSProperties & Record<string, string> = {
    "--shell-top": theme === "macos" ? "28px" : theme === "linux" ? "32px" : "0px",
    "--shell-bottom":
      theme === "macos" ? "88px" : theme === "linux" ? "76px" : "52px",
  };

  return (
    <div
      className="relative h-screen w-full"
      style={style}
    >
      <section
        className="relative w-full"
        style={{
          height:
            "calc(100vh - var(--shell-top) - var(--shell-bottom))",
          marginTop: "var(--shell-top)",
        }}
      >
        {children}
      </section>
    </div>
  );
}
