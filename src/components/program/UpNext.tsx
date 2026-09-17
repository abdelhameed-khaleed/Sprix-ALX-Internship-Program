"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CalendarClock, Landmark, PartyPopper, Video } from "lucide-react";
import { getProgramStatus, formatWeekDate } from "@/lib/current-week";
import { getNextSession, type SessionInfo } from "@/lib/sessions";
import { ButtonLink, cx } from "@/components/ui";
import styles from "./UpNext.module.css";

type UpNextData =
  | { phase: "upcoming"; startsOn: string }
  | { phase: "active"; session: SessionInfo }
  | { phase: "completed" };

function computeUpNext(now: Date): UpNextData {
  const status = getProgramStatus(now);
  if (status.status === "upcoming") return { phase: "upcoming", startsOn: status.startsOn };
  if (status.status === "completed") return { phase: "completed" };
  const next = getNextSession(now);
  return next ? { phase: "active", session: next } : { phase: "completed" };
}

/** "Starts in 2d 4h 12m"; days/hours are only shown while they're non-zero at the top of the count. */
function formatCountdown(now: Date, target: Date): string {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return "Starting now";
  const totalMinutes = Math.floor(ms / 60_000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (days || hours) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return `Starts in ${parts.join(" ")}`;
}

/** Live "up next" strip: the next session (or the program-start / completed states), ticking client-side. */
export function UpNext({ initialNow }: { initialNow: string }) {
  // First render matches the server exactly (same baked-in instant), so hydration never mismatches.
  const [now, setNow] = useState(() => new Date(initialNow));

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const data = computeUpNext(now);

  let icon = <CalendarClock className="size-6 text-icy" aria-hidden="true" />;
  let eyebrow = "Program status";
  let title = "";
  let meta = "";
  let countdown = "";
  let liveLabel = "";
  let action: { label: string; href?: string } | null = null;
  let jumpHref: string | undefined;

  if (data.phase === "upcoming") {
    icon = <CalendarClock className="size-6 text-icy" aria-hidden="true" />;
    eyebrow = "Up next";
    title = "Week 1 begins";
    meta = formatWeekDate(data.startsOn);
    // Midnight in Cairo (UTC+3 during the September start).
    countdown = formatCountdown(now, new Date(`${data.startsOn}T00:00:00+03:00`));
    liveLabel = "Upcoming";
  } else if (data.phase === "active") {
    const { session } = data;
    const isOnline = session.kind === "online";
    icon = isOnline ? <Video className="size-6 text-icy" aria-hidden="true" /> : <Landmark className="size-6 text-icy" aria-hidden="true" />;
    eyebrow = "Up next";
    title = isOnline ? "Online walkthrough" : "Offline workshop @ ALX Hub";
    meta = isOnline ? `${session.dateLabel} · ${session.time} · Zoom` : `${session.dateLabel} · ${session.time}`;
    if (session.state === "live") {
      liveLabel = "Live now";
      countdown = "";
    } else {
      liveLabel = session.state === "today" ? "Today" : "Upcoming";
      countdown = formatCountdown(now, new Date(session.datetime));
    }
    action = session.url
      ? { label: isOnline ? "Join on Zoom" : "Register to attend", href: session.url }
      : { label: isOnline ? "Zoom link coming soon" : "Registration opens soon" };
    jumpHref = `#week-${session.weekNumber}`;
  } else {
    icon = <PartyPopper className="size-6 text-icy" aria-hidden="true" />;
    eyebrow = "Program complete";
    title = "Congratulations, graduates!";
    meta = "Every week is in the books. Well done making it to graduation.";
    liveLabel = "Completed";
  }

  const isLive = data.phase === "active" && data.session.state === "live";

  return (
    <div className={styles.card}>
      <div className={cx(styles.cardInner, "flex flex-col gap-4 text-white sm:flex-row sm:items-center sm:justify-between")}>
        <div className="flex items-start gap-3">
          <span className="relative mt-0.5 inline-flex size-6 shrink-0 items-center justify-center">
            {isLive && (
              <>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60" aria-hidden="true" />
                <span className="absolute inline-flex size-2.5 rounded-full bg-lime" aria-hidden="true" />
              </>
            )}
            {!isLive && icon}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-icy uppercase">{eyebrow}</p>
            <p className="mt-0.5 text-lg font-bold text-white sm:text-xl">{title}</p>
            <p className="mt-0.5 text-sm text-white/80">{meta}</p>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-white/95">
              <span aria-live="polite">{liveLabel}</span>
              {countdown && <span>· {countdown}</span>}
            </p>
          </div>
        </div>

        {action && (
          <div className="flex shrink-0 flex-wrap items-center gap-3 sm:pl-4">
            {action.href ? (
              <ButtonLink href={action.href} external variant="inverse">
                {action.label}
              </ButtonLink>
            ) : (
              <span className="inline-flex min-h-11 items-center rounded-button border border-dashed border-white/40 px-4 text-sm font-semibold text-white/80">
                {action.label}
              </span>
            )}
            {jumpHref && (
              <a href={jumpHref} className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-icy hover:text-white hover:underline">
                This week <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
