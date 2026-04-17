"use client";

import type { ComponentType } from "react";
import { useThemeChoice } from "@/context/ThemeContext";
import type { Theme, ThemableComponent } from "@/types/theme";

export type ThemeVariants<P extends object> = Partial<
  Record<Theme, ComponentType<P>>
> & {
  /** Required fallback rendered when a variant is missing. */
  default: ComponentType<P>;
};

type ThemedSlotProps<P extends object> = {
  component: ThemableComponent;
  variants: ThemeVariants<P>;
  /** Props forwarded to the resolved variant. */
  forward: P;
};

/**
 * Swaps implementations based on the resolved theme for a given component.
 * Falls back to `variants.default` when the active theme has no variant.
 */
export function ThemedSlot<P extends object>({
  component,
  variants,
  forward,
}: ThemedSlotProps<P>) {
  const theme = useThemeChoice(component);
  const Resolved = variants[theme] ?? variants.default;
  return <Resolved {...forward} />;
}

/**
 * Factory that returns a pre-bound themed component. Use this when the call
 * site only needs to pass props, not the variant map.
 */
export function createThemedSlot<P extends object>(
  component: ThemableComponent,
  variants: ThemeVariants<P>,
) {
  function Themed(props: P) {
    return <ThemedSlot component={component} variants={variants} forward={props} />;
  }
  Themed.displayName = `Themed(${component})`;
  return Themed;
}
