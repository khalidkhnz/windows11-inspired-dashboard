"use client";

import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { AppIcon } from "./AppIcon";
import { MobileHome } from "./Mobile/MobileHome";

/**
 * Desktop icons grid. Flows top-to-bottom, then wraps into a new column
 * when the current column fills the available height, so a long list of
 * pinned apps never overflows off-screen. On phone viewports the grid is
 * replaced by a full-screen, themed home screen.
 */
export default function DesktopIcons() {
  const isMobile = useIsMobile();
  const { apps, openApp } = useOs();

  if (isMobile) return <MobileHome />;

  const pinned = apps.filter((a) => a.pinnedOnDesktop);

  return (
    <ul
      className={cn(
        "absolute left-4 right-4 top-4 grid grid-flow-col content-start gap-1",
      )}
      style={{
        gridTemplateRows: "repeat(auto-fill, 92px)",
        gridAutoColumns: "80px",
        // Leave room for the taskbar / dock / panel.
        height: "calc(100vh - 80px)",
      }}
    >
      {pinned.map((app) => (
        <li key={app.id}>
          <button
            onDoubleClick={() => openApp(app.id)}
            onKeyDown={(e) => e.key === "Enter" && openApp(app.id)}
            className={cn(
              "group flex h-[92px] w-20 flex-col items-center justify-start gap-1.5 rounded-md border border-transparent px-1 py-2 text-center text-[11px] leading-tight text-white outline-none transition-colors",
              "focus-visible:border-white/30 focus-visible:bg-white/15 hover:bg-white/10",
            )}
          >
            <AppIcon
              icon={app.icon}
              className="h-11 w-11"
              glyphClassName="h-5 w-5"
            />
            <span className="line-clamp-2 px-0.5 [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]">
              {app.title}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
