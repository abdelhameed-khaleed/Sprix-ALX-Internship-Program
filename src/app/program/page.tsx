import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Presentation,
  Sparkles,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import { PageHero, Section, Card, IconTile } from "@/components/ui";
import { site, weeklyCadence, completionRequirements } from "@/content/site";
import { weeks } from "@/content/program";
import { getProgramStatus, formatWeekDate } from "@/lib/current-week";
import { WeekTimeline } from "@/components/program/WeekTimeline";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Program",
  description:
    "Explore the 7-week curriculum of the ALX × SPRIX Professional Skills Program, week by week.",
};

const cadenceIconMap = {
  video: Video,
  building: Building2,
  alarm: Clock,
};

const requirementIconMap = {
  verified: CheckCircle2,
  users: Users,
  presentation: Presentation,
};

export default function ProgramPage() {
  const status = getProgramStatus();
  const intro = site.description.split(". ")[0] + ".";

  const currentWeekNumber = status.status === "active" ? status.week.number : undefined;

  return (
    <>
      <PageHero
        eyebrow="7-week program"
        title="Your program, week by week"
        intro={intro}
        pattern="/brand/patterns/Group-457.png"
      />

      {/* Cohort Status Banner */}
      <div className="bg-surface px-4 pt-8 sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          {status.status === "upcoming" && (
            <div className="flex items-center gap-3 rounded-card border border-line bg-sky p-4 text-navy shadow-e1 sm:p-5">
              <Calendar className="size-5 shrink-0 text-blue" aria-hidden="true" />
              <p className="text-base font-semibold">
                Program starts {formatWeekDate(status.startsOn)}
              </p>
            </div>
          )}

          {status.status === "active" && (
            <div className="flex flex-col items-start justify-between gap-3 rounded-card border border-line bg-sky p-4 text-navy shadow-e1 sm:flex-row sm:items-center sm:p-5">
              <div className="flex items-center gap-3">
                <Sparkles className="size-5 shrink-0 text-blue" aria-hidden="true" />
                <p className="text-base font-semibold">
                  You&apos;re in Week {status.week.number}: {status.week.label}
                </p>
              </div>
              <a
                href={`#week-${status.week.number}`}
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-blue hover:text-blue-dark hover:underline"
              >
                Jump to this week <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          )}

          {status.status === "completed" && (
            <div className="flex items-center gap-3 rounded-card border border-line bg-sky p-4 text-navy shadow-e1 sm:p-5">
              <Trophy className="size-5 shrink-0 text-sun" aria-hidden="true" />
              <p className="text-base font-semibold">
                Program completed. Congratulations, graduates!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Weekly Rhythm Strip */}
      <Section
        id="cadence"
        eyebrow="Weekly rhythm"
        title="Fixed weekly rhythm"
        intro="Repeated every week of the program so you can plan your time with confidence."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {weeklyCadence.map((cadence, idx) => {
            const CadenceIcon = cadenceIconMap[cadence.icon] ?? Clock;
            return (
              <Card key={idx} className="flex items-start gap-4">
                <IconTile tone="blue">
                  <CadenceIcon className="size-6 text-navy" aria-hidden="true" />
                </IconTile>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-xs font-bold tracking-wider text-muted uppercase">
                      {cadence.day}
                    </p>
                    <span className="rounded bg-surface-alt px-2 py-0.5 text-xs font-semibold text-navy">
                      {cadence.where}
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-navy">{cadence.title}</h3>
                  <p className="mt-1 text-sm font-medium text-ink">{cadence.time}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Vertical Timeline */}
      <Section
        id="timeline"
        tone="alt"
        eyebrow="Curriculum"
        title="Your 7-week journey"
        intro="Click on any week to expand its learning outcomes, expert session topic, and expected deliverables."
      >
        <WeekTimeline weeks={weeks} currentWeekNumber={currentWeekNumber} />
      </Section>

      {/* Completion Requirements */}
      <Section
        id="completion-requirements"
        eyebrow="Graduation"
        title="Completion requirements"
        intro="To graduate and receive your Certificate of Completion, you must fulfill all three requirements."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {completionRequirements.map((req, idx) => {
            const ReqIcon = requirementIconMap[req.icon] ?? CheckCircle2;
            return (
              <Card key={idx} className="flex flex-col justify-between">
                <div>
                  <IconTile tone="green">
                    <ReqIcon className="size-6 text-navy" aria-hidden="true" />
                  </IconTile>
                  <h3 className="mt-4 text-xl font-bold text-navy">{req.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{req.detail}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}
