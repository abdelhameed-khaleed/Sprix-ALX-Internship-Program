import Link from "next/link";
import { resourceCategories } from "@/content/resources";
import { site } from "@/content/site";
import { cx } from "@/components/ui";

type ResourceFiltersProps = {
  activeWeek: string;
  activeCategory: string;
};

function buildUrl(week: string, category: string): string {
  const params = new URLSearchParams();
  if (category && category !== "all") {
    params.set("category", category);
  }
  if (week && week !== "all") {
    params.set("week", week);
  }
  const qs = params.toString();
  return qs ? `/resources?${qs}` : "/resources";
}

const chipClass =
  "inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none";

export function ResourceFilters({ activeWeek, activeCategory }: ResourceFiltersProps) {
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
      {/* Category Filter Chips */}
      <div>
        <span
          id="category-filter-heading"
          className="block text-xs font-bold tracking-wider text-muted uppercase"
        >
          Filter by category
        </span>
        <div
          role="group"
          aria-labelledby="category-filter-heading"
          className="mt-2.5 flex flex-wrap gap-2"
        >
          <Link
            href={buildUrl(activeWeek, "all")}
            aria-current={activeCategory === "all" ? "true" : undefined}
            className={cx(
              chipClass,
              activeCategory === "all"
                ? "bg-navy text-white shadow-e1"
                : "border border-line bg-surface-alt text-navy hover:border-blue/40 hover:bg-sky",
            )}
          >
            All categories
          </Link>
          {resourceCategories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <Link
                key={cat.key}
                href={buildUrl(activeWeek, cat.key)}
                aria-current={isActive ? "true" : undefined}
                className={cx(
                  chipClass,
                  isActive
                    ? "bg-navy text-white shadow-e1"
                    : "border border-line bg-surface-alt text-navy hover:border-blue/40 hover:bg-sky",
                )}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>

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
                href={buildUrl(opt.key, activeCategory)}
                aria-current={isActive ? "true" : undefined}
                className={cx(
                  chipClass,
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
    </div>
  );
}
