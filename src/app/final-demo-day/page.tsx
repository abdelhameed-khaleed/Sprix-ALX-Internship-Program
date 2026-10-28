import type { Metadata } from "next";
import { CalendarDays, CheckCircle2, Clock, MapPin, Scale, Sparkles, Timer, Trophy, Presentation } from "lucide-react";
import { IconTile, PageHero, Section } from "@/components/ui";
import { demoDay } from "@/content/final-demo-day";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Final Demo Day",
  description: "Everything you need to know about the ALX × SPRIX Final Demo Day: the mission, slide structure, steps, rules and judging.",
};

const detailIcons: Record<string, typeof CalendarDays> = {
  "Submit by": Clock,
  Arrive: Timer,
  "Presentation length": Presentation,
  Date: CalendarDays,
  Time: Clock,
  Venue: MapPin,
};

const judgingIcons = [Presentation, Sparkles, Trophy];

// Brand-safe tints for cards: all pastel backgrounds with navy text.
const tints = ["bg-sky", "bg-icy/60", "bg-lavender", "bg-lime/70", "bg-jasmine/70", "bg-sky"];

export default function FinalDemoDayPage() {
  const details = demoDay.details.filter((detail) => detail.value);

  return (
    <>
      <PageHero eyebrow="Final Demo Day" title="Final Demo Day" intro={demoDay.intro} />

      {/* Key dates and rules */}
      <Section id="details" tone="white" eyebrow="At a glance" title="Key details">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((detail, idx) => {
            const Icon = detailIcons[detail.label] ?? CalendarDays;
            return (
              <Reveal key={idx} delay={idx * 60}>
                <div className="group flex h-full items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-e1 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-e2">
                  <IconTile tone="blue">
                    <Icon className="size-6 text-navy transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  </IconTile>
                  <div>
                    <p className="text-xs font-bold tracking-wider text-muted uppercase">{detail.label}</p>
                    <p className="mt-1 text-lg font-bold text-navy">{detail.value}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        {details.length === 0 && <p className="text-ink">Date, time and venue are being finalised. Check back soon.</p>}
      </Section>

      {/* Mission */}
      <Section id="mission" tone="alt" eyebrow="The brief" title={demoDay.mission.title}>
        <Reveal>
          <div className="relative overflow-hidden rounded-card bg-navy p-8 text-white shadow-e2 sm:p-10">
            <Sparkles aria-hidden="true" className="absolute top-6 right-6 size-16 text-icy/30" />
            <p className="max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{demoDay.mission.description}</p>
          </div>
        </Reveal>
      </Section>

      {/* Slide structure, now before the steps */}
      <Section id="slides" tone="white" eyebrow="Your deck" title="What goes on the slides" intro="Eight to twelve slides. A part can take more than one slide if needed.">
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {demoDay.slideStructure.map((slide, idx) => (
            <Reveal key={idx} delay={idx * 50}>
              <li className={`group relative h-full overflow-hidden rounded-card border border-line p-6 shadow-e1 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-e2 ${tints[idx % tints.length]}`}>
                <span aria-hidden="true" className="block text-5xl leading-none font-light text-navy/25 transition-colors duration-300 group-hover:text-blue/60">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-navy">{slide.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{slide.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Steps */}
      <Section id="steps" tone="alt" eyebrow="Steps" title="How to get there">
        <ol className="relative grid grid-cols-1 gap-5 md:grid-cols-2">
          {demoDay.steps.map((step, idx) => (
            <Reveal key={idx} delay={idx * 40}>
              <li className="group flex h-full items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-e1 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-e2">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue text-base font-bold text-white transition-transform duration-300 group-hover:scale-110">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Design rules */}
      <Section id="design" tone="white" eyebrow="Design" title="Design rules">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {demoDay.designRules.map((rule, idx) => (
            <Reveal key={idx} delay={idx * 40}>
              <li className="flex items-start gap-3 rounded-button border border-line bg-sky/50 px-4 py-3.5 transition-colors duration-200 hover:bg-icy/60">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden="true" />
                <span className="text-ink">{rule}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Judging */}
      <Section id="judging" tone="alt" eyebrow="Judging" title="How you will be judged">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {demoDay.judging.map((item, idx) => {
            const Icon = judgingIcons[idx] ?? Scale;
            return (
              <Reveal key={idx} delay={idx * 60}>
                <li className={`group h-full rounded-card border border-line p-6 shadow-e1 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-e2 ${tints[idx % tints.length]}`}>
                  <Icon className="size-8 text-blue transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{item.description}</p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {/* Submission and logistics notes */}
      <Section id="notes" tone="navy" eyebrow="Submission" title="Good to know">
        <ul className="max-w-3xl space-y-4">
          {demoDay.importantNotes.map((note, idx) => (
            <li key={idx} className="flex items-start gap-3 text-white/90">
              <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-icy" />
              <span className="text-lg">{note}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
