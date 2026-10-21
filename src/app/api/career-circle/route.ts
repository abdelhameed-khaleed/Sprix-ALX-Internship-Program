import { NextResponse } from "next/server";
import { validateSubmission, type CareerCircleSubmission } from "@/lib/career-circle";

// Forwards the form to a Google Apps Script web app that appends a row to the Google Sheet.
// Set CAREER_CIRCLE_WEBHOOK_URL (see docs/career-circle-sheet.md).
export async function POST(request: Request) {
  let body: CareerCircleSubmission;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const clean: CareerCircleSubmission = {
    firstName: String(body.firstName ?? "").trim().slice(0, 100),
    lastName: String(body.lastName ?? "").trim().slice(0, 100),
    email: String(body.email ?? "").trim().slice(0, 200),
    whatsapp: String(body.whatsapp ?? "").trim().slice(0, 40),
    preferences: Array.isArray(body.preferences) ? body.preferences.map(String).slice(0, 5) : [],
    otherCareer: String(body.otherCareer ?? "").trim().slice(0, 500),
  };

  const error = validateSubmission(clean);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const webhook = process.env.CAREER_CIRCLE_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "The form is not connected yet. Please try again later." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...clean, preferences: clean.preferences.join(", ") }),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch {
    return NextResponse.json({ error: "Could not save your response. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
