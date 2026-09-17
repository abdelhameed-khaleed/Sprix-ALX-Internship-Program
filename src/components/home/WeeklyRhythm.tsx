import { AlarmClock, Landmark, Video } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { weeklyCadence, type CadenceIcon } from "@/content/site";
import { cx } from "@/components/ui";
import { StackSection } from "./StackSection";

const icons: Record<CadenceIcon, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  video: Video,
  building: Landmark,
  alarm: AlarmClock,
};

const BAND_STYLE = ["bg-blue", "bg-purple", "bg-green"];

export function WeeklyRhythm() {
  return (
    <StackSection id="weekly-rhythm" tone="lavender" index={3} className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-3 text-sm font-semibold tracking-wide text-blue uppercase">Every week, without fail</p>
          <h2 className="text-3xl md:text-4xl">Your weekly rhythm</h2>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {weeklyCadence.map((item, idx) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} variant="up" delay={idx * 100}>
                <div className="lift h-full overflow-hidden rounded-card bg-white shadow-e1">
                  <div aria-hidden="true" className={cx("h-2 w-full", BAND_STYLE[idx] ?? "bg-blue")} />
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-surface-alt text-navy">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="text-sm font-semibold text-muted">{item.day}</span>
                    </div>
                    <p className="mt-6 text-4xl leading-none font-light tracking-tight text-navy sm:text-5xl">{item.time}</p>
                    <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      Location: <span className="font-semibold text-ink">{item.where}</span>
                    </p>
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
