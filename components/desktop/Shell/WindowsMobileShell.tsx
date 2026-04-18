"use client";

import { useShellUI } from "@/context/ShellUIContext";
import { MobileStatusBar } from "@/components/desktop/Mobile/MobileStatusBar";
import { AndroidNavBar } from "@/components/desktop/Mobile/AndroidNavBar";
import { MobileRecents } from "@/components/desktop/Mobile/MobileRecents";

/**
 * Windows-flavored mobile shell: Windows Phone has been discontinued, so
 * we lean on Android-style 3-button navigation but keep the Fluent accent
 * and acrylic bottom bar so it still reads as "Windows on Android".
 */
export function WindowsMobileShell() {
  const { popover, close } = useShellUI();
  return (
    <>
      <MobileStatusBar theme="windows" />
      <AndroidNavBar
        accent="text-sky-400"
        background="border-t border-white/10 bg-neutral-950/80 backdrop-blur-xl"
      />
      <MobileRecents open={popover === "recents"} onClose={close} />
    </>
  );
}
