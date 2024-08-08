import React, { useState } from "react";
import SETTINGS from "@/public/Settings.svg";
import EXPLORER from "@/public/Windows Icons/Explorer.ico";
import SEARCH from "@/public/Search.svg";
import START from "@/public/windows-start.svg";
import BELL from "@/public/Bell.svg";
import Image from "next/image";
import { format } from "date-fns";

type Props = {};

const WindowsTaskBar = (props: Props) => {
  return (
    <header className="fixed bottom-0 left-0 z-50 flex h-[55px] w-full items-center justify-center gap-4 border-t-[1px] border-gray-500/50 bg-neutral-800/95 text-white">
      <div className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] hover:bg-white/10">
        <Image
          className="aspect-square h-7 w-7 active:scale-90"
          src={START}
          alt="START"
        />
        <span className="absolute bottom-0 h-[3px] w-[6px] rounded-2xl bg-gray-400" />
      </div>
      <div className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] hover:bg-white/10">
        <Image
          className="aspect-square h-9 w-9 active:scale-90"
          src={SEARCH}
          alt="SEARCH"
        />
        <span className="absolute bottom-0 h-[3px] w-[6px] rounded-2xl bg-gray-400" />
      </div>
      <div className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] hover:bg-white/10">
        <Image
          className="aspect-square h-8 w-8 active:scale-90"
          src={EXPLORER}
          alt="FOLDER"
        />
        <span className="absolute bottom-0 h-[3px] w-[6px] rounded-2xl bg-gray-400" />
      </div>
      <div className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] hover:bg-white/10">
        <Image
          className="aspect-square h-9 w-9 active:scale-90"
          src={SETTINGS}
          alt="SETTINGS"
        />
        <span className="absolute bottom-0 h-[3px] w-[6px] rounded-2xl bg-gray-400" />
      </div>

      <TaskbarRight />
    </header>
  );
};

function TaskbarRight() {
  return (
    <div className="absolute right-0 flex items-center px-4">
      <div className="flex h-11 cursor-pointer items-center gap-2 rounded-[4px] p-1 px-2 hover:bg-white/5 active:scale-95">
        <div className="flex flex-col text-right text-[11px] font-light">
          <span>{format(new Date(), "hh:mm:a")}</span>
          <span className="flex items-center">
            {format(new Date(), "eee")}, {format(new Date(), "dd-MM-yyyy")}
          </span>
        </div>
        <Image src={BELL} alt="bell" className="h-[18px] w-[18px]" />
      </div>
    </div>
  );
}

export default WindowsTaskBar;
