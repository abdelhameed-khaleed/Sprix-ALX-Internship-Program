import type { Metadata } from "next";
import { Building2, Clock, Video } from "lucide-react";
import { Card, IconTile, PageHero, Section } from "@/components/ui";
import { team, faqs } from "@/content/team";
import { weeklyCadence } from "@/content/site";
import { MemberCard } from "@/components/team/MemberCard";
import { FaqList } from "@/components/team/FaqList";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet your ALX program support team, view weekly session rhythms, and find answers to common questions.",
};

const cadenceIconMap = {
  video: Video,
  building: Building2,
  alarm: Clock,
};

export default function TeamPage() {
  const isSingle = team.length === 1;

  return (
    <>
      <PageHero
        eyebrow="Team & support"
        title="We're here to help"
        intro="Have questions or need guidance during your journey? Reach out to our dedicated support team."
        pattern="/brand/patterns/Group-464.png"
      />

      {/* Team Members Section */}
      <Section
        id="team-members"
        tone="white"
        eyebrow="Program support"
        title="Your program team"
        intro="Dedicated staff members to guide your learning, answer questions, and support your growth."
      >
        <div
          className={
            isSingle
              ? "max-w-3xl"
              : "grid grid-cols-1 gap-6 md:grid-cols-2"
          }
        >
          {team.map((member, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <MemberCard member={member} isSingle={isSingle} />
            </Reveal>
          ))}
        </div>

        {/* Before You Message Helper Card */}
        <Reveal delay={120}>
          <div className="mt-14 rounded-card border border-line bg-sky p-6 shadow-e1 sm:p-8">
            <h3 className="text-xl font-bold text-navy">Before you message</h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink">
              Check the weekly rhythm below first — answers to questions about session
              times, venues, and submission deadlines are usually right here:
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {weeklyCadence.map((item, idx) => {
                const CadenceIcon = cadenceIconMap[item.icon] ?? Clock;
                return (
                  <Card key={idx} className="lift flex items-start gap-3 bg-white p-4">
                    <IconTile tone="blue">
                      <CadenceIcon className="size-5 text-navy" aria-hidden="true" />
                    </IconTile>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold tracking-wider text-muted uppercase">
                        {item.day}
                      </p>
                      <h4 className="text-base font-bold text-navy">{item.title}</h4>
                      <p className="text-xs font-medium text-ink">{item.time}</p>
                      <span className="mt-1 inline-block rounded bg-surface-alt px-1.5 py-0.5 text-xs font-semibold text-muted">
                        {item.where}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Frequently Asked Questions */}
      <Section
        id="faq"
        tone="alt"
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="Quick answers to the questions learners ask most often about coursework, sessions, and graduation."
      >
        <Reveal>
          <div className="max-w-3xl">
            <FaqList items={faqs} />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
