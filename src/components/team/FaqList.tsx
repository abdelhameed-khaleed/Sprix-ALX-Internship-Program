import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="space-y-4">
      {items.map((faq, idx) => (
        <details
          key={idx}
          className="group rounded-card border border-line bg-white p-5 shadow-e1 transition-shadow duration-200 hover:shadow-e2"
        >
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-navy select-none sm:text-lg hover:text-blue focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none">
            <span>{faq.question}</span>
            <ChevronDown
              className="size-5 shrink-0 text-blue transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="mt-3 border-t border-line/70 pt-3 text-sm leading-relaxed text-ink sm:text-base">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
