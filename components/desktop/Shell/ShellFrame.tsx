"use client";

import type { ReactNode } from "react";
import { useThemeChoice } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getShellInsets } from "@/lib/shell-insets";

/**
 * Theme-aware content frame. Reserves vertical padding for the active shell
 * so floating windows / home screens don't clip into the chrome. Mobile
 * variants swap in shorter bars (status bar + nav bar / home indicator).
 */
export function ShellFrame({ children }: { children: ReactNode }) {
  const theme = useThemeChoice("taskbar");
  const isMobile = useIsMobile();
  const { top, bottom } = getShellInsets(theme, isMobile);

  return (
    <div className="relative h-screen w-full">
      <section
        className="relative w-full"
        style={{
          height: `calc(100vh - ${top}px - ${bottom}px)`,
          marginTop: `${top}px`,
        }}
      >
        {children}
      </section>
    </div>
  );
}
