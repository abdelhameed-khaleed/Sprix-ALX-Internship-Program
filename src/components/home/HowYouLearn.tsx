import { ClipboardList, Handshake, Laptop, Landmark, Video } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { learningModes, type LearningModeIcon } from "@/content/site";
import { cx } from "@/components/ui";
import { StackSection } from "./StackSection";

const icons: Record<LearningModeIcon, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  laptop: Laptop,
  clipboard: ClipboardList,
  video: Video,
  building: Landmark,
  handshake: Handshake,
};

// Varied tile colours (icy, lavender, lime, jasmine, sky) and a bento-style span pattern.
const TILE_STYLE = [
  { bg: "bg-icy", span: "lg:col-span-2 lg:row-span-2" },
  { bg: "bg-lavender", span: "lg:col-span-2" },
  { bg: "bg-lime", span: "lg:col-span-1" },
  { bg: "bg-jasmine", span: "lg:col-span-1" },
  { bg: "bg-sky", span: "lg:col-span-2" },
];

export function HowYouLearn() {
  return (
    <StackSection id="how-you-learn" tone="sky" index={2} className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-3 text-sm font-semibold tracking-wide text-blue uppercase">The rhythm of learning</p>
          <h2 className="text-3xl md:text-4xl">How you&#39;ll learn</h2>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(0,1fr)] lg:grid-cols-4">
          {learningModes.map((mode, idx) => {
            const Icon = icons[mode.icon];
            const style = TILE_STYLE[idx] ?? TILE_STYLE[TILE_STYLE.length - 1];
            const isFeature = idx === 0;
            return (
              <Reveal key={mode.title} variant="scale" delay={idx * 80} className={style.span}>
                <div
                  className={cx(
                    "group lift flex h-full min-h-[160px] flex-col justify-between rounded-card p-6 shadow-e1",
                    style.bg,
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/60 text-navy transition-transform duration-300 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6"
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="mt-6">
                    <h3 className={cx("font-bold text-navy", isFeature ? "text-2xl" : "text-lg")}>{mode.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/75">{mode.detail}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </StackSection>
  );
}
