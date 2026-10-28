// Final Demo Day content. Source: the "Final Demo Day" document shared by the program team.
// Fill these in from that document. Empty values show a "being finalised" note on the page.

export type DemoDayDetail = {
  label: string;
  value: string;
};

export type DemoDayItem = {
  title: string;
  description: string;
};

export const demoDay = {
  intro: "",
  details: [
    { label: "Date", value: "" },
    { label: "Time", value: "" },
    { label: "Venue", value: "" },
    { label: "Presentation length", value: "" },
  ] as DemoDayDetail[],
  whatToPrepare: [] as DemoDayItem[],
  judging: [] as DemoDayItem[],
  importantNotes: [] as string[],
  contactUrl: "",
};
