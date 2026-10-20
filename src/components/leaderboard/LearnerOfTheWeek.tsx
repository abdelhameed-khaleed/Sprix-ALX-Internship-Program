import { Rocket } from "lucide-react";

type LearnerOfTheWeekProps = {
  week: number;
  name: string;
};

/** Spotlight for the learner who made the biggest progress over the last week. */
export function LearnerOfTheWeek({ week, name }: LearnerOfTheWeekProps) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-card border border-sun/50 bg-jasmine p-8 text-center text-navy shadow-e3 sm:flex-row sm:text-left md:p-10">
      <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-sun/40" aria-hidden="true">
        <Rocket className="size-8 text-navy" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center rounded-full bg-navy px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
          Learner of the week · Week {week}
        </span>
        <h3 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">{name}</h3>
        <p className="mt-2 text-base leading-relaxed text-navy/80">
          Made the biggest progress over the last week. Great momentum, keep it going!
        </p>
      </div>
    </div>
  );
}
