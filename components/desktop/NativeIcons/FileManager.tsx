/** File Explorer / Finder / Nautilus icons. */

export function WindowsExplorer({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="winexp-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd666" />
          <stop offset="1" stopColor="#e5a642" />
        </linearGradient>
        <linearGradient id="winexp-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7ac4ff" />
          <stop offset="1" stopColor="#3e8dd9" />
        </linearGradient>
        <linearGradient id="winexp-tab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4ea7ee" />
          <stop offset="1" stopColor="#2d78c8" />
        </linearGradient>
      </defs>
      {/* Back folder (blue) */}
      <path
        d="M6 16 C6 13.8 7.8 12 10 12 L22 12 L26 16 L54 16 C56.2 16 58 17.8 58 20 L58 48 C58 50.2 56.2 52 54 52 L10 52 C7.8 52 6 50.2 6 48 Z"
        fill="url(#winexp-back)"
        stroke="#1f67b2"
        strokeOpacity="0.5"
        strokeWidth="0.6"
      />
      {/* Document sheet poking up */}
      <rect x="16" y="18" width="32" height="22" rx="1.5" fill="#ffffff" />
      <rect x="20" y="24" width="20" height="1.5" rx="0.5" fill="#a8c9eb" />
      <rect x="20" y="28" width="14" height="1.5" rx="0.5" fill="#a8c9eb" />
      <rect x="20" y="32" width="22" height="1.5" rx="0.5" fill="#a8c9eb" />
      {/* Front folder (yellow) */}
      <path
        d="M4 26 C4 23.8 5.8 22 8 22 L58 22 C60.2 22 62 23.8 62 26 L60 52 C60 54.2 58.2 56 56 56 L8 56 C5.8 56 4 54.2 4 52 Z"
        fill="url(#winexp-front)"
        stroke="#b07e28"
        strokeOpacity="0.35"
        strokeWidth="0.6"
      />
      {/* Windows clip (4 tiles) */}
      <g transform="translate(40,32)">
        <rect x="0" y="0" width="6" height="6" rx="1" fill="#60cdff" />
        <rect x="7" y="0" width="6" height="6" rx="1" fill="#60cdff" fillOpacity="0.85" />
        <rect x="0" y="7" width="6" height="6" rx="1" fill="#60cdff" fillOpacity="0.85" />
        <rect x="7" y="7" width="6" height="6" rx="1" fill="#60cdff" fillOpacity="0.7" />
      </g>
    </svg>
  );
}

export function MacOSFinder({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="finder-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f2f2" />
          <stop offset="1" stopColor="#cfcfcf" />
        </linearGradient>
        <linearGradient id="finder-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6bb3ff" />
          <stop offset="1" stopColor="#1e78e6" />
        </linearGradient>
      </defs>
      {/* Squircle split vertically: left white, right blue */}
      <clipPath id="finder-clip">
        <rect x="3" y="3" width="58" height="58" rx="14" />
      </clipPath>
      <g clipPath="url(#finder-clip)">
        <rect x="3" y="3" width="29" height="58" fill="url(#finder-left)" />
        <rect x="32" y="3" width="29" height="58" fill="url(#finder-right)" />
      </g>
      {/* Finder face — stylized half grin */}
      {/* Left eye (on white half) */}
      <ellipse cx="22" cy="27" rx="2" ry="5.5" fill="#222" />
      {/* Right eye (on blue half) */}
      <ellipse cx="42" cy="27" rx="2" ry="5.5" fill="#ffffff" />
      {/* Smile straddling the divider */}
      <path
        d="M18 42 Q32 48 46 42"
        stroke="#1f1f1f"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Outer stroke */}
      <rect x="3" y="3" width="58" height="58" rx="14" fill="none" stroke="#000000" strokeOpacity="0.25" />
    </svg>
  );
}

export function LinuxFiles({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="linfiles-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#303030" />
          <stop offset="1" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="linfiles-folder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a7ab0" />
          <stop offset="1" stopColor="#2d5686" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="url(#linfiles-bg)" />
      <circle cx="32" cy="32" r="29" fill="none" stroke="#ffffff" strokeOpacity="0.08" />
      {/* Nautilus-style folder shape */}
      <path
        d="M14 22 L24 22 L27 18 L44 18 C45.7 18 47 19.3 47 21 L47 42 C47 43.7 45.7 45 44 45 L17 45 C15.3 45 14 43.7 14 42 Z"
        fill="url(#linfiles-folder)"
      />
      {/* Inner highlight on tab */}
      <path
        d="M14 22 L24 22 L27 18 L44 18"
        fill="none"
        stroke="#8cb5de"
        strokeWidth="0.6"
        strokeOpacity="0.6"
      />
      {/* GNOME style small tab accent */}
      <rect x="14" y="22" width="33" height="3" fill="#ffffff" fillOpacity="0.12" />
      {/* Ubuntu orange dot pulse */}
      <circle cx="48" cy="48" r="3" fill="#e95420" />
    </svg>
  );
}
