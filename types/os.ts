import type { ComponentType } from "react";
import type { AppIconSpec } from "@/components/desktop/AppIcon";

export type AppId = string;

export type AppDefinition = {
  id: AppId;
  title: string;
  icon: AppIconSpec;
  /** In-app content. If absent, `action` is used. */
  Content?: ComponentType<{ windowId: number }>;
  /** External link / custom side-effect opened by the taskbar/desktop shortcut. */
  action?: () => void;
  /** Default window size (px). */
  defaultSize?: { width: number; height: number };
  /** Allow multiple instances of this app open at once. */
  multiInstance?: boolean;
  /** Pin in Start menu. */
  pinnedInStart?: boolean;
  /** Pin on the desktop. */
  pinnedOnDesktop?: boolean;
  /** Pin in the taskbar. */
  pinnedInTaskbar?: boolean;
  /** Show in the recommended strip. */
  recommended?: boolean;
};

export type WindowState = {
  id: number;
  appId: AppId;
  title: string;
  icon: AppIconSpec;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  /** Pre-maximize bounds so we can restore. */
  restore?: { x: number; y: number; width: number; height: number };
};

export type OsContextValue = {
  apps: AppDefinition[];
  appsById: Record<AppId, AppDefinition>;
  windows: WindowState[];
  activeWindowId: number | null;
  openApp: (appId: AppId) => void;
  closeWindow: (id: number) => void;
  focusWindow: (id: number) => void;
  minimizeWindow: (id: number) => void;
  toggleMaximize: (id: number) => void;
  moveWindow: (id: number, x: number, y: number) => void;
  resizeWindow: (id: number, width: number, height: number) => void;
  restoreOrMinimize: (id: number) => void;
};
