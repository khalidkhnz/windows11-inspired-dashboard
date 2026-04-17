import Wallpaper from "@/components/desktop/Wallpaper";
import DesktopContextMenu from "@/components/desktop/DesktopContextMenu";
import WindowsLayer from "@/components/desktop/WindowsLayer";
import { ThemedShell } from "@/components/desktop/Shell";
import { ShellFrame } from "@/components/desktop/Shell/ShellFrame";

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white">
      <Wallpaper />
      <DesktopContextMenu>
        <ShellFrame>{children}</ShellFrame>
      </DesktopContextMenu>
      <WindowsLayer />
      <ThemedShell />
    </main>
  );
}
