"use client";

import { createThemedSlot } from "@/components/desktop/ThemedSlot";
import { WindowsActionCenter } from "./WindowsActionCenter";
import { MacOSControlCenter } from "./MacOSControlCenter";
import { LinuxSystemMenu } from "./LinuxSystemMenu";
import type { ActionCenterProps } from "./types";

export const ThemedActionCenter = createThemedSlot<ActionCenterProps>(
  "actionCenter",
  {
    default: WindowsActionCenter,
    windows: WindowsActionCenter,
    macos: MacOSControlCenter,
    linux: LinuxSystemMenu,
  },
);
