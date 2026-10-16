/**
 * UI sound layer. Tones are synthesised with the Web Audio API — no audio
 * files. The module is a client-side singleton; every entry point is a safe
 * no-op on the server, when Web Audio is unavailable, or when sound is off.
 */

export type SoundCategory = "ui" | "music" | "alert";

export type SoundEventName =
  | "click"
  | "open"
  | "close"
  | "minimize"
  | "success"
  | "error"
  | "notification";

export type SoundSettings = {
  enabled: boolean;
  /** Master volume, 0-1. */
  volume: number;
  /** Epoch ms of the last change. */
  updatedAt: number;
};

type ToneStep = {
  /** Frequency in Hz. */
  freq: number;
  /** Start offset in seconds. */
  at: number;
  /** Duration in seconds. */
  duration: number;
  type?: OscillatorType;
  /** Relative gain, 0-1. */
  gain?: number;
};

export type SoundAsset = {
  id: string;
  label: string;
  category: SoundCategory;
  tones: ToneStep[];
};

export type EventSoundMap = {
  eventName: SoundEventName;
  soundAssetId: string;
};

export const SOUND_ASSETS: SoundAsset[] = [
  {
    id: "tick",
    label: "Tick",
    category: "ui",
    tones: [{ freq: 880, at: 0, duration: 0.04, type: "triangle", gain: 0.5 }],
  },
  {
    id: "pop-up",
    label: "Pop up",
    category: "ui",
    tones: [
      { freq: 520, at: 0, duration: 0.07, type: "sine" },
      { freq: 780, at: 0.05, duration: 0.09, type: "sine" },
    ],
  },
  {
    id: "pop-down",
    label: "Pop down",
    category: "ui",
    tones: [
      { freq: 700, at: 0, duration: 0.06, type: "sine" },
      { freq: 440, at: 0.05, duration: 0.08, type: "sine" },
    ],
  },
  {
    id: "swoosh",
    label: "Swoosh",
    category: "ui",
    tones: [{ freq: 360, at: 0, duration: 0.07, type: "sine", gain: 0.6 }],
  },
  {
    id: "chime-success",
    label: "Success chime",
    category: "alert",
    tones: [
      { freq: 660, at: 0, duration: 0.12, type: "sine" },
      { freq: 880, at: 0.1, duration: 0.12, type: "sine" },
      { freq: 1320, at: 0.2, duration: 0.2, type: "sine" },
    ],
  },
  {
    id: "buzz-error",
    label: "Error buzz",
    category: "alert",
    tones: [
      { freq: 220, at: 0, duration: 0.13, type: "square", gain: 0.5 },
      { freq: 165, at: 0.14, duration: 0.2, type: "square", gain: 0.5 },
    ],
  },
  {
    id: "ding",
    label: "Notification ding",
    category: "alert",
    tones: [
      { freq: 988, at: 0, duration: 0.15, type: "sine" },
      { freq: 1319, at: 0.12, duration: 0.25, type: "sine" },
    ],
  },
];

export const EVENT_SOUND_MAP: EventSoundMap[] = [
  { eventName: "click", soundAssetId: "tick" },
  { eventName: "open", soundAssetId: "pop-up" },
  { eventName: "close", soundAssetId: "pop-down" },
  { eventName: "minimize", soundAssetId: "swoosh" },
  { eventName: "success", soundAssetId: "chime-success" },
  { eventName: "error", soundAssetId: "buzz-error" },
  { eventName: "notification", soundAssetId: "ding" },
];

export const SOUND_STORAGE_KEY = "portfolio-sound";
const MASTER_LEVEL = 0.2;

const DEFAULT_SETTINGS: SoundSettings = { enabled: true, volume: 0.6, updatedAt: 0 };

const assetsById = new Map(SOUND_ASSETS.map((a) => [a.id, a]));
const assetIdByEvent = new Map(EVENT_SOUND_MAP.map((m) => [m.eventName, m.soundAssetId]));

let settings: SoundSettings = DEFAULT_SETTINGS;
let hydrated = false;
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let unsupported = false;
let unlockBound = false;
const listeners = new Set<() => void>();
const active = new Set<OscillatorNode>();

function emit() {
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(SOUND_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<SoundSettings>;
    settings = {
      enabled:
        typeof parsed.enabled === "boolean" ? parsed.enabled : DEFAULT_SETTINGS.enabled,
      volume:
        typeof parsed.volume === "number"
          ? Math.min(1, Math.max(0, parsed.volume))
          : DEFAULT_SETTINGS.volume,
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
    };
  } catch {
    /* storage unavailable or corrupt — keep defaults */
  }
}

function persist() {
  try {
    window.localStorage.setItem(SOUND_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* ignore */
  }
}

function getContext(): AudioContext | null {
  if (unsupported || typeof window === "undefined") return null;
  if (ctx) return ctx;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) {
      unsupported = true;
      return null;
    }
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = settings.volume * MASTER_LEVEL;
    master.connect(ctx.destination);
    return ctx;
  } catch {
    unsupported = true;
    return null;
  }
}

/**
 * Browsers keep audio suspended until a user gesture. Listen for the first
 * interaction and resume the context then.
 */
export function initSound() {
  if (typeof window === "undefined" || unlockBound) return;
  unlockBound = true;
  hydrate();
  emit();
  const unlock = () => {
    const c = getContext();
    if (c && c.state === "suspended") c.resume().catch(() => {});
    if (c) {
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("keydown", unlock, true);
    }
  };
  window.addEventListener("pointerdown", unlock, true);
  window.addEventListener("keydown", unlock, true);
}

/** Create the audio context ahead of the first sound (needs a prior gesture to run). */
export function preloadSounds() {
  getContext();
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function playSound(eventName: SoundEventName) {
  hydrate();
  if (!settings.enabled || settings.volume <= 0) return;
  const asset = assetsById.get(assetIdByEvent.get(eventName) ?? "");
  if (!asset) return;
  // Reduced-motion users only get the meaningful alert sounds, not UI chatter.
  if (asset.category === "ui" && prefersReducedMotion()) return;
  const c = getContext();
  // Still locked (no gesture yet) — drop the sound rather than queue it.
  if (!c || !master || c.state !== "running") return;
  try {
    const now = c.currentTime;
    for (const tone of asset.tones) {
      const osc = c.createOscillator();
      const gain = c.createGain();
      const start = now + tone.at;
      const end = start + tone.duration;
      osc.type = tone.type ?? "sine";
      osc.frequency.value = tone.freq;
      const peak = tone.gain ?? 1;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);
      osc.connect(gain).connect(master);
      osc.onended = () => {
        active.delete(osc);
        osc.disconnect();
        gain.disconnect();
      };
      active.add(osc);
      osc.start(start);
      osc.stop(end + 0.02);
    }
  } catch {
    /* playback failed — sound is never essential */
  }
}

export function stopAllSounds() {
  active.forEach((osc) => {
    try {
      osc.stop();
    } catch {
      /* already stopped */
    }
  });
  active.clear();
}

export function setSoundEnabled(enabled: boolean) {
  hydrate();
  settings = { ...settings, enabled, updatedAt: Date.now() };
  if (!enabled) stopAllSounds();
  persist();
  emit();
}

export function setSoundVolume(volume: number) {
  hydrate();
  const v = Math.min(1, Math.max(0, volume));
  settings = { ...settings, volume: v, updatedAt: Date.now() };
  if (master) master.gain.value = v * MASTER_LEVEL;
  persist();
  emit();
}

export function getSoundSettings(): SoundSettings {
  hydrate();
  return settings;
}

export function getServerSoundSettings(): SoundSettings {
  return DEFAULT_SETTINGS;
}

export function subscribeSound(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
