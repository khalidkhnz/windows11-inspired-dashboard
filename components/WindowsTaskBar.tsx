"use client";
import React, { useRef, useState } from "react";

import Image from "next/image";
import { format } from "date-fns";
import gsap from "gsap";
import useDetectOutsideClick from "@/hooks/detectOutsideClickHook";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { IoSearch } from "react-icons/io5";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RiShutDownLine } from "react-icons/ri";
import { IAppType } from "@/types/apps";
import { IWindow } from "@/types/context";
import { useAppContext } from "@/context/AppContext";
import { ICONS } from "@/lib/icons";

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
            src={ICONS.START}
            alt="START"
          />
          {isStartOpen && (
            <span className="absolute bottom-0 h-[3px] w-[6px] rounded-2xl bg-gray-400" />
          )}
        </div>
        <div className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] hover:bg-white/10">
          <Image
            className="aspect-square h-9 w-9 active:scale-90"
            src={ICONS.SEARCH}
            alt="SEARCH"
          />
          <span className="absolute bottom-0 h-[3px] w-[6px] rounded-2xl bg-gray-400" />
        </div>
        <div className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] hover:bg-white/10">
          <Image
            className="aspect-square h-8 w-8 active:scale-90"
            src={ICONS.EXPLORER}
            alt="FOLDER"
          />
          <span className="absolute bottom-0 h-[3px] w-[6px] rounded-2xl bg-gray-400" />
        </div>
        <div className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] hover:bg-white/10">
          <Image
            className="aspect-square h-9 w-9 active:scale-90"
            src={ICONS.SETTINGS}
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
  const { apps } = useAppContext();

  return (
    <div
      //@ts-ignore
      ref={startWindowRef}
      style={{
        // transform: "translateX(calc(50% + 315px))",
        transform: "translateX(0px) translateY(130%)",
      }}
      className={cn(
        "__start__ absolute bottom-[65px] z-40 h-[740px] w-full rounded-lg bg-neutral-800/70 px-10 backdrop-blur-xl md:w-[630px]",
      )}
    >
      <div className="relative my-8 w-full">
        <Input
          placeholder="Search for apps, settings and documents"
          className="mx-auto h-[32px] w-full rounded-3xl border-[1px] border-neutral-100/10 bg-neutral-900/55 p-0 pl-12 shadow-none outline-none placeholder:text-gray-500 focus-visible:ring-0"
        />
        <IoSearch className="absolute left-[14px] top-[6px] aspect-square h-5 w-5 font-bold text-neutral-300" />
      </div>
      <div className="relative">
        <h1 className="my-3 text-[14px]">Pinned</h1>
        <div className="scrollbar__hidden __start__apps__scroll__ relative my-auto h-[280px] w-full snap-y snap-mandatory overflow-y-scroll">
          {Array(1)
            .fill("")
            .map((section, idx) => (
              <div
                key={idx}
                className={cn(
                  `__start__apps__scroll__item__${idx}__`,
                  "my-auto grid h-full w-full snap-start grid-cols-6 grid-rows-3 gap-3",
                )}
              >
                {apps.startApps.map((item, index) => (
                  <div
                    key={index}
                    onClick={item.onClick}
                    className="relative flex cursor-pointer flex-col items-center justify-end gap-4 border-[2px] border-transparent p-3 active:scale-90"
                  >
                    <Image
                      src={item.ICON}
                      alt="icon"
                      className="h-[55px] w-[55px] object-contain"
                    />
                    <h2 className="absolute bottom-0 left-0 w-full text-center text-[10px]">
                      {`${item.title}`}
                    </h2>
                  </div>
                ))}
              </div>
            ))}
        </div>
        <div className="absolute -right-5 top-0 flex h-full flex-col items-center justify-center gap-[6px]">
          <div className="aspect-square min-h-[4px] min-w-[4px] rounded-full bg-neutral-300/90"></div>
          {/* <div className="aspect-square min-h-[4px] min-w-[4px] rounded-full bg-neutral-300/90"></div> */}
          {/* <div className="aspect-square min-h-[4px] min-w-[4px] rounded-full bg-neutral-300/90"></div> */}
        </div>
        <div className="mt-6">
          <div className="flex w-full items-center justify-between px-2">
            <h1 className="text-[13px]">Recommended</h1>
            <Button className="h-fit min-h-fit bg-neutral-600/20 p-4 py-1 text-[10px] backdrop-blur-lg hover:bg-neutral-800/40">
              More
            </Button>
          </div>
          <div className="mt-2 grid h-[180px] grid-cols-2 grid-rows-3 gap-2 px-4">
            {apps.recommandedApps.map(
              (app, idx) =>
                idx <= 4 && (
                  <div
                    key={app.title}
                    onClick={app.onClick}
                    className={cn(
                      "relative flex w-full cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-white/5",
                      app.iconParentCSS,
                    )}
                  >
                    <Image
                      src={app.ICON}
                      alt="icon"
                      className={cn(
                        "h-[50px] w-[50px] object-contain",
                        app.customCSS,
                      )}
                    />
                    <span className="flex flex-col items-start justify-center text-[10px]">
                      <span>{app.title}</span>
                      <span>5h ago</span>
                    </span>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 mt-auto flex h-[75px] w-full items-center justify-between bg-neutral-900/30 px-10 backdrop-blur-lg">
        <div
          className={cn(
            "flex cursor-pointer items-center justify-start gap-3 rounded-lg p-2 px-4",
          )}
        >
          <Avatar className="flex aspect-square items-center justify-center bg-white/20 backdrop-blur-xl">
            <AvatarImage src={""} alt="@shadcn" />
            <AvatarFallback className="relative p-2 mix-blend-hard-light grayscale-[100%]">
              <Image
                src={ICONS.USERICON}
                alt="user icon"
                className="object-contain"
              />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-sm">Khalid</h1>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="h-fit border-none bg-transparent p-1 outline-none"
              asChild
            >
              <div className="rounded-md p-1 hover:bg-neutral-700">
                <RiShutDownLine className="aspect-square h-[22px] w-[22px] text-neutral-200" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-[1px] border-neutral-700/60 bg-neutral-900/40 text-neutral-200 shadow-md outline-none backdrop-blur-md">
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-[14px] hover:bg-neutral-100/5 focus:hover:bg-neutral-100/5 focus:hover:text-neutral-200">
                  <span>Sleep</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[14px] hover:bg-neutral-100/5 focus:hover:bg-neutral-100/5 focus:hover:text-neutral-200">
                  <span>Shutdown</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[14px] hover:bg-neutral-100/5 focus:hover:bg-neutral-100/5 focus:hover:text-neutral-200">
                  <span>Restart</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
          <Image src={ICONS.BELL} alt="bell" className="h-[18px] w-[18px]" />
        </div>
      </div>
      <RightSidebar rightSidebarRef={rightSidebarRef} />
    </>
  );
}

export default WindowsTaskBar;
