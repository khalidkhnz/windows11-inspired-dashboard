import type { Theme } from "@/types/theme";

export type ShellInsets = { top: number; bottom: number };

/**
 * Safe-area insets reserved by the active shell (status bar / top panel
 * at the top, taskbar / dock / nav bar at the bottom). Both mobile and
 * desktop windows must respect these so maximized / fullscreen content
 * never paints under shell chrome.
 */
export function getShellInsets(theme: Theme, isMobile: boolean): ShellInsets {
  if (isMobile) {
    return {
      top: theme === "macos" ? 32 : 28,
      bottom: theme === "macos" ? 36 : 56,
    };
  }
  return {
    top: theme === "macos" ? 28 : theme === "linux" ? 32 : 0,
    bottom: theme === "macos" ? 88 : theme === "linux" ? 76 : 52,
  };
}
