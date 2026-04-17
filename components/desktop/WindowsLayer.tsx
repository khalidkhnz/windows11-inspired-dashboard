"use client";

import { useOs } from "@/context/OsContext";
import { Window } from "./Window";

export default function WindowsLayer() {
  const { windows, appsById } = useOs();
  return (
    <>
      {windows.map((w) => {
        const app = appsById[w.appId];
        if (!app) return null;
        return <Window key={w.id} win={w} app={app} />;
      })}
    </>
  );
}
