import { Landmark, Video } from "lucide-react";
import type { SessionInfo } from "@/lib/sessions";
import { Badge, ButtonLink, IconTile, cx } from "@/components/ui";
import styles from "./SessionRow.module.css";

/** Compact "Live now" / "Today" / "Done" chip; renders nothing for a plain upcoming session. */
function StateBadge({ state }: { state: SessionInfo["state"] }) {
  if (state === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-xs font-bold text-navy">
        <span className={cx("size-2 rounded-full bg-green", styles.liveDot)} aria-hidden="true" />
        Live now
      </span>
    );
  }
  if (state === "today") return <Badge tone="blue">Today</Badge>;
  if (state === "past") {
    return <span className="text-xs font-semibold text-muted">Done</span>;
  }
  return null;
}

export function SessionRow({ session }: { session: SessionInfo }) {
  const isOnline = session.kind === "online";
  const Icon = isOnline ? Video : Landmark;
  const actionLabel = isOnline ? "Join on Zoom" : "Register to attend";
  const comingSoonLabel = isOnline ? "Zoom link coming soon" : "Registration opens soon";
  const title = isOnline ? "Online walkthrough" : "Offline workshop @ ALX Hub";
  const metaLabel = isOnline ? `${session.dateLabel} · ${session.time} · Zoom` : `${session.dateLabel} · ${session.time}`;

  return (
    <div className="flex flex-col gap-3 rounded-button border border-line bg-surface-alt px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <IconTile tone={isOnline ? "blue" : "purple"}>
          <Icon className={cx("size-5 text-navy", styles.icon)} aria-hidden="true" />
        </IconTile>
        <div className="min-w-0">
          <p className="text-sm font-bold text-navy">{title}</p>
          <p className="text-sm text-muted">{metaLabel}</p>
          {!isOnline && <p className="mt-0.5 text-xs text-muted">Registration is required for every offline session.</p>}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 pl-[52px] sm:pl-0">
        <StateBadge state={session.state} />
        {session.url ? (
          <ButtonLink href={session.url} external variant="secondary" className="text-sm">
            {actionLabel}
          </ButtonLink>
        ) : (
          <span className="inline-flex min-h-9 items-center rounded-button border border-dashed border-line px-3.5 py-2 text-xs font-semibold text-muted">
            {comingSoonLabel}
          </span>
        )}
      </div>
    </div>
  );
}
