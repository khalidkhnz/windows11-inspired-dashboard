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
} from "lucide-react";
import type { AppDefinition } from "@/types/os";
import AboutMe from "@/components/apps/AboutMe";
import Projects from "@/components/apps/Projects";
import Skills from "@/components/apps/Skills";
import ContactMe from "@/components/apps/ContactMe";
import ResumeViewer from "@/components/apps/ResumeViewer";
import FileExplorer from "@/components/apps/FileExplorer";
import Terminal from "@/components/apps/Terminal";
import Settings from "@/components/apps/Settings";

const APPS: AppDefinition[] = [
  {
    id: "about",
    title: "About Me",
    icon: { glyph: UserRound, gradient: { from: "from-sky-400", to: "to-blue-600" } },
    Content: AboutMe,
    defaultSize: { width: 880, height: 600 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    pinnedInTaskbar: true,
    recommended: true,
  },
  {
    id: "projects",
    title: "Projects",
    icon: {
      glyph: Briefcase,
      gradient: { from: "from-violet-500", to: "to-fuchsia-600" },
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
      gradient: { from: "from-emerald-400", to: "to-teal-600" },
    },
    Content: Skills,
    defaultSize: { width: 880, height: 580 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
  },
  {
    id: "resume",
    title: "Resume",
    icon: { glyph: FileText, gradient: { from: "from-rose-400", to: "to-red-600" } },
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
    icon: { glyph: Mail, gradient: { from: "from-pink-400", to: "to-rose-600" } },
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
    },
    Content: Settings,
    defaultSize: { width: 880, height: 600 },
    pinnedInStart: true,
  },
  {
    id: "github",
    title: "GitHub",
    icon: { glyph: GithubIcon, gradient: { from: "from-zinc-700", to: "to-zinc-900" } },
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
    icon: { glyph: Trash2, gradient: { from: "from-neutral-500", to: "to-neutral-700" } },
    Content: FileExplorer,
    pinnedOnDesktop: true,
  },
];

export function getApps(): AppDefinition[] {
  return APPS;
}
