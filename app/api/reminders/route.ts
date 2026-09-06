import { NextRequest, NextResponse } from "next/server";
import { getSql, ensureRemindersTable } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await ensureRemindersTable();
    const sql = getSql();
    const body = await req.json();
    const { email, recipientName, occasionLabel, date } = body || {};

    if (!email || !occasionLabel || !date) {
      return NextResponse.json({ error: "Email, occasion, and date are required." }, { status: 400 });
    }

    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      return NextResponse.json({ error: "Invalid date." }, { status: 400 });
    }
    const month = parsed.getUTCMonth() + 1;
    const day = parsed.getUTCDate();

    await sql`
      INSERT INTO occasion_reminders (email, recipient_name, occasion_label, occasion_month, occasion_day)
      VALUES (${String(email).toLowerCase()}, ${recipientName || null}, ${occasionLabel}, ${month}, ${day});
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Reminder signup error:", err);
    return NextResponse.json({ error: "Unable to save reminder." }, { status: 500 });
  }
}
