"use client";

import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * Reflects font/scrollbar/cursor theme choices as `data-*` attributes on the
 * <html> element. CSS in globals.css keys off those attributes to swap global
 * styles (scrollbars, font stack, cursors) without a full re-render.
 */
export function ThemeHtmlBridge() {
  const { resolve, hydrated } = useTheme();
  const fontTheme = resolve("fonts");
  const scrollbarTheme = resolve("scrollbars");
  const cursorTheme = resolve("cursors");

  useEffect(() => {
    if (!hydrated) return;
    const html = document.documentElement;
    html.setAttribute("data-fonts", fontTheme);
    html.setAttribute("data-scrollbars", scrollbarTheme);
    html.setAttribute("data-cursors", cursorTheme);
  }, [hydrated, fontTheme, scrollbarTheme, cursorTheme]);

  return null;
}
