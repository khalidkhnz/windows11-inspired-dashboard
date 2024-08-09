"use client";
import React, { useRef, useState } from "react";
import SETTINGS from "@/public/Settings.svg";
import EXPLORER from "@/public/Windows Icons/Explorer.ico";
import SEARCH from "@/public/Search.svg";
import START from "@/public/windows-start.svg";
import BELL from "@/public/Bell.svg";
import Image from "next/image";
import { format } from "date-fns";
import gsap from "gsap";
import useDetectOutsideClick from "@/hooks/detectOutsideClickHook";

type Props = {};

const WindowsTaskBar = (props: Props) => {
  const [isStartOpen, setIsStartOpen] = useState(false);

  const startWindowRef = useRef();
  const startButtonRef = useRef();
  useDetectOutsideClick(
    //@ts-ignore
    startWindowRef,
    () => isStartOpen && openStart(),
    startButtonRef,
  );

  function openStart() {
    if (isStartOpen) {
      gsap.to(".__start__", {
        translateY: "130%",
        duration: 0.2,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(".__start__", {
        translateY: "0%",
        duration: 0.2,
        ease: "power2.inOut",
      });
    }
    setIsStartOpen(!isStartOpen);
  }

  return (
    <>
      <header className="fixed bottom-0 left-0 z-50 flex h-[55px] w-full items-center justify-center gap-4 border-t-[1px] border-gray-500/50 bg-neutral-800/95 text-white">
        <div
          //@ts-ignore
          ref={startButtonRef}
          onClick={openStart}
          className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] hover:bg-white/10"
        >
          <Image
            className="aspect-square h-7 w-7 active:scale-90"
            src={START}
            alt="START"
          />
          {isStartOpen && (
            <span className="absolute bottom-0 h-[3px] w-[6px] rounded-2xl bg-gray-400" />
          )}
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
        <StartWindow startWindowRef={startWindowRef} />
      </header>
    </>
  );
};

function RightSidebar({ rightSidebarRef, ...props }: { rightSidebarRef: any }) {
  return (
    <div
      {...props}
      ref={rightSidebarRef}
      style={{
        transform: "translateX(calc(100%))",
      }}
      className="__right__sidebar__ absolute bottom-[65px] right-0 z-40 h-[600px] w-[300px] rounded-lg bg-neutral-800/90 p-2 backdrop-blur-md"
    >
      right sidebar
    </div>
  );
}

function StartWindow({ startWindowRef }: { startWindowRef: any }) {
  return (
    <div
      //@ts-ignore
      ref={startWindowRef}
      style={{
        // transform: "translateX(calc(50% + 315px))",
        transform: "translateX(0px) translateY(130%)",
      }}
      className="__start__ absolute bottom-[65px] z-40 h-[740px] w-[90%] rounded-lg bg-neutral-800/90 backdrop-blur-md md:w-[630px]"
    >
      START
    </div>
  );
}

function TaskbarRight({ ...props }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const rightSidebarRef = useRef();
  const rightSidebarButtonRef = useRef();

  useDetectOutsideClick(
    //@ts-ignore
    rightSidebarRef,
    () => isSidebarOpen && handleClick(),
    rightSidebarButtonRef,
  );

  function handleClick() {
    if (!isSidebarOpen) {
      gsap.to(".__right__sidebar__", {
        translateX: "-8px",
        duration: 0.2,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(".__right__sidebar__", {
        translateX: "100%",
        duration: 0.2,
        ease: "power2.inOut",
      });
    }
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <div
        {...props}
        onClick={handleClick}
        //@ts-ignore
        ref={rightSidebarButtonRef}
        className="absolute right-0 flex items-center px-4"
      >
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
      <RightSidebar rightSidebarRef={rightSidebarRef} />
    </>
  );
}

export default WindowsTaskBar;
