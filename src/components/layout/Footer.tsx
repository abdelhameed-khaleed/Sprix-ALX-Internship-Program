import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Lockup } from "./Lockup";
import { NAV_LINKS } from "./Header";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Lockup size="md" tone="dark" />
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.links.alx}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  ALX Africa
                  <ExternalLink className="size-3.5 opacity-70" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

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
