"use client";

import { useShellUI } from "@/context/ShellUIContext";
import { MobileStatusBar } from "@/components/desktop/Mobile/MobileStatusBar";
import { AndroidNavBar } from "@/components/desktop/Mobile/AndroidNavBar";
import { MobileRecents } from "@/components/desktop/Mobile/MobileRecents";
import { MobileActionPanel } from "@/components/desktop/Mobile/MobileActionPanel";

/** Android-flavored mobile shell (Ubuntu accent for the Linux theme). */
export function LinuxMobileShell() {
  const { popover, close } = useShellUI();
  return (
    <>
      <MobileStatusBar theme="linux" />
      <AndroidNavBar
        accent="text-[#e95420]"
        background="bg-black/85 backdrop-blur-xl"
      />
      <MobileRecents open={popover === "recents"} onClose={close} />
      <MobileActionPanel open={popover === "action"} onClose={close} theme="linux" />
    </>
  );
}
