"use client";

import { createThemedSlot } from "@/components/desktop/ThemedSlot";
import { WindowsLockScreen } from "./WindowsLockScreen";
import { MacOSLockScreen } from "./MacOSLockScreen";
import { LinuxLockScreen } from "./LinuxLockScreen";

export const ThemedLockScreen = createThemedSlot("lockscreen", {
  default: WindowsLockScreen,
  windows: WindowsLockScreen,
  macos: MacOSLockScreen,
  linux: LinuxLockScreen,
});

export type { LockVariantProps } from "./types";
