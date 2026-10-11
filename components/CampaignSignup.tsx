"use client";

import { FormEvent, useState } from "react";

const CONSENT_TEXT =
  "Yes, email me Velluvia's Black Friday early access and gift offers. I can unsubscribe at any time.";

export default function CampaignSignup({ campaign, cta = "Get early access" }: { campaign: string; cta?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/campaign-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          consent: data.get("consent") === "on",
          consentText: CONSENT_TEXT,
          campaign,
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <p className="campaign-success">
        You&rsquo;re on the list. We&rsquo;ll email you before anyone else when our offers go live.
      </p>
    );
  }

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <div className="campaign-form-row">
        <label htmlFor={`cs-email-${campaign}`} className="sr-only">
          Your email
        </label>
        <input
          id={`cs-email-${campaign}`}
          name="email"
          type="email"
          placeholder="Your email address"
          autoComplete="email"
          required
        />
        <button className="btn btn-gold" type="submit" disabled={submitting}>
          {submitting ? "Joining…" : cta}
        </button>
      </div>
      <label className="campaign-consent">
        <input type="checkbox" name="consent" required />
        <span>
          {CONSENT_TEXT} <a href="/privacy-policy">Privacy policy</a>
        </span>
      </label>
      {error && <p className="campaign-error">{error}</p>}
    </form>
  );
}
