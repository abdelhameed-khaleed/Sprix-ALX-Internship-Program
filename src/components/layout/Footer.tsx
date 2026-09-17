import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Lockup } from "./Lockup";
import { NAV_LINKS } from "./nav-links";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/** Footer link with an animated underline that draws in on hover/focus. */
function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className =
    "group relative inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white focus-visible:text-white";
  const underline = (
    <span
      aria-hidden="true"
      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-icy transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
    />
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <ExternalLink className="size-3.5 opacity-70" aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
        {underline}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
      {underline}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      {/* Subtle top-edge reveal separating the footer from page content */}
      <Reveal variant="scale" as="div" className="absolute inset-x-0 top-0 h-px origin-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-icy/40 to-transparent" />
      </Reveal>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
        <Reveal variant="up" className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Lockup size="md" tone="dark" />
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              A professional skills program by ALX in partnership with SPRIX Edutech.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href={site.links.alx} external>
                  ALX Africa
                </FooterLink>
              </li>
            </ul>
          </nav>
        </Reveal>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/60">
          <p>© 2026 ALX × SPRIX Edutech</p>
        </div>
      </div>

      <Image
        src="/brand/patterns/Group-459.png"
        alt=""
        aria-hidden="true"
        width={300}
        height={300}
        className="pointer-events-none absolute -bottom-16 -right-16 size-64 opacity-15 select-none"
      />
    </footer>
  );
}
