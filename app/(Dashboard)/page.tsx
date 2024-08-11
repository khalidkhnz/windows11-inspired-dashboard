"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Wallpaper from "@/components/Wallpaper";
import { AvatarFallback } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import USERICON from "@/public/Windows Icons/User.ico";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import WindowsLoading from "@/components/WindowsLoading/WindowsLoading";
import gsap from "gsap";
import { googleAuthAction, signoutAction } from "@/actions/googleAuth.action";
import useSwr, { mutate } from "swr";
import { getSessionAction } from "@/actions/getSession.action";
import { ISession } from "@/types/session";
import { ICONS } from "@/lib/icons";

type Props = {};

const Page = ({}: Props) => {
  const [activeWindow, setActiveWindow] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: sessionData,
    error: isSessionHaveError,
    isLoading: isSessionLoading,
    mutate,
  }: { data: ISession; error: any; isLoading: boolean; mutate: any } = useSwr(
    "Session",
    async () => JSON.parse(await getSessionAction()),
  );

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <Wallpaper />
      <section className="absolute flex h-full w-full items-center justify-center text-white backdrop-blur-md">
        <AvatarAuth
          mutate={mutate}
          sessionData={sessionData}
          setIsLoading={setIsLoading}
          defaultWindow={activeWindow === 0}
        />
        <AccountsList
          sessionData={sessionData}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
        />
        {isLoading && <WindowsLoading />}
      </section>
    </main>
  );
};

function AvatarAuth({
  defaultWindow = true,
  setIsLoading,
  sessionData,
  mutate,
}: {
  defaultWindow?: boolean;
  setIsLoading?: any;
  sessionData?: ISession;
  mutate: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleContinue() {
    if (defaultWindow || sessionData?.user) {
      gsap.to(".__avatar__auth__", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });

      gsap.to(".__accounts__list__", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });

      setIsLoading(true);
      setTimeout(() => {
        router.push("/desktop");
        setIsLoading(false);
      }, 2000);
      return;
    }
  }

  async function handleLogout() {
    gsap.to(".__avatar__auth__", {
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
    });
    gsap.to(".__accounts__list__", {
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
    });
    setIsLoading(true);
    await signoutAction();
    mutate();
    setTimeout(() => {
      setIsLoading(false);
      gsap.to(".__avatar__auth__", {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });

      gsap.to(".__accounts__list__", {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
    }, 2000);
  }

  if (defaultWindow)
    return (
      <div className="__avatar__auth__ flex flex-col items-center justify-center gap-2">
        <Avatar className="flex aspect-square h-[160px] w-[160px] items-center justify-center bg-white/20 backdrop-blur-xl">
          <AvatarImage
            src={
              "https://utfs.io/f/23f924b7-7d78-454f-9702-f9e549169e8b-zbx71s.jpeg"
            }
            alt="OWNERs-PICTURE"
          />
          <AvatarFallback className="relative p-8 mix-blend-hard-light grayscale-[100%]">
            <Image src={USERICON} alt="user icon" className="object-contain" />
          </AvatarFallback>
        </Avatar>
        <h1 className="my-2 text-xl">{`Khalid's Portfolio`}</h1>
        <Button
          onClick={handleContinue}
          className="min-w-[150px] bg-white/20 backdrop-blur-lg hover:bg-white/40"
        >
          Continue
        </Button>
      </div>
    );
  else
    return (
      <div className="__avatar__auth__ flex flex-col items-center justify-center gap-2">
        <Avatar className="flex aspect-square h-[160px] w-[160px] items-center justify-center bg-white/20 backdrop-blur-xl">
          <AvatarImage src={sessionData?.user?.image || ""} alt="avatar" />
          <AvatarFallback className="relative p-8 mix-blend-hard-light grayscale-[100%]">
            <Image src={USERICON} alt="user icon" className="object-contain" />
          </AvatarFallback>
        </Avatar>
        {/* <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 border-[0.5px] border-white/20 border-b-purple-600 bg-neutral-800/70 px-4 py-4 backdrop-blur-lg focus-visible:ring-0"
          placeholder="Enter Email"
        /> */}
        {sessionData?.user ? (
          <>
            <Button
              onClick={handleContinue}
              className="min-w-[150px] bg-white/20 backdrop-blur-lg hover:bg-white/40"
            >
              Continue
            </Button>
            <Button
              onClick={handleLogout}
              className="min-w-[150px] bg-white/20 backdrop-blur-lg hover:bg-red-500/70"
            >
              Logout
            </Button>
          </>
        ) : (
          <form action={googleAuthAction}>
            <Button
              type="submit"
              className="min-w-[150px] bg-white/20 backdrop-blur-lg hover:bg-white/40"
            >
              Signin with Google
            </Button>
          </form>
        )}
        {searchParams.get("error") === "CallbackRouteError" && (
          <div className="text-red-500">Sign in failed</div>
        )}
      </div>
    );
}

function AccountsList({
  activeWindow,
  setActiveWindow,
  sessionData,
}: {
  activeWindow: any;
  sessionData?: ISession;
  setActiveWindow: any;
}) {
  return (
    <div className="__accounts__list__ absolute bottom-3 left-3 flex h-fit min-h-[100px] w-[200px] flex-col items-start justify-end gap-1">
      <div
        onClick={() => setActiveWindow(0)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg p-2 transition-all hover:bg-white/20 hover:backdrop-blur-md",
          {
            "bg-white/20 backdrop-blur-md": activeWindow === 0,
          },
        )}
      >
        <Avatar className="flex aspect-square items-center justify-center bg-white/20 backdrop-blur-xl">
          <AvatarImage
            src="https://utfs.io/f/23f924b7-7d78-454f-9702-f9e549169e8b-zbx71s.jpeg"
            alt="@shadcn"
          />
          <AvatarFallback className="relative p-8 mix-blend-hard-light grayscale-[100%]">
            K
          </AvatarFallback>
        </Avatar>
        <h1 className="text-sm">Khalid</h1>
      </div>

      <div
        onClick={() => setActiveWindow(1)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg p-2 transition-all hover:bg-white/20 hover:backdrop-blur-md",
          {
            "bg-white/20 backdrop-blur-md": activeWindow === 1,
          },
        )}
      >
        <Avatar className="flex aspect-square items-center justify-center bg-white/20 backdrop-blur-xl">
          <AvatarImage src={sessionData?.user?.image || ""} alt="@shadcn" />
          <AvatarFallback className="relative p-2 mix-blend-hard-light grayscale-[100%]">
            <Image src={USERICON} alt="user icon" className="object-contain" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-sm">
          {sessionData?.user?.name
            ? sessionData?.user?.name
            : `Login or Signup`}
        </h1>
      </div>
    </div>
  );
}

export default Page;
