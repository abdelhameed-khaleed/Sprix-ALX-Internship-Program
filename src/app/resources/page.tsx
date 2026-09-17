import type { Metadata } from "next";
import { FolderOpen, Landmark, Presentation, Video } from "lucide-react";
import { EmptyState, IconTile, PageHero, Section } from "@/components/ui";
import { resources, resourceCategories, type ResourceCategory } from "@/content/resources";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access walkthrough recordings, slides, Friday session materials and other resources for the ALX × SPRIX Professional Skills Program.",
};

const categoryIconMap: Record<ResourceCategory, typeof Video> = {
  "walkthrough-recording": Video,
  slides: Presentation,
  "friday-session": Landmark,
  other: FolderOpen,
};

type PageProps = {
  searchParams: Promise<{
    category?: string;
    week?: string;
  }>;
};

function matchesWeek(week: number | "general", activeWeek: string): boolean {
  if (activeWeek === "general") return week === "general";
  if (activeWeek === "all") return true;
  return week === Number(activeWeek) || week === "general";
}

export default async function ResourcesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeWeek = typeof params?.week === "string" ? params.week : "all";
  const requestedCategory = typeof params?.category === "string" ? params.category : "all";
  const activeCategory =
    requestedCategory === "all" || resourceCategories.some((c) => c.key === requestedCategory)
      ? requestedCategory
      : "all";

  const categoriesToRender =
    activeCategory === "all"
      ? resourceCategories
      : resourceCategories.filter((c) => c.key === activeCategory);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Everything you need, in one place"
        intro="Walkthrough recordings, slides, Friday session materials and official program links — organised by category and week."
        pattern="/brand/patterns/Group-460.png"
      />

      <Section id="resources-content" tone="white">
        {/* Filters */}
        <div className="mb-10 rounded-card border border-line bg-surface p-5 shadow-e1 sm:p-6">
          <ResourceFilters activeWeek={activeWeek} activeCategory={activeCategory} />
        </div>

        <div className="space-y-14">
          {categoriesToRender.map((cat, catIdx) => {
            const Icon = categoryIconMap[cat.key] ?? FolderOpen;
            const items = resources.filter(
              (item) => item.category === cat.key && matchesWeek(item.week, activeWeek),
            );

            return (
              <Reveal key={cat.key} delay={catIdx * 60} as="div">
                <div id={`category-${cat.key}`} className="scroll-mt-24">
                  <div className="mb-6 flex items-start gap-4">
                    <IconTile tone="blue">
                      <Icon className="size-6 text-navy" aria-hidden="true" />
                    </IconTile>
                    <div>
                      <h2 className="text-xl font-bold text-navy sm:text-2xl">{cat.label}</h2>
                      <p className="mt-1 text-sm text-muted">{cat.description}</p>
                    </div>
                  </div>

                  {items.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((resource, idx) => (
                        <Reveal key={resource.id} delay={idx * 70} as="div">
                          <ResourceCard resource={resource} />
                        </Reveal>
                      ))}
                    </div>
                  ) : (
                    <EmptyState title="Nothing here yet">{cat.emptyMessage}</EmptyState>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Muted note under the grid */}
        <p className="mt-14 text-center text-sm text-muted">
          New resources are added as the program progresses.
        </p>
      </Section>
    </>
  );
}
