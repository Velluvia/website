import { NextRequest, NextResponse } from "next/server";
import { signAccountToken } from "@/lib/account-token";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const normalized = String(email || "").trim().toLowerCase();
    if (!normalized || !normalized.includes("@")) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
    const token = signAccountToken(normalized);
    const link = `${siteUrl}/account/orders?token=${token}`;

    // Always report success, whether or not this email has ever placed an
    // order — confirming otherwise would let someone enumerate customer
    // email addresses by trying them here one at a time.
    await sendEmail({
      to: normalized,
      subject: "Your Velluvia order history link",
      text: `Hi,

Here's your link to view your Velluvia order history:

${link}

This link works for 24 hours. If you didn't request this, you can safely ignore this email.

With love,
Velluvia`,
    });

    return NextResponse.json({ sent: true });
  } catch (err: any) {
    console.error("Account link request failed:", err);
    return NextResponse.json({ sent: true }); // same reasoning as above — never reveal failure detail
  }
}
