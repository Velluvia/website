"use client";

import { FormEvent, useState } from "react";

export default function ReminderSignup() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Something went wrong.");
        return;
      }
      setSuccess(true);
      form.reset();
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="on-charcoal reminder-section">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow on-dark">Never Miss a Moment</span>
          <h2>We'll remind you, every year</h2>
          <p>
            Tell us the date that matters, and we'll nudge you a week ahead — no more
            last-minute scrambling for a birthday, anniversary, or "just because."
          </p>
        </div>

        {success ? (
          <p className="reminder-success">You&rsquo;re all set — we&rsquo;ll be in touch closer to the date.</p>
        ) : (
          <form onSubmit={handleSubmit} className="reminder-form">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="rem-email">Your email</label>
                <input id="rem-email" name="email" type="email" required />
              </div>
              <div className="form-field">
                <label htmlFor="rem-occasion">Occasion</label>
                <input
                  id="rem-occasion"
                  name="occasionLabel"
                  type="text"
                  placeholder="e.g. Mum's Birthday"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="rem-name">Recipient's name (optional)</label>
                <input id="rem-name" name="recipientName" type="text" />
              </div>
              <div className="form-field">
                <label htmlFor="rem-date">Date</label>
                <input id="rem-date" name="date" type="date" required />
              </div>
            </div>
            <button className="btn btn-gold" type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Remind Me"}
            </button>
            {error && <p className="review-error">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
