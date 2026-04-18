"use client";

import { useShellUI } from "@/context/ShellUIContext";
import { MobileStatusBar } from "@/components/desktop/Mobile/MobileStatusBar";
import { IOSHomeIndicator } from "@/components/desktop/Mobile/IOSHomeIndicator";
import { MobileRecents } from "@/components/desktop/Mobile/MobileRecents";
import { MobileActionPanel } from "@/components/desktop/Mobile/MobileActionPanel";

/** iOS-flavored mobile shell: status bar + Dynamic Island + home indicator bar. */
export function MacOSMobileShell() {
  const { popover, close } = useShellUI();
  return (
    <>
      <MobileStatusBar theme="macos" />
      <IOSHomeIndicator />
      <MobileRecents open={popover === "recents"} onClose={close} />
      <MobileActionPanel open={popover === "action"} onClose={close} theme="macos" />
    </>
  );
}
