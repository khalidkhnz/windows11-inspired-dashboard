"use client";

import { useEffect } from "react";
import { initSound, playSound } from "@/lib/sound";

const CLICKABLE = 'button, a, [role="button"], [role="switch"]';

/**
 * Boots the sound layer (autoplay unlock + persisted settings) and plays a
 * soft tick on clicks. Add `data-sound="off"` to an element to silence its
 * click tick.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initSound();
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || !(e.target instanceof Element)) return;
      const el = e.target.closest(CLICKABLE);
      if (!el || el.closest('[data-sound="off"]')) return;
      playSound("click");
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return <>{children}</>;
}
