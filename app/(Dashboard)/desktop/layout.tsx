import Wallpaper from "@/components/desktop/Wallpaper";
import Taskbar from "@/components/desktop/Taskbar";
import DesktopContextMenu from "@/components/desktop/DesktopContextMenu";
import WindowsLayer from "@/components/desktop/WindowsLayer";

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white">
      <Wallpaper />
      <DesktopContextMenu>
        <section className="relative h-[calc(100vh-52px)] w-full">{children}</section>
      </DesktopContextMenu>
      <WindowsLayer />
      <Taskbar />
    </main>
  );
}
