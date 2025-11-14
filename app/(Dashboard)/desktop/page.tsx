"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useWindowDimensionHook from "@/hooks/useWindowDimensionHook";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { IWindow } from "@/types/context";
import useScreenSize from "@/hooks/useScreenSizes";
import { Cross, Maximize, Minimize } from "@/lib/icons";
import DesktopContextMenu from "@/components/DesktopContextMenu";
import SnapLayouts from "@/components/SnapLayouts";
import ResizeHandle from "@/components/ResizeHandle";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

// export async function generateMetadata() {
//   return {
//     title: "Main Space",
//     description: "",
//     openGraph: {
//       type: "Main Space",
//       url: "https://khalidkhnz.vercel.app",
//       title: "Main Space | Khalidkhnz",
//       description: "",
//       images: [],
//     },
//   };
// }

export default function Page() {
  const {
    windows,
    setWindows,
    activeWindow,
    setActiveWindow,
    apps,
    setMinimizedWindows,
  } = useAppContext();

  const { height, width } = useWindowDimensionHook();
  const [grid, setGrid] = useState({
    numberOfColumns: 0,
    numberOfRows: 0,
  });
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const blockSize = 120;

  useEffect(() => {
    const numberOfColumns = Math.floor(width / blockSize);
    const numberOfRows = Math.floor((height - 55) / blockSize);
    setGrid({
      numberOfColumns,
      numberOfRows,
    });
  }, [height, width]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      className="relative flex h-screen w-full justify-center pt-4"
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
    >
      <KeyboardShortcuts />
      <TooltipProvider>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${grid.numberOfColumns}, ${blockSize}px)`,
            gridTemplateRows: `repeat(${grid.numberOfRows}, ${blockSize}px)`,
            gridAutoFlow: "column",
          }}
          className="text-white"
        >
          {apps.desktopApps.map((app, idx) => {
            return (
              <Tooltip key={idx}>
                <TooltipTrigger>
                  <div
                    onDoubleClick={app.onClick ? app.onClick : () => {}}
                    className="relative flex h-[120px] w-[120px] items-center justify-center rounded-md border-white p-2 hover:bg-white/15"
                  >
                    {app.ICON && (
                      <div
                        className={cn(
                          "relative h-full w-full",
                          app.iconParentCSS,
                        )}
                      >
                        <Image
                          src={app.ICON}
                          alt={app.title}
                          className={cn("object-fill p-1", app.customCSS)}
                          fill
                        />
                      </div>
                    )}
                    <span className="absolute bottom-[2px] text-xs">
                      {app.title}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{app.title}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>

      {windows?.map((win, index) => (
        <WindowModal
          key={win.id}
          icon={win.icon}
          initialX={20}
          initialY={5 + 20 * index}
          idx={win.id}
          activeWindow={activeWindow == win.id}
          setActiveWindow={setActiveWindow}
          onClose={() =>
            setWindows((prev: IWindow[]) =>
              prev.filter((itm, i) => itm.id !== win.id),
            )
          }
          onMinimize={() =>
            setMinimizedWindows((prev: number[]) => [...prev, win.id])
          }
          title={win.title}
          content={win.content}
        />
      ))}

      {contextMenu && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}
    </section>
  );
}

function WindowModal({
  content,
  title,
  initialX,
  initialY,
  idx,
  onClose,
  maximize,
  activeWindow,
  setActiveWindow,
  onMinimize,
  icon,
}: {
  content?: any;
  title?: string;
  initialX?: number;
  initialY?: number;
  idx?: number;
  maximize?: boolean;
  activeWindow?: boolean;
  onClose?: Function;
  setActiveWindow?: Function;
  onMinimize?: Function;
  icon?: any;
}) {
  const id = `${title?.split(" ").join("__")}__${idx}__`;

  const { xl, sm, md, lg, xxl } = useScreenSize();

  const [isMaximized, setIsMaximized] = useState(maximize || false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({
    top: initialY || 0,
    left: initialX || 0,
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showSnapLayouts, setShowSnapLayouts] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: lg ? 800 : 400,
    height: 600,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) {
      setIsMaximized(false);
      gsap.to(`.${id}`, {
        // left: lg ? "calc(50% - 400px)" : "calc(50% - 150px)",
        // top: lg ? "calc(50% - 300px)" : "calc(50% - 250px)",
        width: lg ? "800px" : "400px",
        height: lg ? "600px" : "600px",
        duration: 0.1,
      });
    }

    setDragging(true);
    setOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragging) {
      const newLeft = e.clientX - offset.x;
      const newTop = e.clientY - offset.y;

      setPosition({
        left: newLeft,
        top: newTop,
      });

      gsap.to(`.${id}`, {
        left: newLeft,
        top: newTop,
        duration: 0.1,
      });
    }
  }, [dragging, offset.x, offset.y, id]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  }, []);

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setOffset({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleResizeMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizeDirection) return;

    const deltaX = e.clientX - offset.x;
    const deltaY = e.clientY - offset.y;

    let newWidth = windowSize.width;
    let newHeight = windowSize.height;
    let newLeft = position.left;
    let newTop = position.top;

    if (resizeDirection.includes("e")) {
      newWidth = Math.max(400, windowSize.width + deltaX);
    }
    if (resizeDirection.includes("w")) {
      newWidth = Math.max(400, windowSize.width - deltaX);
      newLeft = position.left + deltaX;
    }
    if (resizeDirection.includes("s")) {
      newHeight = Math.max(300, windowSize.height + deltaY);
    }
    if (resizeDirection.includes("n")) {
      newHeight = Math.max(300, windowSize.height - deltaY);
      newTop = position.top + deltaY;
    }

    setWindowSize({ width: newWidth, height: newHeight });
    setPosition({ left: newLeft, top: newTop });
    setOffset({ x: e.clientX, y: e.clientY });

    gsap.to(`.${id}`, {
      left: newLeft,
      top: newTop,
      width: `${newWidth}px`,
      height: `${newHeight}px`,
      duration: 0,
    });
  }, [isResizing, resizeDirection, windowSize, position, offset, id]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResizeMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleResizeMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleResizeMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleResizeMouseMove, handleMouseUp]);

  function handleMinimize() {
    gsap
      .to(`.${id}`, {
        left: lg ? "calc(50% - 400px)" : "calc(50% - 200px)",
        top: "100%",
        width: lg ? "800px" : "400px",
        height: lg ? "600px" : "600px",
        duration: 0.1,
        opacity: "0",
        ease: "power4.inOut",
      })
      .then(() => {
        setPosition({
          left: 0,
          top: 0,
        });
        gsap.to(`.${id}`, {
          left: lg ? "calc(50% - 400px)" : "calc(50% - 200px)",
          top: "100%",
          width: lg ? "800px" : "400px",
          height: lg ? "600px" : "600px",
          duration: 0.1,
          ease: "power4.inOut",
        });
      });
    onMinimize && onMinimize();
  }

  function handleSnapLayout(layout: string) {
    const { innerWidth, innerHeight } = window;
    const taskbarHeight = 55;
    
    setIsMaximized(false);
    
    switch (layout) {
      case "left":
        gsap.to(`.${id}`, {
          left: "0",
          top: "0",
          width: `${innerWidth / 2}px`,
          height: `${innerHeight - taskbarHeight}px`,
          duration: 0.2,
        });
        break;
      case "right":
        gsap.to(`.${id}`, {
          left: `${innerWidth / 2}px`,
          top: "0",
          width: `${innerWidth / 2}px`,
          height: `${innerHeight - taskbarHeight}px`,
          duration: 0.2,
        });
        break;
      case "top-left":
        gsap.to(`.${id}`, {
          left: "0",
          top: "0",
          width: `${innerWidth / 2}px`,
          height: `${(innerHeight - taskbarHeight) / 2}px`,
          duration: 0.2,
        });
        break;
      case "top-right":
        gsap.to(`.${id}`, {
          left: `${innerWidth / 2}px`,
          top: "0",
          width: `${innerWidth / 2}px`,
          height: `${(innerHeight - taskbarHeight) / 2}px`,
          duration: 0.2,
        });
        break;
      case "bottom-left":
        gsap.to(`.${id}`, {
          left: "0",
          top: `${(innerHeight - taskbarHeight) / 2}px`,
          width: `${innerWidth / 2}px`,
          height: `${(innerHeight - taskbarHeight) / 2}px`,
          duration: 0.2,
        });
        break;
      case "bottom-right":
        gsap.to(`.${id}`, {
          left: `${innerWidth / 2}px`,
          top: `${(innerHeight - taskbarHeight) / 2}px`,
          width: `${innerWidth / 2}px`,
          height: `${(innerHeight - taskbarHeight) / 2}px`,
          duration: 0.2,
        });
        break;
    }
  }

  function handleMaximize() {
    if (!isMaximized) {
      gsap
        .to(`.${id}`, {
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          duration: 0.1,
        })
        .then(() => {
          setPosition({
            left: 0,
            top: 0,
          });
        });
      setIsMaximized(true);
    } else {
      gsap
        .to(`.${id}`, {
          // left: lg ? "calc(50% - 400px)" : "calc(50% - 150px)",
          // top: lg ? "calc(50% - 300px)" : "calc(50% - 250px)",
          width: lg ? "800px" : "400px",
          height: lg ? "600px" : "600px",
          duration: 0.1,
        })
        .then(() => {
          setPosition({
            left: 0,
            top: 0,
          });
        });
      setIsMaximized(false);
    }
  }

  return (
    <div
      onMouseDown={() => setActiveWindow && setActiveWindow(idx)}
      style={{
        top: position.top,
        left: position.left,
        // width: "800px",
        // height: "600px",
      }}
      className={cn(
        "absolute right-8 top-8 flex w-fit flex-col overflow-hidden border-[1px] border-gray-200/10 bg-gray-900/95 text-white shadow-2xl backdrop-blur-md",
        id,
        {
          "border-blue-800 shadow-blue-500/20": activeWindow && !isMaximized,
          "z-10 bg-gray-900/80 backdrop-blur-md": activeWindow,
          "rounded-none": isMaximized,
          "rounded-lg": !isMaximized,
          "h-[600px] w-[380px] sm:w-[400px] lg:h-[600px] lg:w-[800px]": true,
        },
      )}
    >
      <div
        className={cn(
          "flex h-[40px] w-full cursor-pointer items-center justify-center border-gray-500/50 bg-neutral-800/95",
          {
            "bg-blue-800": activeWindow,
            "rounded-t-lg": !isMaximized,
          },
        )}
      >
        {icon && (
          <div className="ml-1 flex aspect-square h-full items-center justify-center p-2">
            <Image src={icon} alt={`${title}`} />
          </div>
        )}
        <h1
          onMouseDown={handleMouseDown}
          onDoubleClick={handleMaximize}
          className="flex h-full w-full items-center justify-start px-2 text-sm font-normal capitalize"
        >
          {title?.toLowerCase()}
        </h1>
        <div className="relative flex w-fit items-center justify-center text-white">
          <Minimize //@ts-ignore
            onClick={handleMinimize}
            className="min-h-[40px] min-w-[45px] p-1 px-[14px] hover:bg-white/10"
          />
          <div
            className="relative"
            onMouseEnter={() => setShowSnapLayouts(true)}
          >
            <Maximize //@ts-ignore
              onClick={handleMaximize}
              className="min-h-[40px] min-w-[45px] p-[6px] px-[16px] hover:bg-white/10"
            />
            {showSnapLayouts && (
              <SnapLayouts
                onSelectLayout={handleSnapLayout}
                onClose={() => setShowSnapLayouts(false)}
              />
            )}
          </div>
          <Cross
            //@ts-ignore
            onClick={onClose}
            className="min-h-[40px] min-w-[45px] p-1 px-[14px] hover:bg-red-500"
          />
        </div>
      </div>
      <div
        className={cn("relative h-full w-full", {
          "pb-[52px]": isMaximized,
        })}
      >
        {content}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <ResizeHandle direction="n" onMouseDown={handleResizeMouseDown} />
          <ResizeHandle direction="s" onMouseDown={handleResizeMouseDown} />
          <ResizeHandle direction="e" onMouseDown={handleResizeMouseDown} />
          <ResizeHandle direction="w" onMouseDown={handleResizeMouseDown} />
          <ResizeHandle direction="ne" onMouseDown={handleResizeMouseDown} />
          <ResizeHandle direction="nw" onMouseDown={handleResizeMouseDown} />
          <ResizeHandle direction="se" onMouseDown={handleResizeMouseDown} />
          <ResizeHandle direction="sw" onMouseDown={handleResizeMouseDown} />
        </>
      )}
    </div>
  );
}
