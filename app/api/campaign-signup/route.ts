import { NextRequest, NextResponse } from "next/server";
import { getSql, ensureCampaignSignupsTable } from "@/lib/db";
import { sendSignupConfirmation } from "@/lib/campaign-email";

const ALLOWED_CAMPAIGNS = new Set(["black-friday-2026"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || "").trim().toLowerCase();
    const campaign = String(body?.campaign || "");
    const consent = body?.consent === true || body?.consent === "on";
    const consentText = String(body?.consentText || "").slice(0, 500);

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!ALLOWED_CAMPAIGNS.has(campaign)) {
      return NextResponse.json({ error: "Unknown campaign." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: "Please tick the box to agree to receive emails." }, { status: 400 });
    }

    await ensureCampaignSignupsTable();
    const sql = getSql();
    // A returning address that had unsubscribed is opted back in, because
    // they've just ticked the consent box again.
    const rows = await sql`
      INSERT INTO campaign_signups (email, campaign, consent_text)
      VALUES (${email}, ${campaign}, ${consentText})
      ON CONFLICT (email, campaign)
      DO UPDATE SET unsubscribed_at = NULL, consent_text = EXCLUDED.consent_text
      RETURNING id, confirmation_sent_at;
    `;
    const row = rows[0] as { id: number; confirmation_sent_at: string | null } | undefined;
    if (row && !row.confirmation_sent_at) {
      const ok = await sendSignupConfirmation(email, campaign);
      if (ok) await sql`UPDATE campaign_signups SET confirmation_sent_at = now() WHERE id = ${row.id};`;
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Campaign signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
