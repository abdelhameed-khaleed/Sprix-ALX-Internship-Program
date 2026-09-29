import type { LeaderboardEntry } from "@/lib/leaderboard";

// Sample leaderboard data shown until LEADERBOARD_CSV_URL is configured with a real
// published Google Sheet. Display names default to first name + last initial, matching
// the constitution's privacy rule for learner data. The Week 1 top 3 use full names at
// the program owner's explicit request.

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
];
