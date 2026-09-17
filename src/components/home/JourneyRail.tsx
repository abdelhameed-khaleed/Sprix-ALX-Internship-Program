import { Trophy } from "lucide-react";
import { ButtonLink, Badge, cx } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { weeks } from "@/content/program";
import { getProgramStatus, formatWeekDate } from "@/lib/current-week";
import { StackSection } from "./StackSection";

export function JourneyRail() {
  const status = getProgramStatus();
  const currentWeekNumber = status.status === "active" ? status.week.number : undefined;

  return (
    <StackSection id="journey" tone="white" index={4} className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-3 text-sm font-semibold tracking-wide text-blue uppercase">The full picture</p>
          <h2 className="text-3xl md:text-4xl">Your 7-week journey</h2>
        </header>

        {/* Horizontal rail on md+ */}
        <div className="hidden md:block">
          <div className="relative">
            <div aria-hidden="true" className="absolute top-6 right-0 left-0 h-px bg-line" />
            <ol className="relative grid grid-cols-7 gap-2">
              {weeks.map((w, idx) => {
                const isCurrent = currentWeekNumber === w.number;
                return (
                  <Reveal key={w.number} as="li" variant="scale" delay={idx * 90} className="flex flex-col items-center">
                    <span
                      className={cx(
                        "relative z-10 flex size-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-all",
                        isCurrent
                          ? "border-blue bg-blue text-white shadow-e2 ring-4 ring-blue/20"
                          : w.isFinal
                            ? "border-sun bg-jasmine text-navy"
                            : "border-line bg-white text-navy",
                      )}
                    >
                      {w.isFinal ? <Trophy className="size-5" aria-hidden /> : `W${w.number}`}
                    </span>
                    <p className="mt-3 text-center text-xs font-semibold text-navy">{w.label}</p>
                    <p className="mt-1 text-center text-[11px] text-muted">{formatWeekDate(w.startDate)}</p>
                    {isCurrent && (
                      <span className="mt-2">
                        <Badge tone="blue">This week</Badge>
                      </span>
                    )}
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Vertical list on mobile */}
        <ol className="flex flex-col gap-3 md:hidden">
          {weeks.map((w, idx) => {
            const isCurrent = currentWeekNumber === w.number;
            return (
              <Reveal key={w.number} as="li" variant="left" delay={idx * 60}>
                <div
                  className={cx(
                    "flex items-center justify-between rounded-card border p-4",
                    isCurrent ? "border-blue bg-icy shadow-e2" : "border-line bg-surface shadow-e1",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cx(
                        "flex size-10 shrink-0 items-center justify-center rounded-button text-sm font-bold",
                        w.isFinal ? "bg-jasmine text-navy" : "bg-navy text-white",
                      )}
                    >
                      {w.isFinal ? <Trophy className="size-5" aria-hidden /> : `W${w.number}`}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy">{w.label}</p>
                      <p className="text-xs text-muted">{formatWeekDate(w.startDate)}</p>
                    </div>
                  </div>
                  {isCurrent && <Badge tone="blue">This week</Badge>}
                </div>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-10 text-center">
          <ButtonLink href="/program" variant="primary">
            See the full program
          </ButtonLink>
        </div>
      </div>
    </StackSection>
  );
}
