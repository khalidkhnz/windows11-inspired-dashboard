# Portfolio OS — khalidkhnz.in

A faux operating-system portfolio for [Khalid Khan](https://www.khalidkhnz.in).
It currently ships as a **Windows 11** inspired desktop — lock screen, taskbar,
start menu, real window management, and in-app portfolio content (no iframes to
broken third-party sites, no database).

> **Status — April 2026:** Windows 11 baseline is live. The next arc is a
> **three-OS theme system** (Windows / macOS / Linux) with a per-component
> **Custom** picker. The full plan is tracked in [TODO.md](./TODO.md).

## Stack

- **Framework:** Next.js 14 App Router, React 18, TypeScript 5
- **Styling:** Tailwind + a tiny set of shadcn/ui primitives
- **Motion:** Framer Motion (+ GSAP for a couple of boot animations)
- **Icons:** lucide-react rendered into gradient tiles by `<AppIcon>`
- **Email:** Nodemailer via a Next server action (`/actions/contact.action.ts`)
- **Package manager:** [Bun](https://bun.sh)
- **Data:** Everything lives in `lib/portfolio.ts` — no DB, no CMS

## Scripts

```bash
bun install
bun run dev      # http://localhost:3000
bun run build
bun run start
```

## What's where

```
app/
  layout.tsx                # metadata, JSON-LD, providers, Toaster
  manifest.ts               # /manifest.webmanifest
  sitemap.ts                # /sitemap.xml
  robots.ts                 # /robots.txt
  icon.svg                  # favicon (SVG, auto-wired by Next)
  apple-icon.tsx            # 180x180 PWA icon via next/og
  opengraph-image.tsx       # 1200x630 OG card via next/og
  (Dashboard)/
    page.tsx                # lock screen → /desktop
    desktop/
      layout.tsx            # wallpaper + taskbar + windows layer
      page.tsx              # desktop icons
components/
  apps/                     # AboutMe, Projects, Skills, Resume, Contact, ...
  desktop/                  # Window, Taskbar, StartMenu, AppIcon, etc.
  ui/                       # shadcn primitives actually in use
context/
  OsContext.tsx             # window manager (open/focus/drag/resize/z-order)
  WallpaperContext.tsx      # wallpaper choice, persisted to localStorage
lib/
  apps.ts                   # the app registry (icon + component + flags)
  portfolio.ts              # about, projects, skills, resume — edit me
  mailer.ts                 # nodemailer transport
  icons.tsx                 # legacy shared image icons (start button, etc.)
types/
  os.ts                     # AppDefinition, WindowState, OsContextValue
```

## Editing portfolio content

Everything lives in [`lib/portfolio.ts`](./lib/portfolio.ts):

- `owner` — name, role, bio, avatar, site URL, email
- `projects`, `skills`, `experience`, `socials`, `resume`

No rebuild-your-mental-model tax — change the object, save, done.

## Contact form / email env vars

The contact app calls `sendContactAction` which uses Nodemailer. Set these in
your environment (e.g. `.env.local` for dev, your host's dashboard for prod):

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=you@example.com
EMAIL_PASSWORD=app-password
CONTACT_INBOX=you@example.com   # optional — defaults to EMAIL_USER
```

## Roadmap

The big next arc — **multi-theme system** (Windows / macOS / Linux / Custom
per-component) — is tracked in [**TODO.md**](./TODO.md). Milestones M1→M7 are
checklisted there; each milestone is scoped so it can be landed in one PR.

## Deploy

Static-friendly: every route in the current build is pre-rendered. Point
Vercel (or any Next-capable host) at the repo, set the email env vars above,
and ship.

---

Made by [Khalid Khan](https://www.khalidkhnz.in) — MIT licensed unless noted.
