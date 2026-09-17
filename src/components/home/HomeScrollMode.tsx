"use client";

import { useEffect } from "react";

/**
 * Turns on the stacked-section scroll behaviour (see globals.css, `html[data-stack="on"]`)
 * only while Home is mounted, and always turns it back off on navigation/unmount so inner
 * pages never inherit the Home-only scroll-snap/stacking treatment.
 */
export function HomeScrollMode() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.stack = "on";
    return () => {
      delete root.dataset.stack;
    };
  }, []);

  return null;
}
