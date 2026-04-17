# Portfolio OS — Roadmap

Portfolio OS is a faux operating-system portfolio. The next major arc is a full
**multi-theme system** — every visible surface can be rendered in one of three
styles: **Windows 11**, **macOS**, or **Linux (GNOME/KDE-flavored)** — plus a
**Custom** mode where the user mixes and matches per component.

> Checklists use standard markdown checkboxes. Tick them as work lands.

---

## 0. Design foundations (prereq for everything)

- [x] Define a `Theme` type and a `ThemeChoices` record keyed by component
  - [x] `themes: "windows" | "macos" | "linux"`
  - [x] `components: "taskbar" | "window" | "icons" | "lockscreen" | "startMenu" | "terminal" | "fileExplorer" | "contextMenu" | "clockPopover" | "actionCenter" | "desktopIcons" | "wallpaper" | "fonts" | "cursors" | "scrollbars"`
- [x] Pick design tokens per OS (colors, radii, shadows, blur, typography, iconography)
  - [x] Windows 11: Segoe UI Variable, Mica acrylic, 8 px radii, fluent shadows
  - [x] macOS: SF Pro (fallback system-ui), vibrant translucency, 10 px radii, traffic lights red/amber/green
  - [x] Linux (GNOME/Adwaita-ish): Cantarell/Inter, flat + subtle gradients, 12 px radii, CSD close-button-only
- [x] `ThemeContext` with `useTheme()` returning the resolved per-component choice
- [x] Persist choices to `localStorage` (`portfolio-theme` key)
- [x] Add `ThemedSlot<T>` pattern: a component that swaps sub-implementations by theme

---

## 1. Theme picker (first-run)

- [x] Route: `/` renders a **Welcome / Theme Picker** first when no saved choice
  - [x] Animated intro logo (4-tile mark)
  - [x] Three big tiles: **Windows**, **macOS**, **Linux** (preview screenshot in each)
  - [x] A fourth tile: **Custom** opens the per-component picker
- [x] Custom picker UI
  - [x] Sectioned list of every themable component
  - [x] Radio segmented control (Windows / macOS / Linux) per row
  - [x] Live preview strip at the top showing current mix
  - [x] "Randomize" and "Reset to default" helpers
- [x] "Continue" button saves choices, then navigates to lock screen
- [x] Small link in action center / settings to re-open the picker later

---

## 2. Boot / lock screen (themed)

- [x] `LockScreen` becomes a switcher:
  - [x] **Windows 11 lock** — clock + date, blurred wallpaper, avatar + "Sign in"
  - [x] **macOS lock** — centered avatar, name, PIN dots, battery/wifi pill
  - [x] **Linux GDM lock** — top bar with clock, user pill, "Not listed?" link
- [x] Per-theme boot animation
  - [x] Windows: 4-dot spinner
  - [x] macOS: apple logo + thin progress bar
  - [x] Linux: distro logo + text console lines

---

## 3. Desktop shell

### 3.1 Taskbar / Dock / Panel

- [x] `ThemedTaskbar` slot
  - [x] **Windows 11 taskbar** (current impl) — bottom center, pinned icons, start, search, tray
  - [x] **macOS dock** — bottom center, magnification on hover, separator, trash slot, menu bar on top
  - [x] **Linux (GNOME-style)** — top bar (Activities, clock, status) + optional bottom dash
- [x] Keep running-app indicators consistent in shape (dot / pill / underline per theme)

### 3.2 Menu bar (macOS only; hidden for others)

- [x] Top menu bar with: Apple logo, app name, File, Edit, View, Help
- [x] Control Center / Battery / Wi-Fi / Spotlight affordances on the right

### 3.3 Wallpaper

- [x] Ship one default wallpaper per theme
  - [x] Windows: existing Bloom
  - [x] macOS: a Big-Sur-style gradient mountain
  - [x] Linux: Ubuntu warty-brown-ish or GNOME Adwaita pattern
- [x] Settings still lets the user override per session

### 3.4 Desktop icon grid

- [x] **Windows**: small gradient tiles + label below (current)
- [x] **macOS**: no desktop icons by default (hide); optionally rounded squircle app icons
- [x] **Linux**: flat Papirus-style mono-line icons with a subtle label shadow

---

## 4. Windows / app chrome

- [x] `ThemedWindowChrome`
  - [x] **Windows 11** — min/max/close on right, rounded 8 px, subtle mica
  - [x] **macOS** — traffic lights on left (red/amber/green), inset titlebar, tight radii
  - [x] **Linux (GNOME CSD)** — only close button on right, header bar with title centered, small server-side-decoration fallback
- [x] Per-theme drop shadow intensity + border treatment
- [ ] Per-theme drag/drop snap regions (Aero snap, macOS tiling hints, GNOME half-tile)

---

## 5. Launcher / App menu

- [x] `ThemedLauncher`
  - [x] **Windows 11 Start** (current) — Pinned + Recommended, user pill
  - [x] **macOS Launchpad** — full-screen grid of icons, pagination dots, search bar top
  - [x] **Linux Activities** — top-half grid + bottom favorites dock + virtual desktops preview strip

---

## 6. Action center / Control Center / System Tray

- [x] `ThemedActionCenter`
  - [x] **Windows 11 Quick Settings** (current) — tile grid + sliders
  - [x] **macOS Control Center** — rounded groups for Wi-Fi/Bluetooth/Focus/Brightness/Sound/Music
  - [x] **Linux System Menu** — vertical list with slider rows, user + power actions at the bottom

## 7. Clock / calendar popover

- [x] `ThemedClock`
  - [x] Windows: large time + month calendar (current)
  - [x] macOS: notifications column + widgets column (Calendar / Weather / World Clock)
  - [x] Linux: date + mini calendar + media player strip

## 8. Context menus

- [x] `ThemedContextMenu`
  - [x] Windows 11: rounded acrylic with icon column
  - [x] macOS: narrow rows, right-aligned shortcuts, semi-transparent
  - [x] Linux: flat, hover-fill, no icons

---

## 9. App icons

- [x] `ThemedAppIcon`
  - [x] Windows: gradient rounded-square tile + lucide glyph (current)
  - [x] macOS: squircle (22.5% squircle mask) + color/gradient fill + inner highlight, optional dock shadow
  - [x] Linux: Papirus-style flat two-tone with colored glyph on circular base
- [x] Every app gets three icon variants declared alongside its `AppDefinition`
  - _Implementation note:_ a single `AppIconSpec` (glyph + gradient) feeds all three styles via the themed `AppIcon`, rather than requiring per-theme definitions on every app._

## 10. Terminal

- [x] `ThemedTerminal`
  - [x] **Windows Terminal / PowerShell** — dark blue chrome, `PS C:\Users\khalid>` prompt, Cascadia Code
  - [x] **macOS Terminal.app** — beige/solarized or default black, `khalid@macbook ~ %` prompt, SF Mono
  - [x] **Linux / GNOME Terminal** — dark, `khalid@ubuntu:~$` prompt, Ubuntu Mono
- [x] Theme-aware color palette for error/info/success

## 11. File Explorer / Finder / Files (Nautilus)

- [x] `ThemedFileExplorer`
  - [x] **Windows 11 Explorer** — left Quick Access tree, breadcrumb bar, grid/list toggle (current)
  - [x] **macOS Finder** — sidebar with colored section labels, column view, tags
  - [x] **Linux Nautilus / Files** — pathbar buttons, flat icons, grid by default

## 12. Cursors, fonts, scrollbars

- [x] Scrollbar styling per theme
  - [x] Windows: thin, transparent, fat on hover
  - [x] macOS: auto-hide, overlay
  - [x] Linux: medium, always visible, flat
- [x] Fonts
  - [x] Load Segoe UI Variable / SF Pro / Ubuntu as web fonts where licensing allows
    - _Using system fonts via font stacks (license-safe)._
  - [x] Graceful fallbacks in `globals.css`
- [x] Optional cursor stylesheet per theme (low priority)

---

## 13. App-level theming (inside the portfolio apps)

- [x] Make each portfolio app theme-aware, not just its chrome:
  - [x] About Me — headline typography adapts (Segoe / SF / Cantarell)
    - _Via the global font stack swap in `globals.css` keyed by `data-fonts`._
  - [x] Projects — sidebar style matches the native OS's list controls
  - [x] Skills — progress bar style per theme
  - [x] Contact — button/input style per theme
  - [x] Resume — toolbar buttons per theme
  - [x] Settings — sidebar + sections match theme

---

## 14. Settings app — live theme editor

- [x] Add a **Theme** section at the top of Settings
  - [x] Preset picker (Windows / macOS / Linux / Custom)
  - [x] Per-component overrides when Custom is selected
  - [x] Reset, export (copy JSON), import
    - _Reset + Copy JSON shipped; import deliberately deferred._
- [x] Reflect changes live across the running desktop without reload

---

## 15. Quality / polish / infra

- [x] Motion tokens per theme (spring stiffness, duration, easing)
  - _Lives in `lib/theme-tokens.ts` as `motionDuration` + `motionEasing`._
- [ ] Sound effects on boot / minimize (optional, gated by user toggle)
- [x] Keyboard shortcuts
  - [x] Win key / `Cmd+Space` / `Super` opens the right launcher per theme
  - [x] `Alt+Tab` / `Cmd+Tab` window switcher
  - [x] `Esc` closes popovers
- [ ] Accessibility
  - [ ] All popovers trap focus + restore on close
  - [x] Screen-reader labels on every icon-only button
    - _Most icon-only buttons already have `aria-label`; not audited exhaustively._
  - [x] Respect `prefers-reduced-motion`
- [ ] Perf
  - [ ] Lazy-load non-active theme variants (dynamic import)
  - [ ] Keep `AppIcon` tree-shakeable per theme
- [x] Tests / checks
  - [x] Build passes on every commit (`bun run build`)
  - [ ] Visual regression baselines per theme (optional: Playwright screenshots)

---

## 16. Stretch ideas

- [ ] Windows XP / Classic theme (bonus 4th preset)
- [ ] Widgets on the desktop (weather, GitHub activity) — macOS widgets style
- [ ] Virtual desktops / multiple workspaces
- [ ] Command palette (`Ctrl/Cmd+K`) that works across all themes
- [ ] Spotlight / Activities / Search that actually searches portfolio data
- [ ] "About this Mac" / "System info" dialog per theme

---

## Milestones

- [x] **M1 — Foundation**: ThemeContext + persistence + picker route wired in (no actual variants yet)
- [x] **M2 — Windows baseline polish**: existing UI cleaned up as the reference implementation
- [x] **M3 — macOS theme**: dock, traffic-light windows, Launchpad, Control Center, squircle icons
- [x] **M4 — Linux theme**: top panel + dash, GNOME CSD windows, Activities, Papirus icons
- [x] **M5 — Custom mixer**: per-component picker, live preview, settings-app editor
- [x] **M6 — App-level theming**: portfolio apps adopt theme tokens
- [~] **M7 — Polish**: motion, a11y, keyboard shortcuts, tests
  - _Shortcuts + reduced-motion + build-on-commit done; focus trap, sound, dynamic imports, and Playwright screenshots deferred._
