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

- [ ] Route: `/` renders a **Welcome / Theme Picker** first when no saved choice
  - [ ] Animated intro logo (4-tile mark)
  - [ ] Three big tiles: **Windows**, **macOS**, **Linux** (preview screenshot in each)
  - [ ] A fourth tile: **Custom** opens the per-component picker
- [ ] Custom picker UI
  - [ ] Sectioned list of every themable component
  - [ ] Radio segmented control (Windows / macOS / Linux) per row
  - [ ] Live preview strip at the top showing current mix
  - [ ] "Randomize" and "Reset to default" helpers
- [ ] "Continue" button saves choices, then navigates to lock screen
- [ ] Small link in action center / settings to re-open the picker later

---

## 2. Boot / lock screen (themed)

- [ ] `LockScreen` becomes a switcher:
  - [ ] **Windows 11 lock** — clock + date, blurred wallpaper, avatar + "Sign in"
  - [ ] **macOS lock** — centered avatar, name, PIN dots, battery/wifi pill
  - [ ] **Linux GDM lock** — top bar with clock, user pill, "Not listed?" link
- [ ] Per-theme boot animation
  - [ ] Windows: 4-dot spinner
  - [ ] macOS: apple logo + thin progress bar
  - [ ] Linux: distro logo + text console lines

---

## 3. Desktop shell

### 3.1 Taskbar / Dock / Panel
- [ ] `ThemedTaskbar` slot
  - [ ] **Windows 11 taskbar** (current impl) — bottom center, pinned icons, start, search, tray
  - [ ] **macOS dock** — bottom center, magnification on hover, separator, trash slot, menu bar on top
  - [ ] **Linux (GNOME-style)** — top bar (Activities, clock, status) + optional bottom dash
- [ ] Keep running-app indicators consistent in shape (dot / pill / underline per theme)

### 3.2 Menu bar (macOS only; hidden for others)
- [ ] Top menu bar with: Apple logo, app name, File, Edit, View, Help
- [ ] Control Center / Battery / Wi-Fi / Spotlight affordances on the right

### 3.3 Wallpaper
- [ ] Ship one default wallpaper per theme
  - [ ] Windows: existing Bloom
  - [ ] macOS: a Big-Sur-style gradient mountain
  - [ ] Linux: Ubuntu warty-brown-ish or GNOME Adwaita pattern
- [ ] Settings still lets the user override per session

### 3.4 Desktop icon grid
- [ ] **Windows**: small gradient tiles + label below (current)
- [ ] **macOS**: no desktop icons by default (hide); optionally rounded squircle app icons
- [ ] **Linux**: flat Papirus-style mono-line icons with a subtle label shadow

---

## 4. Windows / app chrome

- [ ] `ThemedWindowChrome`
  - [ ] **Windows 11** — min/max/close on right, rounded 8 px, subtle mica
  - [ ] **macOS** — traffic lights on left (red/amber/green), inset titlebar, tight radii
  - [ ] **Linux (GNOME CSD)** — only close button on right, header bar with title centered, small server-side-decoration fallback
- [ ] Per-theme drop shadow intensity + border treatment
- [ ] Per-theme drag/drop snap regions (Aero snap, macOS tiling hints, GNOME half-tile)

---

## 5. Launcher / App menu

- [ ] `ThemedLauncher`
  - [ ] **Windows 11 Start** (current) — Pinned + Recommended, user pill
  - [ ] **macOS Launchpad** — full-screen grid of icons, pagination dots, search bar top
  - [ ] **Linux Activities** — top-half grid + bottom favorites dock + virtual desktops preview strip

---

## 6. Action center / Control Center / System Tray

- [ ] `ThemedActionCenter`
  - [ ] **Windows 11 Quick Settings** (current) — tile grid + sliders
  - [ ] **macOS Control Center** — rounded groups for Wi-Fi/Bluetooth/Focus/Brightness/Sound/Music
  - [ ] **Linux System Menu** — vertical list with slider rows, user + power actions at the bottom

## 7. Clock / calendar popover

- [ ] `ThemedClock`
  - [ ] Windows: large time + month calendar (current)
  - [ ] macOS: notifications column + widgets column (Calendar / Weather / World Clock)
  - [ ] Linux: date + mini calendar + media player strip

## 8. Context menus

- [ ] `ThemedContextMenu`
  - [ ] Windows 11: rounded acrylic with icon column
  - [ ] macOS: narrow rows, right-aligned shortcuts, semi-transparent
  - [ ] Linux: flat, hover-fill, no icons

---

## 9. App icons

- [ ] `ThemedAppIcon`
  - [ ] Windows: gradient rounded-square tile + lucide glyph (current)
  - [ ] macOS: squircle (22.5% squircle mask) + color/gradient fill + inner highlight, optional dock shadow
  - [ ] Linux: Papirus-style flat two-tone with colored glyph on circular base
- [ ] Every app gets three icon variants declared alongside its `AppDefinition`

## 10. Terminal

- [ ] `ThemedTerminal`
  - [ ] **Windows Terminal / PowerShell** — dark blue chrome, `PS C:\Users\khalid>` prompt, Cascadia Code
  - [ ] **macOS Terminal.app** — beige/solarized or default black, `khalid@macbook ~ %` prompt, SF Mono
  - [ ] **Linux / GNOME Terminal** — dark, `khalid@ubuntu:~$` prompt, Ubuntu Mono
- [ ] Theme-aware color palette for error/info/success

## 11. File Explorer / Finder / Files (Nautilus)

- [ ] `ThemedFileExplorer`
  - [ ] **Windows 11 Explorer** — left Quick Access tree, breadcrumb bar, grid/list toggle (current)
  - [ ] **macOS Finder** — sidebar with colored section labels, column view, tags
  - [ ] **Linux Nautilus / Files** — pathbar buttons, flat icons, grid by default

## 12. Cursors, fonts, scrollbars

- [ ] Scrollbar styling per theme
  - [ ] Windows: thin, transparent, fat on hover
  - [ ] macOS: auto-hide, overlay
  - [ ] Linux: medium, always visible, flat
- [ ] Fonts
  - [ ] Load Segoe UI Variable / SF Pro / Ubuntu as web fonts where licensing allows
  - [ ] Graceful fallbacks in `globals.css`
- [ ] Optional cursor stylesheet per theme (low priority)

---

## 13. App-level theming (inside the portfolio apps)

- [ ] Make each portfolio app theme-aware, not just its chrome:
  - [ ] About Me — headline typography adapts (Segoe / SF / Cantarell)
  - [ ] Projects — sidebar style matches the native OS's list controls
  - [ ] Skills — progress bar style per theme
  - [ ] Contact — button/input style per theme
  - [ ] Resume — toolbar buttons per theme
  - [ ] Settings — sidebar + sections match theme

---

## 14. Settings app — live theme editor

- [ ] Add a **Theme** section at the top of Settings
  - [ ] Preset picker (Windows / macOS / Linux / Custom)
  - [ ] Per-component overrides when Custom is selected
  - [ ] Reset, export (copy JSON), import
- [ ] Reflect changes live across the running desktop without reload

---

## 15. Quality / polish / infra

- [ ] Motion tokens per theme (spring stiffness, duration, easing)
- [ ] Sound effects on boot / minimize (optional, gated by user toggle)
- [ ] Keyboard shortcuts
  - [ ] Win key / `Cmd+Space` / `Super` opens the right launcher per theme
  - [ ] `Alt+Tab` / `Cmd+Tab` window switcher
  - [ ] `Esc` closes popovers
- [ ] Accessibility
  - [ ] All popovers trap focus + restore on close
  - [ ] Screen-reader labels on every icon-only button
  - [ ] Respect `prefers-reduced-motion`
- [ ] Perf
  - [ ] Lazy-load non-active theme variants (dynamic import)
  - [ ] Keep `AppIcon` tree-shakeable per theme
- [ ] Tests / checks
  - [ ] Build passes on every commit (`bun run build`)
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

- [ ] **M1 — Foundation**: ThemeContext + persistence + picker route wired in (no actual variants yet)
- [ ] **M2 — Windows baseline polish**: existing UI cleaned up as the reference implementation
- [ ] **M3 — macOS theme**: dock, traffic-light windows, Launchpad, Control Center, squircle icons
- [ ] **M4 — Linux theme**: top panel + dash, GNOME CSD windows, Activities, Papirus icons
- [ ] **M5 — Custom mixer**: per-component picker, live preview, settings-app editor
- [ ] **M6 — App-level theming**: portfolio apps adopt theme tokens
- [ ] **M7 — Polish**: motion, a11y, keyboard shortcuts, tests
