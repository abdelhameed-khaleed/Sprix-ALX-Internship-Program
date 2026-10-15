import type { RankedEntry } from "@/lib/leaderboard";
import { Podium } from "./Podium";

type WeeklyStandingsProps = {
  week: number;
  entries: RankedEntry[];
};

/** Weekly top 3 for the current week only. */
export function WeeklyStandings({ week, entries }: WeeklyStandingsProps) {
  return (
    <>
      <h3 className="mb-6 text-2xl font-bold text-navy">Week {week}</h3>
      <Podium entries={entries} />
    </>
  );
}
