import { Hero } from "@/components/home/Hero";
import { HomeScrollMode } from "@/components/home/HomeScrollMode";
import { SpecialSauce } from "@/components/home/SpecialSauce";
import { HowYouLearn } from "@/components/home/HowYouLearn";
import { WeeklyRhythm } from "@/components/home/WeeklyRhythm";
import { JourneyRail } from "@/components/home/JourneyRail";
import { TopPerformersTeaser } from "@/components/home/TopPerformersTeaser";
import { ClosingBand } from "@/components/home/ClosingBand";
import { CompletionRequirements } from "@/components/sections/CompletionRequirements";
import { getProgramStatus, formatWeekDate } from "@/lib/current-week";
import { getLeaderboard, type RankedEntry } from "@/lib/leaderboard";

export const revalidate = 3600;

export default async function HomePage() {
  const status = getProgramStatus();
  const leaderboard = await getLeaderboard();

  let statusLabel = "Starts Sun, 20 Sep";
  if (status.status === "upcoming") {
    statusLabel = `Starts ${formatWeekDate(status.startsOn)}`;
  } else if (status.status === "active") {
    statusLabel = `Now in Week ${status.week.number} · ${status.week.label}`;
  } else if (status.status === "completed") {
    statusLabel = "Program completed";
  }

  let topPerformers: RankedEntry[] = [];
  let isSample = false;
  if (leaderboard.status === "ok" && leaderboard.weeks.length > 0) {
    const latestWeek = leaderboard.weeks[leaderboard.weeks.length - 1];
    topPerformers = (leaderboard.byWeek[latestWeek] ?? []).slice(0, 3);
    // `isSample` is only present once the leaderboard source can flag sample/demo data;
    // read it defensively so this page keeps compiling either way.
    isSample = Boolean((leaderboard as unknown as { isSample?: boolean }).isSample);
  }

  return (
    <>
      <HomeScrollMode />
      <Hero statusLabel={statusLabel} />
      <SpecialSauce />
      <HowYouLearn />
      <WeeklyRhythm />
      <JourneyRail />
      <TopPerformersTeaser entries={topPerformers} isSample={isSample} />
      <CompletionRequirements variant="home" />
      <ClosingBand />
    </>
  );
}
