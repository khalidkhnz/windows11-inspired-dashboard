export type IAppContextProviderProps = {
  children: React.ReactNode;
};

export type IAppContext = {
  windows: IWindow[];
  setWindows: Dispatch<SetStateAction<IWindow[]>>;
  activeWindow: number | null;
  setActiveWindow: Dispatch<SetStateAction<number | null>>;
  apps: {
    startApps: IAppType[];
    recommandedApps: IAppType[];
    desktopApps: IAppType[];
  };
};

export interface IWindow {
  title: string;
  id: number;
  content?: any;
}
