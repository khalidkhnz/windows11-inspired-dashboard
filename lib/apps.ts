import {
  UserRound,
  Briefcase,
  BarChart3,
  FileText,
  Mail,
  FolderOpen,
  TerminalSquare,
  Settings as SettingsIcon,
  Github as GithubIcon,
  Trash2,
  Sparkles,
  Hammer,
  Globe,
  CreditCard,
  StickyNote,
  ShoppingBag,
  Camera,
  Brain,
  Film,
  IdCard,
} from "lucide-react";
import type { AppDefinition, AppId } from "@/types/os";
import AboutMe from "@/components/apps/AboutMe";
import Projects from "@/components/apps/Projects";
import Skills from "@/components/apps/Skills";
import ContactMe from "@/components/apps/ContactMe";
import ResumeViewer from "@/components/apps/ResumeViewer";
import FileExplorer from "@/components/apps/FileExplorer";
import Terminal from "@/components/apps/Terminal";
import Settings from "@/components/apps/Settings";
import { makeWebApp } from "@/components/apps/WebApp";

/** Google's S2 favicon service — reliable across hosts that block hotlinking /favicon.ico. */
function faviconFor(url: string, size = 64): string {
  try {
    const host = new URL(url).host;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=${size}`;
  } catch {
    return "";
  }
}

type WebAppOptions = {
  id: AppId;
  title: string;
  url: string;
  /** Iframe `<title>` — defaults to the app title. */
  iframeTitle?: string;
  /** Lucide glyph rendered in the gradient tile if the favicon fails. */
  fallbackGlyph: import("lucide-react").LucideIcon;
  gradient: { from: string; to: string };
  defaultSize?: { width: number; height: number };
  pinnedOnDesktop?: boolean;
  pinnedInTaskbar?: boolean;
  recommended?: boolean;
  autoOpen?: boolean;
};

function webApp(opts: WebAppOptions): AppDefinition {
  return {
    id: opts.id,
    title: opts.title,
    icon: {
      glyph: opts.fallbackGlyph,
      gradient: opts.gradient,
      image: faviconFor(opts.url),
    },
    Content: makeWebApp(opts.url, opts.iframeTitle ?? opts.title),
    defaultSize: opts.defaultSize ?? { width: 1100, height: 720 },
    webUrl: opts.url,
    pinnedInStart: true,
    // Default web apps to also appear on the desktop unless caller overrides.
    pinnedOnDesktop: opts.pinnedOnDesktop ?? true,
    pinnedInTaskbar: opts.pinnedInTaskbar,
    recommended: opts.recommended,
    autoOpen: opts.autoOpen,
  };
}

const APPS: AppDefinition[] = [
  {
    id: "about",
    title: "About Me",
    icon: { glyph: UserRound, gradient: { from: "from-sky-500", to: "to-indigo-700" } },
    Content: AboutMe,
    defaultSize: { width: 880, height: 600 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    pinnedInTaskbar: true,
    recommended: true,
    autoOpen: true,
  },
  {
    id: "projects",
    title: "Projects",
    icon: {
      glyph: Briefcase,
      gradient: { from: "from-violet-600", to: "to-purple-800" },
    },
    Content: Projects,
    defaultSize: { width: 940, height: 600 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    pinnedInTaskbar: true,
  },
  {
    id: "skills",
    title: "Skills",
    icon: {
      glyph: BarChart3,
      gradient: { from: "from-emerald-500", to: "to-teal-800" },
    },
    Content: Skills,
    defaultSize: { width: 880, height: 580 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
  },
  {
    id: "resume",
    title: "Resume",
    icon: { glyph: FileText, gradient: { from: "from-rose-500", to: "to-rose-800" } },
    Content: ResumeViewer,
    defaultSize: { width: 900, height: 640 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    pinnedInTaskbar: true,
    recommended: true,
  },
  {
    id: "contact",
    title: "Contact",
    icon: { glyph: Mail, gradient: { from: "from-cyan-600", to: "to-blue-800" } },
    Content: ContactMe,
    defaultSize: { width: 860, height: 600 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
  },
  {
    id: "explorer",
    title: "File Explorer",
    icon: {
      glyph: FolderOpen,
      gradient: { from: "from-amber-400", to: "to-orange-600" },
      native: "explorer",
    },
    Content: FileExplorer,
    defaultSize: { width: 900, height: 580 },
    pinnedInStart: true,
    pinnedInTaskbar: true,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: {
      glyph: TerminalSquare,
      gradient: { from: "from-neutral-700", to: "to-neutral-900" },
      native: "terminal",
    },
    Content: Terminal,
    defaultSize: { width: 760, height: 500 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    pinnedInTaskbar: true,
  },
  {
    id: "settings",
    title: "Settings",
    icon: {
      glyph: SettingsIcon,
      gradient: { from: "from-slate-400", to: "to-slate-700" },
      native: "settings",
    },
    Content: Settings,
    defaultSize: { width: 880, height: 600 },
    pinnedInStart: true,
  },
  {
    id: "github",
    title: "GitHub",
    icon: {
      glyph: GithubIcon,
      gradient: { from: "from-zinc-700", to: "to-zinc-900" },
      native: "github",
    },
    action: () => {
      if (typeof window !== "undefined") {
        window.open("https://github.com/khalidkhnz", "_blank");
      }
    },
    pinnedOnDesktop: true,
    pinnedInStart: true,
  },
  {
    id: "recycle-bin",
    title: "Recycle Bin",
    icon: {
      glyph: Trash2,
      gradient: { from: "from-neutral-500", to: "to-neutral-700" },
      native: "trash",
    },
    Content: FileExplorer,
    pinnedOnDesktop: true,
  },
  webApp({
    id: "web-prism",
    title: "Prism",
    url: "https://prism.technotribes.org/",
    fallbackGlyph: Sparkles,
    gradient: { from: "from-fuchsia-500", to: "to-purple-800" },
  }),
  webApp({
    id: "web-buildify",
    title: "Buildify",
    url: "https://www.buildify.sh/",
    fallbackGlyph: Hammer,
    gradient: { from: "from-orange-500", to: "to-red-700" },
  }),
  webApp({
    id: "web-jobs",
    title: "Jobs Board",
    url: "https://jobs.technotribes.org/",
    fallbackGlyph: Briefcase,
    gradient: { from: "from-emerald-500", to: "to-emerald-800" },
  }),
  webApp({
    id: "web-studio",
    title: "Studio",
    url: "https://www.technotribes.org/",
    fallbackGlyph: Globe,
    gradient: { from: "from-sky-500", to: "to-blue-800" },
  }),
  webApp({
    id: "web-cardora",
    title: "Cardora",
    url: "https://www.cardoradigital.ca/",
    fallbackGlyph: CreditCard,
    gradient: { from: "from-rose-500", to: "to-pink-800" },
  }),
  webApp({
    id: "web-notepro",
    title: "NotePro",
    url: "https://notepro.khalidkhnz.in/",
    fallbackGlyph: StickyNote,
    gradient: { from: "from-amber-400", to: "to-yellow-700" },
  }),
  webApp({
    id: "web-avis",
    title: "Avis Media",
    url: "https://avismedia.in/",
    fallbackGlyph: Film,
    gradient: { from: "from-neutral-600", to: "to-neutral-900" },
  }),
  webApp({
    id: "web-store",
    title: "Khalid Store",
    url: "https://store.khalidkhnz.in/",
    fallbackGlyph: ShoppingBag,
    gradient: { from: "from-lime-500", to: "to-green-800" },
  }),
  webApp({
    id: "web-bookthatstudio",
    title: "BookThatStudio Ops",
    url: "https://operations.bookthatstudio.com/",
    fallbackGlyph: Camera,
    gradient: { from: "from-indigo-500", to: "to-violet-800" },
  }),
  webApp({
    id: "web-iq",
    title: "IQ",
    url: "https://iq.technotribes.org/",
    fallbackGlyph: Brain,
    gradient: { from: "from-cyan-500", to: "to-teal-800" },
  }),
  webApp({
    id: "web-digital-card",
    title: "Digital Card",
    url: "https://www.cardoradigital.ca/u/khalidkhnz",
    iframeTitle: "Khalid's Digital Card",
    fallbackGlyph: IdCard,
    gradient: { from: "from-rose-500", to: "to-fuchsia-800" },
    defaultSize: { width: 480, height: 760 },
    pinnedOnDesktop: true,
    pinnedInTaskbar: true,
    recommended: true,
    autoOpen: true,
  }),
];

export function getApps(): AppDefinition[] {
  return APPS;
}

/**
 * Look up the in-OS app id for a given live URL. Used so portfolio "Visit"
 * buttons can open the embedded WebApp window instead of leaving the OS.
 * Match is exact, then host-based as a fallback.
 */
export function getAppIdByWebUrl(url: string): AppId | undefined {
  if (!url) return undefined;
  const exact = APPS.find((a) => a.webUrl === url);
  if (exact) return exact.id;
  let host = "";
  try {
    host = new URL(url).host;
  } catch {
    return undefined;
  }
  const byHost = APPS.find((a) => {
    if (!a.webUrl) return false;
    try {
      return new URL(a.webUrl).host === host;
    } catch {
      return false;
    }
  });
  return byHost?.id;
}
