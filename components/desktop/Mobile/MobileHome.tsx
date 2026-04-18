"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { useThemeChoice } from "@/context/ThemeContext";
import { AppIcon } from "@/components/desktop/AppIcon";
import { useClock } from "@/hooks/useClock";

/**
 * Mobile home screen: fullscreen icon grid behind all windows. Styling
 * varies by theme to echo Windows Phone / iOS / Android.
 */
export function MobileHome() {
  const { apps, openApp } = useOs();
  const theme = useThemeChoice("desktopIcons");
  const now = useClock();
  const homeApps = useMemo(() => apps.filter((a) => a.pinnedInStart), [apps]);

  if (theme === "macos") return <IOSHome apps={homeApps} openApp={openApp} />;
  if (theme === "linux") return <AndroidHome apps={homeApps} openApp={openApp} now={now} />;
  return <WindowsPhoneHome apps={homeApps} openApp={openApp} now={now} />;
}

type HomeProps = {
  apps: ReturnType<typeof useOs>["apps"];
  openApp: ReturnType<typeof useOs>["openApp"];
  now?: Date;
};

function WindowsPhoneHome({ apps, openApp, now }: HomeProps) {
  return (
    <div className="relative h-full w-full overflow-y-auto px-5 pb-6 pt-10">
      {now && (
        <div className="pb-6 text-white/95">
          <div className="text-[44px] font-light leading-none tracking-tight drop-shadow">
            {format(now, "h:mm")}
          </div>
          <div className="mt-1 text-sm font-medium text-white/80 drop-shadow">
            {format(now, "EEEE, MMMM d")}
          </div>
        </div>
      )}
      <ul className="grid grid-cols-4 gap-3">
        {apps.map((app) => (
          <li key={app.id}>
            <button
              onClick={() => openApp(app.id)}
              className={cn(
                "group flex w-full flex-col items-center gap-1.5 rounded-lg p-1 text-center text-[11px] leading-tight text-white outline-none",
                "active:bg-white/10 focus-visible:bg-white/15",
              )}
            >
              <AppIcon
                icon={app.icon}
                className="h-14 w-14"
                glyphClassName="h-6 w-6"
                rounded="rounded-[14px]"
              />
              <span className="line-clamp-2 px-0.5 [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)]">
                {app.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IOSHome({ apps, openApp }: HomeProps) {
  return (
    <div className="relative h-full w-full overflow-y-auto px-4 pb-6 pt-6">
      <ul className="grid grid-cols-4 gap-y-5">
        {apps.map((app) => (
          <li key={app.id} className="flex justify-center">
            <button
              onClick={() => openApp(app.id)}
              className="flex w-[72px] flex-col items-center gap-1.5 text-center text-[11px] leading-tight text-white outline-none active:opacity-80"
            >
              <AppIcon
                icon={app.icon}
                className="h-14 w-14 shadow-lg"
                glyphClassName="h-6 w-6"
                rounded="rounded-[16px]"
              />
              <span className="line-clamp-1 px-0.5 [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)]">
                {app.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AndroidHome({ apps, openApp, now }: HomeProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto px-5 pb-6 pt-10">
      {now && (
        <div className="pb-8 text-white/95">
          <div className="text-center text-[52px] font-thin leading-none tracking-tight drop-shadow">
            {format(now, "H:mm")}
          </div>
          <div className="mt-1 text-center text-xs text-white/75 drop-shadow">
            {format(now, "EEEE, MMMM d")}
          </div>
        </div>
      )}
      <ul className="grid grid-cols-4 gap-y-5">
        {apps.map((app) => (
          <li key={app.id} className="flex justify-center">
            <button
              onClick={() => openApp(app.id)}
              className="flex w-[72px] flex-col items-center gap-1.5 text-center text-[11px] leading-tight text-white outline-none active:opacity-80"
            >
              <AppIcon
                icon={app.icon}
                className="h-12 w-12 shadow-lg"
                glyphClassName="h-5 w-5"
                rounded="rounded-full"
              />
              <span className="line-clamp-1 px-0.5 [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)]">
                {app.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
