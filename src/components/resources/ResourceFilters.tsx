import Link from "next/link";
import type { ResourceType } from "@/content/resources";
import { site } from "@/content/site";
import { cx } from "@/components/ui";

type ResourceFiltersProps = {
  activeWeek: string;
  activeType: string;
  availableTypes: ResourceType[];
};

const typeLabels: Record<ResourceType, string> = {
  platform: "Platform",
  link: "Link",
  video: "Video",
  document: "Document",
  template: "Template",
};

function buildUrl(week: string, type: string): string {
  const params = new URLSearchParams();
  if (week && week !== "all") {
    params.set("week", week);
  }
  if (type && type !== "all") {
    params.set("type", type);
  }
  const qs = params.toString();
  return qs ? `/resources?${qs}` : "/resources";
}

export function ResourceFilters({
  activeWeek,
  activeType,
  availableTypes,
}: ResourceFiltersProps) {
  const weekOptions = [
    { key: "all", label: "All" },
    { key: "general", label: "General" },
    ...Array.from({ length: site.totalWeeks }, (_, i) => {
      const num = i + 1;
      return { key: String(num), label: `Week ${num}` };
    }),
  ];

  return (
    <div className="space-y-6">
      {/* Week Filter Chips */}
      <div>
        <span
          id="week-filter-heading"
          className="block text-xs font-bold tracking-wider text-muted uppercase"
        >
          Filter by week
        </span>
        <div
          role="group"
          aria-labelledby="week-filter-heading"
          className="mt-2.5 flex flex-wrap gap-2"
        >
          {weekOptions.map((opt) => {
            const isActive = activeWeek === opt.key;
            return (
              <Link
                key={opt.key}
                href={buildUrl(opt.key, activeType)}
                aria-current={isActive ? "true" : undefined}
                className={cx(
                  "inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none",
                  isActive
                    ? "bg-navy text-white shadow-e1"
                    : "border border-line bg-surface-alt text-navy hover:border-blue/40 hover:bg-sky",
                )}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Type Filter Chips */}
      {availableTypes.length > 0 && (
        <div>
          <span
            id="type-filter-heading"
            className="block text-xs font-bold tracking-wider text-muted uppercase"
          >
            Filter by type
          </span>
          <div
            role="group"
            aria-labelledby="type-filter-heading"
            className="mt-2.5 flex flex-wrap gap-2"
          >
            <Link
              href={buildUrl(activeWeek, "all")}
              aria-current={activeType === "all" ? "true" : undefined}
              className={cx(
                "inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none",
                activeType === "all"
                  ? "bg-navy text-white shadow-e1"
                  : "border border-line bg-surface-alt text-navy hover:border-blue/40 hover:bg-sky",
              )}
            >
              All types
            </Link>
            {availableTypes.map((type) => {
              const isActive = activeType === type;
              return (
                <Link
                  key={type}
                  href={buildUrl(activeWeek, type)}
                  aria-current={isActive ? "true" : undefined}
                  className={cx(
                    "inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none",
                    isActive
                      ? "bg-navy text-white shadow-e1"
                      : "border border-line bg-surface-alt text-navy hover:border-blue/40 hover:bg-sky",
                  )}
                >
                  {typeLabels[type] ?? type}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
