"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_CHOICES,
  DEFAULT_THEME,
  THEMABLE_COMPONENTS,
  THEMES,
  buildPresetChoices,
  type Theme,
  type ThemableComponent,
  type ThemeChoices,
  type ThemeMode,
  type ThemeState,
} from "@/types/theme";
import { THEME_TOKENS, type ThemeTokens } from "@/lib/theme-tokens";

type ThemeContextValue = {
  mode: ThemeMode;
  preset: Theme;
  choices: ThemeChoices;
  /** True once the persisted state has been read from localStorage. */
  hydrated: boolean;
  /** True when the user has no saved choice yet (first visit). */
  firstRun: boolean;
  setPreset: (theme: Theme) => void;
  setChoice: (component: ThemableComponent, theme: Theme) => void;
  setChoices: (choices: ThemeChoices) => void;
  setMode: (mode: ThemeMode) => void;
  reset: () => void;
  /** Resolve the active theme for a given component (respects custom mode). */
  resolve: (component: ThemableComponent) => Theme;
  /** Tokens for a resolved theme. */
  tokensFor: (component: ThemableComponent) => ThemeTokens;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "portfolio-theme";

const DEFAULT_STATE: ThemeState = {
  mode: "preset",
  preset: DEFAULT_THEME,
  choices: DEFAULT_CHOICES,
};

function isTheme(v: unknown): v is Theme {
  return typeof v === "string" && (THEMES as readonly string[]).includes(v);
}

function parseStored(raw: string | null): ThemeState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ThemeState> | null;
    if (!parsed || typeof parsed !== "object") return null;
    const preset = isTheme(parsed.preset) ? parsed.preset : DEFAULT_THEME;
    const mode: ThemeMode = parsed.mode === "custom" ? "custom" : "preset";
    const choices: ThemeChoices = { ...buildPresetChoices(preset) };
    if (parsed.choices && typeof parsed.choices === "object") {
      for (const key of THEMABLE_COMPONENTS) {
        const v = (parsed.choices as Record<string, unknown>)[key];
        if (isTheme(v)) choices[key] = v;
      }
    }
    return { mode, preset, choices };
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ThemeState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [firstRun, setFirstRun] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = parseStored(raw);
      if (parsed) {
        setState(parsed);
      } else {
        setFirstRun(true);
      }
    } catch {
      setFirstRun(true);
    } finally {
      setHydrated(true);
    }
  }, []);

  const persist = useCallback((next: ThemeState) => {
    setState(next);
    setFirstRun(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const setPreset = useCallback(
    (theme: Theme) => {
      persist({
        mode: "preset",
        preset: theme,
        choices: buildPresetChoices(theme),
      });
    },
    [persist],
  );

  const setChoice = useCallback(
    (component: ThemableComponent, theme: Theme) => {
      setState((prev) => {
        const nextChoices = { ...prev.choices, [component]: theme };
        const next: ThemeState = {
          mode: "custom",
          preset: prev.preset,
          choices: nextChoices,
        };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        setFirstRun(false);
        return next;
      });
    },
    [],
  );

  const setChoices = useCallback(
    (choices: ThemeChoices) => {
      persist({ mode: "custom", preset: state.preset, choices });
    },
    [persist, state.preset],
  );

  const setMode = useCallback(
    (mode: ThemeMode) => {
      if (mode === "preset") {
        persist({
          mode,
          preset: state.preset,
          choices: buildPresetChoices(state.preset),
        });
      } else {
        persist({ mode, preset: state.preset, choices: state.choices });
      }
    },
    [persist, state.preset, state.choices],
  );

  const reset = useCallback(() => {
    persist(DEFAULT_STATE);
  }, [persist]);

  const resolve = useCallback(
    (component: ThemableComponent): Theme => {
      return state.mode === "custom" ? state.choices[component] : state.preset;
    },
    [state.mode, state.preset, state.choices],
  );

  const tokensFor = useCallback(
    (component: ThemableComponent) => THEME_TOKENS[resolve(component)],
    [resolve],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode: state.mode,
      preset: state.preset,
      choices: state.choices,
      hydrated,
      firstRun,
      setPreset,
      setChoice,
      setChoices,
      setMode,
      reset,
      resolve,
      tokensFor,
    }),
    [
      state.mode,
      state.preset,
      state.choices,
      hydrated,
      firstRun,
      setPreset,
      setChoice,
      setChoices,
      setMode,
      reset,
      resolve,
      tokensFor,
    ],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

export function useThemeChoice(component: ThemableComponent): Theme {
  const { resolve } = useTheme();
  return resolve(component);
}

export function useThemeTokens(component: ThemableComponent): ThemeTokens {
  const { tokensFor } = useTheme();
  return tokensFor(component);
}
