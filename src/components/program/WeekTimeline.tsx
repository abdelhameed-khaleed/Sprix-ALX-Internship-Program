"use client";

import { useState } from "react";
import type { Week } from "@/content/program";
import { Timeline3D } from "./Timeline3D";
import { WeekCard } from "./WeekCard";
import styles from "./WeekTimeline.module.css";

type WeekTimelineProps = {
  weeks: Week[];
  currentWeekNumber?: number;
};

/**
 * Interactive week breakdown: a foreground stack of "popping" week cards (only one
 * expanded at a time) over a decorative 3D animated timeline background. Both layers
 * share the active-week state so the background scene reacts to the selection.
 */
export function WeekTimeline({ weeks, currentWeekNumber }: WeekTimelineProps) {
  const [activeWeek, setActiveWeek] = useState<number>(currentWeekNumber ?? weeks[0]?.number ?? 1);
  const activeIndex = Math.max(
    0,
    weeks.findIndex((w) => w.number === activeWeek),
  );

  return (
    <div className={styles.wrap}>
      <Timeline3D total={weeks.length} activeIndex={activeIndex} />

      <ol className={styles.list}>
        {weeks.map((week) => {
          const isExpanded = activeWeek === week.number;
          const isCurrent = currentWeekNumber === week.number;
          const isPast = currentWeekNumber !== undefined && week.number < currentWeekNumber;

          return (
            <li key={week.number}>
              <WeekCard
                week={week}
                isExpanded={isExpanded}
                isCurrent={isCurrent}
                isPast={isPast}
                onActivate={() => setActiveWeek(week.number)}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
