import { ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A short closing band after the stacked-card sequence ends, pointing to the Support page.
 * Deliberately plain flow (not a StackSection) so the stack settles before the Footer.
 */
export function ClosingBand() {
  return (
    <section className="relative bg-surface-alt px-4 py-16 text-center sm:px-6 md:py-20">
      <div className="mx-auto max-w-[640px]">
        <Reveal variant="up">
          <h2 className="text-2xl md:text-3xl">Questions? Get support.</h2>
          <p className="mt-3 text-muted">
            The ALX team is one message away for anything about the program, the LMS, or your progress.
          </p>
          <div className="mt-6">
            <ButtonLink href="/support" variant="primary">
              Get support
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
