"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkReducedMotion = () => {
      // 1. Check manual override in localStorage
      const savedOverride = localStorage.getItem("carelife-reduced-motion");
      if (savedOverride !== null) {
        return savedOverride === "true";
      }
      // 2. Check system preferences
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      return mediaQuery.matches;
    };

    setReducedMotion(checkReducedMotion());

    const handleSystemChange = () => {
      setReducedMotion(checkReducedMotion());
    };

    const handleCustomChange = () => {
      setReducedMotion(checkReducedMotion());
    };

    // Listen to system changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", handleSystemChange);

    // Listen to our custom toggle changes
    window.addEventListener("carelife-reduced-motion-changed", handleCustomChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("carelife-reduced-motion-changed", handleCustomChange);
    };
  }, []);

  return reducedMotion;
}
