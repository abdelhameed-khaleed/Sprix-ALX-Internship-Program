"use client";

import { useEffect, useState } from "react";

export type DemoDayNavSection = { id: string; label: string };

/**
 * Section navigation for the Final Demo Day page.
 * - Phones and tablets: a sticky chip row under the header.
 * - Desktop: a floating rail on the left edge that expands to show labels on hover.
 * Both highlight the section in view and the page shows a reading-progress bar.
 */
export function DemoDayNav({ sections }: { sections: DemoDayNavSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    // A section is "active" when it crosses the middle band of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const numberBadge = (idx: number, isActive: boolean) => (
    <span
      aria-hidden="true"
      className={[
        "flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300",
        isActive ? "bg-blue text-white shadow-e2" : "bg-white text-navy shadow-e1 group-hover:bg-blue group-hover:text-white",
      ].join(" ")}
    >
      {String(idx + 1).padStart(2, "0")}
    </span>
  );

  return (
    <>
      {/* Smooth scrolling between sections, turned off for reduced motion */}
      <style>{`html{scroll-behavior:smooth}@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}`}</style>

      {/* Reading progress, pinned to the very top of the viewport */}
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
        <div className="h-full origin-left bg-blue transition-transform duration-150 ease-out" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* Phones and tablets: sticky chip row */}
      <nav
        aria-label="On this page"
        className="sticky top-16 z-20 border-b border-line bg-white/95 backdrop-blur-md lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto px-4 py-2.5">
          {sections.map((section, idx) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={[
                    "group flex items-center gap-2.5 rounded-button px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-3 focus-visible:outline-blue",
                    isActive ? "bg-blue text-white" : "text-navy hover:bg-sky hover:text-blue",
                  ].join(" ")}
                >
                  {numberBadge(idx, isActive)}
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Desktop: floating rail on the left edge, labels appear on hover or focus */}
      <nav
        aria-label="On this page"
        className="fixed top-1/2 left-3 z-30 hidden -translate-y-1/2 lg:left-5 lg:block xl:left-8"
      >
        <ul className="flex flex-col gap-3 rounded-full border border-line bg-white/90 p-2 shadow-e2 backdrop-blur-md">
          {sections.map((section, idx) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className="group relative flex items-center focus-visible:outline-3 focus-visible:outline-blue"
                >
                  {numberBadge(idx, isActive)}
                  <span
                    className="pointer-events-none absolute left-10 origin-left rounded-button bg-navy px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-white opacity-0 shadow-e2 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 -translate-x-2"
                  >
                    {section.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
