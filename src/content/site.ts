// Edit this file to change program-wide details. All times are Cairo time (Africa/Cairo).

export const site = {
  name: "ALX × SPRIX Professional Skills Program",
  shortName: "ALX × SPRIX",
  description:
    "The ALX Professional Skills training gives entry-level tech talent a strong advantage with “The ALX Special Sauce”: the knowledge, skill sets and character qualities highly desired by employers but not taught in most tech training programs.",
  timezone: "Africa/Cairo",
  /** Sunday that Week 1 starts (YYYY-MM-DD). */
  cohortStart: "2026-09-20",
  totalWeeks: 7,
  lms: {
    name: "Savanna",
    description: "ALX's learning platform, where your self-paced modules and weekly submissions live.",
    // No public URL yet: access details are shared with learners directly.
    url: undefined as string | undefined,
  },
  links: {
    alx: "https://www.alxafrica.com/",
  },
  /** Hero background video: silent 20s loop cut from the ALX Hackathon recap (0:10–0:30). Set to undefined for the animated fallback. */
  hero: {
    video: "/media/hero.mp4" as string | undefined,
    poster: "/media/hero-poster.webp" as string | undefined,
  },
} as const;

export type LearningModeIcon = "laptop" | "clipboard" | "video" | "building" | "handshake";

export const learningModes: { title: string; detail: string; icon: LearningModeIcon }[] = [
  { title: "LMS Learnings", detail: "Self-paced modules on Savanna", icon: "laptop" },
  { title: "Weekly Tasks", detail: "Practical, hands-on assignments", icon: "clipboard" },
  { title: "Online Walkthrough", detail: "Zoom · Tuesdays @ 6:00 PM", icon: "video" },
  { title: "Offline Workshops", detail: "ALX Hub · Fridays @ 4:00 PM", icon: "building" },
  { title: "Peer Collaboration", detail: "Group projects, peer feedback & cohort community", icon: "handshake" },
];

export type CadenceIcon = "video" | "building" | "alarm";

/** The fixed weekly rhythm, repeated every week of the program. */
export const weeklyCadence: { day: string; time: string; title: string; where: string; icon: CadenceIcon }[] = [
  { day: "Tuesday", time: "6:00 PM", title: "Online Walkthrough", where: "Zoom", icon: "video" },
  { day: "Friday", time: "4:00 PM", title: "Offline Workshop", where: "ALX Hub", icon: "building" },
  { day: "Sunday", time: "11:59 PM", title: "LMS Submission Deadline", where: "Savanna", icon: "alarm" },
];

export type RequirementIcon = "verified" | "users" | "presentation";

export const completionRequirements: { title: string; detail: string; icon: RequirementIcon }[] = [
  {
    title: "LMS Coursework",
    detail: "Complete all self-paced modules and required assessment submissions on Savanna.",
    icon: "verified",
  },
  {
    title: "Mentorship & Workshops",
    detail: "Attend all weekly sessions.",
    icon: "users",
  },
  {
    title: "Mastery Project",
    detail: "Deliver a completed hands-on project and showcase your work at the final Pitching Day Demo.",
    icon: "presentation",
  },
];

export const outcomes = [
  { title: "Certificate of Completion", detail: "Awarded at graduation to every learner who meets the completion requirements." },
  { title: "Mastery Project", detail: "A finished, hands-on body of work you present to a panel of judges." },
  { title: "Mentorship & Expert Sessions", detail: "Weekly guidance from the ALX team and industry experts." },
];
