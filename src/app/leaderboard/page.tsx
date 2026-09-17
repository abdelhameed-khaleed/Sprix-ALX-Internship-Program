import type { Metadata } from "next";
import { Info, TrendingUp } from "lucide-react";
import { ButtonLink, Card, EmptyState, PageHero, Section } from "@/components/ui";
import { getLeaderboard, OVERALL_TOP_N, WEEKLY_TOP_N } from "@/lib/leaderboard";
import { WeeklyStandings } from "@/components/leaderboard/WeeklyStandings";
import { Podium } from "@/components/leaderboard/Podium";
import { Reveal } from "@/components/motion/Reveal";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Weekly top 3 and overall top 5 standings for the ALX × SPRIX Professional Skills Program.",
};

type PageProps = {
  searchParams: Promise<{ week?: string }>;
};

const HERO = {
  eyebrow: "Leaderboard",
  title: "Top performers",
  intro: "Celebrating learners who show up, do the work and lift others up.",
  pattern: "/brand/patterns/Group-462.png",
};

export default async function LeaderboardPage({ searchParams }: PageProps) {
  const board = await getLeaderboard();
  const params = await searchParams;

  if (board.status === "unavailable" || board.weeks.length === 0) {
    return (
      <>
        <PageHero {...HERO} />
        <Section id="leaderboard-empty" tone="white">
          <EmptyState
            title="The leaderboard is coming soon"
            action={
              <ButtonLink href="/program" variant="primary">
                Explore the program
              </ButtonLink>
            }
          >
            Top performers are announced after each week. Check back after Week 1.
          </EmptyState>
        </Section>
      </>
    );
  }

  const requestedWeek = params?.week ? Number(params.week) : undefined;
  const selectedWeek = requestedWeek && board.weeks.includes(requestedWeek) ? requestedWeek : board.weeks[board.weeks.length - 1];
  const overallRunnersUp = board.overall.filter((e) => e.rank > 3);
  const lastWeek = board.weeks[board.weeks.length - 1];

  return (
    <>
      <PageHero {...HERO} />

      {board.isSample && (
        <div className="bg-surface px-4 pt-8 sm:px-6">
          <Reveal variant="fade" className="mx-auto max-w-[1200px]">
            <div className="flex items-start gap-3 rounded-card border border-line bg-sky p-4 text-navy shadow-e1 sm:p-5">
              <Info className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden="true" />
              <p className="text-sm font-semibold sm:text-base">Preview with sample data: real rankings appear after Week 1.</p>
            </div>
          </Reveal>
        </div>
      )}

      {/* Weekly standings: top 3 of the selected week */}
      <Section
        id="weekly-standings"
        tone="white"
        eyebrow={`Weekly standings · Top ${WEEKLY_TOP_N}`}
        title="Weekly top performers"
        intro="The three learners with the most points each week."
      >
        <WeeklyStandings weeks={board.weeks} byWeek={board.byWeek} initialWeek={selectedWeek} />
      </Section>

      {/* Overall standings: top 5 by total points across all weeks */}
      <Section
        id="overall-standings"
        tone="alt"
        eyebrow={`Overall standings · Top ${OVERALL_TOP_N}`}
        title="Overall ranking"
        intro={`Total points across every week so far (Weeks ${board.weeks[0]}–${lastWeek}).`}
      >
        <Podium entries={board.overall} />

        {overallRunnersUp.length > 0 && (
          <ol aria-label="Overall ranks 4 and 5" className="mt-8 grid gap-4 md:grid-cols-2">
            {overallRunnersUp.map((entry, idx) => (
              <Reveal as="li" key={entry.name} variant="up" delay={idx * 100}>
                <div className="lift flex items-center gap-4 rounded-card border border-line bg-white p-5 shadow-e1">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-lg font-bold text-white">
                    {entry.rank}
                    <span className="sr-only">th place</span>
                  </span>
                  <p className="min-w-0 flex-1 truncate text-lg font-bold text-navy" title={entry.name}>
                    {entry.name}
                  </p>
                  <p className="text-2xl font-light text-navy">
                    {entry.points} <span className="text-xs font-bold tracking-wider text-navy/70 uppercase">pts</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        )}

        <Card className="mt-10 bg-white text-sm text-muted">
          <div className="flex items-start gap-3">
            <TrendingUp className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold text-navy">How it works</h3>
              <p className="mt-1 leading-relaxed">
                Points reflect weekly LMS submissions, session attendance and participation. Each week&apos;s top 3 are
                celebrated in the weekly standings; your points from every week add up to the overall ranking. Equal
                points share a place.
              </p>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}
