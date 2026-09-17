import type { CSSProperties } from "react";
import { cx } from "@/components/ui";
import { site } from "@/content/site";
import styles from "./ProgramProgress.module.css";

type ProgramProgressProps = {
  /** 0 before the program starts, 1..totalWeeks while active. Ignored once `completed`. */
  currentWeek: number;
  completed?: boolean;
  label: string;
};

/** "Week N of 7" summary: an animated fill bar plus one dot per week (server-rendered, no JS needed). */
export function ProgramProgress({ currentWeek, completed = false, label }: ProgramProgressProps) {
  const total = site.totalWeeks;
  const effectiveWeek = completed ? total : Math.max(0, Math.min(currentWeek, total));
  const fillPct = Math.round((effectiveWeek / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-navy">{label}</p>
        <p className="text-sm font-semibold text-muted">{fillPct}%</p>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line">
        <div className={styles.fill} style={{ "--target-width": `${fillPct}%` } as CSSProperties} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => i + 1).map((week) => {
          const isPast = completed || week < currentWeek;
          const isCurrent = !completed && week === currentWeek;

          if (isCurrent) {
            return (
              <span key={week} className="relative inline-flex size-2.5" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-blue" />
              </span>
            );
          }
          return (
            <span
              key={week}
              aria-hidden="true"
              className={cx("size-2.5 rounded-full", isPast ? "bg-blue" : "border border-line bg-white")}
            />
          );
        })}
      </div>
    </div>
  );
}
