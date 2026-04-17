"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Square, Copy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import type { AppDefinition, WindowState } from "@/types/os";

const TASKBAR_HEIGHT = 52;
const TITLEBAR_HEIGHT = 36;
const MIN_WIDTH = 380;
const MIN_HEIGHT = 260;

type WindowProps = {
  win: WindowState;
  app: AppDefinition;
};

function WindowImpl({ win, app }: WindowProps) {
  const { focusWindow, closeWindow, minimizeWindow, toggleMaximize, moveWindow, resizeWindow, activeWindowId } =
    useOs();
  const isActive = activeWindowId === win.id;
  const Content = app.Content;

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
      if (win.maximized || e.button !== 0) return;
      focusWindow(win.id);
      setDrag({ offsetX: e.clientX - win.x, offsetY: e.clientY - win.y });
    },
    [win.id, win.x, win.y, win.maximized, focusWindow],
  );

  useEffect(() => {
    if (!drag) return;
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX - drag.offsetX;
      const y = e.clientY - drag.offsetY;
      const maxX = window.innerWidth - MIN_WIDTH / 2;
      const maxY = window.innerHeight - TASKBAR_HEIGHT - TITLEBAR_HEIGHT;
      moveWindow(
        win.id,
        Math.max(-(win.width - MIN_WIDTH / 2), Math.min(maxX, x)),
        Math.max(0, Math.min(maxY, y)),
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

  const maximizedStyle: React.CSSProperties = {
    left: 0,
    top: 0,
    width: "100vw",
    height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
  };

  const style: React.CSSProperties = win.maximized
    ? maximizedStyle
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
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          onMouseDown={() => focusWindow(win.id)}
          style={{ ...style, zIndex: win.zIndex }}
          className={cn(
            "fixed flex flex-col overflow-hidden text-neutral-100 shadow-2xl",
            win.maximized ? "rounded-none" : "rounded-lg",
            "border border-white/10 bg-neutral-950/95 backdrop-blur-md",
            isActive && "shadow-[0_24px_80px_-12px_rgba(0,0,0,0.6)]",
          )}
          role="dialog"
          aria-label={win.title}
        >
          <TitleBar
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

          <div className="relative flex-1 overflow-hidden bg-neutral-950">
            {Content && <Content windowId={win.id} />}
          </div>

          {!win.maximized && (
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

function TitleBar({
  title,
  icon,
  active,
  maximized,
  onDragStart,
  onDoubleClick,
  onMinimize,
  onMaximize,
  onClose,
}: {
  title: string;
  icon: WindowState["icon"];
  active: boolean;
  maximized: boolean;
  onDragStart: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "flex h-9 items-center justify-between border-b border-white/5 bg-neutral-950/60 pl-3 pr-0 text-xs backdrop-blur-md",
        active ? "bg-neutral-900/80" : "bg-neutral-950/60",
      )}
    >
      <div
        onMouseDown={onDragStart}
        onDoubleClick={onDoubleClick}
        className="flex h-full flex-1 cursor-grab items-center gap-2 select-none active:cursor-grabbing"
      >
        <div className="relative h-4 w-4">
          <Image src={icon} alt="" fill className="object-contain" />
        </div>
        <span className="truncate text-[12px] text-neutral-200">{title}</span>
      </div>
      <div className="flex h-full items-stretch">
        <button
          aria-label="Minimize"
          onClick={onMinimize}
          className="flex h-full w-11 items-center justify-center text-neutral-300 transition-colors hover:bg-white/10"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          aria-label={maximized ? "Restore" : "Maximize"}
          onClick={onMaximize}
          className="flex h-full w-11 items-center justify-center text-neutral-300 transition-colors hover:bg-white/10"
        >
          {maximized ? <Copy className="h-3.5 w-3.5" /> : <Square className="h-3 w-3" />}
        </button>
        <button
          aria-label="Close"
          onClick={onClose}
          className="flex h-full w-11 items-center justify-center text-neutral-300 transition-colors hover:bg-red-500 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
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
