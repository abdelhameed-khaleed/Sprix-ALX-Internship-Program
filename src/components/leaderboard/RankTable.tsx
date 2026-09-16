import type { RankedEntry } from "@/lib/leaderboard";
import { Badge } from "@/components/ui";

type RankTableProps = {
  entries: RankedEntry[];
  weekNumber: number;
};

export function RankTable({ entries, weekNumber }: RankTableProps) {
  if (entries.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-card border border-line bg-white shadow-e1">
      <table className="w-full min-w-[500px] border-collapse text-left text-sm">
        <caption className="sr-only">
          Leaderboard rankings for Week {weekNumber} (Ranks 4 and above)
        </caption>
        <thead className="border-b border-line bg-surface-alt text-xs font-bold uppercase tracking-wider text-muted">
          <tr>
            <th scope="col" className="px-5 py-3.5 text-navy">
              Rank
            </th>
            <th scope="col" className="px-5 py-3.5 text-navy">
              Learner
            </th>
            <th scope="col" className="px-5 py-3.5 text-navy">
              Points
            </th>
            <th scope="col" className="px-5 py-3.5 text-navy">
              Badge
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {entries.map((entry, idx) => (
            <tr
              key={`${entry.rank}-${entry.name}-${idx}`}
              className="transition-colors hover:bg-sky/30 even:bg-surface-alt"
            >
              <td className="px-5 py-4 font-semibold text-navy">
                #{entry.rank}
              </td>
              <td className="px-5 py-4 font-medium text-ink">
                <span className="truncate" title={entry.name}>
                  {entry.name}
                </span>
              </td>
              <td className="px-5 py-4 font-semibold text-navy">
                {entry.points}{" "}
                <span className="text-xs font-normal text-muted">pts</span>
              </td>
              <td className="px-5 py-4">
                {entry.badge ? (
                  <Badge tone="blue">{entry.badge}</Badge>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
