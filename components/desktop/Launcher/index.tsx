"use client";

import { createThemedSlot } from "@/components/desktop/ThemedSlot";
import { WindowsStartMenu } from "./WindowsStartMenu";
import { MacOSLaunchpad } from "./MacOSLaunchpad";
import { LinuxActivities } from "./LinuxActivities";
import type { LauncherProps } from "./types";

export const ThemedLauncher = createThemedSlot<LauncherProps>("startMenu", {
  default: WindowsStartMenu,
  windows: WindowsStartMenu,
  macos: MacOSLaunchpad,
  linux: LinuxActivities,
});
