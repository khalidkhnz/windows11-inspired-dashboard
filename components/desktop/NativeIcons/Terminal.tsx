/** Native looking Terminal icons per OS theme. 64x64 viewBox, scales via size. */

export function WindowsTerminal({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="winterm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2a4a" />
          <stop offset="1" stopColor="#0d1730" />
        </linearGradient>
        <linearGradient id="winterm-hl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="10" fill="url(#winterm-bg)" stroke="#ffffff" strokeOpacity="0.12" />
      <rect x="3" y="3" width="58" height="26" rx="10" fill="url(#winterm-hl)" />
      {/* Top accent bar — Windows Terminal's signature cyan line */}
      <rect x="3" y="3" width="58" height="4" rx="2" fill="#60cdff" fillOpacity="0.85" />
      {/* Prompt caret */}
      <path
        d="M16 26 L26 34 L16 42"
        stroke="#60cdff"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="30" y="40" width="18" height="4" rx="1.5" fill="#cccccc" />
    </svg>
  );
}

export function MacOSTerminal({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="macterm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2b2b" />
          <stop offset="1" stopColor="#080808" />
        </linearGradient>
      </defs>
      {/* macOS squircle */}
      <rect x="3" y="3" width="58" height="58" rx="14" fill="url(#macterm-bg)" />
      {/* Traffic lights bar */}
      <circle cx="14" cy="13" r="2.2" fill="#ff5f57" />
      <circle cx="22" cy="13" r="2.2" fill="#febc2e" />
      <circle cx="30" cy="13" r="2.2" fill="#28c840" />
      {/* Prompt caret */}
      <path
        d="M14 30 L24 38 L14 46"
        stroke="#ffffff"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="28" y="44" width="20" height="3" rx="1.2" fill="#ffffff" />
      {/* Subtle inner highlight */}
      <rect x="3" y="3" width="58" height="20" rx="14" fill="#ffffff" fillOpacity="0.06" />
    </svg>
  );
}

export function LinuxTerminal({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="linterm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b2a36" />
          <stop offset="1" stopColor="#1e1014" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="8" fill="url(#linterm-bg)" stroke="#ffffff" strokeOpacity="0.08" />
      {/* GNOME header bar */}
      <rect x="3" y="3" width="58" height="9" rx="8" fill="#2d2222" />
      <rect x="3" y="8" width="58" height="4" fill="#2d2222" />
      <circle cx="56" cy="7.5" r="1.8" fill="#e95420" />
      {/* Ubuntu orange prompt */}
      <path
        d="M14 28 L24 36 L14 44"
        stroke="#e95420"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="28" y="42" width="22" height="3.5" rx="1.5" fill="#f0f0f0" />
      {/* Dollar sign style prompt marker */}
      <text x="42" y="30" fontFamily="Ubuntu Mono, monospace" fontSize="8" fontWeight="bold" fill="#e95420">$</text>
    </svg>
  );
}
