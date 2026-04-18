"use client";

import { useRef } from "react";
import { useOs } from "@/context/OsContext";
import { useShellUI } from "@/context/ShellUIContext";

const LONG_PRESS_MS = 380;
const SWIPE_UP_PX = 24;

/**
 * iOS-style home indicator. The entire bottom strip is the gesture target:
 *   · tap          → home (minimize all)
 *   · swipe up     → recents carousel
 *   · long-press   → recents carousel
 */
export function IOSHomeIndicator() {
  const { minimizeAll } = useOs();
  const { open } = useShellUI();
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const consumed = useRef(false);
  const startY = useRef(0);

  function clearTimer() {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  }

  function handleDown(e: React.PointerEvent<HTMLElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    consumed.current = false;
    startY.current = e.clientY;
    pressTimer.current = setTimeout(() => {
      consumed.current = true;
      open("recents");
    }, LONG_PRESS_MS);
  }

  function handleMove(e: React.PointerEvent<HTMLElement>) {
    if (consumed.current) return;
    const dy = startY.current - e.clientY;
    if (dy >= SWIPE_UP_PX) {
      clearTimer();
      consumed.current = true;
      open("recents");
    }
  }

  function handleUp() {
    clearTimer();
    if (!consumed.current) {
      minimizeAll();
    }
  }

  function handleCancel() {
    clearTimer();
    consumed.current = true;
  }

  return (
    <footer
      role="button"
      aria-label="Home — tap for home, swipe up or hold for recents"
      className="fixed inset-x-0 bottom-0 z-50 flex h-9 items-end justify-center"
      style={{ touchAction: "none" }}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerCancel={handleCancel}
    >
      <div className="mb-1.5 h-[5px] w-[134px] rounded-full bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
    </footer>
  );
}
