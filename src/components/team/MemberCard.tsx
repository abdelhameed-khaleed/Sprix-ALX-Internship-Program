import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import type { TeamMember } from "@/content/team";
import { Badge, ButtonLink, Card, cx } from "@/components/ui";

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
        <div className="shrink-0">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              width={112}
              height={112}
              className="size-24 rounded-full object-cover shadow-e1 sm:size-28"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex size-24 items-center justify-center rounded-full bg-blue text-2xl font-bold text-white shadow-e1 sm:size-28 sm:text-3xl"
            >
              {initials}
            </div>
          )}
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
              <ButtonLink
                href={member.whatsapp}
                external
                variant="primary"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Message on WhatsApp
              </ButtonLink>
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
