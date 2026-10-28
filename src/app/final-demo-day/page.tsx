import type { Metadata } from "next";
import { CalendarDays, CheckCircle2, Clock, MapPin, Timer } from "lucide-react";
import { IconTile, PageHero, Section } from "@/components/ui";
import { demoDay } from "@/content/final-demo-day";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Final Demo Day",
  description: "Everything you need to know about the ALX × SPRIX Final Demo Day: the mission, steps, slide structure, rules and judging.",
};

const detailIcons: Record<string, typeof CalendarDays> = {
  "Submit by": Clock,
  Arrive: Timer,
  "Presentation length": Timer,
  Date: CalendarDays,
  Time: Clock,
  Venue: MapPin,
};

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
                <div className="flex h-full items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-e1">
                  <IconTile tone="blue">
                    <Icon className="size-6 text-navy" aria-hidden="true" />
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
          <p className="max-w-3xl text-lg leading-relaxed text-ink">{demoDay.mission.description}</p>
        </Reveal>
      </Section>

      {/* Steps */}
      <Section id="steps" tone="white" eyebrow="Steps" title="How to get there">
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {demoDay.steps.map((step, idx) => (
            <Reveal key={idx} delay={idx * 40}>
              <li className="flex h-full items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-e1">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">
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

      {/* Slide structure */}
      <Section id="slides" tone="alt" eyebrow="Your deck" title="What goes on the slides" intro="Eight to twelve slides. A part can take more than one slide if needed.">
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {demoDay.slideStructure.map((slide, idx) => (
            <Reveal key={idx} delay={idx * 40}>
              <li className="h-full rounded-card border border-line bg-surface p-6 shadow-e1">
                <p className="text-xs font-bold tracking-wider text-blue uppercase">Slide {idx + 1}</p>
                <h3 className="mt-1 text-lg font-bold text-navy">{slide.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{slide.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Design rules */}
      <Section id="design" tone="white" eyebrow="Design" title="Design rules">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {demoDay.designRules.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-3 rounded-button border border-line bg-white px-4 py-3.5">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green" aria-hidden="true" />
              <span className="text-ink">{rule}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Judging */}
      <Section id="judging" tone="alt" eyebrow="Judging" title="How you will be judged">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {demoDay.judging.map((item, idx) => (
            <Reveal key={idx} delay={idx * 60}>
              <li className="h-full rounded-card border border-line bg-sky/40 p-6 shadow-e1">
                <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Submission and logistics notes */}
      <Section id="notes" tone="white" eyebrow="Submission" title="Good to know">
        <ul className="max-w-3xl space-y-3">
          {demoDay.importantNotes.map((note, idx) => (
            <li key={idx} className="flex items-start gap-3 text-ink">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-blue" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
