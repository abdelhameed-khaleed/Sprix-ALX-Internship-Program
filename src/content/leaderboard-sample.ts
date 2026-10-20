import type { LeaderboardEntry } from "@/lib/leaderboard";

// Sample leaderboard data shown until LEADERBOARD_CSV_URL is configured with a real
// published Google Sheet. Display names default to first name + last initial, matching
// the constitution's privacy rule for learner data. The Week 1 and Week 3 top 3 use full names at
// the program owner's explicit request.

/** Overall top 5 so far, in rank order, published without scores at the program owner's request. */
export const overallTopNames: string[] = [
  "Jana Hossam Al-Din",
  "Mohamed Waleed",
  "Marim Mostafa",
  "Shahd Mohamed",
  "Maryam Nashaat",
];

/** Learner of the week: the biggest progress over the last week, highlighted at the program owner's request. */
export const learnerOfTheWeek = { week: 4, name: "Khalid Islam" };

export const sampleLeaderboardEntries: LeaderboardEntry[] = [
  // Week 1
  { week: 1, name: "Maryam Nashaat", points: 96, badge: "Most consistent" },
  { week: 1, name: "Marim Mostafa", points: 91 },
  { week: 1, name: "Mohamed Waleed", points: 88 },
  { week: 1, name: "Sara M.", points: 85, badge: "Best peer support" },
  { week: 1, name: "Ahmed T.", points: 82 },
  { week: 1, name: "Nourhan G.", points: 77 },
  { week: 1, name: "Karim E.", points: 74 },
  { week: 1, name: "Laila F.", points: 69 },

  // Week 3: top 3 published without scores, listed in rank order
  { week: 3, name: "Jana Hossam Al-Din" },
  { week: 3, name: "Marim Mostafa" },
  { week: 3, name: "Maryam Nashaat" },

  // Week 4: top 3 published without scores, listed in rank order
  { week: 4, name: "Jana Hossam Al-Din" },
  { week: 4, name: "Mohamed Waleed" },
  { week: 4, name: "Marim Mostafa" },
];
