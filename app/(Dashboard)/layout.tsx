import Wallpaper from "@/components/Wallpaper";
import WindowsTaskBar from "@/components/WindowsTaskBar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="bg-black min-h-screen relative">
      {children}
      <Wallpaper />
      <WindowsTaskBar />
    </main>
  );
};

export default layout;
