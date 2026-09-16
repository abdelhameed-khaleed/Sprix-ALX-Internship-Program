// Team members shown on /team. Only publish contact details the person has approved.

export type TeamMember = {
  name: string;
  nickname?: string;
  role: string;
  contactAbout: string[];
  isMainContact?: boolean;
  /** Path under /public, e.g. "/team/hamedo.jpg". Initials avatar is used when omitted. */
  photo?: string;
  /** wa.me link — phone number is intentionally not displayed as text. */
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
    whatsapp: "https://wa.me/201554057372",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Where do I find my weekly modules?",
    answer: "All self-paced modules and assessments are on Savanna, the ALX learning platform.",
  },
  {
    question: "When is the weekly submission deadline?",
    answer: "Every Sunday at 11:59 PM (Cairo time) on Savanna.",
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
