"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { CAREER_TRACKS, REQUIRED_PREFERENCES, validateSubmission } from "@/lib/career-circle";
import { cx } from "@/components/ui";

const inputClass =
  "mt-1.5 block min-h-11 w-full rounded-button border border-line bg-white px-3.5 py-2 text-base text-ink placeholder:text-muted/70 focus:border-blue focus:outline-2 focus:outline-offset-2 focus:outline-blue";

export function CareerCircleForm() {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  function togglePreference(track: string) {
    setPreferences((prev) => {
      if (prev.includes(track)) return prev.filter((p) => p !== track);
      return prev.length >= REQUIRED_PREFERENCES ? prev : [...prev, track];
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submission = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      whatsapp: String(data.get("whatsapp") ?? ""),
      preferences,
      otherCareers: [String(data.get("otherCareer") ?? "")],
    };

    const problem = validateSubmission(submission);
    if (problem) {
      setError(problem);
      return;
    }

    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/career-circle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-card border border-line bg-sky p-8 text-center shadow-e1">
        <CheckCircle2 className="mx-auto size-10 text-blue" aria-hidden="true" />
        <h2 className="mt-3 text-2xl font-bold text-navy">You&rsquo;re in!</h2>
        <p className="mt-2 text-ink">Thanks, we&rsquo;ve saved your career preferences for Career Circle day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-card border border-line bg-white p-6 shadow-e1 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-navy">
          First name
          <input name="firstName" type="text" required autoComplete="given-name" className={inputClass} />
        </label>
        <label className="block text-sm font-semibold text-navy">
          Last name
          <input name="lastName" type="text" required autoComplete="family-name" className={inputClass} />
        </label>
      </div>

      <label className="mt-5 block text-sm font-semibold text-navy">
        Email <span className="font-normal text-muted">(the email you log in on LX LMS with)</span>
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </label>

      <label className="mt-5 block text-sm font-semibold text-navy">
        WhatsApp number
        <input
          name="whatsapp"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+20 100 000 0000"
          className={inputClass}
        />
      </label>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-navy">
          Career preferences <span className="font-normal text-muted">(choose two)</span>
        </legend>
        <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CAREER_TRACKS.map((track) => {
            const checked = preferences.includes(track);
            const locked = !checked && preferences.length >= REQUIRED_PREFERENCES;
            return (
              <label
                key={track}
                className={cx(
                  "flex min-h-11 cursor-pointer items-center gap-3 rounded-button border px-3.5 py-2.5 text-sm font-semibold transition-colors",
                  checked ? "border-blue bg-sky text-navy" : "border-line bg-white text-ink hover:border-blue",
                  locked && "cursor-not-allowed opacity-50 hover:border-line",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={locked}
                  onChange={() => togglePreference(track)}
                  className="size-4 accent-blue"
                />
                {track}
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted">
          {preferences.length} of {REQUIRED_PREFERENCES} selected
        </p>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-navy">
          If your preference does not exist in the current careers, what would you choose?{" "}
          <span className="font-normal text-muted">(optional)</span>
        </legend>
        <input
          name="otherCareer"
          type="text"
          maxLength={100}
          aria-label="Other career"
          placeholder="e.g. Cybersecurity, Graphic Design"
          className={inputClass}
        />
      </fieldset>

      {error && (
        <p role="alert" className="mt-5 rounded-button bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-button bg-blue px-5 py-2.5 text-base font-semibold text-white shadow-e1 transition-[background-color,box-shadow] duration-200 hover:bg-blue-dark hover:shadow-e2 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
