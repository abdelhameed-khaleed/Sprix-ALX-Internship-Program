import type { Metadata } from "next";
import { ButtonLink, EmptyState, PageHero, Section } from "@/components/ui";
import { resources, type ResourceType } from "@/content/resources";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceFilters } from "@/components/resources/ResourceFilters";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access learning platforms, links, documents, videos, and templates for the ALX × SPRIX Professional Skills Program.",
};

type PageProps = {
  searchParams: Promise<{
    week?: string;
    type?: string;
  }>;
};

export default async function ResourcesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeWeek = typeof params?.week === "string" ? params.week : "all";
  const activeType = typeof params?.type === "string" ? params.type : "all";

  // Only show type chips for types that exist in the data
  const availableTypes = Array.from(new Set(resources.map((r) => r.type))) as ResourceType[];

  const filteredResources = resources.filter((item) => {
    // Week matching: "Week N" shows that week's items plus "general" items
    let matchesWeek = true;
    if (activeWeek === "general") {
      matchesWeek = item.week === "general";
    } else if (activeWeek !== "all") {
      const weekNum = Number(activeWeek);
      matchesWeek = item.week === weekNum || item.week === "general";
    }

    // Type matching
    let matchesType = true;
    if (activeType !== "all") {
      matchesType = item.type === activeType;
    }

    return matchesWeek && matchesType;
  });

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Everything you need, in one place"
        intro="Access learning tools, templates, session materials, and official program links."
        pattern="/brand/patterns/Group-460.png"
      />

      <Section id="resources-content" tone="white">
        {/* Filters */}
        <div className="mb-10 rounded-card border border-line bg-surface p-5 shadow-e1 sm:p-6">
          <ResourceFilters
            activeWeek={activeWeek}
            activeType={activeType}
            availableTypes={availableTypes}
          />
        </div>

        {/* Resources Grid or Empty State */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No resources here yet"
            action={
              <ButtonLink href="/resources" variant="primary">
                Show all resources
              </ButtonLink>
            }
          >
            We couldn&apos;t find any resources matching your selected filters. Try
            choosing a different week or type, or reset the filters.
          </EmptyState>
        )}

        {/* Muted note under the grid */}
        <p className="mt-12 text-center text-sm text-muted">
          New resources are added as the program progresses.
        </p>
      </Section>
    </>
  );
}
