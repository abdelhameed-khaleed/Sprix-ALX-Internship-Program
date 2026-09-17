"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cx } from "@/components/ui";
import type { WeekActivationKind } from "./WeekCard";
import styles from "./RocketPath.module.css";

const GRADIENT_ID = "program-rocket-gradient";
const CLIP_ID = "program-rocket-clip";
const HOVER_DEBOUNCE_MS = 250;
const WAVELENGTH = 190;

type RocketPathProps = {
  activeIndex: number;
  activationKind: WeekActivationKind;
  /** Y position (px) of each week node, relative to the rail's own top edge. */
  nodeYs: number[];
  /** Rail height (px), i.e. the height of the week list it runs alongside. */
  height: number;
};

function easeInOutCubic(p: number): number {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Decorative wavy rail beside the week list, with a small rocket that travels to the
 * active week's node. Purely presentational (aria-hidden, pointer-events: none) — it
 * mirrors WeekTimeline's `activeIndex` state but never drives it.
 */
export function RocketPath({ activeIndex, activationKind, nodeYs, height }: RocketPathProps) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setCompact(mq.matches);
    const onChange = () => setCompact(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const amplitude = compact ? 5 : 12;
  const laneWidth = compact ? 26 : 40;
  const centerX = laneWidth / 2;

  const xAt = useCallback(
    (y: number) => centerX + amplitude * Math.sin((y / WAVELENGTH) * Math.PI * 2),
    [centerX, amplitude],
  );

  const safeHeight = Math.max(height, 1);
  const pathD = useMemo(() => {
    const step = 6;
    const points: string[] = [];
    for (let y = 0; y <= safeHeight; y += step) {
      points.push(`${xAt(y).toFixed(2)} ${y.toFixed(1)}`);
    }
    if (safeHeight % step !== 0) points.push(`${xAt(safeHeight).toFixed(2)} ${safeHeight.toFixed(1)}`);
    return `M ${points.join(" L ")}`;
  }, [safeHeight, xAt]);

  const rocketRef = useRef<SVGGElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const rafRef = useRef<number | null>(null);
  const debounceRef = useRef<number | null>(null);
  const prevIndexRef = useRef(activeIndex);
  const dirRef = useRef(1);
  const [traveling, setTraveling] = useState(false);

  const place = useCallback(
    (y: number) => {
      const x = xAt(y);
      const dy = 1 * dirRef.current;
      const dx = (xAt(y + 1) - xAt(y - 1)) * dirRef.current;
      const angle = Math.atan2(dx, dy) * (180 / Math.PI);
      rocketRef.current?.setAttribute("transform", `translate(${x} ${y}) rotate(${angle})`);
      clipRectRef.current?.setAttribute("height", String(Math.max(0, y)));
    },
    [xAt],
  );

  useEffect(() => {
    if (nodeYs.length === 0) return;
    const from = prevIndexRef.current;
    const to = Math.min(activeIndex, nodeYs.length - 1);

    if (from === to) {
      place(nodeYs[to] ?? 0);
      return;
    }

    function launch() {
      dirRef.current = to > from ? 1 : -1;
      prevIndexRef.current = to;
      const toY = nodeYs[to] ?? 0;

      if (prefersReducedMotion()) {
        place(toY);
        return;
      }

      const fromY = nodeYs[from] ?? 0;
      const steps = Math.max(1, Math.abs(to - from));
      const duration = Math.min(1400, 900 + (steps - 1) * 150);
      const start = performance.now();
      setTraveling(true);

      function frame(now: number) {
        const p = Math.min(1, (now - start) / duration);
        place(fromY + (toY - fromY) * easeInOutCubic(p));
        if (p < 1) {
          rafRef.current = requestAnimationFrame(frame);
        } else {
          rafRef.current = null;
          setTraveling(false);
        }
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(frame);
    }

    if (activationKind === "click") {
      launch();
    } else {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(launch, HOVER_DEBOUNCE_MS);
    }

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [activeIndex, activationKind, nodeYs, place]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    },
    [],
  );

  return (
    <div className={styles.rail}>
      <svg
        className={cx(styles.svg, traveling && styles.traveling)}
        viewBox={`0 0 ${laneWidth} ${safeHeight}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0452F0" />
            <stop offset="50%" stopColor="#5F3DC4" />
            <stop offset="100%" stopColor="#02B75E" />
          </linearGradient>
          <clipPath id={CLIP_ID}>
            <rect ref={clipRectRef} x="0" y="0" width={laneWidth} height={0} />
          </clipPath>
        </defs>

        <path d={pathD} className={styles.trailFaint} />
        <path d={pathD} className={styles.trailProgress} clipPath={`url(#${CLIP_ID})`} />

        {nodeYs.map((y, i) => (
          <circle key={i} cx={xAt(y)} cy={y} r={i === activeIndex ? 5 : 3.5} className={i <= activeIndex ? styles.nodeDone : styles.nodeUpcoming} />
        ))}

        <g ref={rocketRef} className={styles.rocket}>
          {/* Simple original rocket glyph: navy body, white window, blue/purple fins, jasmine/sun flame. */}
          <path className={styles.flame} d="M0 5 L-2.4 11 Q0 15 2.4 11 Z" fill="#FDE791" />
          <path d="M0 5 L-1.6 9 Q0 11.5 1.6 9 Z" fill="#EAB308" />
          <path d="M-3.6 3 L-6 8 L-2.6 6 Z" fill="#5F3DC4" />
          <path d="M3.6 3 L6 8 L2.6 6 Z" fill="#0452F0" />
          <path d="M0 -9 C4 -6 4.4 1 3 5 L-3 5 C-4.4 1 -4 -6 0 -9 Z" fill="#03134F" />
          <circle cx="0" cy="-3" r="1.6" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
