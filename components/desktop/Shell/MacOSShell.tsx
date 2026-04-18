"use client";

import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Apple,
  Search,
  Wifi,
  Volume2,
  BatteryMedium,
  ToggleLeft,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";
import { useShellUI } from "@/context/ShellUIContext";
import { AppIcon } from "@/components/desktop/AppIcon";
import { StartMenu } from "@/components/desktop/StartMenu";
import { ClockPopover } from "@/components/desktop/ClockPopover";
import { ActionCenter } from "@/components/desktop/ActionCenter";
import { useClock } from "@/hooks/useClock";
import { owner } from "@/lib/portfolio";

export function MacOSShell() {
  const { apps, windows, activeWindowId, openApp, restoreOrMinimize, appsById } = useOs();
  const { popover, toggle, close } = useShellUI();
  const launchpadOpen = popover === "launcher";
  const clockOpen = popover === "clock";
  const controlOpen = popover === "action";
  const now = useClock();

  const dockApps = apps.filter((a) => a.pinnedInTaskbar);
  const activeWindow = activeWindowId != null ? windows.find((w) => w.id === activeWindowId) : null;
  const activeApp = activeWindow ? appsById[activeWindow.appId] : null;

  return (
    <>
      {/* Menu bar */}
      <header
        className="fixed inset-x-0 top-0 z-50 flex h-7 items-center justify-between bg-black/35 px-3 text-[12px] text-white backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          <Apple className="h-3.5 w-3.5" fill="currentColor" />
          <span className="font-semibold">{activeApp ? activeApp.title : owner.name}</span>
          <span className="text-white/75 hover:text-white">File</span>
          <span className="text-white/75 hover:text-white">Edit</span>
          <span className="text-white/75 hover:text-white">View</span>
          <span className="text-white/75 hover:text-white">Window</span>
          <span className="text-white/75 hover:text-white">Help</span>
        </div>
        <div className="flex items-center gap-3 font-medium">
          <BatteryMedium className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <Volume2 className="h-3.5 w-3.5" />
          <button
            onClick={() => toggle("action")}
            className={cn(
              "rounded p-0.5 hover:bg-white/20",
              controlOpen && "bg-white/20",
            )}
            aria-label="Control Center"
          >
            <ToggleLeft className="h-3.5 w-3.5" />
          </button>
          <Search className="h-3.5 w-3.5" />
          <button
            onClick={() => toggle("clock")}
            className={cn(
              "rounded px-1 tabular-nums hover:bg-white/20",
              clockOpen && "bg-white/20",
            )}
          >
            {format(now, "EEE MMM d  h:mm a")}
          </button>
        </div>
      </header>

      {/* Dock */}
      <footer className="fixed inset-x-0 bottom-2 z-50 flex items-end justify-center pointer-events-none">
        <div
          className={cn(
            "pointer-events-auto flex items-end gap-1 rounded-[20px] px-2.5 py-1.5",
            "bg-[rgba(255,255,255,0.18)] backdrop-blur-2xl backdrop-saturate-180",
            "shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.35)]",
            "ring-[0.5px] ring-black/20",
          )}
        >
          <MacDockItem
            title="Launchpad"
            isActive={false}
            hasWindow={false}
            onClick={() => toggle("launcher")}
          >
            <div className="relative flex h-12 w-12 items-center justify-center rounded-[14px] bg-[radial-gradient(circle_at_30%_25%,#f5f5f7,#b8b8be_65%,#8e8e93)] ring-[0.5px] ring-black/20 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.35)]">
              <span className="grid h-7 w-7 grid-cols-3 gap-[3px]">
                {[
                  "#ff5f57",
                  "#febc2e",
                  "#28c840",
                  "#5ac8fa",
                  "#007aff",
                  "#af52de",
                  "#ff9500",
                  "#ff2d55",
                  "#8e8e93",
                ].map((c, i) => (
                  <span key={i} className="rounded-[3px]" style={{ background: c }} />
                ))}
              </span>
            </div>
          </MacDockItem>

          {dockApps.map((app) => {
            const instances = windows.filter((w) => w.appId === app.id);
            const hasWindow = instances.length > 0;
            const isActive = instances.some((i) => i.id === activeWindowId);
            return (
              <MacDockItem
                key={app.id}
                title={app.title}
                isActive={isActive}
                hasWindow={hasWindow}
                onClick={() => {
                  if (hasWindow) restoreOrMinimize(instances[0].id);
                  else openApp(app.id);
                }}
              >
                <AppIcon
                  icon={app.icon}
                  className="h-12 w-12"
                  glyphClassName="h-6 w-6"
                  rounded="rounded-[14px]"
                />
              </MacDockItem>
            );
          })}

          {/* separator */}
          <div className="mx-1 h-10 w-px bg-black/20" />

          {/* trash */}
          <MacDockItem title="Trash" isActive={false} hasWindow={false}>
            <div className="flex h-12 w-12 flex-col items-center justify-center gap-[2px] rounded-[14px] bg-[radial-gradient(circle_at_30%_25%,#e5e5ea,#98989d_70%)] ring-[0.5px] ring-black/20 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.35)]">
              <span className="h-[3px] w-5 rounded-sm bg-[#48484a]" />
              <span className="flex h-6 w-6 items-center justify-center rounded-[4px] border-[2px] border-[#48484a] bg-transparent">
                <span className="h-3.5 w-0.5 bg-[#48484a]" />
              </span>
            </div>
          </MacDockItem>
        </div>
      </footer>

      <StartMenu open={launchpadOpen} onClose={close} />
      <ClockPopover open={clockOpen} onClose={close} now={now} />
      <ActionCenter open={controlOpen} onClose={close} />
    </>
  );
}

function MacDockItem({
  children,
  title,
  isActive,
  hasWindow,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  isActive: boolean;
  hasWindow: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -10, scale: 1.15 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      onClick={onClick}
      title={title}
      className="relative"
    >
      {children}
      {hasWindow && (
        <span
          className={cn(
            "absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
            isActive ? "bg-white" : "bg-white/70",
          )}
        />
      )}
    </motion.button>
  );
}
