"use client";

import { useShellUI } from "@/context/ShellUIContext";
import { MobileStatusBar } from "@/components/desktop/Mobile/MobileStatusBar";
import { IOSHomeIndicator } from "@/components/desktop/Mobile/IOSHomeIndicator";
import { MobileRecents } from "@/components/desktop/Mobile/MobileRecents";

/** iOS-flavored mobile shell: status bar + home indicator bar. */
export function MacOSMobileShell() {
  const { popover, close } = useShellUI();
  return (
    <>
      <MobileStatusBar theme="macos" />
      <IOSHomeIndicator />
      <MobileRecents open={popover === "recents"} onClose={close} />
    </>
  );
}
