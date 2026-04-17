"use client";

import { useEffect, useState } from "react";

/** Live clock that ticks every second. */
export function useClock() {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const tick = () => setNow(new Date());
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);
  return now;
}
