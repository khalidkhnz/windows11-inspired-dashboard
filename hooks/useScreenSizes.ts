"use client";

import { useState, useEffect } from "react";

// TailwindCSS breakpoints
const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  xxl: "(min-width: 1536px)",
};

export default function useTailwindScreenSize() {
  const [screenSize, setScreenSize] = useState({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  useEffect(() => {
    const mediaQueryLists = {
      sm: window.matchMedia(breakpoints.sm),
      md: window.matchMedia(breakpoints.md),
      lg: window.matchMedia(breakpoints.lg),
      xl: window.matchMedia(breakpoints.xl),
      xxl: window.matchMedia(breakpoints.xxl),
    };

    const handleMediaChange = () => {
      setScreenSize({
        sm: mediaQueryLists.sm.matches,
        md: mediaQueryLists.md.matches,
        lg: mediaQueryLists.lg.matches,
        xl: mediaQueryLists.xl.matches,
        xxl: mediaQueryLists.xxl.matches,
      });
    };

    // Listen to changes
    Object.values(mediaQueryLists).forEach((mql) =>
      mql.addEventListener("change", handleMediaChange),
    );

    // Set the initial values
    handleMediaChange();

    // Cleanup event listeners on component unmount
    return () => {
      Object.values(mediaQueryLists).forEach((mql) =>
        mql.removeEventListener("change", handleMediaChange),
      );
    };
  }, []);

  return screenSize;
}
