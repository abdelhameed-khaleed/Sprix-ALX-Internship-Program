import Link from "next/link";
import Image from "next/image";
import {
  Laptop,
  ClipboardList,
  Video,
  Landmark,
  Handshake,
  AlarmClock,
  Trophy,
  BadgeCheck,
  Users,
  Presentation,
} from "lucide-react";
import { Section, Card, Badge, IconTile, EmptyState, ButtonLink, cx } from "@/components/ui";
import {
  site,
  learningModes,
  weeklyCadence,
  completionRequirements,
  outcomes,
  type LearningModeIcon,
  type CadenceIcon,
  type RequirementIcon,
} from "@/content/site";
import { weeks } from "@/content/program";
import { getProgramStatus, formatWeekDate } from "@/lib/current-week";
import { getLeaderboard } from "@/lib/leaderboard";

export const revalidate = 3600;

const learningModeIcons: Record<
  LearningModeIcon,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>
> = {
  laptop: Laptop,
  clipboard: ClipboardList,
  video: Video,
  building: Landmark,
  handshake: Handshake,
};

const cadenceIcons: Record<
  CadenceIcon,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>
> = {
  video: Video,
  building: Landmark,
  alarm: AlarmClock,
};

const requirementIcons: Record<
  RequirementIcon,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>
> = {
  verified: BadgeCheck,
  users: Users,
  presentation: Presentation,
};

export default async function HomePage() {
  const status = getProgramStatus();
  const leaderboard = await getLeaderboard();

  let heroEyebrow = "Starts Sun, 20 Sep";
  if (status.status === "upcoming") {
    heroEyebrow = `Starts ${formatWeekDate(status.startsOn)}`;
  } else if (status.status === "active") {
    heroEyebrow = `Now in Week ${status.week.number} · ${status.week.label}`;
  } else if (status.status === "completed") {
    heroEyebrow = "Program completed";
  }

  const latestWeek =
    leaderboard.status === "ok" && leaderboard.weeks.length > 0
      ? leaderboard.weeks[leaderboard.weeks.length - 1]
      : undefined;
  const topPerformers =
    leaderboard.status === "ok" && latestWeek
      ? (leaderboard.byWeek[latestWeek] ?? []).slice(0, 3)
      : [];

  return (
    <>
      {/* 5.a Hero Section */}
      <section className="relative overflow-hidden bg-navy px-4 py-16 text-white sm:px-6 md:py-24 lg:py-32">
        <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 inline-flex items-center rounded-full border border-icy/30 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide uppercase text-icy">
              {heroEyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white! sm:text-5xl lg:text-6xl">
              {site.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
              {site.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/program" variant="inverse">
                Explore the program
              </ButtonLink>
              <Link
                href="/leaderboard"
                className="inline-flex min-h-11 items-center justify-center rounded-button border-2 border-white px-5 py-2.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                This week&#39;s top performers
              </Link>
            </div>
          </div>

          <div className="relative hidden justify-center md:flex lg:col-span-5 lg:justify-end">
            <div className="relative h-[300px] w-[300px] lg:h-[340px] lg:w-[340px]">
              <Image
                src="/brand/patterns/Group-459.png"
                alt=""
                aria-hidden="true"
                width={260}
                height={260}
                className="absolute top-0 right-0 size-56 rounded-card object-cover opacity-90 shadow-e2 select-none"
              />
              <Image
                src="/brand/patterns/Group-407.png"
                alt=""
                aria-hidden="true"
                width={200}
                height={200}
                className="absolute bottom-0 left-0 size-48 rounded-card object-cover opacity-80 shadow-e3 select-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5.b The ALX Special Sauce */}
      <Section
        id="special-sauce"
        title="The ALX Special Sauce"
        intro={site.description}
        tone="white"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {outcomes.map((outcome, idx) => (
            <Card key={outcome.title} className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue">
                  0{idx + 1}
                </span>
                <h3 className="mt-3 text-xl font-bold text-navy">{outcome.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{outcome.detail}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5.c How you'll learn */}
      <Section id="how-you-learn" title="How you&#39;ll learn" tone="alt">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {learningModes.map((mode) => {
            const Icon = learningModeIcons[mode.icon];
            return (
              <Card key={mode.title} className="flex flex-col items-start">
                <IconTile tone="blue">
                  <Icon className="size-6 text-navy" aria-hidden="true" />
                </IconTile>
                <h3 className="mt-4 text-lg font-bold text-navy">{mode.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{mode.detail}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* 5.d Your weekly rhythm */}
      <Section id="weekly-rhythm" title="Your weekly rhythm" tone="white">
        <div className="grid gap-6 md:grid-cols-3">
          {weeklyCadence.map((item) => {
            const Icon = cadenceIcons[item.icon];
            return (
              <Card key={item.title} className="flex flex-col justify-between">
                <div>
                  <IconTile tone="blue">
                    <Icon className="size-6 text-navy" aria-hidden="true" />
                  </IconTile>
                  <div className="mt-6">
                    <p className="text-2xl font-light tracking-tight text-navy sm:text-3xl">
                      {item.day} · {item.time}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      Location: <span className="font-semibold text-ink">{item.where}</span>
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* 5.e Your 7-week journey */}
      <Section id="journey" title="Your 7-week journey" tone="alt">
        {/* Horizontal stepper on md+ */}
        <div className="hidden md:grid md:grid-cols-7 gap-3">
          {weeks.map((w) => {
            const isCurrent = status.status === "active" && status.week.number === w.number;
            return (
              <div
                key={w.number}
                className={cx(
                  "flex min-h-[160px] flex-col justify-between rounded-card border p-4 transition-all",
                  isCurrent
                    ? "border-blue bg-icy shadow-e2 ring-2 ring-blue/20"
                    : "border-line bg-surface shadow-e1 hover:shadow-e2"
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-navy">W{w.number}</span>
                    {w.isFinal && (
                      <Trophy className="size-4 shrink-0 text-sun" aria-hidden="true" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted">{formatWeekDate(w.startDate)}</p>
                  <p className="mt-3 text-sm font-semibold leading-snug text-navy">{w.label}</p>
                </div>
                {isCurrent && (
                  <div className="mt-3">
                    <Badge tone="blue">This week</Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vertical list on mobile (< md) */}
        <div className="flex flex-col gap-3 md:hidden">
          {weeks.map((w) => {
            const isCurrent = status.status === "active" && status.week.number === w.number;
            return (
              <div
                key={w.number}
                className={cx(
                  "flex items-center justify-between rounded-card border p-4",
                  isCurrent ? "border-blue bg-icy shadow-e2" : "border-line bg-surface shadow-e1"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-button bg-navy text-sm font-bold text-white">
                    W{w.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-navy">{w.label}</p>
                      {w.isFinal && (
                        <Trophy className="size-4 shrink-0 text-sun" aria-hidden="true" />
                      )}
                    </div>
                    <p className="text-xs text-muted">{formatWeekDate(w.startDate)}</p>
                  </div>
                </div>
                {isCurrent && <Badge tone="blue">This week</Badge>}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/program" variant="primary">
            See the full program
          </ButtonLink>
        </div>
      </Section>

      {/* 5.f Top performers */}
      <Section id="top-performers" title="Top performers" tone="white">
        {topPerformers.length > 0 ? (
          <div>
            <div className="grid gap-6 md:grid-cols-3">
              {topPerformers.map((entry, index) => {
                const rankStyles = [
                  "border-sun/40 bg-jasmine",
                  "border-blue/20 bg-icy",
                  "border-purple/20 bg-lavender",
                ][index] ?? "border-line bg-surface-alt";

                const badgeStyles = [
                  "bg-sun text-navy",
                  "bg-white/80 text-navy",
                  "bg-white/80 text-navy",
                ][index] ?? "bg-surface text-navy";

                return (
                  <div
                    key={`${entry.week}-${entry.name}`}
                    className={cx(
                      "flex flex-col justify-between rounded-card border p-6 text-navy shadow-e1",
                      rankStyles
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={cx(
                            "flex size-10 items-center justify-center rounded-full text-lg font-bold shadow-e1",
                            badgeStyles
                          )}
                        >
                          {entry.rank}
                        </span>
                        {entry.badge && (
                          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-navy">
                            {entry.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 truncate text-xl font-bold text-navy" title={entry.name}>
                        {entry.name}
                      </h3>
                    </div>
                    <p className="mt-4 text-2xl font-light text-navy">
                      {entry.points} <span className="text-sm font-normal text-navy/80">pts</span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <ButtonLink href="/leaderboard" variant="secondary">
                View full leaderboard
              </ButtonLink>
            </div>
          </div>
        ) : (
          <EmptyState title="Top performers are announced weekly">
            <p>The first leaderboard goes live after Week 1.</p>
          </EmptyState>
        )}
      </Section>

      {/* 5.g Completion requirements */}
      <Section
        id="completion-requirements"
        title="Completion requirements"
        tone="navy"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {completionRequirements.map((item) => {
            const Icon = requirementIcons[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur-xs"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 items-center justify-center rounded-xl bg-white/10 text-icy"
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-white!">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{item.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink href="/team" variant="inverse">
            Questions? Meet the team
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
