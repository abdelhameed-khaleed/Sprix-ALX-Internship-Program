import Image from "next/image";
import { Mail } from "lucide-react";
import type { TeamMember } from "@/content/team";
import { Badge, ButtonLink, Card, cx } from "@/components/ui";
import { WhatsAppIcon } from "./WhatsAppIcon";

type MemberCardProps = {
  member: TeamMember;
  isSingle?: boolean;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function MemberCard({ member, isSingle = false }: MemberCardProps) {
  const initials = getInitials(member.name);

  return (
    <Card className="shadow-e1 transition-shadow duration-200 hover:shadow-e2">
      <div
        className={cx(
          "flex flex-col gap-6",
          isSingle ? "md:flex-row md:items-start md:gap-8" : "",
        )}
      >
        {/* Avatar / Photo */}
        <div className="group/avatar relative shrink-0 overflow-visible">
          {member.photo ? (
            <div className="size-24 overflow-hidden rounded-full shadow-e1 sm:size-28">
              <Image
                src={member.photo}
                alt={member.name}
                width={112}
                height={112}
                className="size-full object-cover transition-transform duration-300 ease-out group-hover/avatar:scale-110"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="flex size-24 items-center justify-center rounded-full bg-blue text-2xl font-bold text-white shadow-e1 transition-transform duration-300 ease-out group-hover/avatar:scale-110 sm:size-28 sm:text-3xl"
            >
              {initials}
            </div>
          )}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full ring-0 ring-icy/0 transition-all duration-300 ease-out group-hover/avatar:ring-4 group-hover/avatar:ring-icy/70"
          />
        </div>

        {/* Member Details */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold text-navy sm:text-2xl">
              {member.name}
              {member.nickname && (
                <span className="ml-2 font-normal text-muted">
                  (&ldquo;{member.nickname}&rdquo;)
                </span>
              )}
            </h3>
            {member.isMainContact && (
              <Badge tone="green">Main point of contact</Badge>
            )}
          </div>

          <p className="mt-1 text-base font-semibold text-blue">{member.role}</p>

          {/* Contact me about */}
          {member.contactAbout.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-bold tracking-wider text-muted uppercase">
                Contact me about
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-ink">
                {member.contactAbout.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Actions (phone number NEVER rendered as text) */}
          <div className="mt-6 flex flex-wrap gap-3">
            {member.whatsapp && (
              // WhatsApp colors (#25D366 bg, #1EBE5A hover, #0B141A text) are an intentional third-party brand exception; dark text satisfies WCAG AA contrast.
              <a
                href={member.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group/whatsapp inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-button bg-[#25D366] px-5 py-2.5 text-base font-semibold text-[#0B141A] shadow-e1 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#1EBE5A] hover:shadow-e2 sm:w-auto"
              >
                <WhatsAppIcon className="size-5 shrink-0 transition-transform duration-200 ease-out group-hover/whatsapp:scale-110 group-hover/whatsapp:-rotate-6" />
                <span>Message on WhatsApp</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}

            {member.email && (
              <ButtonLink
                href={`mailto:${member.email}`}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <Mail className="size-5" aria-hidden="true" />
                Send an email
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
