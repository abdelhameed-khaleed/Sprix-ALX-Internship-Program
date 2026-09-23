// Learner resources shown on /resources. Add new items to the top of the list.
// week: 1–7 for a specific week, or "general" for program-wide resources.

export type ResourceCategory =
  | "walkthrough-recording"
  | "slides"
  | "friday-session"
  | "events"
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
  /**
   * Cover image under /public, e.g. "/media/events/week-1-workshop.jpg". Used by event
   * cards to show one photo from the event above the link to the full photo album.
   */
  image?: string;
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
    key: "events",
    label: "Events",
    description: "Photos from the workshops, sessions and program events.",
    emptyMessage: "Event photos are added after each event.",
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
    id: "week-1-walkthrough-recording",
    title: "Week 1 walkthrough recording",
    description: "Recording of the Week 1 Tuesday walkthrough session.",
    category: "walkthrough-recording",
    week: 1,
    url: "https://alxafrica.zoom.us/rec/share/HSCmZ0UgFRbe_CeH14AmQFVy0dHxqXrvwIe7B_mnSbUUHWvqPDAu2w3HytXvZt6k.z0f2of96AMsPcUDP",
  },
  {
    id: "week-1-session-slides",
    title: "Week 1 session slides",
    description: "Presentation deck used in the Week 1 walkthrough session.",
    category: "slides",
    week: 1,
    url: "https://docs.google.com/presentation/d/1fI85exb6mSmJbpFNMRP-eisCSSnDzsyS40Wf5hhrkZA/edit?slide=id.p18#slide=id.p18",
  },
  {
    id: "onboarding-slides",
    title: "Onboarding slides",
    description:
      "The program onboarding deck: how the 7 weeks run, what is expected of you, and where everything lives.",
    category: "slides",
    week: "general",
    url: "https://docs.google.com/presentation/d/1hignVlvirvOVwum6v37VurId8BGe3HUmDhcWuLXPwLo/edit?usp=sharing",
  },
  // Event album template: set `url` to the Google Drive photo folder and `image` to one
  // photo from that event, copied into /public/media/events/.
  // {
  //   id: "event-onboarding",
  //   title: "Onboarding day",
  //   description: "Photos from the program kickoff at the ALX Hub.",
  //   category: "events",
  //   week: 1,
  //   url: "<google drive folder link>",
  //   image: "/media/events/onboarding.jpg",
  // },
  {
    id: "savanna",
    title: "Savanna (ALX LMS)",
    description: "Your self-paced modules, weekly tasks and assessment submissions.",
    category: "other",
    week: "general",
    note: "Login details are shared with you directly by the ALX team.",
  },
  {
    id: "program-calendar",
    title: "Program calendar",
    description:
      "Every walkthrough, workshop, deadline and event in one calendar, in Cairo time.",
    category: "other",
    week: "general",
    url: "https://calendar.google.com/calendar/embed?src=c_6e61934c4f4ec4903650d2127d4ff1a457e375b81d028f12c1a4556d1815ba5f%40group.calendar.google.com&ctz=Africa%2FCairo",
  },
  {
    id: "calendar-how-to",
    title: "How to add the program calendar",
    description:
      "A short screen recording walking you through adding the program calendar to your own Google Calendar.",
    category: "other",
    week: "general",
    url: "https://drive.google.com/file/d/1-QXQIghG8cy6QbdbqjmkmBm0NqcjH2P9/view?usp=drive_link",
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
