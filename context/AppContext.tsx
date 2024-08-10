"use client";

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

  return (
    <AppContext.Provider
      value={{
        windows,
        setWindows,
        activeWindow,
        setActiveWindow,
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
