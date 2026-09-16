"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Lockup } from "./Lockup";
import { MobileNav, type NavItem } from "./MobileNav";
import { cx } from "@/components/ui";

export const NAV_LINKS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/program", label: "Program" },
  { href: "/resources", label: "Resources" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/team", label: "Team" },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-surface">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center rounded-button py-1"
          aria-label="Home - ALX × SPRIX Professional Skills Program"
        >
          <Lockup size="md" tone="light" priority />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden h-full md:flex md:items-center md:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cx(
                  "relative flex h-full items-center text-sm font-semibold transition-colors duration-150",
                  isActive
                    ? "text-blue after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue"
                    : "text-ink hover:text-blue"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          ref={menuButtonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-button text-navy hover:bg-surface-alt md:hidden transition-colors"
        >
          {isOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile nav panel */}
      <MobileNav
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        pathname={pathname}
        links={NAV_LINKS}
      />
    </header>
  );
}
