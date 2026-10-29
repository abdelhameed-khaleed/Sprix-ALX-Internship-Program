"use client";

import { useEffect, useState } from "react";

export type DemoDayNavSection = { id: string; label: string };

/**
 * Sticky section navigation for the Final Demo Day page.
 * Highlights the section currently in view and shows a reading-progress bar.
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

  return (
    <>
      {/* Reading progress, pinned to the very top of the viewport */}
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
        <div
          className="h-full origin-left bg-blue transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <nav
        aria-label="On this page"
        className="sticky top-16 z-20 -mx-4 border-b border-line bg-white/95 backdrop-blur-md sm:-mx-6 lg:top-24 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:backdrop-blur-none"
      >
        <div className="lg:rounded-card lg:border lg:border-line lg:bg-surface lg:p-4 lg:shadow-e2">
          <p className="hidden px-2 pb-3 text-xs font-bold tracking-wider text-muted uppercase lg:block">
            On this page
          </p>
          <ul className="flex gap-2 overflow-x-auto px-4 py-2.5 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:py-0">
            {sections.map((section, idx) => {
              const isActive = section.id === activeId;
              return (
                <li key={section.id} className="shrink-0 lg:shrink">
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={[
                      "group flex items-center gap-3 rounded-button px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-300 ease-out focus-visible:outline-3 focus-visible:outline-blue",
                      isActive
                        ? "bg-blue text-white shadow-e2 lg:translate-x-1"
                        : "text-navy hover:bg-sky hover:text-blue lg:hover:translate-x-1",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "flex size-6 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-300",
                        isActive ? "bg-white/20 text-white" : "bg-icy/70 text-navy group-hover:bg-blue group-hover:text-white",
                      ].join(" ")}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
