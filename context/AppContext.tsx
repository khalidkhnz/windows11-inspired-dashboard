"use client";

import { ICONS } from "@/lib/icons";
import { IAppType } from "@/types/apps";
import {
  IAppContext,
  IAppContextProviderProps,
  IWindow,
} from "@/types/context";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<IAppContext | null>(null);

export function AppContextProvider({ children }: IAppContextProviderProps) {
  const [windows, setWindows] = useState<IWindow[]>([]);
  const [activeWindow, setActiveWindow] = useState<null | number>(null);

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
            },
          ];
        });
      },
    },
    {
      title: "Recycle Bin",
      ICON: ICONS.RECYCLEBINEMPTY || ICONS.RECYCLEBINFULL,
      customCSS: "object-contain pb-6",
      iconParentCSS: "absolute top-1",
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
    },
    {
      title: "Sportjacks",
      ICON: ICONS.SPORTJACKS,
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
              title: "SportJacks",
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
    },
    {
      title: "Sportjacks",
      ICON: ICONS.SPORTJACKS,
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
              title: "SportJacks",
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
            },
          ];
        });
      },
    },
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
