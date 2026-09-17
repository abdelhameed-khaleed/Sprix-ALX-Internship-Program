import type { ReactNode } from "react";
import { cx } from "@/components/ui";

export type StackTone = "white" | "sky" | "lavender" | "icy" | "navy";

const toneClasses: Record<StackTone, string> = {
  white: "bg-surface text-ink",
  sky: "bg-sky text-ink",
  // Stacked sections cover each other, so every tone must be fully opaque: mix the tint into white instead of using alpha.
  lavender: "bg-[color-mix(in_srgb,var(--color-lavender)_50%,var(--color-surface))] text-ink",
  icy: "bg-[color-mix(in_srgb,var(--color-icy)_40%,var(--color-surface))] text-ink",
  navy: "bg-navy text-white",
};

type StackSectionProps = {
  id: string;
  tone?: StackTone;
  /** Stacking order on Home; later sections need a higher index to slide over earlier ones. */
  index: number;
  className?: string;
  children: ReactNode;
};

/**
 * A "card" section for the Home page's stacked-scroll effect: rounded top corners, an
 * elevation shadow, and (on md+ screens, on Home only, and never under reduced motion) a
 * sticky position so the next section slides up and covers it. Plain, unstyled block flow
 * everywhere else — see the `.stack-section` rules in globals.css.
 */
export function StackSection({ id, tone = "white", index, className, children }: StackSectionProps) {
  return (
    <section
      id={id}
      className={cx("stack-section relative rounded-t-[2rem] shadow-e3", toneClasses[tone], className)}
      style={{ zIndex: index }}
    >
      {children}
    </section>
  );
}
