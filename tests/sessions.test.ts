import { describe, expect, it } from "vitest";
import {
  getCairoWeekdayIndex,
  getNextSession,
  getWeekProgress,
  getWeekSessions,
} from "@/lib/sessions";
import type { Week } from "@/content/program";

// Cairo is UTC+3 in Sep–Oct 2026 (DST ends 29 Oct), UTC+2 afterwards — same rule the
// existing current-week tests rely on.

function makeWeek(overrides: Partial<Week> = {}): Week {
  return {
    number: 1,
    startDate: "2026-09-20",
    label: "Test",
    title: "Test Week",
    summary: "",
    outcome: "",
    icon: "brain",
    ...overrides,
  };
}

describe("getWeekSessions", () => {
  it("places Tuesday at start+2 18:00 and Friday at start+5 16:00, Cairo time", () => {
    const week = makeWeek({ startDate: "2026-09-20" });
    const [online, offline] = getWeekSessions(week, new Date("2026-09-01T00:00:00Z"));
    expect(online.kind).toBe("online");
    expect(online.date).toBe("2026-09-22");
    expect(online.time).toBe("6:00 PM");
    expect(online.dateLabel).toBe("Tue, 22 Sep");
    expect(online.datetime).toBe("2026-09-22T18:00:00+03:00");

    expect(offline.kind).toBe("offline");
    expect(offline.date).toBe("2026-09-25");
    expect(offline.time).toBe("4:00 PM");
    expect(offline.dateLabel).toBe("Fri, 25 Sep");
    expect(offline.datetime).toBe("2026-09-25T16:00:00+03:00");
  });

  it("switches to the UTC+2 offset once Cairo DST ends on 29 Oct 2026", () => {
    const week = makeWeek({ startDate: "2026-10-25" }); // Tue 27 Oct (still +3), Fri 30 Oct (+2)
    const [online, offline] = getWeekSessions(week, new Date("2026-09-01T00:00:00Z"));
    expect(online.datetime).toBe("2026-10-27T18:00:00+03:00");
    expect(offline.datetime).toBe("2026-10-30T16:00:00+02:00");
  });

  it("uses the week's own zoomUrl over defaultZoomUrl, and has no offline url without one", () => {
    const week = makeWeek({ sessions: { zoomUrl: "https://zoom.example/week1" } });
    const [online, offline] = getWeekSessions(week, new Date("2026-09-01T00:00:00Z"));
    expect(online.url).toBe("https://zoom.example/week1");
    expect(offline.url).toBeUndefined();
  });

  it("has undefined urls (not the string 'undefined') when nothing is configured", () => {
    const week = makeWeek();
    const [online, offline] = getWeekSessions(week, new Date("2026-09-01T00:00:00Z"));
    expect(online.url).toBeUndefined();
    expect(offline.url).toBeUndefined();
  });

  describe("state", () => {
    const week = makeWeek({ startDate: "2026-09-20" }); // Tue session: 2026-09-22T18:00:00+03:00 = 15:00Z

    it("is upcoming well before the session date", () => {
      const [online] = getWeekSessions(week, new Date("2026-09-01T00:00:00Z"));
      expect(online.state).toBe("upcoming");
    });

    it("is today on the session's calendar date, before it starts", () => {
      const [online] = getWeekSessions(week, new Date("2026-09-22T08:00:00Z")); // 11:00 Cairo
      expect(online.state).toBe("today");
    });

    it("is live within the 2-hour window", () => {
      const [online] = getWeekSessions(week, new Date("2026-09-22T15:00:00Z")); // exactly 18:00 Cairo
      expect(online.state).toBe("live");
      const [stillLive] = getWeekSessions(week, new Date("2026-09-22T16:59:00Z")); // 19:59 Cairo
      expect(stillLive.state).toBe("live");
    });

    it("is past once the window ends", () => {
      const [online] = getWeekSessions(week, new Date("2026-09-22T17:00:01Z")); // 20:00:01 Cairo
      expect(online.state).toBe("past");
    });
  });
});

describe("getNextSession", () => {
  const weeks = [
    makeWeek({ number: 1, startDate: "2026-09-20", sessions: { zoomUrl: "https://zoom.example/1" } }),
    makeWeek({ number: 2, startDate: "2026-09-27" }),
  ];

  it("returns the earliest session that hasn't passed yet", () => {
    const next = getNextSession(new Date("2026-09-01T00:00:00Z"), weeks);
    expect(next?.weekNumber).toBe(1);
    expect(next?.kind).toBe("online");
    expect(next?.url).toBe("https://zoom.example/1");
  });

  it("moves on to the next session once the current one has passed", () => {
    // After week 1's Friday workshop window has closed, but before week 2's Tuesday.
    const next = getNextSession(new Date("2026-09-26T00:00:00Z"), weeks);
    expect(next?.weekNumber).toBe(2);
    expect(next?.kind).toBe("online");
  });

  it("returns undefined once every session has passed", () => {
    const next = getNextSession(new Date("2026-12-01T00:00:00Z"), weeks);
    expect(next).toBeUndefined();
  });
});

describe("getCairoWeekdayIndex", () => {
  it("maps Sunday to 0 and Saturday to 6", () => {
    expect(getCairoWeekdayIndex(new Date("2026-09-19T22:30:00Z"))).toBe(0); // 2026-09-20 in Cairo, a Sunday
    expect(getCairoWeekdayIndex(new Date("2026-09-26T10:00:00Z"))).toBe(6); // Saturday in Cairo
  });
});

describe("getWeekProgress", () => {
  it("is 0 right at the start of Sunday and rises through the week", () => {
    expect(getWeekProgress(new Date("2026-09-19T21:00:00Z"))).toBe(0); // 2026-09-20T00:00 Cairo
    const midWeek = getWeekProgress(new Date("2026-09-23T12:00:00Z")); // Wednesday midday Cairo
    expect(midWeek).toBeGreaterThan(0.3);
    expect(midWeek).toBeLessThan(0.6);
  });

  it("stays within [0, 1]", () => {
    for (const iso of ["2026-09-19T21:00:00Z", "2026-09-25T20:59:00Z", "2026-11-08T10:00:00Z"]) {
      const p = getWeekProgress(new Date(iso));
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(1);
    }
  });
});
