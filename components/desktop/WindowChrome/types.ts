import type { WindowState } from "@/types/os";

export type TitleBarProps = {
  title: string;
  icon: WindowState["icon"];
  active: boolean;
  maximized: boolean;
  onDragStart: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
};

export type ChromeTokens = {
  /** Tailwind radius class applied when not maximized. */
  radius: string;
  /** Tailwind shadow class appended when the window is active. */
  shadowActive: string;
  /** Tailwind shadow class when inactive. */
  shadow: string;
  /** Tailwind border class. */
  border: string;
  /** Tailwind background class. */
  background: string;
};
