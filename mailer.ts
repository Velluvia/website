import nodemailer from "nodemailer";

export function getTransporter() {
  const { ZOHO_SMTP_HOST, ZOHO_SMTP_PORT, ZOHO_SMTP_USER, ZOHO_SMTP_PASS } = process.env;

  if (!ZOHO_SMTP_HOST || !ZOHO_SMTP_USER || !ZOHO_SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: ZOHO_SMTP_HOST,
    port: Number(ZOHO_SMTP_PORT) || 465,
    secure: true,
    auth: { user: ZOHO_SMTP_USER, pass: ZOHO_SMTP_PASS },
  });
}

export function getSenderAddress(): string {
  return process.env.ZOHO_SMTP_USER || "no-reply@velluvia.co.uk";
}

export function getContactInbox(): string {
  return process.env.CONTACT_TO_EMAIL || getSenderAddress();
}
