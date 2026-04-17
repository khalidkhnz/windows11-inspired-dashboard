/** Recycle Bin / Trash icons per OS. */

export function WindowsRecycle({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="winrec-bin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#60cdff" />
          <stop offset="0.5" stopColor="#3990d9" />
          <stop offset="1" stopColor="#1f5e9a" />
        </linearGradient>
      </defs>
      {/* Mesh pattern */}
      <pattern id="winrec-mesh" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <path d="M0 2 L4 2 M2 0 L2 4" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="0.5" />
      </pattern>
      {/* Bin body */}
      <path
        d="M14 20 L50 20 L46 56 C46 58.2 44.2 60 42 60 L22 60 C19.8 60 18 58.2 18 56 Z"
        fill="url(#winrec-bin)"
        stroke="#0b3c6a"
        strokeOpacity="0.4"
        strokeWidth="0.6"
      />
      {/* Mesh overlay */}
      <path
        d="M14 20 L50 20 L46 56 C46 58.2 44.2 60 42 60 L22 60 C19.8 60 18 58.2 18 56 Z"
        fill="url(#winrec-mesh)"
      />
      {/* Lid */}
      <rect x="10" y="14" width="44" height="6" rx="2" fill="#7acbf0" stroke="#1f5e9a" strokeOpacity="0.5" strokeWidth="0.6" />
      <rect x="26" y="9" width="12" height="5" rx="2" fill="#5bb4e0" />
      {/* Recycle arrow glyph */}
      <g transform="translate(32 38)">
        <path
          d="M-8 -4 L0 -10 L8 -4"
          stroke="#ffffff"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0 -10 L0 4"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function MacOSTrash({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mactrash-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f2f2" />
          <stop offset="1" stopColor="#c6c6c8" />
        </linearGradient>
        <linearGradient id="mactrash-bin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d1d1d6" />
          <stop offset="1" stopColor="#8e8e93" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="14" fill="url(#mactrash-bg)" />
      {/* Bin */}
      <path
        d="M20 24 L44 24 L41 52 C40.8 53.8 39.3 55 37.5 55 L26.5 55 C24.7 55 23.2 53.8 23 52 Z"
        fill="url(#mactrash-bin)"
        stroke="#636366"
        strokeWidth="0.8"
      />
      {/* Vertical lines on bin */}
      <line x1="28" y1="30" x2="27" y2="50" stroke="#6f6f73" strokeWidth="1" strokeLinecap="round" />
      <line x1="32" y1="30" x2="32" y2="50" stroke="#6f6f73" strokeWidth="1" strokeLinecap="round" />
      <line x1="36" y1="30" x2="37" y2="50" stroke="#6f6f73" strokeWidth="1" strokeLinecap="round" />
      {/* Lid */}
      <rect x="16" y="20" width="32" height="4" rx="2" fill="#636366" />
      <rect x="28" y="14" width="8" height="6" rx="2" fill="#636366" />
      <rect x="3" y="3" width="58" height="58" rx="14" fill="none" stroke="#000000" strokeOpacity="0.25" />
    </svg>
  );
}

export function LinuxTrash({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lintrash-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2d2d2d" />
          <stop offset="1" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="url(#lintrash-bg)" />
      {/* Flat stroke-only trash glyph */}
      <g stroke="#e95420" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 22 L48 22" />
        <path d="M26 22 L26 16 Q26 14 28 14 L36 14 Q38 14 38 16 L38 22" />
        <path d="M20 22 L22 52 Q22.2 54 24 54 L40 54 Q41.8 54 42 52 L44 22" />
        <line x1="28" y1="30" x2="28" y2="48" />
        <line x1="36" y1="30" x2="36" y2="48" />
      </g>
    </svg>
  );
}
