import { Resend } from "resend";

/**
 * Email sending moved from Zoho SMTP to Resend after discovering Zoho Mail's
 * free plan blocks external SMTP/IMAP/POP access entirely for new accounts
 * (confirmed directly in Zoho's own documentation) — no password, however
 * correctly generated, would ever have worked for outbound sending on that
 * plan. hello@velluvia.co.uk keeps working completely normally for RECEIVING
 * email (Zoho's free webmail has no such restriction); this only changes how
 * the website itself sends outbound mail.
 *
 * Lazily constructed (like lib/stripe.ts) so the app can still build before
 * RESEND_API_KEY is configured.
 */
function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

export function getSenderAddress(): string {
  // Must be an address at a domain verified in Resend (see README) — using
  // an unverified domain here will cause every send to fail.
  return process.env.EMAIL_FROM || "Velluvia <hello@velluvia.co.uk>";
}

export function getContactInbox(): string {
  return process.env.CONTACT_TO_EMAIL || "hello@velluvia.co.uk";
}

/**
 * Sends one email via Resend. Returns true/false rather than throwing, so
 * callers (webhook handlers, cron jobs) can decide how to react to a failed
 * send without every call site needing its own try/catch.
 */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  from?: string;
}): Promise<boolean> {
  const resend = getResendClient();
  if (!resend) {
    console.error("RESEND_API_KEY is not set — cannot send email.");
    return false;
  }
  try {
    const { error } = await resend.emails.send({
      from: opts.from || getSenderAddress(),
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      replyTo: opts.replyTo,
    });
    if (error) {
      console.error("Resend send error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send exception:", err);
    return false;
  }
}
