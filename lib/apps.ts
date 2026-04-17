import type { AppDefinition } from "@/types/os";
import { ICONS } from "@/lib/icons";
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
    icon: ICONS.USERFOLDER,
    Content: AboutMe,
    defaultSize: { width: 880, height: 640 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    pinnedInTaskbar: true,
    iconClassName: "p-1",
  },
  {
    id: "projects",
    title: "Projects",
    icon: ICONS.PORTFOLIO,
    Content: Projects,
    defaultSize: { width: 960, height: 640 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    pinnedInTaskbar: true,
    iconClassName: "p-2",
  },
  {
    id: "skills",
    title: "Skills",
    icon: ICONS.CONTROLPANEL,
    Content: Skills,
    defaultSize: { width: 880, height: 620 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    iconClassName: "p-1",
  },
  {
    id: "resume",
    title: "Resume",
    icon: ICONS.PDFICON,
    Content: ResumeViewer,
    defaultSize: { width: 900, height: 700 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    pinnedInTaskbar: true,
    recommended: true,
    iconClassName: "p-2",
  },
  {
    id: "contact",
    title: "Contact Me",
    icon: ICONS.CONTACT,
    Content: ContactMe,
    defaultSize: { width: 860, height: 620 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    iconClassName: "p-3",
  },
  {
    id: "explorer",
    title: "File Explorer",
    icon: ICONS.EXPLORER,
    Content: FileExplorer,
    defaultSize: { width: 900, height: 600 },
    pinnedInStart: true,
    pinnedInTaskbar: true,
    iconClassName: "p-1",
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: ICONS.TERMINAL,
    Content: Terminal,
    defaultSize: { width: 760, height: 520 },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    pinnedInTaskbar: true,
    iconClassName: "p-2",
  },
  {
    id: "settings",
    title: "Settings",
    icon: ICONS.SETTINGS,
    Content: Settings,
    defaultSize: { width: 880, height: 620 },
    pinnedInStart: true,
    iconClassName: "p-3",
  },
  {
    id: "github",
    title: "GitHub",
    icon: ICONS.GITHUB,
    action: () => {
      if (typeof window !== "undefined") {
        window.open("https://github.com/khalidkhnz", "_blank");
      }
    },
    pinnedOnDesktop: true,
    pinnedInStart: true,
    iconClassName: "p-3",
  },
  {
    id: "recycle-bin",
    title: "Recycle Bin",
    icon: ICONS.RECYCLEBINEMPTY,
    Content: FileExplorer,
    action: () => {},
    pinnedOnDesktop: true,
    iconClassName: "p-1",
  },
];

export function getApps(): AppDefinition[] {
  return APPS;
}
