"use client";

import { cn } from "@/lib/utils";
import type { Theme } from "@/types/theme";

/**
 * Stylized OS previews rendered inside picker tiles. Aim for a professional
 * mock look: real wallpaper gradients, proper window chrome, and shell bars
 * that match each platform's silhouette.
 */
export function ThemePreview({ theme, className }: { theme: Theme; className?: string }) {
  if (theme === "windows") return <WindowsPreview className={className} />;
  if (theme === "macos") return <MacOSPreview className={className} />;
  return <LinuxPreview className={className} />;
}

function WindowsPreview({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      className={cn("h-full w-full rounded-md shadow-lg", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="win-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f2a4a" />
          <stop offset="0.55" stopColor="#1e3a6e" />
          <stop offset="1" stopColor="#4b3a86" />
        </linearGradient>
        <radialGradient id="win-bloom" cx="0.5" cy="0.62" r="0.7">
          <stop offset="0" stopColor="#6b4aa6" stopOpacity="0.7" />
          <stop offset="1" stopColor="#6b4aa6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="win-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262629" />
          <stop offset="1" stopColor="#1a1a1c" />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill="url(#win-sky)" />
      <rect width="160" height="100" fill="url(#win-bloom)" />
      {/* window */}
      <g>
        <rect x="14" y="14" width="90" height="56" rx="6" fill="url(#win-win)" stroke="#ffffff" strokeOpacity="0.08" />
        <rect x="14" y="14" width="90" height="14" rx="6" fill="#ffffff" fillOpacity="0.04" />
        <circle cx="95" cy="21" r="1.3" fill="#ffffff" fillOpacity="0.55" />
        <circle cx="99" cy="21" r="1.3" fill="#ffffff" fillOpacity="0.55" />
        <rect x="18" y="32" width="40" height="3" rx="1.5" fill="#ffffff" fillOpacity="0.15" />
        <rect x="18" y="38" width="60" height="2" rx="1" fill="#ffffff" fillOpacity="0.08" />
        <rect x="18" y="42" width="48" height="2" rx="1" fill="#ffffff" fillOpacity="0.08" />
      </g>
      {/* taskbar */}
      <g>
        <rect x="10" y="82" width="140" height="12" rx="3" fill="#1a1a1c" fillOpacity="0.85" />
        <rect x="10" y="82" width="140" height="12" rx="3" fill="#ffffff" fillOpacity="0.04" />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={i}
            x={68 + i * 5}
            y={85}
            width={4}
            height={6}
            rx={0.7}
            fill={i === 3 ? "#60cdff" : "#ffffff"}
            fillOpacity={i === 3 ? 1 : 0.45}
          />
        ))}
      </g>
    </svg>
  );
}

function MacOSPreview({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      className={cn("h-full w-full rounded-md shadow-lg", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="mac-sky" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#3a1f6b" />
          <stop offset="0.35" stopColor="#6b2d87" />
          <stop offset="0.7" stopColor="#b45079" />
          <stop offset="1" stopColor="#e98162" />
        </linearGradient>
        <linearGradient id="mac-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fafafa" stopOpacity="0.95" />
          <stop offset="1" stopColor="#d4d4d4" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="mac-dock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill="url(#mac-sky)" />
      {/* menu bar */}
      <rect x="0" y="0" width="160" height="6" fill="#000000" fillOpacity="0.3" />
      <circle cx="4" cy="3" r="1" fill="#ffffff" fillOpacity="0.85" />
      <rect x="8" y="2" width="10" height="2" rx="0.5" fill="#ffffff" fillOpacity="0.5" />
      <rect x="140" y="2" width="18" height="2" rx="0.5" fill="#ffffff" fillOpacity="0.55" />
      {/* window with traffic lights */}
      <g>
        <rect x="14" y="14" width="86" height="54" rx="7" fill="url(#mac-win)" stroke="#000000" strokeOpacity="0.2" />
        <rect x="14" y="14" width="86" height="10" rx="7" fill="#efefef" fillOpacity="0.9" />
        <circle cx="19" cy="19" r="1.6" fill="#ff5f57" />
        <circle cx="24" cy="19" r="1.6" fill="#febc2e" />
        <circle cx="29" cy="19" r="1.6" fill="#28c840" />
        <rect x="50" y="18" width="20" height="2" rx="1" fill="#6f6f73" />
        {/* window content */}
        <rect x="18" y="28" width="28" height="36" rx="2" fill="#e5e5ea" />
        <rect x="50" y="30" width="46" height="3" rx="1" fill="#9b9ba0" />
        <rect x="50" y="36" width="40" height="2" rx="1" fill="#c6c6c8" />
        <rect x="50" y="40" width="42" height="2" rx="1" fill="#c6c6c8" />
        <rect x="50" y="44" width="38" height="2" rx="1" fill="#c6c6c8" />
      </g>
      {/* dock */}
      <g>
        <rect x="30" y="84" width="100" height="12" rx="5" fill="url(#mac-dock)" stroke="#ffffff" strokeOpacity="0.3" />
        {[
          "#5a9bff",
          "#ff5f57",
          "#34c759",
          "#febc2e",
          "#af52de",
          "#ff9500",
          "#ff2d55",
          "#8e8e93",
        ].map((color, i) => (
          <rect
            key={i}
            x={34 + i * 11.5}
            y={86}
            width={8}
            height={8}
            rx={2}
            fill={color}
          />
        ))}
      </g>
    </svg>
  );
}

function LinuxPreview({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      className={cn("h-full w-full rounded-md shadow-lg", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="lin-sky" cx="0.3" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#7a2d32" />
          <stop offset="0.55" stopColor="#3b1b21" />
          <stop offset="1" stopColor="#1a0d10" />
        </radialGradient>
        <linearGradient id="lin-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b3b3b" />
          <stop offset="1" stopColor="#242424" />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill="url(#lin-sky)" />
      {/* top panel */}
      <rect x="0" y="0" width="160" height="8" fill="#0f0f0f" fillOpacity="0.85" />
      <rect x="6" y="2" width="18" height="3" rx="1" fill="#ffffff" fillOpacity="0.85" />
      <rect x="68" y="2" width="24" height="3" rx="1" fill="#ffffff" fillOpacity="0.7" />
      <rect x="134" y="2" width="22" height="3" rx="1" fill="#ffffff" fillOpacity="0.6" />
      {/* GNOME window */}
      <g>
        <rect x="20" y="18" width="100" height="58" rx="6" fill="url(#lin-win)" stroke="#000000" strokeOpacity="0.6" />
        <rect x="20" y="18" width="100" height="11" rx="6" fill="#2a2a2a" />
        <rect x="60" y="22" width="20" height="3" rx="0.8" fill="#ffffff" fillOpacity="0.7" />
        <circle cx="112" cy="23.5" r="2" fill="#ffffff" fillOpacity="0.15" />
        <rect x="24" y="34" width="22" height="36" rx="1.5" fill="#1a1a1a" />
        <rect x="50" y="36" width="66" height="3" rx="1" fill="#ffffff" fillOpacity="0.2" />
        <rect x="50" y="42" width="58" height="2" rx="1" fill="#ffffff" fillOpacity="0.12" />
        <rect x="50" y="46" width="62" height="2" rx="1" fill="#ffffff" fillOpacity="0.12" />
        <rect x="50" y="50" width="48" height="2" rx="1" fill="#ffffff" fillOpacity="0.12" />
      </g>
      {/* dash */}
      <g>
        <rect x="38" y="86" width="84" height="10" rx="2" fill="#000000" fillOpacity="0.6" stroke="#ffffff" strokeOpacity="0.1" />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={i}
            x={42 + i * 11}
            y={88}
            width={7}
            height={6}
            rx={1}
            fill="#e95420"
            fillOpacity={1 - i * 0.08}
          />
        ))}
      </g>
    </svg>
  );
}
