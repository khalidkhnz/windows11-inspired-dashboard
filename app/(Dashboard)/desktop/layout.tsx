import Wallpaper from "@/components/Wallpaper";
import WindowsTaskBar from "@/components/WindowsTaskBar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <Wallpaper />
      <section id="desktop-root" className="absolute w-full">
        {children}
      </section>
      <WindowsTaskBar />
    </main>
  );
};

export default layout;
