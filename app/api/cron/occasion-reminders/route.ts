import { NextRequest, NextResponse } from "next/server";
import { getSql, ensureRemindersTable } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";

// Send the nudge a week ahead — enough time to actually order and receive a
// gift box before the day itself, matching how far ahead people realistically
// shop for an occasion rather than reminding them the day it happens.
const DAYS_BEFORE_OCCASION = 7;

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await ensureRemindersTable();
    const sql = getSql();

    const target = new Date();
    target.setUTCDate(target.getUTCDate() + DAYS_BEFORE_OCCASION);
    const targetMonth = target.getUTCMonth() + 1;
    const targetDay = target.getUTCDate();
    const currentYear = new Date().getUTCFullYear();

    const due = await sql`
      SELECT id, email, recipient_name, occasion_label
      FROM occasion_reminders
      WHERE occasion_month = ${targetMonth}
        AND occasion_day = ${targetDay}
        AND (last_sent_year IS NULL OR last_sent_year != ${currentYear})
      LIMIT 20;
    `;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk";
    let sent = 0;

    for (const reminder of due) {
      const who = reminder.recipient_name ? ` for ${reminder.recipient_name}` : "";
      const ok = await sendEmail({
        to: reminder.email,
        subject: `${reminder.occasion_label} is coming up — need a gift?`,
        text: `Hi there,

Just a friendly nudge: ${reminder.occasion_label}${who} is a week away.

If you'd like a hand finding something thoughtful, our Signature Gifting collection is a good place to start — curated boxes ready to ship, no last-minute panic required.

${siteUrl}/collections/signature

With love,
Velluvia

P.S. We'll remind you again next year for this occasion — no need to sign up twice.`,
      });

      if (!ok) {
        console.error(`Occasion reminder email failed for reminder id ${reminder.id}`);
        continue;
      }

      await sql`UPDATE occasion_reminders SET last_sent_year = ${currentYear} WHERE id = ${reminder.id};`;
      sent++;
    }

    return NextResponse.json({ checked: due.length, sent });
  } catch (err) {
    console.error("Occasion reminder cron error:", err);
    return NextResponse.json({ error: "Failed to process reminders." }, { status: 500 });
  }
}
