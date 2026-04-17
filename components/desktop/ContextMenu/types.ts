import type { LucideIcon } from "lucide-react";

export type ContextMenuItem = {
  label: string;
  icon: LucideIcon;
  shortcut?: string;
  onClick: () => void;
};

export type ContextMenuProps = {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onItemClick: (item: ContextMenuItem) => void;
};
