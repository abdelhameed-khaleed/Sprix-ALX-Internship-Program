"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide "lazy" smooth scrolling. Lenis drives the native scroll position, so sticky
 * sections, scroll-snap-free layouts, IntersectionObserver reveals and CSS scroll-driven
 * animations keep working. Touch devices keep native scrolling; disabled for reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.08, // lower = lazier glide
      wheelMultiplier: 0.9,
      anchors: true,
    });
    // Home sets `scroll-snap-type` on <html>; snapping fights Lenis' glide, so it is dropped while Lenis runs.
    document.documentElement.classList.add("lenis-on");

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-on");
    };
  }, []);

  // New page: start at the top instead of gliding from the previous position.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
