"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong sending your message. Please email us directly at hello@velluvia.co.uk.");
    }
  }

  if (status === "sent") {
    return (
      <div className="empty-state" style={{ padding: "60px 0" }}>
        <h3>Thank you — message sent.</h3>
        <p>We&rsquo;ll be in touch shortly. For anything urgent, call 07480 854250.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="company">Company (optional)</label>
          <input id="company" name="company" type="text" />
        </div>
        <div className="form-field">
          <label htmlFor="enquiryType">Enquiry type</label>
          <select id="enquiryType" name="enquiryType" defaultValue="Personal Gift">
            <option>Personal Gift</option>
            <option>Corporate Gifting Programme</option>
            <option>Bulk / Bespoke Order</option>
            <option>Press or Partnership</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} required />
      </div>

      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Enquiry"}
      </button>

      {status === "error" && (
        <p style={{ color: "#B0554C", marginTop: 14, fontSize: 14 }}>{errorMsg}</p>
      )}
    </form>
  );
}
