"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "@/components/ui";
import styles from "./FaqList.module.css";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  function toggle(idx: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      {items.map((faq, idx) => {
        const isOpen = openItems.has(idx);
        const triggerId = `faq-trigger-${idx}`;
        const panelId = `faq-panel-${idx}`;
        return (
          <div
            key={idx}
            className="rounded-card border border-line bg-white shadow-e1 transition-shadow duration-200 hover:shadow-e2"
          >
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(idx)}
              className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-base font-semibold text-navy select-none hover:text-blue focus-visible:outline-none sm:text-lg"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={cx(
                  "size-5 shrink-0 text-blue transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={styles.panel}
              data-expanded={isOpen}
            >
              <div className={styles.panelInner}>
                <div className="border-t border-line/70 px-5 pt-3 pb-5 text-sm leading-relaxed text-ink sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
