import { ButtonLink, Badge, EmptyState } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { Podium } from "@/components/leaderboard/Podium";
import type { RankedEntry } from "@/lib/leaderboard";
import { StackSection } from "./StackSection";

type TopPerformersTeaserProps = {
  entries: RankedEntry[];
  isSample?: boolean;
};

export function TopPerformersTeaser({ entries, isSample }: TopPerformersTeaserProps) {
  return (
    <StackSection id="top-performers" tone="white" index={5} className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 flex max-w-2xl flex-wrap items-center gap-3 md:mb-14">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide text-blue uppercase">Weekly leaderboard</p>
            <h2 className="text-3xl md:text-4xl">Top performers</h2>
          </div>
          {isSample && <Badge tone="purple">Sample data</Badge>}
        </header>

        {entries.length > 0 ? (
          <div>
            <Reveal variant="up">
              <Podium entries={entries} />
            </Reveal>
            <div className="mt-8 text-center">
              <ButtonLink href="/leaderboard" variant="secondary">
                View full leaderboard
              </ButtonLink>
            </div>
          </div>
        ) : (
          <EmptyState
            title="Top performers are announced weekly"
            action={
              <ButtonLink href="/leaderboard" variant="secondary">
                View leaderboard
              </ButtonLink>
            }
          >
            <p>The first leaderboard goes live after Week 1.</p>
          </EmptyState>
        )}
      </div>
    </StackSection>
  );
}
