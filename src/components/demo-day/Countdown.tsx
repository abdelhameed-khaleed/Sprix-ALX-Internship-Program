"use client";

import { useEffect, useState } from "react";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
] as const;

/**
 * Live countdown to the submission deadline. Renders nothing until mounted, so the
 * server and browser never disagree on the time.
 */
export function Countdown({ deadlineIso, label }: { deadlineIso: string; label: string }) {
  const deadline = new Date(deadlineIso).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);

  if (now === null) return null;

  const remaining = deadline - now;
  const closed = remaining <= 0;
  const totalMinutes = Math.floor(Math.max(0, remaining) / 60_000);
  const values = {
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor((totalMinutes % 1440) / 60),
    minutes: totalMinutes % 60,
  };

  return (
    <div className="relative overflow-hidden rounded-card bg-navy p-6 text-white shadow-e2 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-blue/40 blur-2xl motion-safe:animate-pulse" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 left-1/3 size-36 rounded-full bg-icy/20 blur-2xl motion-safe:animate-pulse" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex size-3">
            <span className="absolute inline-flex size-full rounded-full bg-green opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex size-3 rounded-full bg-green" />
          </span>
          <p className="text-sm font-bold tracking-wider text-icy uppercase">
            {closed ? "Submissions are closed" : label}
          </p>
        </div>

        {!closed && (
          <div className="grid grid-cols-3 gap-3">
            {units.map((unit) => (
              <div key={unit.key} className="min-w-20 rounded-button bg-white/10 px-4 py-3 text-center">
                <p className="text-3xl font-bold tabular-nums text-white md:text-4xl">
                  {String(values[unit.key]).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-white/75 uppercase">{unit.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
