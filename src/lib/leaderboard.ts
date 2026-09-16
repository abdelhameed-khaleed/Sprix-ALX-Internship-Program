import Papa from "papaparse";
import { site } from "@/content/site";

// Leaderboard source: a Google Sheet published as CSV (File → Share → Publish to web → CSV)
// with the header row: week, name, points, badge

export const LEADERBOARD_REVALIDATE_SECONDS = 900;
const TOP_N = 10;
const MAX_NAME_LENGTH = 40;

export type LeaderboardEntry = { week: number; name: string; points: number; badge?: string };
export type RankedEntry = LeaderboardEntry & { rank: number };

export type Leaderboard =
  | { status: "ok"; weeks: number[]; byWeek: Record<number, RankedEntry[]> }
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

/** Dense ranking by points (ties share a rank), top N per week. */
export function rankWeek(entries: LeaderboardEntry[], topN: number = TOP_N): RankedEntry[] {
  const sorted = [...entries].sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  const ranked: RankedEntry[] = [];
  let rank = 0;
  let previous: number | undefined;
  for (const entry of sorted) {
    if (entry.points !== previous) {
      rank += 1;
      previous = entry.points;
    }
    if (rank > topN) break;
    ranked.push({ ...entry, rank });
  }
  return ranked;
}

export function buildLeaderboard(entries: LeaderboardEntry[]): Leaderboard {
  if (entries.length === 0) return { status: "unavailable" };
  const weeks = [...new Set(entries.map((e) => e.week))].sort((a, b) => a - b);
  const byWeek: Record<number, RankedEntry[]> = {};
  for (const week of weeks) byWeek[week] = rankWeek(entries.filter((e) => e.week === week));
  return { status: "ok", weeks, byWeek };
}

export async function getLeaderboard(): Promise<Leaderboard> {
  const url = process.env.LEADERBOARD_CSV_URL;
  if (!url) return { status: "unavailable" };
  try {
    const res = await fetch(url, { next: { revalidate: LEADERBOARD_REVALIDATE_SECONDS } });
    if (!res.ok) return { status: "unavailable" };
    return buildLeaderboard(parseLeaderboardCsv(await res.text()));
  } catch {
    return { status: "unavailable" };
  }
}
