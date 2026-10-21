// Shared by the Career Circle form (client) and its API route (server).
export const CAREER_TRACKS = ["Software Engineering", "Data", "Product"] as const;
export const REQUIRED_PREFERENCES = 2;

export type CareerCircleSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  preferences: string[];
  otherCareer: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns a user-facing error message, or null when the submission is valid. */
export function validateSubmission(s: CareerCircleSubmission): string | null {
  if (!s.firstName.trim() || !s.lastName.trim()) return "Please enter your first and last name.";
  if (!EMAIL_RE.test(s.email.trim())) return "Please enter a valid email address.";
  if (s.whatsapp.replace(/\D/g, "").length < 7) return "Please enter a valid WhatsApp number.";
  const valid = s.preferences.filter((p) => (CAREER_TRACKS as readonly string[]).includes(p));
  if (new Set(valid).size !== REQUIRED_PREFERENCES) return "Please choose exactly two career preferences.";
  return null;
}
