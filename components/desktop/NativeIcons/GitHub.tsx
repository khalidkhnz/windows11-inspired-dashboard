/** GitHub logomark on theme backgrounds. */

function Octocat({ color = "#ffffff" }: { color?: string }) {
  return (
    <path
      transform="translate(14 14) scale(1.34)"
      fill={color}
      d="M13.3 0C6 0 0 6 0 13.4c0 5.9 3.8 10.9 9.1 12.7.7.1.9-.3.9-.7v-2.4c-3.7.8-4.5-1.8-4.5-1.8-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.2 2.1 3.1 1.5 3.9 1.1.1-.9.5-1.5.8-1.8-2.9-.3-6-1.4-6-6.4 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.6.1-3.4 0 0 1.1-.3 3.5 1.3a12.3 12.3 0 0 1 6.4 0c2.4-1.6 3.5-1.3 3.5-1.3.7 1.8.2 3.1.1 3.4.8.9 1.3 2.1 1.3 3.5 0 5-3.1 6.1-6 6.4.5.4.9 1.2.9 2.5v3.8c0 .4.2.8.9.7 5.3-1.8 9.1-6.8 9.1-12.7C26.6 6 20.6 0 13.3 0z"
    />
  );
}

export function WindowsGitHub({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wingh-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#27272a" />
          <stop offset="1" stopColor="#09090b" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="10" fill="url(#wingh-bg)" stroke="#ffffff" strokeOpacity="0.1" />
      <rect x="3" y="3" width="58" height="26" rx="10" fill="#ffffff" fillOpacity="0.05" />
      <Octocat />
    </svg>
  );
}

export function MacOSGitHub({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="macgh-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f5f7" />
          <stop offset="1" stopColor="#c6c6c8" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="14" fill="url(#macgh-bg)" />
      <Octocat color="#1f1f1f" />
      <rect x="3" y="3" width="58" height="58" rx="14" fill="none" stroke="#000000" strokeOpacity="0.25" />
    </svg>
  );
}

export function LinuxGitHub({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lingh-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2d2d2d" />
          <stop offset="1" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="url(#lingh-bg)" />
      <Octocat color="#e95420" />
    </svg>
  );
}
