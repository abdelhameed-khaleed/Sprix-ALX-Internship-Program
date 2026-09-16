import Link from "next/link";
import { cx } from "@/components/ui";

type WeekSelectProps = {
  weeks: number[];
  selectedWeek: number;
};

export function WeekSelect({ weeks, selectedWeek }: WeekSelectProps) {
  return (
    <div>
      <span
        id="leaderboard-week-heading"
        className="block text-xs font-bold tracking-wider text-muted uppercase"
      >
        Select week
      </span>
      <div
        role="group"
        aria-labelledby="leaderboard-week-heading"
        className="mt-2.5 flex flex-wrap gap-2"
      >
        {weeks.map((week) => {
          const isActive = week === selectedWeek;
          return (
            <Link
              key={week}
              href={`/leaderboard?week=${week}`}
              aria-current={isActive ? "true" : undefined}
              className={cx(
                "inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none",
                isActive
                  ? "bg-navy text-white shadow-e1"
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
