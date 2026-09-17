// Pure helpers for the program page's session links (Tuesday online walkthrough, Friday
// offline workshop) and the weekly-rhythm progress strip. No side effects, no fetching —
// everything takes `now` as a parameter so it's trivially testable and safe to call on
// both the server and the client without hydration surprises.

import { defaultZoomUrl, weeks as allWeeks, type Week } from "@/content/program";
import { site } from "@/content/site";
import { toProgramDate } from "@/lib/current-week";

export type SessionKind = "online" | "offline";
export type SessionState = "upcoming" | "today" | "live" | "past";

export type SessionInfo = {
  weekNumber: number;
  kind: SessionKind;
  /** "Online walkthrough" | "Offline workshop". */
  title: string;
  /** Cairo calendar date, YYYY-MM-DD. */
  date: string;
  /** "Tue, 22 Sep" */
  dateLabel: string;
  /** "6:00 PM" */
  time: string;
  /** ISO 8601 with the Cairo UTC offset at that instant, e.g. "2026-09-22T18:00:00+03:00". */
  datetime: string;
  url?: string;
  state: SessionState;
};

const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;
const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** The IANA time zone's UTC offset, in minutes, at the given instant (e.g. +180 for Cairo in summer). */
function timeZoneOffsetMinutes(instant: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return Math.round((asUtc - instant.getTime()) / 60_000);
}

/**
 * Converts a wall-clock date/time in `timeZone` to the absolute instant (UTC) it represents.
 * Two passes are enough: the offset only changes at a DST boundary, and never by more than
 * an hour, so refining the guess once with the offset at that guess always lands correctly.
 */
function zonedTimeToUtc(isoDate: string, hour: number, minute: number, timeZone: string): Date {
  const naiveUtcMs = Date.UTC(
    Number(isoDate.slice(0, 4)),
    Number(isoDate.slice(5, 7)) - 1,
    Number(isoDate.slice(8, 10)),
    hour,
    minute,
    0,
  );
  let instant = new Date(naiveUtcMs);
  for (let i = 0; i < 2; i++) {
    const offset = timeZoneOffsetMinutes(instant, timeZone);
    instant = new Date(naiveUtcMs - offset * 60_000);
  }
  return instant;
}

function formatOffset(minutes: number): string {
  const sign = minutes >= 0 ? "+" : "-";
  const abs = Math.abs(minutes);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  return `${sign}${hh}:${mm}`;
}

function formatIsoWithOffset(isoDate: string, hour: number, minute: number, timeZone: string): string {
  const instant = zonedTimeToUtc(isoDate, hour, minute, timeZone);
  const offset = timeZoneOffsetMinutes(instant, timeZone);
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return `${isoDate}T${hh}:${mm}:00${formatOffset(offset)}`;
}

/** "Tue, 22 Sep" for a YYYY-MM-DD date. Pure string/date math — no time zone involved. */
function formatDateLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return `${WEEKDAY_SHORT[date.getUTCDay()]}, ${d} ${MONTH_SHORT[date.getUTCMonth()]}`;
}

function formatTimeLabel(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return minute === 0 ? `${h12}:00 ${period}` : `${h12}:${String(minute).padStart(2, "0")} ${period}`;
}

function classifyState(startUtc: Date, endUtc: Date, now: Date, sessionDate: string, timeZone: string): SessionState {
  if (now.getTime() > endUtc.getTime()) return "past";
  if (now.getTime() >= startUtc.getTime()) return "live";
  if (toProgramDate(now, timeZone) === sessionDate) return "today";
  return "upcoming";
}

function buildSession(
  week: Week,
  kind: SessionKind,
  sessionDate: string,
  hour: number,
  minute: number,
  url: string | undefined,
  now: Date,
  timeZone: string,
): SessionInfo {
  const startUtc = zonedTimeToUtc(sessionDate, hour, minute, timeZone);
  const endUtc = new Date(startUtc.getTime() + SESSION_DURATION_MS);
  return {
    weekNumber: week.number,
    kind,
    title: kind === "online" ? "Online walkthrough" : "Offline workshop",
    date: sessionDate,
    dateLabel: formatDateLabel(sessionDate),
    time: formatTimeLabel(hour, minute),
    datetime: formatIsoWithOffset(sessionDate, hour, minute, timeZone),
    url,
    state: classifyState(startUtc, endUtc, now, sessionDate, timeZone),
  };
}

/**
 * The Tuesday online walkthrough and Friday offline workshop for a given week.
 * Tuesday = week start + 2 days, 6:00 PM. Friday = week start + 5 days, 4:00 PM.
 * Falls back to `defaultZoomUrl` for the online session when the week has no zoomUrl of
 * its own; the offline registration link has no such fallback (registration is per-session).
 */
export function getWeekSessions(week: Week, now: Date = new Date(), timeZone: string = site.timezone): SessionInfo[] {
  const tuesday = addDays(week.startDate, 2);
  const friday = addDays(week.startDate, 5);
  const zoomUrl = week.sessions?.zoomUrl ?? defaultZoomUrl;
  const registrationUrl = week.sessions?.registrationUrl;
  return [
    buildSession(week, "online", tuesday, 18, 0, zoomUrl, now, timeZone),
    buildSession(week, "offline", friday, 16, 0, registrationUrl, now, timeZone),
  ];
}

/** The next upcoming or live session across every week, or undefined once they've all passed. */
export function getNextSession(
  now: Date = new Date(),
  programWeeks: Week[] = allWeeks,
  timeZone: string = site.timezone,
): SessionInfo | undefined {
  const candidates = programWeeks
    .flatMap((week) => getWeekSessions(week, now, timeZone))
    .filter((session) => session.state !== "past")
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
  return candidates[0];
}

/** 0 = Sunday .. 6 = Saturday, for `now`'s calendar date in `timeZone`. */
export function getCairoWeekdayIndex(now: Date = new Date(), timeZone: string = site.timezone): number {
  const short = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" }).format(now);
  const idx = WEEKDAY_SHORT.indexOf(short);
  return idx === -1 ? 0 : idx;
}

/** Fraction (0..1) of the way through the current Sun→Sat calendar week, in `timeZone`. */
export function getWeekProgress(now: Date = new Date(), timeZone: string = site.timezone): number {
  const dayIndex = getCairoWeekdayIndex(now, timeZone);
  const today = toProgramDate(now, timeZone);
  const startOfDay = zonedTimeToUtc(today, 0, 0, timeZone);
  const msIntoDay = Math.max(0, now.getTime() - startOfDay.getTime());
  const msIntoWeek = dayIndex * 86_400_000 + msIntoDay;
  return Math.min(1, Math.max(0, msIntoWeek / (7 * 86_400_000)));
}
