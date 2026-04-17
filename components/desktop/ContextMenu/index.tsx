"use client";

import { createThemedSlot } from "@/components/desktop/ThemedSlot";
import { WindowsContextMenu } from "./WindowsContextMenu";
import { MacOSContextMenu } from "./MacOSContextMenu";
import { LinuxContextMenu } from "./LinuxContextMenu";
import type { ContextMenuProps } from "./types";

export const ThemedContextMenu = createThemedSlot<ContextMenuProps>(
  "contextMenu",
  {
    default: WindowsContextMenu,
    windows: WindowsContextMenu,
    macos: MacOSContextMenu,
    linux: LinuxContextMenu,
  },
);

export type { ContextMenuItem, ContextMenuProps } from "./types";
