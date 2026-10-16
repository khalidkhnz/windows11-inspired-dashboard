"use client";

import { useSyncExternalStore } from "react";
import {
  getServerSoundSettings,
  getSoundSettings,
  setSoundEnabled,
  subscribeSound,
} from "@/lib/sound";

/** Reactive access to the persisted sound settings. */
export function useSoundSettings() {
  const settings = useSyncExternalStore(
    subscribeSound,
    getSoundSettings,
    getServerSoundSettings,
  );
  return { ...settings, setEnabled: setSoundEnabled };
}
