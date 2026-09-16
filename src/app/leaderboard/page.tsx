import type { Metadata } from "next";
import { ButtonLink, Card, EmptyState, PageHero, Section } from "@/components/ui";
import { getLeaderboard } from "@/lib/leaderboard";
import { WeekSelect } from "@/components/leaderboard/WeekSelect";
import { Podium } from "@/components/leaderboard/Podium";
import { RankTable } from "@/components/leaderboard/RankTable";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "Weekly top performers and rankings for the ALX × SPRIX Professional Skills Program.",
};

type PageProps = {
  searchParams: Promise<{
    week?: string;
  }>;
};

export default async function LeaderboardPage({ searchParams }: PageProps) {
  const board = await getLeaderboard();
  const params = await searchParams;

  const isUnavailable = board.status === "unavailable" || board.weeks.length === 0;

  if (isUnavailable) {
    return (
      <>
        <PageHero
          eyebrow="Leaderboard"
          title="This week's top performers"
          intro="Celebrating learners who show up, do the work and lift others up."
          pattern="/brand/patterns/Group-462.png"
        />

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

  // Selected week defaults to latest available week if not specified or invalid
  const requestedWeek = params?.week ? Number(params.week) : undefined;
  const selectedWeek =
    requestedWeek && board.weeks.includes(requestedWeek)
      ? requestedWeek
      : board.weeks[board.weeks.length - 1];

  const entries = board.byWeek[selectedWeek] ?? [];
  const podiumEntries = entries.filter((e) => e.rank <= 3);
  const tableEntries = entries.filter((e) => e.rank >= 4);

  return (
    <>
      <PageHero
        eyebrow="Leaderboard"
        title="This week's top performers"
        intro="Celebrating learners who show up, do the work and lift others up."
        pattern="/brand/patterns/Group-462.png"
      />

      <Section id="leaderboard-content" tone="white">
        {/* Week Selector */}
        <div className="mb-10 rounded-card border border-line bg-surface p-5 shadow-e1 sm:p-6">
          <WeekSelect weeks={board.weeks} selectedWeek={selectedWeek} />
        </div>

        {/* Podium (Ranks 1–3) */}
        {podiumEntries.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-navy sm:text-3xl">
              Week {selectedWeek} Top Performers
            </h2>
            <Podium entries={podiumEntries} />
          </div>
        )}

        {/* Rank Table (Ranks 4+) */}
        {tableEntries.length > 0 && (
          <div className="mb-10">
            <h3 className="mb-4 text-xl font-bold text-navy">
              Full Standings (Ranks 4+)
            </h3>
            <RankTable entries={tableEntries} weekNumber={selectedWeek} />
          </div>
        )}

        {/* How it works card */}
        <Card className="bg-surface-alt text-sm text-muted">
          <h3 className="text-base font-bold text-navy">How it works</h3>
          <p className="mt-1 leading-relaxed">
            Points reflect weekly LMS submissions, session attendance and
            participation. Rankings refresh automatically.
          </p>
        </Card>
      </Section>
    </>
  );
}
