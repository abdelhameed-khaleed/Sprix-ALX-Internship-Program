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
} from "lucide-react";
import type { Week, WeekIcon } from "@/content/program";
import { formatWeekDate } from "@/lib/current-week";
import { Badge, IconTile, cx } from "@/components/ui";

const iconMap: Record<WeekIcon, typeof Brain> = {
  brain: Brain,
  chart: ChartColumn,
  messages: MessagesSquare,
  users: Users,
  compass: Compass,
  hammer: Hammer,
  trophy: Trophy,
};

type WeekCardProps = {
  week: Week;
  isCurrent?: boolean;
  isPast?: boolean;
};

export function WeekCard({ week, isCurrent = false, isPast = false }: WeekCardProps) {
  const Icon = iconMap[week.icon] ?? Brain;

  return (
    <article
      id={`week-${week.number}`}
      className={cx(
        "scroll-mt-24 rounded-card border p-5 shadow-e1 transition-all duration-200 sm:p-6",
        isCurrent
          ? "border-blue bg-sky shadow-e2"
          : week.isFinal
            ? "border-jasmine bg-white"
            : "border-line bg-white",
      )}
    >
      <header className="flex flex-col gap-4">
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
            {week.isFinal && !isCurrent && (
              <Badge tone="sun">Final Week</Badge>
            )}
          </div>
        </div>

        {/* Title and Icon */}
        <div className="flex items-start gap-4">
          <IconTile tone={week.isFinal ? "sun" : isCurrent ? "blue" : "blue"}>
            <Icon className="size-6 text-navy" aria-hidden="true" />
          </IconTile>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold tracking-wider text-muted uppercase">
              {week.label}
            </p>
            <h3 className="mt-1 text-xl font-bold text-navy sm:text-2xl">
              {week.title}
            </h3>
          </div>
        </div>

        <p className="text-base text-ink">{week.summary}</p>
      </header>

      {/* Accordion details (native disclosure, keyboard accessible, no JS) */}
      <details
        className="group mt-5 border-t border-line/70 pt-4"
        open={isCurrent}
      >
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-blue select-none hover:text-blue-dark focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none">
          <span className="group-open:hidden">View week details</span>
          <span className="hidden group-open:inline">Hide week details</span>
          <ChevronDown
            className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>

        <div className="mt-4 space-y-4 text-sm">
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
            <div className="rounded-button bg-jasmine/40 px-3.5 py-2.5 text-xs font-semibold text-navy">
              ✨ {week.highlight}
            </div>
          )}
        </div>
      </details>
    </article>
  );
}
