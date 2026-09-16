import crypto from "crypto";

/**
 * Passwordless "magic link" tokens for order lookup — deliberately not a
 * full account/password system. Gift purchases are infrequent enough per
 * customer that a password to remember is pure friction; an emailed link
 * that proves "you control this inbox" is sufficient to show someone their
 * own order history.
 *
 * Token = base64url(email + "." + expiry) + "." + base64url(HMAC-SHA256 of that payload)
 * Signed with ACCOUNT_LINK_SECRET so a token can't be forged without it.
 */
function getSecret(): string {
  const secret = process.env.ACCOUNT_LINK_SECRET;
  if (!secret) {
    throw new Error(
      "ACCOUNT_LINK_SECRET is not set. Add a long random string to Vercel's Environment Variables."
    );
  }
  return secret;
}

const ONE_HOUR_MS = 60 * 60 * 1000;
const LINK_LIFETIME_MS = 24 * ONE_HOUR_MS;

export function signAccountToken(email: string): string {
  const expiry = Date.now() + LINK_LIFETIME_MS;
  const payload = `${email.trim().toLowerCase()}.${expiry}`;
  const payloadB64 = Buffer.from(payload).toString("base64url");
  const signature = crypto.createHmac("sha256", getSecret()).update(payloadB64).digest("base64url");
  return `${payloadB64}.${signature}`;
}

export function verifyAccountToken(token: string): { email: string } | null {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", getSecret())
      .update(payloadB64)
      .digest("base64url");

    // Constant-time comparison — a plain === here would leak timing info
    // about how many leading bytes of the signature matched.
    const a = Buffer.from(signature);
    const b = Buffer.from(expectedSignature);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

    const payload = Buffer.from(payloadB64, "base64url").toString();
    const [email, expiryStr] = payload.split(".");
    const expiry = Number(expiryStr);
    if (!email || !expiry || Date.now() > expiry) return null;

    return { email };
  } catch {
    return null;
  }
}
