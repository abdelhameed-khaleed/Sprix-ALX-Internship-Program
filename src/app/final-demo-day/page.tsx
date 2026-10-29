import type { Metadata } from "next";
import { CalendarDays, Clock, FolderUp, MapPin, Scale, Sparkles, Timer, Trophy, Presentation } from "lucide-react";
import { ButtonLink, IconTile, PageHero, Section } from "@/components/ui";
import { demoDay } from "@/content/final-demo-day";
import { Reveal } from "@/components/motion/Reveal";
import { DemoDayNav } from "@/components/demo-day/DemoDayNav";
import { Countdown } from "@/components/demo-day/Countdown";

export const metadata: Metadata = {
  title: "Final Demo Day",
  description: "Everything you need to know about the ALX × SPRIX Final Demo Day: the mission, slide structure, steps, prizes, judging and how to submit.",
};

const detailIcons: Record<string, typeof CalendarDays> = {
  "Demo day": CalendarDays,
  "Submit by": Clock,
  Arrive: Timer,
  "Presentation length": Presentation,
  Time: Clock,
  Venue: MapPin,
};

const judgingIcons = [Presentation, Sparkles, Trophy];
const prizeIcons = [Trophy, Sparkles];

// Brand-safe tints for cards: all pastel backgrounds with navy text.
const tints = ["bg-sky", "bg-icy/60", "bg-lavender", "bg-lime/70", "bg-jasmine/70", "bg-sky"];

// Section links for the page navigation. Ids must match the Section ids below.
const pageSections = [
  { id: "details", label: "Key details" },
  { id: "mission", label: "The brief" },
  { id: "slides", label: "What goes on the slides" },
  { id: "steps", label: "How to get there" },
  { id: "prizes", label: "Prizes" },
  { id: "judging", label: "How you will be judged" },
  { id: "submit", label: "How to submit" },
];

export default function FinalDemoDayPage() {
  const details = demoDay.details.filter((detail) => detail.value);

  return (
    <>
      <PageHero eyebrow="Final Demo Day" title="Final Demo Day" intro={demoDay.intro} />

      <DemoDayNav sections={pageSections} />

      <div>
          {/* Key dates, live countdown and rules */}
          <Section id="details" tone="white" eyebrow="At a glance" title="Key details" className="scroll-mt-24">
            <Reveal>
              <div className="mb-8">
                <Countdown deadlineIso={demoDay.submission.deadlineIso} label="Submissions close in" />
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
          </Section>

          {/* Mission, rewritten from the guide */}
          <Section id="mission" tone="alt" eyebrow="The brief" title={demoDay.mission.title} className="scroll-mt-24">
            <Reveal>
              <div className="relative overflow-hidden rounded-card bg-navy p-8 text-white shadow-e2 sm:p-10">
                <Sparkles aria-hidden="true" className="absolute top-6 right-6 size-16 text-icy/30 motion-safe:animate-pulse" />
                <p className="max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{demoDay.mission.intro}</p>
                <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {demoDay.mission.parts.map((part, idx) => (
                    <li key={idx} className="group rounded-button bg-white/10 p-5 transition-colors duration-300 hover:bg-white/15">
                      <p className="text-xs font-bold tracking-wider text-icy uppercase">Part {idx + 1}</p>
                      <h3 className="mt-1 text-xl font-bold text-white">{part.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/85">{part.description}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/85">{demoDay.mission.closing}</p>
              </div>
            </Reveal>
          </Section>

          {/* Slide structure */}
          <Section id="slides" tone="white" eyebrow="Your deck" title="What goes on the slides" intro="Eight to twelve slides. A part can take more than one slide if needed." className="scroll-mt-24">
            <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {demoDay.slideStructure.map((slide, idx) => (
                <Reveal key={idx} delay={idx * 50}>
                  <li className={`group relative h-full overflow-hidden rounded-card border border-line p-6 shadow-e1 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-e2 ${tints[idx % tints.length]}`}>
                    <span aria-hidden="true" className="block text-5xl leading-none font-light text-navy/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue/70">
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
          <Section id="steps" tone="alt" eyebrow="Steps" title="How to get there" className="scroll-mt-24">
            <ol className="relative grid grid-cols-1 gap-5 md:grid-cols-2">
              {demoDay.steps.map((step, idx) => (
                <Reveal key={idx} delay={idx * 40}>
                  <li className="group flex h-full items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-e1 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-e2">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue text-base font-bold text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-navy">
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

          {/* Prizes */}
          <Section id="prizes" tone="white" eyebrow="Prizes" title="What we are awarding" className="scroll-mt-24">
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {demoDay.prizes.map((prize, idx) => {
                const Icon = prizeIcons[idx] ?? Trophy;
                return (
                  <Reveal key={idx} delay={idx * 60}>
                    <li className={`group flex h-full items-start gap-5 rounded-card border border-line p-8 shadow-e1 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-e2 ${tints[idx % tints.length]}`}>
                      <Icon className="size-10 shrink-0 text-blue transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true" />
                      <div>
                        <h3 className="text-xl font-bold text-navy">{prize.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink/80">{prize.description}</p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </Section>

          {/* Judging */}
          <Section id="judging" tone="alt" eyebrow="Judging" title="How you will be judged" className="scroll-mt-24">
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {demoDay.judging.map((item, idx) => {
                const Icon = judgingIcons[idx] ?? Scale;
                return (
                  <Reveal key={idx} delay={idx * 60}>
                    <li className={`group h-full rounded-card border border-line p-6 shadow-e1 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-e2 ${tints[idx % tints.length]}`}>
                      <Icon className="size-8 text-blue transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true" />
                      <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/80">{item.description}</p>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </Section>

          {/* How to submit */}
          <Section id="submit" tone="navy" eyebrow="Submission" title={demoDay.submission.title} className="scroll-mt-24">
            <Reveal>
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-5">
                  <IconTile tone="blue">
                    <FolderUp className="size-6 text-navy" aria-hidden="true" />
                  </IconTile>
                  <p className="max-w-2xl text-lg leading-relaxed text-white/90">{demoDay.submission.description}</p>
                </div>
                <ButtonLink href={demoDay.submission.folderUrl} external variant="inverse" className="shrink-0">
                  Open the Drive folder
                </ButtonLink>
              </div>
            </Reveal>
          </Section>
      </div>
    </>
  );
}
