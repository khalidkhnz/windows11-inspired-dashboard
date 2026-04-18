"use client";

import { createThemedSlot } from "@/components/desktop/ThemedSlot";
import { useIsMobile } from "@/hooks/useIsMobile";
import { WindowsShell } from "./WindowsShell";
import { MacOSShell } from "./MacOSShell";
import { LinuxShell } from "./LinuxShell";
import { WindowsMobileShell } from "./WindowsMobileShell";
import { MacOSMobileShell } from "./MacOSMobileShell";
import { LinuxMobileShell } from "./LinuxMobileShell";

const DesktopShell = createThemedSlot<{}>("taskbar", {
  default: WindowsShell,
  windows: WindowsShell,
  macos: MacOSShell,
  linux: LinuxShell,
});

const MobileShell = createThemedSlot<{}>("taskbar", {
  default: WindowsMobileShell,
  windows: WindowsMobileShell,
  macos: MacOSMobileShell,
  linux: LinuxMobileShell,
});

export function ThemedShell() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileShell /> : <DesktopShell />;
}
