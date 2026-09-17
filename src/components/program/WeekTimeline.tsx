"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Week } from "@/content/program";
import { Timeline3D } from "./Timeline3D";
import { WeekCard, type WeekActivationKind } from "./WeekCard";
import { RocketPath } from "./RocketPath";
import styles from "./WeekTimeline.module.css";

type WeekTimelineProps = {
  weeks: Week[];
  currentWeekNumber?: number;
  /** ISO snapshot of "now", taken once on the server so session state can't mismatch on hydration. */
  nowIso: string;
};

type RailMetrics = { nodeYs: number[]; height: number };

/**
 * Interactive week breakdown: a foreground stack of "popping" week cards (only one
 * expanded at a time) over a decorative 3D animated timeline background, with a wavy
 * rocket rail alongside that travels to whichever week is active. All three layers share
 * the active-week state so they react together to the selection.
 */
export function WeekTimeline({ weeks, currentWeekNumber, nowIso }: WeekTimelineProps) {
  const now = useMemo(() => new Date(nowIso), [nowIso]);
  const [activeWeek, setActiveWeek] = useState<number>(currentWeekNumber ?? weeks[0]?.number ?? 1);
  const [activationKind, setActivationKind] = useState<WeekActivationKind>("click");
  const activeIndex = Math.max(
    0,
    weeks.findIndex((w) => w.number === activeWeek),
  );

  function handleActivate(weekNumber: number, kind: WeekActivationKind) {
    setActiveWeek(weekNumber);
    setActivationKind(kind);
  }

  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [metrics, setMetrics] = useState<RailMetrics>({ nodeYs: [], height: 0 });

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    // Card expand/collapse fires ResizeObserver on every animation frame; batch reads into one
    // rAF and skip re-rendering the timeline when nothing moved by a whole pixel.
    let rafId = 0;
    function measure() {
      if (!listEl) return;
      const listRect = listEl.getBoundingClientRect();
      const nodeYs = itemRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return Math.round(r.top - listRect.top + r.height / 2);
      });
      const height = Math.round(listRect.height);
      setMetrics((prev) =>
        prev.height === height && prev.nodeYs.length === nodeYs.length && prev.nodeYs.every((y, i) => y === nodeYs[i])
          ? prev
          : { nodeYs, height },
      );
    }
    function scheduleMeasure() {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        measure();
      });
    }

    measure();
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(listEl);
    itemRefs.current.forEach((el) => el && observer.observe(el));
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [weeks.length]);

  // Pause the 3D background loops while the timeline is off-screen.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offscreen, setOffscreen] = useState(true);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <Timeline3D total={weeks.length} activeIndex={activeIndex} paused={offscreen} />

      <div className={styles.row}>
        <RocketPath
          activeIndex={activeIndex}
          activationKind={activationKind}
          nodeYs={metrics.nodeYs}
          height={metrics.height}
        />

        <ol ref={listRef} className={styles.list}>
          {weeks.map((week, i) => {
            const isExpanded = activeWeek === week.number;
            const isCurrent = currentWeekNumber === week.number;
            const isPast = currentWeekNumber !== undefined && week.number < currentWeekNumber;

            return (
              <li
                key={week.number}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
              >
                <WeekCard
                  week={week}
                  isExpanded={isExpanded}
                  isCurrent={isCurrent}
                  isPast={isPast}
                  now={now}
                  onActivate={(kind) => handleActivate(week.number, kind)}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
