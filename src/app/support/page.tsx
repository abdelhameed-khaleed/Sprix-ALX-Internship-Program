import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  Clock,
  FileQuestion,
  KeyRound,
  LifeBuoy,
  MessagesSquare,
  PlayCircle,
  Rocket,
  UploadCloud,
  Video,
  Wrench,
} from "lucide-react";
import { ButtonLink, Card, IconTile, PageHero, Section } from "@/components/ui";
import {
  team,
  faqs,
  technicalIssues,
  programQuestions,
  type TechnicalIssueIcon,
  type ProgramQuestionIcon,
} from "@/content/team";
import { site, weeklyCadence } from "@/content/site";
import { MemberCard } from "@/components/team/MemberCard";
import { FaqList } from "@/components/team/FaqList";
import { WhatsAppIcon } from "@/components/team/WhatsAppIcon";
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

const questionIconMap: Record<ProgramQuestionIcon, LucideIcon> = {
  calendar: CalendarDays,
  clock: Clock,
  book: BookOpen,
  rocket: Rocket,
  award: Award,
  chat: MessagesSquare,
};

const cadenceIconMap = {
  video: Video,
  building: Building2,
  alarm: Clock,
};

const ticketChecklist = ["What you were doing", "The page link", "A screenshot", "Your Savanna email"];

export default function SupportPage() {
  const mainContact = team.find((member) => member.isMainContact) ?? team[0];
  const whatsappUrl = mainContact?.whatsapp;

  return (
    <>
      <PageHero
        eyebrow="Support"
        title="We&rsquo;re here to help"
        intro="Have questions, need guidance, or running into a technical issue? We're here to support you every step of the way."
        pattern="/brand/patterns/Group-464.png"
      />

      {/* Two lanes: technical issues on the left, everything else on the right */}
      <Section
        id="where-to-get-help"
        tone="white"
        eyebrow="Where to get help"
        title="Two ways to reach us"
        intro="Technical problems go to the ALX support team as a ticket. Everything else about the program goes straight to your program team."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-0">
          {/* LEFT: technical issues, ends with the Freshdesk ticket link */}
          <Reveal>
            <div className="flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-e1 sm:p-8 lg:rounded-r-none lg:border-r-0">
              <div className="flex items-start gap-4">
                <IconTile tone="blue">
                  <Wrench className="size-6 text-navy" aria-hidden="true" />
                </IconTile>
                <div>
                  <span className="text-xs font-bold tracking-wider text-muted uppercase">
                    Technical issue
                  </span>
                  <h3 className="text-xl font-bold text-navy sm:text-2xl">Something is broken</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Savanna, logins, videos or site bugs. Raise a ticket so the ALX technical
                    team can track and fix it.
                  </p>
                </div>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {technicalIssues.map((issue, idx) => {
                  const IssueIcon = issueIconMap[issue.icon] ?? AlertCircle;
                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-button border border-line bg-white px-3.5 py-3"
                    >
                      <IssueIcon className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-navy">{issue.title}</p>
                        <p className="text-xs leading-relaxed text-muted">{issue.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-7">
                <p className="text-xs font-bold tracking-wider text-muted uppercase">
                  Include in your ticket:
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink">
                  {ticketChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={site.support.ticketUrl}
                  external
                  variant="primary"
                  className="mt-5 w-full sm:w-auto"
                >
                  <LifeBuoy className="size-5" aria-hidden="true" />
                  Submit a ticket on Freshdesk
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: everything non-technical, ends with the WhatsApp link */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col rounded-card border border-line bg-sky/40 p-6 shadow-e1 sm:p-8 lg:rounded-l-none">
              <div className="flex items-start gap-4">
                <IconTile tone="blue">
                  <MessagesSquare className="size-6 text-navy" aria-hidden="true" />
                </IconTile>
                <div>
                  <span className="text-xs font-bold tracking-wider text-muted uppercase">
                    Everything else
                  </span>
                  <h3 className="text-xl font-bold text-navy sm:text-2xl">
                    Questions about the program
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Anything that is not a technical fault. Message your program team directly
                    and a human will get back to you.
                  </p>
                </div>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {programQuestions.map((item, idx) => {
                  const QuestionIcon = questionIconMap[item.icon] ?? MessagesSquare;
                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-button border border-line bg-white px-3.5 py-3"
                    >
                      <QuestionIcon className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-navy">{item.title}</p>
                        <p className="text-xs leading-relaxed text-muted">{item.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-7">
                <p className="text-xs font-bold tracking-wider text-muted uppercase">
                  Before you message:
                </p>
                <p className="mt-2.5 text-sm text-ink">
                  Check the weekly rhythm below. Session times, venues and the submission
                  deadline are usually answered right there.
                </p>
                {whatsappUrl && (
                  // WhatsApp colors (#25D366 bg, #1EBE5A hover, #0B141A text) are an intentional third-party brand exception; dark text satisfies WCAG AA contrast.
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/whatsapp mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-button bg-[#25D366] px-5 py-2.5 text-base font-semibold text-[#0B141A] shadow-e1 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#1EBE5A] hover:shadow-e2 sm:w-auto"
                  >
                    <WhatsAppIcon className="size-5 shrink-0 transition-transform duration-200 ease-out group-hover/whatsapp:scale-110 group-hover/whatsapp:-rotate-6" />
                    <span>Message us on WhatsApp</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Program team */}
      <Section
        id="program-support"
        tone="alt"
        eyebrow="Program support"
        title="Your program team"
        intro="Dedicated staff members to guide your learning, answer questions, and support your growth."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {team.map((member, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>

        {/* Weekly rhythm reminder */}
        <Reveal delay={120}>
          <div className="mt-14 rounded-card border border-line bg-sky p-6 shadow-e1 sm:p-8">
            <h3 className="text-xl font-bold text-navy">The weekly rhythm</h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink">
              Repeated every week of the program, so most schedule questions are answered here:
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
