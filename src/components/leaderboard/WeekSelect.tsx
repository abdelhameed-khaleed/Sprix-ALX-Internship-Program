"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/components/ui";
import styles from "./WeekSelect.module.css";

type WeekSelectProps = {
  weeks: number[];
  selectedWeek: number;
};

type PillRect = { left: number; top: number; width: number; height: number };

export function WeekSelect({ weeks, selectedWeek }: WeekSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLAnchorElement>>(new Map());
  const [pillRect, setPillRect] = useState<PillRect | null>(null);

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      const active = itemRefs.current.get(selectedWeek);
      if (!container || !active) return;
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      setPillRect({
        left: activeRect.left - containerRect.left,
        top: activeRect.top - containerRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [selectedWeek, weeks]);

  return (
    <div>
      <span
        id="leaderboard-week-heading"
        className="block text-xs font-bold tracking-wider text-muted uppercase"
      >
        Select week
      </span>
      <div
        ref={containerRef}
        role="group"
        aria-labelledby="leaderboard-week-heading"
        className={cx("mt-2.5 flex flex-wrap gap-2", styles.group)}
      >
        {pillRect && (
          <span
            aria-hidden="true"
            className={cx(styles.pill, "bg-navy shadow-e1")}
            style={{
              transform: `translate(${pillRect.left}px, ${pillRect.top}px)`,
              width: pillRect.width,
              height: pillRect.height,
            }}
          />
        )}
        {weeks.map((week) => {
          const isActive = week === selectedWeek;
          return (
            <Link
              key={week}
              href={`/leaderboard?week=${week}`}
              aria-current={isActive ? "true" : undefined}
              ref={(el) => {
                if (el) itemRefs.current.set(week, el);
                else itemRefs.current.delete(week);
              }}
              className={cx(
                "relative z-10 inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none",
                isActive
                  ? "text-white"
                  : "border border-line bg-surface-alt text-navy hover:border-blue/40 hover:bg-sky",
              )}
            >
              Week {week}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
