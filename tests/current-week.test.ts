import { describe, expect, it } from "vitest";
import { getProgramStatus, toProgramDate } from "@/lib/current-week";

// Cairo is UTC+3 in Sep–Oct 2026 (DST ends 29 Oct), UTC+2 afterwards.
describe("getProgramStatus", () => {
  it("is upcoming before Week 1", () => {
    expect(getProgramStatus(new Date("2026-09-19T12:00:00Z"))).toEqual({ status: "upcoming", startsOn: "2026-09-20" });
  });

  it("uses Cairo date, not UTC, at the week boundary", () => {
    // 22:30 UTC on 19 Sep is already 20 Sep in Cairo.
    expect(toProgramDate(new Date("2026-09-19T22:30:00Z"))).toBe("2026-09-20");
    const s = getProgramStatus(new Date("2026-09-19T22:30:00Z"));
    expect(s.status === "active" && s.week.number).toBe(1);
  });

  it("finds the current week mid-program", () => {
    const s = getProgramStatus(new Date("2026-10-14T10:00:00Z"));
    expect(s.status === "active" && s.week.number).toBe(4);
  });

  it("stays on Week 7 until its last day", () => {
    const s = getProgramStatus(new Date("2026-11-07T10:00:00Z"));
    expect(s.status === "active" && s.week.number).toBe(7);
  });

  it("is completed after Week 7", () => {
    expect(getProgramStatus(new Date("2026-11-08T10:00:00Z"))).toEqual({ status: "completed" });
  });
});
