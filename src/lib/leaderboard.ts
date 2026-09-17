import Papa from "papaparse";
import { site } from "@/content/site";
import { sampleLeaderboardEntries } from "@/content/leaderboard-sample";

// Leaderboard source: a Google Sheet published as CSV (File → Share → Publish to web → CSV)
// with the header row: week, name, points, badge
// Weekly standings show the top 3 of each week; overall standings add up every learner's
// points across all weeks and show the top 5.

export const LEADERBOARD_REVALIDATE_SECONDS = 900;
export const WEEKLY_TOP_N = 3;
export const OVERALL_TOP_N = 5;
const MAX_NAME_LENGTH = 40;

export type LeaderboardEntry = { week: number; name: string; points: number; badge?: string };
/** One ranked learner, weekly or overall. Ties share a rank. */
export type Standing = { name: string; points: number; rank: number; badge?: string };
export type RankedEntry = LeaderboardEntry & { rank: number };

export type Leaderboard =
  | {
      status: "ok";
      weeks: number[];
      byWeek: Record<number, RankedEntry[]>;
      overall: Standing[];
      /** True when showing built-in sample data because no sheet is configured. */
      isSample?: boolean;
    }
  | { status: "unavailable" };

export function parseLeaderboardCsv(csv: string): LeaderboardEntry[] {
  const trimmed = csv.trim();
  if (!trimmed || trimmed.startsWith("<")) return []; // empty or an HTML page (sheet not published)

  const { data } = Papa.parse<Record<string, string>>(trimmed, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
  });

  const entries: LeaderboardEntry[] = [];
  for (const row of data) {
    const week = Number(row.week?.trim());
    const name = row.name?.trim().replace(/\s+/g, " ");
    const pointsRaw = row.points?.trim();
    const points = Number(pointsRaw);
    if (!Number.isInteger(week) || week < 1 || week > site.totalWeeks) continue;
    if (!name) continue;
    if (!pointsRaw || !Number.isFinite(points)) continue;
    const badge = row.badge?.trim();
    entries.push({ week, name: name.slice(0, MAX_NAME_LENGTH), points, ...(badge ? { badge } : {}) });
  }
  return entries;
}

/** Dense ranking by points (ties share a rank), keeping ranks 1..topN (ties can add rows). */
function denseRank<T extends { name: string; points: number }>(items: T[], topN: number): (T & { rank: number })[] {
  const sorted = [...items].sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  const ranked: (T & { rank: number })[] = [];
  let rank = 0;
  let previous: number | undefined;
  for (const item of sorted) {
    if (item.points !== previous) {
      rank += 1;
      previous = item.points;
    }
    if (rank > topN) break;
    ranked.push({ ...item, rank });
  }
  return ranked;
}

export function rankWeek(entries: LeaderboardEntry[], topN: number = WEEKLY_TOP_N): RankedEntry[] {
  return denseRank(entries, topN);
}

/** Sum each learner's points across all weeks, then rank the top N. */
export function rankOverall(entries: LeaderboardEntry[], topN: number = OVERALL_TOP_N): Standing[] {
  const totals = new Map<string, number>();
  for (const e of entries) totals.set(e.name, (totals.get(e.name) ?? 0) + e.points);
  return denseRank(
    [...totals].map(([name, points]) => ({ name, points })),
    topN,
  );
}

export function buildLeaderboard(entries: LeaderboardEntry[]): Leaderboard {
  if (entries.length === 0) return { status: "unavailable" };
  const weeks = [...new Set(entries.map((e) => e.week))].sort((a, b) => a - b);
  const byWeek: Record<number, RankedEntry[]> = {};
  for (const week of weeks) byWeek[week] = rankWeek(entries.filter((e) => e.week === week));
  return { status: "ok", weeks, byWeek, overall: rankOverall(entries) };
}

export function getSampleLeaderboard(): Leaderboard {
  const board = buildLeaderboard(sampleLeaderboardEntries);
  return board.status === "ok" ? { ...board, isSample: true } : board;
}

export async function getLeaderboard(): Promise<Leaderboard> {
  const url = process.env.LEADERBOARD_CSV_URL;
  if (!url) return getSampleLeaderboard();
  try {
    const res = await fetch(url, { next: { revalidate: LEADERBOARD_REVALIDATE_SECONDS } });
    if (!res.ok) return { status: "unavailable" };
    return buildLeaderboard(parseLeaderboardCsv(await res.text()));
  } catch {
    return { status: "unavailable" };
  }
}
