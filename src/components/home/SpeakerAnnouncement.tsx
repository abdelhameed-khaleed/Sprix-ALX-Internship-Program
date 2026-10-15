import Image from "next/image";
import { Badge } from "@/components/ui";
import { LinkedInIcon } from "@/components/program/LinkedInIcon";

type Speaker = {
  name: string;
  photo: string;
  linkedin: string;
  badge: string;
  tone: "green" | "purple";
  detail: string;
};

const speakers: Speaker[] = [
  {
    name: "Aya Hassan",
    photo: "/speakers/aya-hassan.jpg",
    linkedin: "https://www.linkedin.com/in/aya-hassan-190988162/",
    badge: "Tomorrow",
    tone: "purple",
    detail: "Week 4 offline session · Friday 4:00 PM @ ALX Hub",
  },
  {
    name: "Aya El-Mahdy",
    photo: "/speakers/aya-el-mahdy.jpg",
    linkedin: "https://www.linkedin.com/in/aya-elmahdy/",
    badge: "Last Friday",
    tone: "green",
    detail: "Week 3 offline session · Storytelling for impact",
  },
];

/** Small announcement band for the recent and upcoming guest speaker sessions. */
export function SpeakerAnnouncement() {
  return (
    <section aria-labelledby="speaker-announcement" className="relative z-0 bg-surface px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <h2 id="speaker-announcement" className="mb-4 text-sm font-semibold tracking-wide text-blue uppercase">
          Guest speaker sessions
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {speakers.map((speaker) => (
            <li
              key={speaker.name}
              className="flex items-center gap-4 rounded-card border border-line bg-white p-4 shadow-e1"
            >
              <div className="size-16 shrink-0 overflow-hidden rounded-full">
                <Image src={speaker.photo} alt={speaker.name} width={64} height={64} className="size-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <Badge tone={speaker.tone}>{speaker.badge}</Badge>
                <p className="mt-1 text-lg font-bold text-navy">{speaker.name}</p>
                <p className="text-sm text-muted">{speaker.detail}</p>
              </div>
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-blue transition-colors hover:text-navy"
                aria-label={`${speaker.name} on LinkedIn (opens in a new tab)`}
              >
                <LinkedInIcon className="size-6" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
