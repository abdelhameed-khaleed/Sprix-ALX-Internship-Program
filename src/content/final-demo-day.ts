// Final Demo Day content. Source: the "Final Mastery Project Guide" shared by the program team.
// Edit these values to update the page. Empty detail values are hidden on the page.

export type DemoDayDetail = {
  label: string;
  value: string;
};

export type DemoDayItem = {
  title: string;
  description: string;
};

export const demoDay = {
  intro:
    "Your team is simulating a real business with a real solution. Your slides are how you convince the audience to back it.",
  mission: {
    title: "Your mission",
    intro:
      "Your team is simulating a real business with a real solution, and your slides tell its story in four parts.",
    parts: [
      {
        title: "GCGO",
        description: "The big world challenge or opportunity we chose.",
      },
      {
        title: "Problem",
        description: "One specific problem inside that GCGO.",
      },
      {
        title: "Persona",
        description: "The real person affected by the problem.",
      },
      {
        title: "Solution",
        description: "Our idea, shown with wireframes or a prototype.",
      },
    ] as DemoDayItem[],
    closing:
      "Build a deck of 8 to 12 slides that covers every part. A part can use more than one slide if needed. Treat it like a real pitch: a real problem, a real person, a real idea.",
  },
  details: [
    { label: "Demo day", value: "Friday, November 6, 2026" },
    { label: "Submit by", value: "Thursday, November 5, 2026 at 6:00 PM" },
    { label: "Arrive", value: "10 to 15 minutes before your start time" },
    { label: "Presentation length", value: "4 minutes presenting, then 4 minutes feedback" },
    { label: "Time", value: "" },
    { label: "Venue", value: "" },
  ] as DemoDayDetail[],
  steps: [
    {
      title: "Choose your global challenge",
      description: "Pick one your whole team cares about, and research it before committing.",
    },
    {
      title: "Narrow to one problem",
      description: "One clear problem for one group of people, not a broad theme like \"education is hard\".",
    },
    {
      title: "Define your persona",
      description: "Who exactly is affected, and why?",
    },
    {
      title: "Design the solution",
      description: "Wireframes or a prototype. A simple working MVP is even better.",
    },
    {
      title: "Use AI responsibly",
      description: "AI can help brainstorm, sketch wireframes, build an MVP and polish slides. Your team chooses the idea, checks every fact and edits all AI output.",
    },
    {
      title: "Collaborate",
      description: "Share tasks, work in one shared file, check in often and give each other feedback.",
    },
    {
      title: "Rehearse with a timer",
      description: "Practise the 4-minute presentation, then 4 minutes of feedback.",
    },
  ] as DemoDayItem[],
  slideStructure: [
    { title: "Title", description: "Team name, all member names and a one-line tagline." },
    { title: "GCGO", description: "The challenge you chose and why your team chose it." },
    { title: "Problem", description: "The specific problem, sourced facts, who has it and what happens if nothing changes." },
    { title: "Persona", description: "A real-feeling person: name, age, picture, daily situation, top 3 needs and how the problem hurts their day." },
    { title: "Solution", description: "Your idea in one sentence, how it works and how it solves the persona's pain points." },
    { title: "Demo", description: "Wireframes or MVP screens with a short label under each. Say what is real and what is only a sketch, and what your team decided itself if AI helped." },
    { title: "What makes it different", description: "What people use today, your competitors, and how your idea does better or differently." },
    { title: "Closing", description: "The next 3 steps if the business goes ahead, a strong last line and a thank you." },
  ] as DemoDayItem[],
  prizes: [
    {
      title: "Best overall presentation",
      description: "Awarded to the team that presents most clearly, confidently and with the best-prepared slides.",
    },
    {
      title: "Most innovative solution",
      description: "Awarded to the team with the fresh, useful idea that stands out the most.",
    },
  ] as DemoDayItem[],
  judging: [
    {
      title: "The slides",
      description: "Their quality, and how well they follow the structure.",
    },
    {
      title: "An innovative solution",
      description: "A fresh, useful idea.",
    },
    {
      title: "Presentation skills",
      description: "How clearly, well prepared and confidently your team presents.",
    },
  ] as DemoDayItem[],
  submission: {
    title: "How to submit",
    description:
      "Create a new folder inside the shared parent folder, named with your team name. Upload your slides into it, or add a link to your presentation. Submit by Thursday, November 5 at 6:00 PM.",
    folderUrl: "https://drive.google.com/drive/folders/1xrogypXAGRiHVWzwZHy2_VKnCrfQzCqH?usp=sharing",
    // Cairo time (UTC+2, no daylight saving in November).
    deadlineIso: "2026-11-05T18:00:00+02:00",
  },
};
