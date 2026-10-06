"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Building2, CalendarClock, Clock, Landmark, Video } from "lucide-react";
import { site, weeklyCadence } from "@/content/site";
import { getProgramStatus, toProgramDate } from "@/lib/current-week";
import {
  getNextDeadline,
  getNextSession,
  getUpcomingCadence,
  type SessionInfo,
} from "@/lib/sessions";
import { Card, IconTile, cx } from "@/components/ui";

const cadenceIconMap = {
  video: Video,
  building: Building2,
  alarm: Clock,
};

/**
 * Ticking clock shared by everything on this page. The first render uses the instant the
 * server baked in, so hydration always matches; it starts following the real clock only
 * after mount.
 */
function useNow(initialNow: string): Date {
  const [now, setNow] = useState(() => new Date(initialNow));
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

/** "2d 4h 12m" / "4h 12m" / "12m" / "48s" — only the units that still matter. */
function formatRemaining(ms: number): string {
  if (ms <= 0) return "now";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (days) return `${days}d ${hours}h ${minutes}m`;
  if (hours) return `${hours}h ${minutes}m`;
  if (minutes) return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
  return `${seconds}s`;
}

function cairoParts(now: Date) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timezone,
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(now);
  return { time, date };
}

function nextSessionLabel(session: SessionInfo): string {
  return session.kind === "online"
    ? `${session.dateLabel} · ${session.time} · Zoom`
    : `${session.dateLabel} · ${session.time} · ALX Hub`;
}

/**
 * Live strip at the top of /support: the current Cairo time, the next session and the
 * next submission deadline, all counting down in real time. Everything here comes from
 * the published schedule, so it never claims a person is available.
 */
export function SupportPulse({ initialNow }: { initialNow: string }) {
  const now = useNow(initialNow);
  const { time, date } = cairoParts(now);

  const status = getProgramStatus(now);
  const session = status.status === "active" ? getNextSession(now) : undefined;
  const isLive = session?.state === "live";

  const deadline = getNextDeadline(now);
  const deadlineCadence = weeklyCadence.find((item) => item.icon === "alarm");

  const SessionIcon = session?.kind === "offline" ? Landmark : Video;

  return (
    <div className="relative overflow-hidden rounded-card bg-navy p-5 shadow-e2 sm:p-6">
      {/* Slow drifting sheen so the strip reads as alive even when nothing is imminent */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -top-24 h-48 animate-[pulse_6s_ease-in-out_infinite] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.14),transparent_70%)]"
      />

      <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
        {/* Cairo clock */}
        <div className="flex items-start gap-3">
          <span className="relative mt-1 inline-flex size-2.5 shrink-0">
            <span
              aria-hidden="true"
              className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70"
            />
            <span aria-hidden="true" className="relative inline-flex size-2.5 rounded-full bg-lime" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-wider text-icy uppercase">Cairo time now</p>
            <p className="mt-0.5 font-mono text-2xl font-bold tabular-nums text-white">{time}</p>
            <p className="text-sm text-white/70">{date}</p>
          </div>
        </div>

        {/* Next session */}
        <div className="flex items-start gap-3 sm:border-l sm:border-white/15 sm:pl-4">
          <SessionIcon className="mt-0.5 size-5 shrink-0 text-icy" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-wider text-icy uppercase">
              {isLive ? "Happening now" : "Next session"}
            </p>
            {session ? (
              <>
                <p className="mt-0.5 text-base font-bold text-white">{session.title}</p>
                <p className="text-sm text-white/70">{nextSessionLabel(session)}</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {isLive ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2 py-0.5 text-xs font-bold text-navy">
                      Live now
                    </span>
                  ) : (
                    <>in {formatRemaining(new Date(session.datetime).getTime() - now.getTime())}</>
                  )}
                </p>
                {session.url && (
                  <a
                    href={session.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-icy hover:text-white hover:underline"
                  >
                    {session.kind === "online" ? "Join on Zoom" : "Session details"}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                )}
              </>
            ) : (
              <p className="mt-0.5 text-sm text-white/70">
                {status.status === "upcoming"
                  ? "The program has not started yet."
                  : "All sessions are done. Congratulations!"}
              </p>
            )}
          </div>
        </div>

        {/* Next deadline */}
        <div className="flex items-start gap-3 sm:border-l sm:border-white/15 sm:pl-4">
          <CalendarClock className="mt-0.5 size-5 shrink-0 text-icy" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-wider text-icy uppercase">Next deadline</p>
            {deadline ? (
              <>
                <p className="mt-0.5 text-base font-bold text-white">
                  Week {deadline.weekNumber} submission
                </p>
                <p className="text-sm text-white/70">
                  {deadline.dateLabel} · {deadline.time} · {deadlineCadence?.where ?? "Savanna"}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  in {formatRemaining(new Date(deadline.datetime).getTime() - now.getTime())}
                </p>
              </>
            ) : (
              <p className="mt-0.5 text-sm text-white/70">No deadline left to hit. Nice work.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The fixed weekly rhythm, with whichever slot is coming up next highlighted and counting
 * down. Same three cards as before, just no longer frozen.
 */
export function WeeklyRhythmLive({ initialNow }: { initialNow: string }) {
  const now = useNow(initialNow);
  const today = toProgramDate(now);
  const occurrences = getUpcomingCadence(now);

  const items = weeklyCadence.map((item, idx) => {
    const at = occurrences[idx]?.at;
    return {
      ...item,
      at,
      dateLabel: occurrences[idx]?.dateLabel,
      isToday: at ? toProgramDate(at) === today : false,
    };
  });
  const pending = items.map((item) => item.at?.getTime()).filter((t): t is number => t !== undefined);
  const soonest = pending.length > 0 ? Math.min(...pending) : undefined;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((item, idx) => {
        const CadenceIcon = cadenceIconMap[item.icon] ?? Clock;
        const isNext = item.at !== undefined && item.at.getTime() === soonest;
        return (
          <Card
            key={idx}
            className={cx(
              "lift flex items-start gap-3 bg-white p-4 transition-shadow duration-300",
              isNext && "border-blue! shadow-e3 ring-2 ring-blue/30",
            )}
          >
            <IconTile tone={isNext ? "green" : "blue"}>
              <CadenceIcon className="size-5 text-navy" aria-hidden="true" />
            </IconTile>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold tracking-wider text-muted uppercase">{item.day}</p>
                {item.isToday && (
                  <span className="rounded-full bg-lime px-2 py-0.5 text-xs font-bold text-navy">
                    Today
                  </span>
                )}
              </div>
              <h4 className="text-base font-bold text-navy">{item.title}</h4>
              <p className="text-xs font-medium text-ink">
                {item.dateLabel ? `${item.dateLabel} · ${item.time}` : item.time}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span className="inline-block rounded bg-surface-alt px-1.5 py-0.5 text-xs font-semibold text-muted">
                  {item.where}
                </span>
                {isNext && item.at && (
                  <span className="text-xs font-bold text-blue tabular-nums">
                    in {formatRemaining(item.at.getTime() - now.getTime())}
                  </span>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
