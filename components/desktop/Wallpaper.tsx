"use client";

import Image from "next/image";
import { useWallpaper } from "@/context/WallpaperContext";

export default function Wallpaper({ blur = false }: { blur?: boolean }) {
  const { wallpaper } = useWallpaper();
  if (wallpaper.gradient) {
    return (
      <>
        <div
          className={blur ? "absolute inset-0 scale-105 blur-[3px] brightness-90" : "absolute inset-0"}
          style={{ background: wallpaper.gradient }}
        />
        {blur && <div className="absolute inset-0 bg-black/30" />}
      </>
    );
  }
  return (
    <>
      {wallpaper.src && (
        <Image
          src={wallpaper.src}
          alt=""
          fill
          priority
          className={blur ? "object-cover scale-105 blur-[3px] brightness-90" : "object-cover"}
        />
      )}
      {blur && <div className="absolute inset-0 bg-black/30" />}
    </>
  );
}
