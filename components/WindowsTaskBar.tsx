import React, { useState } from "react";
import SETTINGS from "@/public/Settings.svg";
import FOLDER from "@/public/Folder.svg";
import SEARCH from "@/public/Search.svg";
import START from "@/public/windows-start.svg";
import BELL from "@/public/Bell.svg";
import Image from "next/image";
import { format } from "date-fns";

type Props = {};

const WindowsTaskBar = (props: Props) => {
  return (
    <header className="w-full gap-4 flex justify-center items-center text-white bg-neutral-800/95  border-t-[1px] border-gray-500/50 fixed bottom-0 left-0 bg-white h-[55px]">
      <div className="relative hover:bg-white/10 cursor-pointer rounded-[4px] flex justify-center items-center w-11 h-11">
        <Image
          className="aspect-square active:scale-90 h-7 w-7"
          src={START}
          alt="START"
        />
        <span className="w-[6px] h-[3px] bg-gray-400 absolute bottom-0 rounded-2xl" />
      </div>
      <div className="relative hover:bg-white/10 cursor-pointer rounded-[4px] flex justify-center items-center w-11 h-11">
        <Image
          className="aspect-square active:scale-90 h-9 w-9"
          src={SEARCH}
          alt="SEARCH"
        />
        <span className="w-[6px] h-[3px] bg-gray-400 absolute bottom-0 rounded-2xl" />
      </div>
      <div className="relative hover:bg-white/10 cursor-pointer rounded-[4px] flex justify-center items-center w-11 h-11">
        <Image
          className="aspect-square active:scale-90 h-9 w-9"
          src={FOLDER}
          alt="FOLDER"
        />
        <span className="w-[6px] h-[3px] bg-gray-400 absolute bottom-0 rounded-2xl" />
      </div>
      <div className="relative hover:bg-white/10 cursor-pointer rounded-[4px] flex justify-center items-center w-11 h-11">
        <Image
          className="aspect-square active:scale-90 h-9 w-9"
          src={SETTINGS}
          alt="SETTINGS"
        />
        <span className="w-[6px] h-[3px] bg-gray-400 absolute bottom-0 rounded-2xl" />
      </div>

      <TaskbarRight />
    </header>
  );
};

function TaskbarRight() {
  return (
    <div className="absolute flex items-center right-0 px-4">
      <div className="active:scale-95 px-2 hover:bg-white/5 p-1 rounded-[4px] h-11 cursor-pointer flex gap-2 items-center">
        <div className="flex flex-col text-[11px] font-light text-right">
          <span>{format(new Date(), "hh:mm:a")}</span>
          <span className="flex items-center">
            {format(new Date(), "eee")}, {format(new Date(), "dd-MM-yyyy")}
          </span>
        </div>
        <Image src={BELL} alt="bell" className="w-[18px] h-[18px]" />
      </div>
    </div>
  );
}

export default WindowsTaskBar;
