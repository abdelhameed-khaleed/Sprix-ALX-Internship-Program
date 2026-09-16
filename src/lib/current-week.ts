import { weeks, type Week } from "@/content/program";
import { site } from "@/content/site";

export type ProgramStatus =
  | { status: "upcoming"; startsOn: string }
  | { status: "active"; week: Week }
  | { status: "completed" };

/** Calendar date (YYYY-MM-DD) of `now` in the program's timezone. */
export function toProgramDate(now: Date, timeZone: string = site.timezone): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function getProgramStatus(now: Date = new Date(), programWeeks: Week[] = weeks): ProgramStatus {
  const today = toProgramDate(now);
  const first = programWeeks[0];
  const last = programWeeks[programWeeks.length - 1];

  if (today < first.startDate) return { status: "upcoming", startsOn: first.startDate };
  if (today > addDays(last.startDate, 6)) return { status: "completed" };

  const current = [...programWeeks].reverse().find((w) => w.startDate <= today) ?? first;
  return { status: "active", week: current };
}

/** "Sun, 20 Sep" style label for a YYYY-MM-DD date. */
export function formatWeekDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(`${isoDate}T00:00:00Z`),
  );
}
