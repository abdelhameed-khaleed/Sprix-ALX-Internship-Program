import type { Metadata } from "next";
import { Building2, Clock, Video } from "lucide-react";
import { PageHero, Section, Card, IconTile, cx } from "@/components/ui";
import { CompletionRequirements } from "@/components/sections/CompletionRequirements";
import { site, weeklyCadence } from "@/content/site";
import { weeks } from "@/content/program";
import { getProgramStatus } from "@/lib/current-week";
import { getCairoWeekdayIndex, getWeekProgress } from "@/lib/sessions";
import { WeekTimeline } from "@/components/program/WeekTimeline";
import { UpNext } from "@/components/program/UpNext";
import { ProgramProgress } from "@/components/program/ProgramProgress";
import { Reveal } from "@/components/motion/Reveal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Program",
  description:
    "Explore the 7-week curriculum of the ALX Ã— SPRIX Professional Skills Program, week by week.",
};

const cadenceIconMap = {
  video: Video,
  building: Building2,
  alarm: Clock,
};

/** Sun=0 .. Sat=6 weekday index for each cadence item's day name. */
const CADENCE_DAY_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export default function ProgramPage() {
  const now = new Date();
  const status = getProgramStatus(now);
  const intro = site.description.split(". ")[0] + ".";

  const currentWeekNumber = status.status === "active" ? status.week.number : undefined;

  const progressLabel =
    status.status === "completed"
      ? `Week ${site.totalWeeks} of ${site.totalWeeks} Â· Complete`
      : status.status === "active"
        ? `Week ${status.week.number} of ${site.totalWeeks}`
        : `${site.totalWeeks}-week program`;

  // Weekly rhythm: highlight whichever cadence item (Tue walkthrough / Fri workshop / Sun
  // deadline) is soonest from today, wrapping forward through the Sunâ†’Sat week.
  const todayIndex = getCairoWeekdayIndex(now);
  const cadenceDistance = (day: string) => (((CADENCE_DAY_INDEX[day] ?? 0) - todayIndex + 7) % 7);
  const nearestDistance = Math.min(...weeklyCadence.map((c) => cadenceDistance(c.day)));
  const weekProgress = getWeekProgress(now);

  return (
    <>
      <PageHero
        eyebrow="7-week program"
        title="Your program, week by week"
        intro={intro}
        pattern="/brand/patterns/Group-457.png"
      />

      {/* Up next: live status + program progress */}
      <div className="bg-surface px-4 pt-8 sm:px-6">
        <div className="mx-auto max-w-[1200px] space-y-6">
          <Reveal variant="fade">
            <UpNext initialNow={now.toISOString()} />
          </Reveal>
          <Reveal variant="fade" delay={80}>
            <ProgramProgress
              currentWeek={currentWeekNumber ?? 0}
              completed={status.status === "completed"}
              label={progressLabel}
            />
          </Reveal>
        </div>
      </div>

      {/* Weekly Rhythm Strip */}
      <Section
        id="cadence"
        eyebrow="Weekly rhythm"
        title="Fixed weekly rhythm"
        intro="Repeated every week of the program so you can plan your time with confidence. The item closest to right now is highlighted."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {weeklyCadence.map((cadence, idx) => {
            const CadenceIcon = cadenceIconMap[cadence.icon] ?? Clock;
            const distance = cadenceDistance(cadence.day);
            const isToday = distance === 0;
            const isHighlighted = distance === nearestDistance;

            return (
              <Reveal key={idx} delay={idx * 80}>
                <Card
                  className={cx(
                    "lift flex items-start gap-4 transition-shadow duration-300",
                    isHighlighted && "border-blue! shadow-e3 ring-2 ring-blue/30",
                  )}
                >
                  <IconTile tone={isHighlighted ? "green" : "blue"}>
                    <CadenceIcon className="size-6 text-navy" aria-hidden="true" />
                  </IconTile>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-bold tracking-wider text-muted uppercase">
                        {cadence.day}
                      </p>
                      <div className="flex items-center gap-1.5">
                        {isToday && (
                          <span className="rounded-full bg-lime px-2 py-0.5 text-xs font-bold text-navy">Today</span>
                        )}
                        <span className="rounded bg-surface-alt px-2 py-0.5 text-xs font-semibold text-navy">
                          {cadence.where}
                        </span>
                      </div>
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-navy">{cadence.title}</h3>
                    <p className="mt-1 text-sm font-medium text-ink">{cadence.time}</p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="fade" delay={260}>
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-semibold text-muted">
              <span>Sun</span>
              <span>This week</span>
              <span>Sat</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-blue transition-[width] duration-700"
                style={{ width: `${Math.round(weekProgress * 100)}%` }}
              />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Interactive Week Breakdown */}
      <Section
        id="timeline"
        tone="alt"
        eyebrow="Curriculum"
        title="Your 7-week journey"
        intro="Select any week to pop its details forward: learning outcome, expert session topic, deliverable and this week's session links. Only one week is open at a time, and this week starts expanded."
      >
        <WeekTimeline weeks={weeks} currentWeekNumber={currentWeekNumber} nowIso={now.toISOString()} />
      </Section>

      <CompletionRequirements variant="page" />
    </>
  );
}
