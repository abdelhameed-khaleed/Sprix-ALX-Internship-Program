import { describe, expect, it } from "vitest";
import { buildLeaderboard, parseLeaderboardCsv, rankWeek } from "@/lib/leaderboard";

describe("parseLeaderboardCsv", () => {
  it("parses valid rows with flexible headers and optional badge", () => {
    const csv = " Week ,Name,Points,Badge\n1,Mariam A.,95,Most consistent\n1, Omar  K. ,80,\n";
    expect(parseLeaderboardCsv(csv)).toEqual([
      { week: 1, name: "Mariam A.", points: 95, badge: "Most consistent" },
      { week: 1, name: "Omar K.", points: 80 },
    ]);
  });

  it("drops invalid rows but keeps the rest", () => {
    const csv = "week,name,points\n1,,50\n0,Ali,50\n9,Ali,50\n2,Sara,abc\n2,Nour,\n2,Laila,70";
    expect(parseLeaderboardCsv(csv)).toEqual([{ week: 2, name: "Laila", points: 70 }]);
  });

  it("returns nothing for an HTML page or empty body", () => {
    expect(parseLeaderboardCsv("<!DOCTYPE html><html></html>")).toEqual([]);
    expect(parseLeaderboardCsv("   ")).toEqual([]);
  });
});

describe("rankWeek", () => {
  it("gives tied scores the same dense rank", () => {
    const ranked = rankWeek([
      { week: 1, name: "B", points: 90 },
      { week: 1, name: "A", points: 90 },
      { week: 1, name: "C", points: 70 },
    ]);
    expect(ranked.map((e) => [e.name, e.rank])).toEqual([
      ["A", 1],
      ["B", 1],
      ["C", 2],
    ]);
  });

  it("limits to the top N ranks", () => {
    const entries = Array.from({ length: 15 }, (_, i) => ({ week: 1, name: `L${i}`, points: 100 - i }));
    expect(rankWeek(entries)).toHaveLength(10);
  });
});

describe("buildLeaderboard", () => {
  it("is unavailable with no entries", () => {
    expect(buildLeaderboard([])).toEqual({ status: "unavailable" });
  });

  it("groups by week in ascending order", () => {
    const board = buildLeaderboard([
      { week: 3, name: "A", points: 1 },
      { week: 1, name: "B", points: 1 },
    ]);
    expect(board.status === "ok" && board.weeks).toEqual([1, 3]);
  });
});
