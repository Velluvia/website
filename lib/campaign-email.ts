import { createHmac, timingSafeEqual } from "crypto";
import { getSql, ensureCampaignSignupsTable } from "./db";
import { sendEmail } from "./mailer";
import { blackFriday as bf, campaignHasEnded, formatCampaignDate } from "./campaign";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.velluvia.co.uk").replace(/\/$/, "");

// Resend's free plan allows 100 emails a day across the whole site (orders,
// reminders, sign-ups), so the early-access send works through the list in
// daily batches that leave room for order confirmations.
const EARLY_ACCESS_BATCH = 60;

function secret(): string {
  return process.env.CAMPAIGN_SECRET || process.env.CRON_SECRET || process.env.RESEND_API_KEY || "velluvia";
}

export function unsubscribeToken(email: string, campaign: string): string {
  return createHmac("sha256", secret()).update(`${email.toLowerCase()}|${campaign}`).digest("hex").slice(0, 32);
}

export function verifyUnsubscribeToken(email: string, campaign: string, token: string): boolean {
  const expected = unsubscribeToken(email, campaign);
  if (!token || token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(token));
}

export function unsubscribeUrl(email: string, campaign: string): string {
  const q = new URLSearchParams({ e: email, c: campaign, t: unsubscribeToken(email, campaign) });
  return `${SITE}/unsubscribe?${q.toString()}`;
}

function footer(email: string, campaign: string) {
  const url = unsubscribeUrl(email, campaign);
  return {
    text: `\n\n—\nYou're receiving this because you joined the Velluvia Black Friday early-access list at velluvia.co.uk.\nUnsubscribe: ${url}\nVelluvia, Ebbsfleet, Kent, UK`,
    headers: {
      "List-Unsubscribe": `<${url}>, <mailto:hello@velluvia.co.uk?subject=unsubscribe>`,
    },
  };
}

/** Sent straight after someone joins the list. */
export async function sendSignupConfirmation(email: string, campaign: string): Promise<boolean> {
  const f = footer(email, campaign);
  return sendEmail({
    to: email,
    subject: "You're on the Velluvia Black Friday early-access list",
    text: `Hello,

Thank you for joining the Velluvia Black Friday early-access list.

Here's what happens next:
• ${formatCampaignDate(bf.earlyAccess)}: we'll email you our Black Friday offer and your early-access code, before anyone else.
• ${formatCampaignDate(bf.blackFriday)}: our offers open to everyone, through to Cyber Monday (${formatCampaignDate(bf.cyberMonday)}).

In the meantime, our Christmas gift guides are a lovely place to start your list:
${SITE}/gift-guides

With love,
Velluvia
Thoughtful gifts. Lasting impact.${f.text}`,
    headers: f.headers,
  });
}

/**
 * Called once a day by the existing 8am cron. Does nothing until the code is
 * set in lib/campaign.ts, the offer is switched on and the early-access date
 * has arrived; then emails the list in batches until everyone has had it.
 */
export async function sendEarlyAccessBatch(): Promise<{ sent: number; skipped?: string }> {
  if (!bf.offersLive) return { sent: 0, skipped: "offers not live" };
  if (!bf.earlyAccessCode) return { sent: 0, skipped: "no early-access code set" };
  if (Date.now() < new Date(bf.earlyAccess).getTime()) return { sent: 0, skipped: "before early-access date" };
  if (campaignHasEnded()) return { sent: 0, skipped: "campaign ended" };

  await ensureCampaignSignupsTable();
  const sql = getSql();
  const rows = await sql`
    SELECT id, email FROM campaign_signups
    WHERE campaign = ${bf.campaign} AND early_access_sent_at IS NULL AND unsubscribed_at IS NULL
    ORDER BY created_at
    LIMIT ${EARLY_ACCESS_BATCH};
  `;

  const offerLines = bf.offers.map((o) => `• ${o.title}\n  ${o.detail}`).join("\n");
  let sent = 0;
  for (const row of rows as { id: number; email: string }[]) {
    const f = footer(row.email, bf.campaign);
    const ok = await sendEmail({
      to: row.email,
      subject: "Your Velluvia Black Friday early access is here",
      text: `Hello,

As promised, you get first pick. Our Black Friday offer is open to you now, before anyone else:

${offerLines}

Your early-access code: ${bf.earlyAccessCode}
Enter it in the promotion code box on the payment page at checkout.

The offer opens to everyone on ${formatCampaignDate(bf.blackFriday)} and ends on ${formatCampaignDate(bf.cyberMonday)} at 11:59pm.

Start shopping: ${SITE}/black-friday

With love,
Velluvia${f.text}`,
      headers: f.headers,
    });
    if (!ok) continue;
    await sql`UPDATE campaign_signups SET early_access_sent_at = now() WHERE id = ${row.id};`;
    sent++;
  }
  return { sent };
}
