import type { Metadata } from "next";
import { CalendarDays, Clock, MapPin, Timer } from "lucide-react";
import { ButtonLink, IconTile, PageHero, Section } from "@/components/ui";
import { demoDay, type DemoDayDetail } from "@/content/final-demo-day";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Final Demo Day",
  description: "Everything you need to know about the ALX × SPRIX Final Demo Day.",
};

const detailIcons: Record<string, typeof CalendarDays> = {
  Date: CalendarDays,
  Time: Clock,
  Venue: MapPin,
  "Presentation length": Timer,
};

export default function FinalDemoDayPage() {
  const hasDetails = demoDay.details.some((detail: DemoDayDetail) => detail.value);
  const isReady = hasDetails || demoDay.whatToPrepare.length > 0;

  return (
    <>
      <PageHero
        eyebrow="Final Demo Day"
        title="Final Demo Day"
        intro={demoDay.intro || "Everything you need to know before you present on the big day."}
      />

      <Section
        id="details"
        tone="white"
        eyebrow="At a glance"
        title="Key details"
      >
        {hasDetails ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {demoDay.details
              .filter((detail) => detail.value)
              .map((detail, idx) => {
                const Icon = detailIcons[detail.label] ?? CalendarDays;
                return (
                  <Reveal key={idx} delay={idx * 60}>
                    <div className="flex items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-e1">
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
        ) : (
          <p className="text-ink">Date, time and venue are being finalised. Check back soon.</p>
        )}
      </Section>

      {demoDay.whatToPrepare.length > 0 && (
        <Section id="prepare" tone="alt" eyebrow="Preparation" title="What to prepare">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {demoDay.whatToPrepare.map((item, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <li className="h-full rounded-card border border-line bg-surface p-6 shadow-e1">
                  <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {demoDay.judging.length > 0 && (
        <Section id="judging" tone="white" eyebrow="Judging" title="How you will be judged">
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
      )}

      {demoDay.importantNotes.length > 0 && (
        <Section id="notes" tone="alt" eyebrow="Important" title="Good to know">
          <ul className="max-w-3xl space-y-3">
            {demoDay.importantNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-3 text-ink">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-blue" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {!isReady && (
        <Section tone="white">
          <p className="text-ink">Full details will appear here once they are confirmed.</p>
        </Section>
      )}

      {demoDay.contactUrl && (
        <Section tone="navy">
          <div className="flex flex-col items-start gap-4">
            <p className="text-lg text-white/85">Questions about Demo Day? Reach out to your program team.</p>
            <ButtonLink href={demoDay.contactUrl} external variant="inverse">
              Contact the program team
            </ButtonLink>
          </div>
        </Section>
      )}
    </>
  );
}
