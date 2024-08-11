"use client";

import { ICONS } from "@/lib/icons";
import { IAppType } from "@/types/apps";
import {
  IAppContext,
  IAppContextProviderProps,
  IWindow,
} from "@/types/context";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<IAppContext | null>(null);

export function AppContextProvider({ children }: IAppContextProviderProps) {
  const [windows, setWindows] = useState<IWindow[]>([]);
  const [activeWindow, setActiveWindow] = useState<null | number>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<number[]>([]);

  const router = useRouter();

  const desktopApps: IAppType[] = [
    {
      title: "Khalid",
      ICON: ICONS.USERFOLER,
    },
    {
      title: "This PC",
      ICON: ICONS.THISPC,
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "This PC",
              content: "This PC",
              icon: ICONS.THISPC,
            },
          ];
        });
      },
    },
    {
      title: "Recycle Bin",
      ICON: ICONS.RECYCLEBINEMPTY || ICONS.RECYCLEBINFULL,
      customCSS: "object-contain w-[90%] h-[90%] pb-6",
      // iconParentCSS: "absolute top-1",
    },
    {
      title: "Control Panel",
      ICON: ICONS.CONTROLPANEL,
      customCSS: "p-2 object-contain",
    },
    {
      title: "Resume.pdf",
      ICON: ICONS.PDFICON,
      customCSS: "p-2 object-contain",
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "Resume",
              content: <div className="h-full w-full"></div>,
              icon: ICONS.PDFICON,
            },
          ];
        });
      },
    },
    {
      title: "Portfolio v0.0.1",
      ICON: ICONS.PORTFOLIO,
      customCSS: "p-4 object-contain",
      // iconParentCSS: "p-4",
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "Portfolio v2",
              content: (
                <div className="h-full w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://khalid.felixarts.in"
                  ></iframe>
                </div>
              ),
              icon: ICONS.PORTFOLIO,
            },
          ];
        });
      },
    },
    {
      title: "Portfolio v0.0.2",
      ICON: ICONS.PORTFOLIO,
      customCSS: "p-4 object-contain",
      // iconParentCSS: "p-4",
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "Portfolio v2",
              icon: ICONS.PORTFOLIO,
              content: (
                <div className="h-full w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://khalidkhnzz.vercel.app"
                  ></iframe>
                </div>
              ),
            },
          ];
        });
      },
    },
    {
      title: "Sportjacks",
      ICON: ICONS.SPORTJACKS,
      customCSS: "p-4 object-contain",
      // iconParentCSS: "p-2",
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "SportJacks",
              icon: ICONS.SPORTJACKS,
              content: (
                <div className="h-full w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://sportjacks.com"
                  ></iframe>
                </div>
              ),
            },
          ];
        });
      },
    },
    {
      title: "Twitter Bot",
      ICON: ICONS.X,
      customCSS: "p-4 object-contain",
      // iconParentCSS: "p-2",
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "Twitter Bot",
              icon: ICONS.X,
              content: (
                <div className="h-full w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://tw-dev.vercel.app"
                  ></iframe>
                </div>
              ),
            },
          ];
        });
      },
    },
    {
      title: "Hotel Deepali Portfolio",
      ICON: ICONS.DEEPALI,
      customCSS: "p-8 object-contain",
      // iconParentCSS: "p-2",
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "Hotel Deepali Portfolio",
              icon: ICONS.DEEPALI,
              content: (
                <div className="h-full w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://deepali.vercel.app/"
                  ></iframe>
                </div>
              ),
            },
          ];
        });
      },
    },
    {
      title: "My Github",
      ICON: ICONS.GITHUB,
      customCSS: "p-8 object-contain",
      // iconParentCSS: "p-2",
      onClick: () => {
        router.push("https://github.com/khalidkhnz?tab=repositories");
      },
    },
  ];

  const startApps: IAppType[] = [
    {
      title: "Khalid",
      ICON: ICONS.USERFOLER,
    },
    {
      title: "This PC",
      ICON: ICONS.THISPC,
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "NEW WINDOW",
              content: "This PC",
              icon: ICONS.THISPC,
            },
          ];
        });
      },
    },
    {
      title: "Recycle Bin",
      ICON: ICONS.RECYCLEBINEMPTY || ICONS.RECYCLEBINFULL,
      // customCSS: "object-contain pb-6",
      // iconParentCSS: "absolute top-1",
    },
    {
      title: "Control Panel",
      ICON: ICONS.CONTROLPANEL,
      // customCSS: "p-2 object-contain",
    },
    {
      title: "Resume.pdf",
      ICON: ICONS.PDFICON,
      customCSS: "p-2 object-contain",
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "Resume",
              icon: ICONS.PDFICON,
              content: <div className="h-full w-full"></div>,
            },
          ];
        });
      },
    },
    {
      title: "Portfolio v0.0.1",
      ICON: ICONS.PORTFOLIO,
      customCSS: "p-2 object-contain",
      // iconParentCSS: "p-4",
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "Portfolio v2",
              icon: ICONS.PORTFOLIO,
              content: (
                <div className="h-full w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://khalid.felixarts.in"
                  ></iframe>
                </div>
              ),
            },
          ];
        });
      },
    },
    {
      title: "Portfolio v0.0.2",
      ICON: ICONS.PORTFOLIO,
      customCSS: "p-2 object-contain",
      // iconParentCSS: "p-4",
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "Portfolio v2",
              icon: ICONS.PORTFOLIO,
              content: (
                <div className="h-full w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://khalidkhnz.vercel.app"
                  ></iframe>
                </div>
              ),
            },
          ];
        });
      },
    },
    {
      title: "Sportjacks",
      ICON: ICONS.SPORTJACKS,
      customCSS: "p-2 object-contain",
      // iconParentCSS: "p-4",
      onClick: () => {
        setWindows((prev: IWindow[]) => {
          const id =
            prev.length > 0 ? prev[prev.length - 1].id + 1 : Date.now();
          setActiveWindow(id);
          return [
            ...prev,
            {
              id: id,
              title: "SportJacks",
              icon: ICONS.SPORTJACKS,
              content: (
                <div className="h-full w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://sportjacks.com"
                  ></iframe>
                </div>
              ),
            },
          ];
        });
      },
    },
  ];

  const recommandedApps: IAppType[] = [
    {
      title: "Resume.pdf",
      ICON: ICONS.PDFICON,
      customCSS: "p-2 object-contain",
    },
  ];

  const apps = {
    startApps,
    recommandedApps,
    desktopApps,
  };

  return (
    <AppContext.Provider
      value={{
        windows,
        setWindows,
        activeWindow,
        setActiveWindow,
        apps,
        minimizedWindows,
        setMinimizedWindows,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}
