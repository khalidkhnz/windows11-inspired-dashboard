"use client";

import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function KeyboardShortcuts() {
  const { windows, setWindows, setMinimizedWindows, activeWindow } =
    useAppContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Win + D - Show Desktop (minimize all windows)
      if ((e.metaKey || e.key === "Meta") && e.key === "d") {
        e.preventDefault();
        const allWindowIds = windows.map((w) => w.id);
        setMinimizedWindows(allWindowIds);
      }

      // Alt + F4 - Close active window
      if (e.altKey && e.key === "F4") {
        e.preventDefault();
        if (activeWindow !== null) {
          setWindows((prev) => prev.filter((w) => w.id !== activeWindow));
        }
      }

      // Win + Tab - Task View (could trigger task view)
      if ((e.metaKey || e.key === "Meta") && e.key === "Tab") {
        e.preventDefault();
        // Task view functionality could be added here
      }

      // Win + Left Arrow - Snap window to left
      if ((e.metaKey || e.key === "Meta") && e.key === "ArrowLeft") {
        e.preventDefault();
        // Snap left functionality
      }

      // Win + Right Arrow - Snap window to right
      if ((e.metaKey || e.key === "Meta") && e.key === "ArrowRight") {
        e.preventDefault();
        // Snap right functionality
      }

      // Escape - Close context menus, etc.
      if (e.key === "Escape") {
        // Could close open menus
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [windows, activeWindow, setWindows, setMinimizedWindows]);

  return null; // This component doesn't render anything
}
