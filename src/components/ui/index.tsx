import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

/* ---------- Button ---------- */

type ButtonVariant = "primary" | "secondary" | "inverse" | "text";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue text-white shadow-e1 hover:bg-blue-dark hover:shadow-e2",
  secondary: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  inverse: "bg-white text-navy shadow-e1 hover:bg-sky hover:shadow-e2",
  text: "px-0! text-blue underline-offset-4 hover:underline",
};

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

/** Link styled as a button. External links open in a new tab and say so to screen readers. */
export function ButtonLink({ href, variant = "primary", external, children, className, ...rest }: ButtonLinkProps) {
  const classes = cx(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-button px-5 py-2.5 text-base font-semibold transition-[background-color,color,box-shadow] duration-200",
    buttonStyles[variant],
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/* ---------- Section ---------- */

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  tone?: "white" | "alt" | "navy";
  children: ReactNode;
  className?: string;
};

/** Full-width page band with a centred 1200px container and optional heading block. */
export function Section({ id, eyebrow, title, intro, tone = "white", children, className }: SectionProps) {
  const toneClass = { white: "bg-surface", alt: "bg-surface-alt", navy: "bg-navy text-white" }[tone];
  const headingId = id && title ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cx("px-4 py-16 sm:px-6 md:py-24", toneClass, className)}>
      <div className="mx-auto max-w-[1200px]">
        {(eyebrow || title || intro) && (
          <header className="mb-10 max-w-2xl md:mb-14">
            {eyebrow && (
              <p className={cx("mb-3 text-sm font-semibold tracking-wide uppercase", tone === "navy" ? "text-icy" : "text-blue")}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 id={headingId} className={cx("text-3xl md:text-4xl", tone === "navy" && "text-white!")}>
                {title}
              </h2>
            )}
            {intro && <div className={cx("mt-4 text-lg", tone === "navy" ? "text-white/85" : "text-muted")}>{intro}</div>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------- Card ---------- */

export function Card({ children, className, interactive }: { children: ReactNode; className?: string; interactive?: boolean }) {
  return (
    <div
      className={cx(
        "rounded-card border border-line bg-white p-6 shadow-e1",
        interactive && "transition-shadow duration-200 hover:shadow-e3",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------- Badge ---------- */

type BadgeTone = "blue" | "green" | "sun" | "purple" | "navy";

const badgeStyles: Record<BadgeTone, string> = {
  blue: "bg-sky text-navy",
  green: "bg-lime text-navy",
  sun: "bg-jasmine text-navy",
  purple: "bg-lavender text-navy",
  navy: "bg-navy text-white",
};

export function Badge({ children, tone = "blue", className }: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", badgeStyles[tone], className)}>
      {children}
    </span>
  );
}

/* ---------- IconTile ---------- */

/** Rounded square holding a lucide icon; decorative (aria-hidden). */
export function IconTile({ children, tone = "blue" }: { children: ReactNode; tone?: BadgeTone }) {
  return (
    <span aria-hidden="true" className={cx("inline-flex size-12 shrink-0 items-center justify-center rounded-xl", badgeStyles[tone])}>
      {children}
    </span>
  );
}

/* ---------- EmptyState ---------- */

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-card border-2 border-dashed border-line bg-surface-alt px-6 py-12 text-center">
      <h3 className="text-xl">{title}</h3>
      {children && <div className="mx-auto mt-2 max-w-md text-muted">{children}</div>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* ---------- PageHero ---------- */

/** Compact navy hero for inner pages. Decorative ALX pattern tile on large screens only. */
export function PageHero({ eyebrow, title, intro, pattern = "/brand/patterns/Group-459.png" }: { eyebrow?: string; title: string; intro?: ReactNode; pattern?: string }) {
  return (
    <div className="relative overflow-hidden bg-navy px-4 py-14 text-white sm:px-6 md:py-20">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        {eyebrow && <p className="mb-3 text-sm font-semibold tracking-wide text-icy uppercase">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl text-white! md:text-5xl">{title}</h1>
        {intro && <div className="mt-4 max-w-2xl text-lg text-white/85">{intro}</div>}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={pattern} alt="" aria-hidden="true" className="absolute top-0 right-0 hidden h-full w-auto md:block" />
    </div>
  );
}

export { cx };
