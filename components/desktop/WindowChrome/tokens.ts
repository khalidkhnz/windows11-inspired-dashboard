import type { Theme } from "@/types/theme";
import type { ChromeTokens } from "./types";

export const CHROME_TOKENS: Record<Theme, ChromeTokens> = {
  windows: {
    radius: "rounded-xl",
    shadow: "shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65)]",
    shadowActive: "shadow-[0_30px_100px_-12px_rgba(0,0,0,0.8)]",
    border: "border border-white/10",
    background: "bg-neutral-900/95 backdrop-blur-md backdrop-saturate-150",
  },
  macos: {
    radius: "rounded-[10px]",
    shadow:
      "shadow-[0_22px_60px_-15px_rgba(0,0,0,0.55),0_0_0_0.5px_rgba(0,0,0,0.6)]",
    shadowActive:
      "shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7),0_0_0_0.5px_rgba(0,0,0,0.6)]",
    border: "border-0",
    background: "bg-neutral-900/85 backdrop-blur-2xl backdrop-saturate-200",
  },
  linux: {
    radius: "rounded-[12px]",
    shadow: "shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)]",
    shadowActive: "shadow-[0_30px_60px_-18px_rgba(0,0,0,0.75)]",
    border: "border border-white/5",
    background: "bg-[#2d2d2d]",
  },
};
