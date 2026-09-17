"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "fade";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Delay in ms, handy for staggering siblings (e.g. index * 80). */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Animates its children in once they scroll into view.
 * Styling lives in globals.css ([data-reveal]); content stays visible without JS
 * and for users who prefer reduced motion.
 */
export function Reveal({ children, variant = "up", delay = 0, as: Tag = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.revealArmed = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal={variant} style={{ transitionDelay: `${delay}ms` }} className={className}>
      {children}
    </Tag>
  );
}
