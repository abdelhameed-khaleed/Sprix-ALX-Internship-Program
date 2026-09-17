import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { HeroBackground } from "./HeroBackground";

type HeroProps = {
  /** Program-status chip text, e.g. "Starts Sun, 20 Sep" or "Now in Week 2 · Data & Research". */
  statusLabel: string;
};

export function Hero({ statusLabel }: HeroProps) {
  // Punchier two-line headline built from content, not hardcoded copy.
  const headlineLead = site.shortName;
  const headlineRest = site.name.replace(site.shortName, "").trim();
  // One short supporting line, derived from the fuller program description.
  const supportingLine = site.description.split(". ")[0] + ".";

  return (
    <section
      className="stack-section relative flex min-h-[100svh] flex-col overflow-hidden bg-navy text-white"
      style={{ zIndex: 0 }}
    >
      <HeroBackground video={site.hero.video} poster={site.hero.poster} />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pt-28 pb-20 sm:px-6 md:pt-32">
        <div className="mx-auto w-full max-w-[1200px]">
          <Reveal variant="up">
            <p className="inline-flex items-center rounded-full border border-icy/30 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-icy uppercase backdrop-blur-sm">
              {statusLabel}
            </p>
          </Reveal>

          <Reveal variant="up" delay={90}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white! sm:text-5xl lg:text-7xl">
              <span className="block">{headlineLead}</span>
              <span className="block text-icy">{headlineRest}</span>
            </h1>
          </Reveal>

          <Reveal variant="up" delay={180}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">{supportingLine}</p>
          </Reveal>

          <Reveal variant="up" delay={270}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="/program" variant="inverse">
                Explore the program
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <Link
                href="/leaderboard"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button border border-white/40 bg-white/10 px-5 py-2.5 text-base font-semibold text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20"
              >
                Top performers
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 flex justify-center pb-8" aria-hidden="true">
        <ChevronDown className="size-6 animate-bounce text-white/70 motion-reduce:animate-none" />
      </div>
    </section>
  );
}
