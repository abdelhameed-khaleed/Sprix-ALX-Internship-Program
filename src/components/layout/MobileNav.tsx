"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cx } from "@/components/ui";

export type NavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  links: readonly NavItem[];
};

export function MobileNav({ isOpen, onClose, pathname, links }: MobileNavProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col border-t border-line bg-surface md:hidden"
    >
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
          {links.map((link, index) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={onClose}
                className={cx(
                  "flex min-h-11 items-center rounded-button px-4 py-3 text-base font-semibold transition-colors",
                  isActive
                    ? "bg-sky text-blue"
                    : "text-ink hover:bg-surface-alt hover:text-blue"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
