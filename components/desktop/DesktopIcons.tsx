"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useOs } from "@/context/OsContext";

export default function DesktopIcons() {
  const { apps, openApp } = useOs();
  const pinned = apps.filter((a) => a.pinnedOnDesktop);

  return (
    <ul
      className={cn(
        "absolute left-4 top-4 grid auto-rows-[92px] grid-cols-1 content-start gap-1",
      )}
      style={{ gridTemplateRows: "repeat(auto-fill, 92px)" }}
    >
      {pinned.map((app) => (
        <li key={app.id}>
          <button
            onDoubleClick={() => openApp(app.id)}
            onKeyDown={(e) => e.key === "Enter" && openApp(app.id)}
            className="group flex h-[92px] w-20 flex-col items-center justify-start gap-1 rounded-md border border-transparent px-1 py-2 text-center text-[11px] leading-tight text-white outline-none transition-colors focus-visible:border-white/30 focus-visible:bg-white/10 hover:bg-white/10"
          >
            <div className="relative h-10 w-10">
              <Image
                src={app.icon}
                alt=""
                fill
                className={cn("object-contain drop-shadow-md", app.iconClassName)}
              />
            </div>
            <span className="line-clamp-2 px-0.5 [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)]">
              {app.title}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
