import Image from "next/image";
import { BadgeCheck, Presentation, Users } from "lucide-react";
import { ButtonLink, cx } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { completionRequirements, type RequirementIcon } from "@/content/site";

const icons: Record<RequirementIcon, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  verified: BadgeCheck,
  users: Users,
  presentation: Presentation,
};

type CompletionRequirementsProps = {
  /** "home" stacks this into the Home page's sticky-card sequence; "page" (default) renders
   * it as a standalone navy band for reuse on /program. */
  variant?: "home" | "page";
};

/**
 * Completion requirements, built to feel strong: split hero-style layout with the graduates
 * photo + a floating "Certificate of Completion" badge on one side, and a numbered,
 * checklist-style walkthrough of the three requirements on the other, connected by a line
 * that draws in as it scrolls into view.
 */
export function CompletionRequirements({ variant = "page" }: CompletionRequirementsProps) {
  const isHome = variant === "home";

  return (
    <section
      id="completion-requirements"
      aria-labelledby="completion-requirements-heading"
      className={cx(
        "relative overflow-hidden bg-navy px-4 py-16 text-white sm:px-6 md:py-24",
        isHome && "stack-section rounded-t-[2rem] shadow-e3",
      )}
      style={isHome ? { zIndex: 6 } : undefined}
    >
      {/* Green/lime ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-green/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-lime/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-12">
        {/* Photo + floating certificate badge (stacks above copy on mobile) */}
        <Reveal variant="left" className="order-1 lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-card shadow-e3">
              <Image
                src="/media/graduates.webp"
                alt="Two smiling ALX graduates at the ALX hub, one holding a “Congratulations Graduate” sign, with ALX bunting behind them"
                width={1600}
                height={1066}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="h-auto w-full object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/5 to-transparent" />
            </div>

            <div className="absolute -right-2 -bottom-6 max-w-[210px] rounded-card border border-line bg-white p-4 text-navy shadow-e3 sm:-right-6">
              <span aria-hidden="true" className="inline-flex size-9 items-center justify-center rounded-lg bg-lime text-navy">
                <BadgeCheck className="size-5" aria-hidden />
              </span>
              <p className="mt-2 text-sm font-bold">Certificate of Completion</p>
              <p className="mt-0.5 text-xs text-muted">Awarded at graduation</p>
            </div>
          </div>
        </Reveal>

        {/* Copy + numbered checklist */}
        <div className="order-2 lg:col-span-7">
          <Reveal variant="up">
            <p className="mb-3 text-sm font-semibold tracking-wide text-lime uppercase">Completion requirements</p>
            <h2 id="completion-requirements-heading" className="text-3xl text-white! md:text-4xl">
              Earn your certificate
            </h2>
          </Reveal>

          <ol className="mt-10 flex flex-col">
            {completionRequirements.map((item, idx) => {
              const Icon = icons[item.icon];
              const isLast = idx === completionRequirements.length - 1;
              return (
                <li key={item.title} className="relative flex gap-5 pb-10 last:pb-0">
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="connector-line absolute top-12 left-6 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-lime/70 to-lime/10"
                    />
                  )}
                  <Reveal variant="scale" delay={idx * 140} className="relative z-10 shrink-0">
                    <span
                      aria-hidden="true"
                      className="flex size-12 items-center justify-center rounded-full border border-lime/40 bg-white/10 text-lime backdrop-blur-sm"
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                  </Reveal>
                  <Reveal variant="right" delay={idx * 140 + 60} className="pt-1">
                    <span className="text-xs font-bold tracking-widest text-lime/80">0{idx + 1}</span>
                    <h3 className="mt-1 text-lg font-bold text-white!">{item.title}</h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-white/75">{item.detail}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <p className="mt-2 text-sm font-semibold text-lime">All three are required to graduate.</p>

          <div className="mt-8">
            {isHome ? (
              <ButtonLink href="/program" variant="inverse">
                See the full program
              </ButtonLink>
            ) : (
              <ButtonLink href="/support" variant="inverse">
                Questions? Get support
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
