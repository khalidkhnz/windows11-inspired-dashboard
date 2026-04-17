"use client";

import { createThemedSlot } from "@/components/desktop/ThemedSlot";
import { WindowsTitleBar } from "./WindowsTitleBar";
import { MacOSTitleBar } from "./MacOSTitleBar";
import { LinuxTitleBar } from "./LinuxTitleBar";
import type { TitleBarProps } from "./types";

export const ThemedTitleBar = createThemedSlot<TitleBarProps>("window", {
  default: WindowsTitleBar,
  windows: WindowsTitleBar,
  macos: MacOSTitleBar,
  linux: LinuxTitleBar,
});

export { CHROME_TOKENS } from "./tokens";
export type { TitleBarProps, ChromeTokens } from "./types";
