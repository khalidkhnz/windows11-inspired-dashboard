export const THEMES = ["windows", "macos", "linux"] as const;
export type Theme = (typeof THEMES)[number];

export const THEMABLE_COMPONENTS = [
  "taskbar",
  "window",
  "icons",
  "lockscreen",
  "startMenu",
  "terminal",
  "fileExplorer",
  "contextMenu",
  "clockPopover",
  "actionCenter",
  "desktopIcons",
  "wallpaper",
  "fonts",
  "cursors",
  "scrollbars",
] as const;
export type ThemableComponent = (typeof THEMABLE_COMPONENTS)[number];

export type ThemeChoices = Record<ThemableComponent, Theme>;

export type ThemeMode = "preset" | "custom";

export type ThemeState = {
  mode: ThemeMode;
  preset: Theme;
  choices: ThemeChoices;
};

export const DEFAULT_THEME: Theme = "windows";

export const DEFAULT_CHOICES: ThemeChoices = THEMABLE_COMPONENTS.reduce(
  (acc, key) => {
    acc[key] = DEFAULT_THEME;
    return acc;
  },
  {} as ThemeChoices,
);

export function buildPresetChoices(preset: Theme): ThemeChoices {
  return THEMABLE_COMPONENTS.reduce((acc, key) => {
    acc[key] = preset;
    return acc;
  }, {} as ThemeChoices);
}

export const THEME_LABELS: Record<Theme, string> = {
  windows: "Windows 11",
  macos: "macOS",
  linux: "Linux",
};
