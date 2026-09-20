// Support team, technical issue categories, and FAQs shown on /support. Only publish contact details the person has approved.

export type TechnicalIssueIcon =
  | "page"
  | "missing"
  | "login"
  | "submission"
  | "media"
  | "other";

export type TechnicalIssue = {
  title: string;
  description: string;
  icon: TechnicalIssueIcon;
};

export const technicalIssues: TechnicalIssue[] = [
  {
    title: "Page not loading",
    description: "A page, video or Savanna won't load or shows an error",
    icon: "page",
  },
  {
    title: "Missing content",
    description: "A module, lesson, resource or recording is missing",
    icon: "missing",
  },
  {
    title: "Can't log in to Savanna",
    description: "Login, password or access problems",
    icon: "login",
  },
  {
    title: "Submission problem",
    description: "A task won't upload/submit or shows the wrong status",
    icon: "submission",
  },
  {
    title: "Video or audio won't play",
    description: "Recordings or embedded media not playing",
    icon: "media",
  },
  {
    title: "Something else technical",
    description: "Any other bug or broken link",
    icon: "other",
  },
];

/** Everything that is not a technical bug: goes to the program team, not to Freshdesk. */
export const programQuestions: { title: string; description: string; icon: ProgramQuestionIcon }[] = [
  {
    title: "Schedule & sessions",
    description: "Session times, venues, and the weekly rhythm",
    icon: "calendar",
  },
  {
    title: "Deadlines & submissions",
    description: "When work is due and what counts as submitted",
    icon: "clock",
  },
  {
    title: "Coursework guidance",
    description: "Help understanding a module, task or deliverable",
    icon: "book",
  },
  {
    title: "Mastery project",
    description: "Project scope, teams, and Pitching Day",
    icon: "rocket",
  },
  {
    title: "Attendance & certificate",
    description: "Completion requirements and graduation",
    icon: "award",
  },
  {
    title: "Anything else",
    description: "Not sure who to ask? Start here",
    icon: "chat",
  },
];

export type ProgramQuestionIcon =
  | "calendar"
  | "clock"
  | "book"
  | "rocket"
  | "award"
  | "chat";

export type TeamMember = {
  name: string;
  nickname?: string;
  role: string;
  contactAbout: string[];
  isMainContact?: boolean;
  /** Path under /public, e.g. "/team/hamedo.jpg". Initials avatar is used when omitted. */
  photo?: string;
  /** wa.me link. The phone number is intentionally not displayed as text. */
  whatsapp?: string;
  email?: string;
};

export const team: TeamMember[] = [
  {
    name: "Abdelhameed Khaled",
    nickname: "Hamedo",
    role: "ALX Experience Analyst",
    contactAbout: [
      "Anything about the program: your first stop for questions",
      "Session times, workshops & the weekly schedule",
      "Savanna (LMS) access and submission deadlines",
      "Your mastery project and Pitching Day",
    ],
    isMainContact: true,
    photo: "/team/abdelhameed.jpg",
    whatsapp: "https://wa.me/201554057372",
  },
  {
    name: "Aalaa Abdelfadil",
    role: "Learning Experience Manager",
    contactAbout: [
      "Learning experience, content and curriculum",
      "Escalations about the program experience",
      "Partnership and program-level questions",
    ],
    photo: "/team/aalaa.jpg",
    // TODO: add Aalaa's work email here to show the "Send an email" button.
    email: undefined,
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Something on the site or Savanna isn't working. What do I do?",
    answer:
      "Submit a support ticket on the ALX Help Center (Freshdesk) with a screenshot and the page link. The support team will follow up by email.",
  },
  {
    question: "Where do I find my weekly modules?",
    answer: "All self-paced modules and assessments are on Savanna, the ALX learning platform.",
  },
  {
    question: "When is the weekly submission deadline?",
    answer: "Every Monday at 11:59 PM (Cairo time) on Savanna.",
  },
  {
    question: "Do I have to attend the sessions?",
    answer:
      "Yes. Attending all weekly sessions (Tuesday online walkthrough and Friday offline workshop) is a completion requirement for your certificate.",
  },
  {
    question: "How do I get my certificate?",
    answer:
      "Complete your LMS coursework, attend the weekly sessions, and deliver and present your mastery project at the Pitching Day Demo in Week 7.",
  },
];
