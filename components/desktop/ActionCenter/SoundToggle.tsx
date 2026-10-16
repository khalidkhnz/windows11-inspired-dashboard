"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSoundSettings } from "@/hooks/useSound";
import { playSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

/**
 * Mute toggle for UI sounds. Visual styling is supplied by each themed
 * action center via `className`; `children` receives the current state.
 */
export function SoundToggle({
  className,
  children,
}: {
  className?: string | ((enabled: boolean) => string);
  children?: (enabled: boolean) => React.ReactNode;
}) {
  const { enabled, setEnabled } = useSoundSettings();
  const Icon = enabled ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="UI sounds"
      data-sound="off"
      onClick={() => {
        setEnabled(!enabled);
        // Preview so the user hears what they just switched on.
        if (!enabled) window.setTimeout(() => playSound("click"), 0);
      }}
      className={cn(typeof className === "function" ? className(enabled) : className)}
    >
      {children ? children(enabled) : <Icon className="h-4 w-4" />}
    </button>
  );
}
