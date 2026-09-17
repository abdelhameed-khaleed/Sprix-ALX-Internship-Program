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

    function measure() {
      if (!listEl) return;
      const containerTop = listEl.getBoundingClientRect().top;
      const height = listEl.getBoundingClientRect().height;
      const nodeYs = itemRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top - containerTop + r.height / 2;
      });
      setMetrics({ nodeYs, height });
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(listEl);
    itemRefs.current.forEach((el) => el && observer.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [weeks.length]);

  return (
    <div className={styles.wrap}>
      <Timeline3D total={weeks.length} activeIndex={activeIndex} />

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
