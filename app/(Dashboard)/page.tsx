"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemePicker } from "@/components/desktop/ThemePicker/ThemePicker";
import { ThemedLockScreen } from "@/components/desktop/LockScreen";
import { useTheme } from "@/context/ThemeContext";
import { useClock } from "@/hooks/useClock";

/**
 * Root route. Shows the theme picker on first visit, then the lock screen.
 */
export default function Root() {
  const { hydrated } = useTheme();
  const [pickerDone, setPickerDone] = useState(false);

  if (!hydrated) return null;
  if (!pickerDone) {
    return <ThemePicker onDone={() => setPickerDone(true)} />;
  }
  return <LockScreen />;
}

function LockScreen() {
  const router = useRouter();
  const now = useClock();
  const [signingIn, setSigningIn] = useState(false);
  const [stage, setStage] = useState<"lock" | "signin">("lock");

  useEffect(() => {
    if (stage !== "lock") return;
    const handle = (e: KeyboardEvent | MouseEvent) => {
      if ("key" in e && e.key === "Escape") return;
      setStage("signin");
    };
    window.addEventListener("keydown", handle);
    window.addEventListener("click", handle);
    return () => {
      window.removeEventListener("keydown", handle);
      window.removeEventListener("click", handle);
    };
  }, [stage]);

  async function boot() {
    setSigningIn(true);
    await new Promise((r) => setTimeout(r, 1400));
    router.push("/desktop");
  }

  return (
    <ThemedLockScreen
      stage={stage}
      signingIn={signingIn}
      now={now}
      onSignIn={boot}
    />
  );
}
