"use client";

import Image from "next/image";
import { useWallpaper } from "@/context/WallpaperContext";

export default function Wallpaper({ blur = false }: { blur?: boolean }) {
  const { wallpaper } = useWallpaper();
  return (
    <>
      <Image
        src={wallpaper.src}
        alt=""
        fill
        priority
        className={blur ? "object-cover scale-105 blur-[3px] brightness-90" : "object-cover"}
      />
      {blur && <div className="absolute inset-0 bg-black/30" />}
    </>
  );
}
