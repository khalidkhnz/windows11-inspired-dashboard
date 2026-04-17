"use client";

import { createThemedSlot } from "@/components/desktop/ThemedSlot";
import { WindowsClockPopover } from "./WindowsClockPopover";
import { MacOSClockPopover } from "./MacOSClockPopover";
import { LinuxClockPopover } from "./LinuxClockPopover";
import type { ClockPopoverProps } from "./types";

export const ThemedClockPopover = createThemedSlot<ClockPopoverProps>(
  "clockPopover",
  {
    default: WindowsClockPopover,
    windows: WindowsClockPopover,
    macos: MacOSClockPopover,
    linux: LinuxClockPopover,
  },
);
