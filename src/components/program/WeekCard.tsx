import {
  Brain,
  ChartColumn,
  MessagesSquare,
  Users,
  Compass,
  Hammer,
  Trophy,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import type { Week, WeekIcon } from "@/content/program";
import { formatWeekDate } from "@/lib/current-week";
import { getWeekSessions } from "@/lib/sessions";
import { Badge, IconTile, cx } from "@/components/ui";
import { SessionRow } from "./SessionRow";
import styles from "./WeekCard.module.css";

const iconMap: Record<WeekIcon, typeof Brain> = {
  brain: Brain,
  chart: ChartColumn,
  messages: MessagesSquare,
  users: Users,
  compass: Compass,
  hammer: Hammer,
  trophy: Trophy,
};

export type WeekActivationKind = "click" | "hover";

type WeekCardProps = {
  week: Week;
  isExpanded: boolean;
  isCurrent?: boolean;
  isPast?: boolean;
  /** `now` is threaded down from the page render so session state never mismatches during hydration. */
  now: Date;
  onActivate: (kind: WeekActivationKind) => void;
};

export function WeekCard({
  week,
  isExpanded,
  isCurrent = false,
  isPast = false,
  now,
  onActivate,
}: WeekCardProps) {
  const Icon = iconMap[week.icon] ?? Brain;
  const triggerId = `week-trigger-${week.number}`;
  const panelId = `week-panel-${week.number}`;
  const [onlineSession, offlineSession] = getWeekSessions(week, now);

  return (
    <article
      id={`week-${week.number}`}
      className={cx(
        styles.card,
        isExpanded ? styles.expanded : styles.dimmed,
        "scroll-mt-24 overflow-hidden rounded-card border shadow-e1",
        isCurrent
          ? "border-blue bg-sky shadow-e2"
          : week.isFinal
            ? "border-jasmine bg-white"
            : "border-line bg-white",
      )}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        // Click/tap/keyboard only: opening on hover made cards expand while the page scrolled under the pointer (layout thrash + lag).
        onClick={() => onActivate("click")}
        className={cx(styles.trigger, "p-5 sm:p-6")}
      >
        <div className="flex flex-col gap-4">
          {/* Meta row: Week label, Date, Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cx(
                  "rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase",
                  isCurrent ? "bg-blue text-white" : "bg-navy text-white",
                )}
              >
                W{week.number}
              </span>
              <time className="text-sm font-medium text-muted">
                {formatWeekDate(week.startDate)}
              </time>
            </div>

            <div className="flex items-center gap-2">
              {isCurrent && <Badge tone="navy">This week</Badge>}
              {isPast && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
                  <CheckCircle2 className="size-4 text-green" aria-hidden="true" />
                  Completed
                </span>
              )}
              {week.isFinal && !isCurrent && <Badge tone="sun">Final Week</Badge>}
            </div>
          </div>

          {/* Title and Icon */}
          <div className="flex items-start gap-4">
            <IconTile tone={week.isFinal ? "sun" : "blue"}>
              <Icon className="size-6 text-navy" aria-hidden="true" />
            </IconTile>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-wider text-muted uppercase">
                {week.label}
              </p>
              <h3 className="mt-1 text-xl font-bold text-navy sm:text-2xl">{week.title}</h3>
            </div>
          </div>

          <p className="text-base text-ink">{week.summary}</p>

          <span className="flex min-h-11 items-center justify-between gap-2 border-t border-line/70 pt-4 text-sm font-semibold text-blue">
            <span>{isExpanded ? "Hide week details" : "View week details"}</span>
            <ChevronDown
              className={cx(
                "size-4 shrink-0 transition-transform duration-200",
                isExpanded && "rotate-180",
              )}
              aria-hidden="true"
            />
          </span>
        </div>
      </button>

      {/* `inert` keeps the collapsed panel's links out of the tab order and unclickable
          while still letting the grid-rows/opacity transition run (no display:none). */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={styles.panel}
        data-expanded={isExpanded}
        inert={!isExpanded}
      >
        <div className={styles.panelInner}>
          <div className="space-y-4 px-5 pb-5 text-sm sm:px-6 sm:pb-6">
            <div>
              <h4 className="text-xs font-bold tracking-wider text-muted uppercase">
                Learning outcome
              </h4>
              <p className="mt-1 leading-relaxed text-ink">{week.outcome}</p>
            </div>

            {week.expertSession && (
              <div className="flex flex-wrap items-baseline gap-2 pt-1">
                <Badge tone="purple">Expert session</Badge>
                <span className="font-medium text-navy">{week.expertSession}</span>
              </div>
            )}

            {week.deliverable && (
              <div className="flex flex-wrap items-baseline gap-2 pt-1">
                <Badge tone="green">Deliverable</Badge>
                <span className="font-medium text-navy">{week.deliverable}</span>
              </div>
            )}

            {week.highlight && (
              <div className="flex items-start gap-2 rounded-button bg-jasmine/40 px-3.5 py-2.5 text-xs font-semibold text-navy">
                <Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{week.highlight}</span>
              </div>
            )}

            <div className="pt-1">
              <h4 className="text-xs font-bold tracking-wider text-muted uppercase">This week&apos;s sessions</h4>
              <div className="mt-2 space-y-2">
                <SessionRow session={onlineSession} />
                <SessionRow session={offlineSession} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
