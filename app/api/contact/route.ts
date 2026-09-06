import { NextRequest, NextResponse } from "next/server";
import { sendEmail, getContactInbox } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, enquiryType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const sent = await sendEmail({
      to: getContactInbox(),
      replyTo: email,
      subject: `New enquiry: ${enquiryType || "General"} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Enquiry type: ${enquiryType || "—"}`,
        "",
        message,
      ].join("\n"),
    });

    if (!sent) {
      return NextResponse.json(
        { error: "Email is not configured yet. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
  }
}
