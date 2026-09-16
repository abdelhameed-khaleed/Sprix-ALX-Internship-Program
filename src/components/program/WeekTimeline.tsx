import type { Week } from "@/content/program";
import { cx } from "@/components/ui";
import { WeekCard } from "./WeekCard";

type WeekTimelineProps = {
  weeks: Week[];
  currentWeekNumber?: number;
};

export function WeekTimeline({ weeks, currentWeekNumber }: WeekTimelineProps) {
  return (
    <div className="relative">
      {/* Left rail connecting line */}
      <div
        className="absolute top-6 bottom-6 left-3.5 sm:left-4 md:left-5 w-0.5 bg-line"
        aria-hidden="true"
      />

      <ol className="relative space-y-8 pl-8 sm:pl-10 md:pl-12">
        {weeks.map((week) => {
          const isCurrent = currentWeekNumber === week.number;
          const isPast = currentWeekNumber !== undefined && week.number < currentWeekNumber;

          return (
            <li key={week.number} className="relative">
              {/* Timeline node */}
              <div
                aria-hidden="true"
                className={cx(
                  "absolute -left-8 sm:-left-10 md:-left-12 top-6 flex size-7 sm:size-8 md:size-9 items-center justify-center rounded-full border-2 text-xs font-bold sm:text-sm shadow-e1",
                  isCurrent
                    ? "border-blue bg-blue text-white ring-4 ring-sky"
                    : isPast
                      ? "border-green bg-lime text-navy"
                      : "border-line bg-surface text-muted",
                )}
              >
                {week.number}
              </div>

              <WeekCard week={week} isCurrent={isCurrent} isPast={isPast} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
