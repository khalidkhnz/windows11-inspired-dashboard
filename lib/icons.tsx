import USERFOLER from "@/public/Windows Icons/Yellow Folder user.ico";
import THISPC from "@/public/Windows Icons/Computer.ico";
import CONTROLPANEL from "@/public/Windows Icons/Control Panel.ico";
import RECYCLEBINEMPTY from "@/public/Windows Icons/Trash Empty.ico";
import RECYCLEBINFULL from "@/public/Windows Icons/Trash Full.ico";
import USERICON from "@/public/Windows Icons/User.ico";
import SETTINGS from "@/public/Settings.svg";
import EXPLORER from "@/public/Windows Icons/Explorer.ico";
import SEARCH from "@/public/Search.svg";
import START from "@/public/windows-start.svg";
import BELL from "@/public/Bell.svg";
import DOWNLOADS from "@/public/Windows Icons/Folder Downloads.ico";
import PDFICON from "@/public/Windows Icons/pdf-icon.png";
import SPORTJACKS from "@/public/Windows Icons/sj.ico";
import PORTFOLIO from "@/public/portfolio.png";
import X from "@/public/x-logo.svg";
import DEEPALI from "@/public/Deepali.png";
import GITHUB from "@/public/Github.svg";
import TASKVIEW from "@/public/Task-view.png";
import CONTACT from "@/public/contact.svg";
import OWNER from "@/public/OWNER-DEVELOPER.jpeg";
import { cn } from "./utils";

export const ICONS = {
  USERFOLER,
  THISPC,
  CONTROLPANEL,
  RECYCLEBINFULL,
  RECYCLEBINEMPTY,
  USERICON,
  SETTINGS,
  EXPLORER,
  SEARCH,
  START,
  BELL,
  DOWNLOADS,
  PDFICON,
  SPORTJACKS,
  PORTFOLIO,
  X,
  DEEPALI,
  GITHUB,
  TASKVIEW,
  CONTACT,
  OWNER,
};

export function Cross({
  className,
  onClick,
  ...props
}: {
  className?: string;
  onClick?: any;
}) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn(className)}
      // class="lucide lucide-x"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function Maximize({ className, ...props }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn(className)}
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  );
}

export function Minimize({ className, ...props }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn(className)}
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  );
}
