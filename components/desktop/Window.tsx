"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { useThemeChoice } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getShellInsets } from "@/lib/shell-insets";
import type { AppDefinition, WindowState } from "@/types/os";
import { ThemedTitleBar, CHROME_TOKENS } from "./WindowChrome";
import { AppIcon } from "./AppIcon";

export const TASKBAR_HEIGHT = 52;
const TITLEBAR_HEIGHT = 36;
const MIN_WIDTH = 380;
const MIN_HEIGHT = 260;
/** Keep at least this many px of titlebar visible when a window is near an edge. */
const EDGE_VISIBLE_PX = 80;

type WindowProps = {
  win: WindowState;
  app: AppDefinition;
};

function WindowImpl({ win, app }: WindowProps) {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
    activeWindowId,
  } = useOs();
  const isActive = activeWindowId === win.id;
  const Content = app.Content;
  const windowTheme = useThemeChoice("window");
  const chrome = CHROME_TOKENS[windowTheme];
  const shellTheme = useThemeChoice("taskbar");
  const isMobile = useIsMobile();
  const insets = getShellInsets(shellTheme, isMobile);

  const frameRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<null | { offsetX: number; offsetY: number }>(null);
  const [resize, setResize] = useState<null | {
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startLeft: number;
    startTop: number;
    edge: ResizeEdge;
  }>(null);

  const onTitleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || win.maximized || e.button !== 0) return;
      focusWindow(win.id);
      setDrag({ offsetX: e.clientX - win.x, offsetY: e.clientY - win.y });
    },
    [win.id, win.x, win.y, win.maximized, focusWindow, isMobile],
  );

  useEffect(() => {
    if (!drag) return;
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX - drag.offsetX;
      const y = e.clientY - drag.offsetY;
      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;
      const minX = EDGE_VISIBLE_PX - win.width;
      const maxX = viewportW - EDGE_VISIBLE_PX;
      const minY = 0;
      const maxY = viewportH - TASKBAR_HEIGHT - TITLEBAR_HEIGHT;
      moveWindow(
        win.id,
        Math.max(minX, Math.min(maxX, x)),
        Math.max(minY, Math.min(maxY, y)),
      );
    };
    const handleUp = () => setDrag(null);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [drag, win.id, win.width, moveWindow]);

  useEffect(() => {
    if (!resize) return;
    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - resize.startX;
      const dy = e.clientY - resize.startY;
      let width = resize.startW;
      let height = resize.startH;
      let x = resize.startLeft;
      let y = resize.startTop;
      if (resize.edge.includes("e")) width = resize.startW + dx;
      if (resize.edge.includes("s")) height = resize.startH + dy;
      if (resize.edge.includes("w")) {
        width = resize.startW - dx;
        x = resize.startLeft + dx;
      }
      if (resize.edge.includes("n")) {
        height = resize.startH - dy;
        y = resize.startTop + dy;
      }
      width = Math.max(MIN_WIDTH, width);
      height = Math.max(MIN_HEIGHT, height);

      const viewportH = window.innerHeight;
      const maxBottom = viewportH - TASKBAR_HEIGHT;
      if (y + height > maxBottom) {
        height = Math.max(MIN_HEIGHT, maxBottom - y);
      }

      resizeWindow(win.id, width, height);
      moveWindow(win.id, x, y);
    };
    const handleUp = () => setResize(null);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [resize, win.id, moveWindow, resizeWindow]);

  const fullscreenStyle: React.CSSProperties = {
    left: 0,
    top: insets.top,
    width: "100vw",
    height: `calc(100vh - ${insets.top}px - ${insets.bottom}px)`,
  };

  const style: React.CSSProperties = isMobile || win.maximized
    ? fullscreenStyle
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
      };

  return (
    <AnimatePresence>
      {!win.minimized && (
        <motion.div
          ref={frameRef}
          key={win.id}
          initial={{ opacity: 0, scale: isMobile ? 1 : 0.96, y: isMobile ? 20 : 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: isMobile ? 1 : 0.98, y: isMobile ? 20 : 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onMouseDown={() => focusWindow(win.id)}
          style={{ ...style, zIndex: Math.min(win.zIndex, 49) }}
          className={cn(
            "fixed flex flex-col overflow-hidden text-neutral-100",
            isMobile || win.maximized ? "rounded-none" : chrome.radius,
            isMobile ? "" : chrome.border,
            chrome.background,
            isActive ? chrome.shadowActive : chrome.shadow,
          )}
          role="dialog"
          aria-label={win.title}
          data-app-window
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />

          {isMobile ? (
            <MobileTitleBar
              title={win.title}
              icon={win.icon}
              onClose={() => closeWindow(win.id)}
            />
          ) : (
            <ThemedTitleBar
              title={win.title}
              icon={win.icon}
              active={isActive}
              maximized={win.maximized}
              onDragStart={onTitleMouseDown}
              onDoubleClick={() => toggleMaximize(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => toggleMaximize(win.id)}
              onClose={() => closeWindow(win.id)}
            />
          )}

          <div className="relative flex-1 overflow-hidden">
            {Content && <Content windowId={win.id} />}
          </div>

          {!isMobile && !win.maximized && (
            <ResizeHandles
              onBegin={(edge, e) => {
                setResize({
                  startX: e.clientX,
                  startY: e.clientY,
                  startW: win.width,
                  startH: win.height,
                  startLeft: win.x,
                  startTop: win.y,
                  edge,
                });
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const Window = memo(WindowImpl);

function MobileTitleBar({
  title,
  icon,
  onClose,
}: {
  title: string;
  icon: WindowState["icon"];
  onClose: () => void;
}) {
  return (
    <div className="relative flex h-11 flex-shrink-0 items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3">
      <AppIcon icon={icon} className="h-5 w-5" glyphClassName="h-3 w-3" rounded="rounded-[5px]" />
      <span className="flex-1 truncate text-[13px] font-medium text-neutral-100">{title}</span>
      <button
        onClick={onClose}
        aria-label="Close"
        className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-300 active:bg-white/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

function ResizeHandles({
  onBegin,
}: {
  onBegin: (edge: ResizeEdge, e: React.MouseEvent) => void;
}) {
  const base = "absolute select-none";
  const edges: { edge: ResizeEdge; className: string }[] = [
    { edge: "n", className: "top-0 left-2 right-2 h-1 cursor-n-resize" },
    { edge: "s", className: "bottom-0 left-2 right-2 h-1 cursor-s-resize" },
    { edge: "w", className: "top-2 bottom-2 left-0 w-1 cursor-w-resize" },
    { edge: "e", className: "top-2 bottom-2 right-0 w-1 cursor-e-resize" },
    { edge: "nw", className: "top-0 left-0 h-2 w-2 cursor-nw-resize" },
    { edge: "ne", className: "top-0 right-0 h-2 w-2 cursor-ne-resize" },
    { edge: "sw", className: "bottom-0 left-0 h-2 w-2 cursor-sw-resize" },
    { edge: "se", className: "bottom-0 right-0 h-2 w-2 cursor-se-resize" },
  ];
  return (
    <>
      {edges.map(({ edge, className }) => (
        <div
          key={edge}
          onMouseDown={(e) => {
            e.stopPropagation();
            onBegin(edge, e);
          }}
          className={cn(base, className)}
        />
      ))}
    </>
  );
}
