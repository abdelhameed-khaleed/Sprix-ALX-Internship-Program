// Learner resources shown on /resources. Add new items to the top of the list.
// week: 1–7 for a specific week, or "general" for program-wide resources.

export type ResourceType = "platform" | "link" | "video" | "document" | "template";

export type Resource = {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  week: number | "general";
  /** Omit when the link is shared privately (the card then shows `note`). */
  url?: string;
  note?: string;
};

export const resources: Resource[] = [
  {
    id: "savanna",
    title: "Savanna (ALX LMS)",
    description: "Your self-paced modules, weekly tasks and assessment submissions.",
    type: "platform",
    week: "general",
    note: "Login details are shared with you directly by the ALX team.",
  },
  {
    id: "alx-website",
    title: "ALX Africa",
    description: "Learn more about ALX, its programs and the wider ALX community.",
    type: "link",
    week: "general",
    url: "https://www.alxafrica.com/",
  },
];
