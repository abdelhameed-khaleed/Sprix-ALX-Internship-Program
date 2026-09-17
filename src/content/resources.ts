// Learner resources shown on /resources. Add new items to the top of the list.
// week: 1–7 for a specific week, or "general" for program-wide resources.

export type ResourceCategory =
  | "walkthrough-recording"
  | "slides"
  | "friday-session"
  | "other";

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  week: number | "general";
  /** Omit when the link is shared privately (the card then shows `note`). */
  url?: string;
  note?: string;
};

export type ResourceCategoryMeta = {
  key: ResourceCategory;
  label: string;
  /** One-line explainer shown under the category heading. */
  description: string;
  /** Friendly empty-state copy shown when no resources match the current filters. */
  emptyMessage: string;
};

/** Fixed display order for the category sections on /resources. */
export const resourceCategories: ResourceCategoryMeta[] = [
  {
    key: "walkthrough-recording",
    label: "Walkthrough recordings",
    description: "Recordings of the Tuesday 6:00 PM online walkthrough on Zoom.",
    emptyMessage: "Recordings are posted after each Tuesday walkthrough.",
  },
  {
    key: "slides",
    label: "Slides",
    description: "Presentation decks used in walkthroughs and workshops.",
    emptyMessage: "Slides are added once the related session has run.",
  },
  {
    key: "friday-session",
    label: "Friday session resources",
    description: "Materials from the Friday 4:00 PM offline workshop at the ALX Hub.",
    emptyMessage: "Friday session resources are added after each offline workshop.",
  },
  {
    key: "other",
    label: "Other resources",
    description: "Platforms, links and everything else you might need along the way.",
    emptyMessage: "More resources will be added here as the program progresses.",
  },
];

export const resources: Resource[] = [
  {
    id: "savanna",
    title: "Savanna (ALX LMS)",
    description: "Your self-paced modules, weekly tasks and assessment submissions.",
    category: "other",
    week: "general",
    note: "Login details are shared with you directly by the ALX team.",
  },
  {
    id: "alx-website",
    title: "ALX Africa",
    description: "Learn more about ALX, its programs and the wider ALX community.",
    category: "other",
    week: "general",
    url: "https://www.alxafrica.com/",
  },
];
