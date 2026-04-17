"use client";

import { createThemedSlot } from "@/components/desktop/ThemedSlot";
import { WindowsShell } from "./WindowsShell";
import { MacOSShell } from "./MacOSShell";
import { LinuxShell } from "./LinuxShell";

export const ThemedShell = createThemedSlot<{}>("taskbar", {
  default: WindowsShell,
  windows: WindowsShell,
  macos: MacOSShell,
  linux: LinuxShell,
});
