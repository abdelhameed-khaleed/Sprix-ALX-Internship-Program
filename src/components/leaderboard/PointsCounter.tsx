"use client";

import { useEffect, useRef, useState } from "react";

type PointsCounterProps = {
  value: number;
  /** Starts the count-up once true (e.g. when the podium scrolls into view). */
  play: boolean;
  durationMs?: number;
  className?: string;
};

/**
 * Counts up from 0 to `value` once `play` becomes true, then holds. Renders the final
 * value immediately for `prefers-reduced-motion: reduce` and for no-JS/SSR output.
 */
export function PointsCounter({ value, play, durationMs = 900, className }: PointsCounterProps) {
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!play || started.current) return;
    started.current = true;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    setDisplay(0);
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play, value, durationMs]);

  return <span className={className}>{display}</span>;
}
