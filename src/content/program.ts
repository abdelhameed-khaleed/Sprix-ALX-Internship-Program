// Week-by-week program content. Dates are the Sunday each week starts (Cairo time).

export type WeekIcon = "brain" | "chart" | "messages" | "users" | "compass" | "hammer" | "trophy";

export type Week = {
  number: number;
  startDate: string;
  label: string;
  title: string;
  summary: string;
  outcome: string;
  expertSession?: string;
  deliverable?: string;
  highlight?: string;
  icon: WeekIcon;
  isFinal?: boolean;
};

export const weeks: Week[] = [
  {
    number: 1,
    startDate: "2026-09-20",
    label: "Self-Leadership",
    title: "Self-Leadership & Learning Foundations",
    summary: "SMART goals, core values & self-regulation strategies.",
    outcome:
      "Develop self-awareness, core values, and self-regulation strategies to take ownership of personal growth, setting SMART goals, and work planning.",
    expertSession: "Time management & prioritization tools",
    deliverable: "Playbook in progress: skills inventory & values statement",
    icon: "brain",
  },
  {
    number: 2,
    startDate: "2026-09-27",
    label: "Data & Research",
    title: "Data Literacy, Research & Problem Framing",
    summary: "Empathy methods, problem framing & data reasoning.",
    outcome:
      "Research real-world problems using empathy-driven methods and clearly frame opportunities through structured problem definition and data reasoning.",
    expertSession: "Presentation skills",
    deliverable: "Problem Research Brief",
    icon: "chart",
  },
  {
    number: 3,
    startDate: "2026-10-04",
    label: "Communication",
    title: "Communication & Professional Writing",
    summary: "Structured storytelling & professional team documentation.",
    outcome:
      "Communicate ideas clearly and persuasively through structured writing, storytelling, and professional documentation for team and stakeholder contexts.",
    expertSession: "Storytelling for impact & team communication",
    deliverable: "Research Project: Problem Definition",
    icon: "messages",
  },
  {
    number: 4,
    startDate: "2026-10-11",
    label: "Agile & Teamwork",
    title: "Teamwork & Agile Workflows",
    summary: "Agile frameworks, EQ & collaborative problem-solving.",
    outcome:
      "Collaborate effectively within professional teams by applying Agile principles, emotional intelligence, and collaborative problem-solving techniques.",
    expertSession: "Agile ways of working & problem-solving",
    deliverable: "Teamwork Portfolio",
    icon: "users",
  },
  {
    number: 5,
    startDate: "2026-10-18",
    label: "Career Exploration",
    title: "Career Exploration & Professional Identity",
    summary: "Tech pathways & crafting your professional identity narrative.",
    outcome:
      "Explore technology-enabled career pathways and articulate a clear professional narrative aligned with personal strengths, values, and market opportunities.",
    expertSession: "Career coaching",
    icon: "compass",
  },
  {
    number: 6,
    startDate: "2026-10-25",
    label: "Pitching Day Prep",
    title: "Pitching Prep & Mastery Project",
    summary: "Team creation & finalizing mastery project deliverables.",
    outcome:
      "Form your project team and finalize your mastery graduation project, getting ready to present a live solution to a panel of judges.",
    deliverable: "Mastery project ready to pitch",
    icon: "hammer",
  },
  {
    number: 7,
    startDate: "2026-11-01",
    label: "Demo & Graduation",
    title: "Demo & Graduation 🎓",
    summary: "Final panel presentation before judges & certificate award showcase.",
    outcome:
      "Polish your final project, present it live before a panel of judges at Pitching Day, and celebrate your graduation with the certification showcase.",
    expertSession: "Panel of judges",
    deliverable: "Pitching Day Demo (graduation project)",
    highlight: "Friday 4:00 PM · Final Demo Showcase @ ALX Hub",
    icon: "trophy",
    isFinal: true,
  },
];
