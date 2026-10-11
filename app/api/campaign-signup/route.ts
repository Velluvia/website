import { NextRequest, NextResponse } from "next/server";
import { getSql, ensureCampaignSignupsTable } from "@/lib/db";

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
    await sql`
      INSERT INTO campaign_signups (email, campaign, consent_text)
      VALUES (${email}, ${campaign}, ${consentText})
      ON CONFLICT (email, campaign) DO NOTHING;
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Campaign signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
