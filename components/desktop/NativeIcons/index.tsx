import type { FC } from "react";
import type { Theme } from "@/types/theme";
import { WindowsTerminal, MacOSTerminal, LinuxTerminal } from "./Terminal";
import { WindowsExplorer, MacOSFinder, LinuxFiles } from "./FileManager";
import { WindowsSettings, MacOSSettings, LinuxSettings } from "./Settings";
import { WindowsRecycle, MacOSTrash, LinuxTrash } from "./Trash";
import { WindowsGitHub, MacOSGitHub, LinuxGitHub } from "./GitHub";

export type NativeIconKey =
  | "terminal"
  | "explorer"
  | "settings"
  | "trash"
  | "github";

type VariantComponent = FC<{ size?: number }>;

export const NATIVE_ICONS: Record<NativeIconKey, Record<Theme, VariantComponent>> = {
  terminal: {
    windows: WindowsTerminal,
    macos: MacOSTerminal,
    linux: LinuxTerminal,
  },
  explorer: {
    windows: WindowsExplorer,
    macos: MacOSFinder,
    linux: LinuxFiles,
  },
  settings: {
    windows: WindowsSettings,
    macos: MacOSSettings,
    linux: LinuxSettings,
  },
  trash: {
    windows: WindowsRecycle,
    macos: MacOSTrash,
    linux: LinuxTrash,
  },
  github: {
    windows: WindowsGitHub,
    macos: MacOSGitHub,
    linux: LinuxGitHub,
  },
};
