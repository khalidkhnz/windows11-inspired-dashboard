"use client";

import { useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { useThemeChoice } from "@/context/ThemeContext";
import { AppIcon } from "@/components/desktop/AppIcon";
import { useClock } from "@/hooks/useClock";
import type { AppDefinition } from "@/types/os";

const PER_PAGE = 20; // 4 columns x 5 rows

function chunk<T>(arr: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < arr.length; i += size) pages.push(arr.slice(i, i + size));
  return pages;
}

/**
 * Mobile home screen: every app in the OS, paginated left-to-right so the
 * user can swipe between pages like iOS / Android launchers. Styling
 * varies by theme (tile grid for Windows, squircles for iOS, circles for
 * Android).
 */
export function MobileHome() {
  const { apps, openApp } = useOs();
  const theme = useThemeChoice("desktopIcons");
  const now = useClock();
  const pages = useMemo(() => chunk(apps, PER_PAGE), [apps]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageIdx, setPageIdx] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== pageIdx) setPageIdx(idx);
  }

  const header =
    theme === "macos"
      ? null
      : theme === "linux"
        ? <AndroidClock now={now} />
        : <WindowsPhoneClock now={now} />;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {header && <div className="flex-shrink-0 px-5 pt-8">{header}</div>}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {pages.map((pageApps, i) => (
          <Page
            key={i}
            apps={pageApps}
            theme={theme}
            onOpen={(id) => openApp(id)}
          />
        ))}
      </div>

      {pages.length > 1 && (
        <div className="flex flex-shrink-0 items-center justify-center gap-1.5 pb-3 pt-1">
          {pages.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all",
                i === pageIdx ? "w-4 bg-white/90" : "bg-white/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Page({
  apps,
  theme,
  onOpen,
}: {
  apps: AppDefinition[];
  theme: "windows" | "macos" | "linux";
  onOpen: (id: string) => void;
}) {
  if (theme === "macos") return <IOSPage apps={apps} onOpen={onOpen} />;
  if (theme === "linux") return <AndroidPage apps={apps} onOpen={onOpen} />;
  return <WindowsPhonePage apps={apps} onOpen={onOpen} />;
}

type PageProps = {
  apps: AppDefinition[];
  onOpen: (id: string) => void;
};

function WindowsPhonePage({ apps, onOpen }: PageProps) {
  return (
    <div className="w-full flex-shrink-0 snap-center overflow-y-auto px-5 pb-6 pt-2">
      <ul className="grid grid-cols-4 gap-3">
        {apps.map((app) => (
          <HomeTile
            key={app.id}
            app={app}
            onOpen={onOpen}
            iconClass="h-14 w-14"
            rounded="rounded-[14px]"
            glyph="h-6 w-6"
          />
        ))}
      </ul>
    </div>
  );
}

function IOSPage({ apps, onOpen }: PageProps) {
  return (
    <div className="w-full flex-shrink-0 snap-center overflow-y-auto px-4 pb-6 pt-6">
      <ul className="grid grid-cols-4 gap-y-5">
        {apps.map((app) => (
          <HomeTile
            key={app.id}
            app={app}
            onOpen={onOpen}
            iconClass="h-14 w-14 shadow-lg"
            rounded="rounded-[16px]"
            glyph="h-6 w-6"
            center
          />
        ))}
      </ul>
    </div>
  );
}

function AndroidPage({ apps, onOpen }: PageProps) {
  return (
    <div className="w-full flex-shrink-0 snap-center overflow-y-auto px-5 pb-6 pt-4">
      <ul className="grid grid-cols-4 gap-y-5">
        {apps.map((app) => (
          <HomeTile
            key={app.id}
            app={app}
            onOpen={onOpen}
            iconClass="h-12 w-12 shadow-lg"
            rounded="rounded-full"
            glyph="h-5 w-5"
            center
          />
        ))}
      </ul>
    </div>
  );
}

function HomeTile({
  app,
  onOpen,
  iconClass,
  glyph,
  rounded,
  center,
}: {
  app: AppDefinition;
  onOpen: (id: string) => void;
  iconClass: string;
  glyph: string;
  rounded: string;
  center?: boolean;
}) {
  return (
    <li className={cn(center && "flex justify-center")}>
      <button
        onClick={() => onOpen(app.id)}
        className={cn(
          "flex flex-col items-center gap-1.5 text-center text-[11px] leading-tight text-white outline-none active:opacity-80",
          center ? "w-[72px]" : "w-full",
        )}
      >
        <AppIcon
          icon={app.icon}
          className={iconClass}
          glyphClassName={glyph}
          rounded={rounded}
        />
        <span className="line-clamp-1 px-0.5 [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)]">
          {app.title}
        </span>
      </button>
    </li>
  );
}

function WindowsPhoneClock({ now }: { now: Date }) {
  return (
    <div className="text-white/95">
      <div className="text-[44px] font-light leading-none tracking-tight drop-shadow">
        {format(now, "h:mm")}
      </div>
      <div className="mt-1 text-sm font-medium text-white/80 drop-shadow">
        {format(now, "EEEE, MMMM d")}
      </div>
    </div>
  );
}

function AndroidClock({ now }: { now: Date }) {
  return (
    <div className="text-white/95">
      <div className="text-center text-[52px] font-thin leading-none tracking-tight drop-shadow">
        {format(now, "H:mm")}
      </div>
      <div className="mt-1 text-center text-xs text-white/75 drop-shadow">
        {format(now, "EEEE, MMMM d")}
      </div>
    </div>
  );
}
