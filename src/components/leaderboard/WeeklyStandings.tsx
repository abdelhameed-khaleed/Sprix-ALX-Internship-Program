"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import type { RankedEntry } from "@/lib/leaderboard";
import { Podium } from "./Podium";
import { WeekSelect } from "./WeekSelect";

type WeeklyStandingsProps = {
  weeks: number[];
  byWeek: Record<number, RankedEntry[]>;
  initialWeek: number;
};

/**
 * Weekly top 3 with an in-page week switcher. All weeks are already loaded, so switching is
 * instant: no server round-trip, no scroll jump. The URL is kept shareable via replaceState.
 */
export function WeeklyStandings({ weeks, byWeek, initialWeek }: WeeklyStandingsProps) {
  const [week, setWeek] = useState(initialWeek);

  function select(next: number) {
    setWeek(next);
    const url = new URL(window.location.href);
    url.searchParams.set("week", String(next));
    window.history.replaceState(window.history.state, "", url);
  }

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-4 rounded-card border border-line bg-surface p-5 shadow-e1 sm:p-6">
        <CalendarDays className="size-5 text-blue" aria-hidden="true" />
        <WeekSelect weeks={weeks} selectedWeek={week} onSelect={select} />
      </div>
      <h3 className="mb-6 text-2xl font-bold text-navy" aria-live="polite">
        Week {week}
      </h3>
      {/* key replays the rise-in animation for the newly selected week */}
      <Podium key={week} entries={byWeek[week] ?? []} />
    </>
  );
}
