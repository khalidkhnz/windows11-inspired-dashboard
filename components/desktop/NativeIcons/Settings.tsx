/** Settings icons per OS. */

export function WindowsSettings({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="winset-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f3f46" />
          <stop offset="1" stopColor="#1f1f23" />
        </linearGradient>
        <linearGradient id="winset-gear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e4e4e7" />
          <stop offset="1" stopColor="#a1a1aa" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="10" fill="url(#winset-bg)" stroke="#ffffff" strokeOpacity="0.1" />
      <rect x="3" y="3" width="58" height="28" rx="10" fill="#ffffff" fillOpacity="0.05" />
      {/* Gear */}
      <g transform="translate(32 32)">
        <g fill="url(#winset-gear)">
          {/* 8 teeth */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="-2.5"
              y="-20"
              width="5"
              height="8"
              rx="1.2"
              transform={`rotate(${i * 45})`}
            />
          ))}
        </g>
        <circle r="13" fill="url(#winset-gear)" />
        <circle r="5" fill="url(#winset-bg)" />
      </g>
      {/* Windows signature cyan tick */}
      <rect x="42" y="44" width="10" height="3" rx="1" fill="#60cdff" />
    </svg>
  );
}

export function MacOSSettings({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="macset-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8e8e93" />
          <stop offset="1" stopColor="#48484a" />
        </linearGradient>
        <linearGradient id="macset-gear-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f5f7" />
          <stop offset="1" stopColor="#c6c6c8" />
        </linearGradient>
        <linearGradient id="macset-gear-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d1d1d6" />
          <stop offset="1" stopColor="#8e8e93" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="14" fill="url(#macset-bg)" />
      <rect x="3" y="3" width="58" height="22" rx="14" fill="#ffffff" fillOpacity="0.1" />
      {/* Two interlocking gears like System Settings on Mac */}
      <g transform="translate(26 28)">
        <g fill="url(#macset-gear-1)">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="-2"
              y="-15"
              width="4"
              height="6"
              rx="1"
              transform={`rotate(${i * 45})`}
            />
          ))}
        </g>
        <circle r="10" fill="url(#macset-gear-1)" />
        <circle r="4" fill="url(#macset-bg)" />
      </g>
      <g transform="translate(44 44)">
        <g fill="url(#macset-gear-2)">
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x="-1.6"
              y="-10"
              width="3.2"
              height="4.5"
              rx="0.8"
              transform={`rotate(${i * 60})`}
            />
          ))}
        </g>
        <circle r="6.5" fill="url(#macset-gear-2)" />
        <circle r="2.5" fill="url(#macset-bg)" />
      </g>
      <rect x="3" y="3" width="58" height="58" rx="14" fill="none" stroke="#000000" strokeOpacity="0.25" />
    </svg>
  );
}

export function LinuxSettings({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="linset-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2d2d2d" />
          <stop offset="1" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="url(#linset-bg)" />
      {/* GNOME style sliders */}
      <g stroke="#e95420" strokeWidth="2.5" strokeLinecap="round">
        <line x1="16" y1="22" x2="48" y2="22" strokeOpacity="0.35" stroke="#ffffff" />
        <line x1="16" y1="32" x2="48" y2="32" strokeOpacity="0.35" stroke="#ffffff" />
        <line x1="16" y1="42" x2="48" y2="42" strokeOpacity="0.35" stroke="#ffffff" />
      </g>
      {/* Slider thumbs */}
      <circle cx="26" cy="22" r="4" fill="#e95420" />
      <circle cx="38" cy="32" r="4" fill="#e95420" />
      <circle cx="22" cy="42" r="4" fill="#e95420" />
      {/* thumb highlight */}
      <circle cx="26" cy="22" r="1.5" fill="#ffffff" fillOpacity="0.4" />
      <circle cx="38" cy="32" r="1.5" fill="#ffffff" fillOpacity="0.4" />
      <circle cx="22" cy="42" r="1.5" fill="#ffffff" fillOpacity="0.4" />
    </svg>
  );
}
