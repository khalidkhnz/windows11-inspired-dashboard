import type { Theme } from "@/types/theme";

export type ThemeTokens = {
  label: string;
  /** Primary font stack for UI chrome. */
  fontFamily: string;
  /** Monospace stack (terminal, code). */
  fontMono: string;
  /** Radius scale in px for window/panel/button. */
  radius: { window: number; panel: number; button: number };
  /** Drop-shadow CSS value for floating surfaces. */
  shadow: string;
  /** CSS backdrop-filter value for translucent surfaces. */
  blur: string;
  /** Accent color used for focus rings + primary actions. */
  accent: string;
  /** Window chrome background (solid fallback). */
  chromeBg: string;
  /** Subtle border color between chrome and content. */
  chromeBorder: string;
  /** Motion token: default transition duration (ms). */
  motionDuration: number;
  /** Framer-motion easing tuple. */
  motionEasing: [number, number, number, number];
};

export const THEME_TOKENS: Record<Theme, ThemeTokens> = {
  windows: {
    label: "Windows 11",
    fontFamily:
      '"Segoe UI Variable", "Segoe UI", ui-sans-serif, system-ui, sans-serif',
    fontMono: '"Cascadia Code", "Consolas", ui-monospace, monospace',
    radius: { window: 8, panel: 8, button: 4 },
    shadow: "0 20px 45px -15px rgba(0,0,0,0.55)",
    blur: "blur(32px) saturate(140%)",
    accent: "#60cdff",
    chromeBg: "rgba(32,32,32,0.72)",
    chromeBorder: "rgba(255,255,255,0.08)",
    motionDuration: 200,
    motionEasing: [0.22, 1, 0.36, 1],
  },
  macos: {
    label: "macOS",
    fontFamily:
      '"SF Pro Text", "SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", ui-sans-serif, system-ui, sans-serif',
    fontMono: '"SF Mono", Menlo, ui-monospace, monospace',
    radius: { window: 10, panel: 12, button: 6 },
    shadow:
      "0 30px 60px -20px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(0,0,0,0.6)",
    blur: "blur(40px) saturate(180%)",
    accent: "#0a84ff",
    chromeBg: "rgba(40,40,43,0.78)",
    chromeBorder: "rgba(255,255,255,0.12)",
    motionDuration: 280,
    motionEasing: [0.32, 0.72, 0, 1],
  },
  linux: {
    label: "Linux",
    fontFamily:
      'Cantarell, Inter, Ubuntu, ui-sans-serif, system-ui, sans-serif',
    fontMono: '"Ubuntu Mono", "DejaVu Sans Mono", ui-monospace, monospace',
    radius: { window: 12, panel: 12, button: 8 },
    shadow: "0 18px 40px -14px rgba(0,0,0,0.6)",
    blur: "blur(14px)",
    accent: "#e95420",
    chromeBg: "rgba(36,31,32,0.92)",
    chromeBorder: "rgba(255,255,255,0.06)",
    motionDuration: 180,
    motionEasing: [0.4, 0, 0.2, 1],
  },
};
