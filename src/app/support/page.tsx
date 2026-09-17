import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Building2,
  Clock,
  FileQuestion,
  KeyRound,
  LifeBuoy,
  PlayCircle,
  UploadCloud,
  Video,
  Wrench,
} from "lucide-react";
import { ButtonLink, Card, IconTile, PageHero, Section } from "@/components/ui";
import { team, faqs, technicalIssues, type TechnicalIssueIcon } from "@/content/team";
import { site, weeklyCadence } from "@/content/site";
import { MemberCard } from "@/components/team/MemberCard";
import { FaqList } from "@/components/team/FaqList";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with the ALX × SPRIX program: submit technical issue tickets, reach program support on WhatsApp, and find answers to common questions.",
};

const issueIconMap: Record<TechnicalIssueIcon, LucideIcon> = {
  page: AlertCircle,
  missing: FileQuestion,
  login: KeyRound,
  submission: UploadCloud,
  media: PlayCircle,
  other: Wrench,
};

const cadenceIconMap = {
  video: Video,
  building: Building2,
  alarm: Clock,
};

export default function SupportPage() {
  const isSingle = team.length === 1;

  return (
    <>
      <PageHero
        eyebrow="Support"
        title="We're here to help"
        intro="Have questions, need guidance, or running into a technical issue? We're here to support you every step of the way."
        pattern="/brand/patterns/Group-464.png"
      />

      {/* Technical Issues Section */}
      <Section
        id="technical-issues"
        tone="white"
        eyebrow="Technical support"
        title="Having a technical issue?"
        intro="For anything technical, submit a support ticket so the ALX support team can track and fix it."
      >
        {/* Who to Contact Strip */}
        <Reveal delay={40}>
          <div className="mb-10 rounded-card border border-line bg-sky/50 p-5 sm:p-6">
            <p className="text-xs font-bold tracking-wider text-navy uppercase">
              Who to contact
            </p>
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col justify-between gap-3 rounded-xl bg-navy p-5 text-white shadow-e1">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold tracking-wider text-icy uppercase">
                      Technical issue
                    </span>
                    <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white">
                      Freshdesk
                    </span>
                  </div>
                  <p className="mt-2 text-base font-bold text-white">
                    Savanna, logins, videos, or site bugs
                  </p>
                  <p className="mt-1 text-sm text-white/80">
                    Submit a support ticket so the ALX technical team can investigate and fix it.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-icy">
                    Submit a ticket (Freshdesk) &rarr;
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-3 rounded-xl border border-line bg-white p-5 text-ink shadow-e1">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold tracking-wider text-muted uppercase">
                      Program questions
                    </span>
                    <span className="rounded-full bg-sky px-2.5 py-0.5 text-xs font-semibold text-navy">
                      WhatsApp
                    </span>
                  </div>
                  <p className="mt-2 text-base font-bold text-navy">
                    Schedule, sessions, workshops & project
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Message your program experience analyst directly for guidance and program updates.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
                    Message on WhatsApp &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Common Issue Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technicalIssues.map((issue, idx) => {
            const IssueIcon = issueIconMap[issue.icon] ?? AlertCircle;
            return (
              <Reveal key={idx} delay={idx * 60}>
                <Card className="lift flex h-full items-start gap-4 p-5">
                  <IconTile tone="blue">
                    <IssueIcon className="size-5 text-navy" aria-hidden="true" />
                  </IconTile>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-navy">{issue.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {issue.description}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* Support Ticket CTA & Checklist */}
        <Reveal delay={120}>
          <div className="mt-10 rounded-card border border-line bg-surface-alt p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="text-xl font-bold text-navy">Submit a support ticket</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  Tickets go directly to the ALX support team so they can track and resolve your issue.
                </p>
                <div className="mt-4">
                  <p className="text-xs font-bold tracking-wider text-muted uppercase">
                    Include in your ticket:
                  </p>
                  <ul className="mt-2.5 grid grid-cols-1 gap-2 text-sm text-ink sm:grid-cols-2">
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue" />
                      <span>What you were doing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue" />
                      <span>The page link</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue" />
                      <span>A screenshot</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue" />
                      <span>Your Savanna email</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="shrink-0">
                <ButtonLink
                  href={site.support.ticketUrl}
                  external
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  <LifeBuoy className="size-5" aria-hidden="true" />
                  Submit a support ticket
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Program Team & Support Section */}
      <Section
        id="program-support"
        tone="alt"
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
        tone="white"
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
