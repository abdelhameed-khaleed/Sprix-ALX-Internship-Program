"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Lockup } from "./Lockup";
import { MobileNav } from "./MobileNav";
import { NAV_LINKS } from "./nav-links";
import { cx } from "@/components/ui";

/** Header height in px. Kept constant across every visual state so layout offsets stay simple. */
const HEADER_HEIGHT_PX = 64;
/** Scroll distance (px) before the transparent hero header turns into the frosted bar. */
const SCROLL_TOP_THRESHOLD = 24;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const focusWithinRef = useRef(false);

  const activeHref =
    NAV_LINKS.find((link) => (link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(link.href + "/")))?.href ??
    "/";

  // Transparent-over-hero only at the very top of Home; frosted bar everywhere else.
  const transparent = isHome && !scrolled;

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Force the header visible whenever the mobile menu opens.
  useEffect(() => {
    if (isOpen) setHidden(false);
  }, [isOpen]);

  // Never hide while focus is inside the header (keyboard users tabbing through nav links).
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const onFocusIn = () => {
      focusWithinRef.current = true;
      setHidden(false);
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!el.contains(event.relatedTarget as Node | null)) {
        focusWithinRef.current = false;
      }
    };
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // rAF-throttled scroll tracking: background state + hide-on-scroll-down (after the hero).
  useEffect(() => {
    let rafId = 0;
    let lastY = window.scrollY;

    const update = () => {
      rafId = 0;
      const y = window.scrollY;
      setScrolled(y > SCROLL_TOP_THRESHOLD);

      // On Home, only start hiding once the (100svh) hero has scrolled past; on inner
      // pages there's no full-height hero, so a small scroll is enough.
      const pastHero = isHome ? y > window.innerHeight * 0.8 : y > SCROLL_TOP_THRESHOLD;

      if (!isOpen && !focusWithinRef.current) {
        if (pastHero) {
          setHidden(y > lastY);
        } else {
          setHidden(false);
        }
      }
      lastY = y;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHome, isOpen]);

  // Slide the active-link indicator under whichever nav link is current.
  const measureIndicator = useCallback(() => {
    const activeLink = linkRefs.current[activeHref];
    const nav = navRef.current;
    if (!activeLink || !nav) {
      setIndicator(null);
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
  }, [activeHref]);

  useEffect(() => {
    measureIndicator();
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  return (
    <>
      <header
        ref={headerRef}
        className={cx(
          "fixed inset-x-0 top-0 z-50 w-full transition-[background-color,box-shadow,border-color,transform] duration-300",
          transparent ? "border-b border-transparent bg-transparent" : "border-b border-line/70 bg-white/75 shadow-e1 backdrop-blur-md",
          hidden ? "-translate-y-full" : "translate-y-0",
        )}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-button py-1"
            aria-label="Home - ALX × SPRIX Professional Skills Program"
          >
            <Lockup size="md" tone={transparent ? "dark" : "light"} priority />
          </Link>

          {/* Desktop navigation */}
          <nav ref={navRef} aria-label="Main navigation" className="relative hidden h-full md:flex md:items-center md:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === activeHref;
              return (
                <Link
                  key={link.href}
                  ref={(node) => {
                    linkRefs.current[link.href] = node;
                  }}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cx(
                    "relative flex h-full items-center text-sm font-semibold transition-colors duration-200",
                    transparent
                      ? isActive
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                      : isActive
                        ? "text-blue"
                        : "text-ink hover:text-blue",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <span
              aria-hidden="true"
              className={cx(
                "pointer-events-none absolute bottom-0 h-[2px] rounded-full transition-[transform,width,opacity] duration-300",
                transparent ? "bg-white" : "bg-blue",
                indicator ? "opacity-100" : "opacity-0",
              )}
              style={{
                width: indicator?.width ?? 0,
                transform: `translateX(${indicator?.left ?? 0}px)`,
                transitionTimingFunction: "var(--ease-out-expo)",
              }}
            />
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={cx(
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-button transition-colors md:hidden",
              transparent ? "text-white hover:bg-white/10" : "text-navy hover:bg-surface-alt",
            )}
          >
            {isOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile nav panel */}
        <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} pathname={pathname} links={NAV_LINKS} />
      </header>

      {/* The header is fixed and overlays the Home hero on purpose; every other page needs
          its content pushed below it since it has no full-bleed hero to sit under. */}
      {!isHome && <div aria-hidden="true" style={{ height: HEADER_HEIGHT_PX }} />}
    </>
  );
}
