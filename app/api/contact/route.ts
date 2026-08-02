import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, enquiryType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const {
      ZOHO_SMTP_HOST,
      ZOHO_SMTP_PORT,
      ZOHO_SMTP_USER,
      ZOHO_SMTP_PASS,
      CONTACT_TO_EMAIL,
    } = process.env;

    if (!ZOHO_SMTP_HOST || !ZOHO_SMTP_USER || !ZOHO_SMTP_PASS) {
      console.error("Zoho SMTP env vars are not configured.");
      return NextResponse.json(
        { error: "Email is not configured yet. Please try again later." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: ZOHO_SMTP_HOST,
      port: Number(ZOHO_SMTP_PORT) || 465,
      secure: true,
      auth: { user: ZOHO_SMTP_USER, pass: ZOHO_SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Velluvia Website" <${ZOHO_SMTP_USER}>`,
      to: CONTACT_TO_EMAIL || ZOHO_SMTP_USER,
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
  }
}
