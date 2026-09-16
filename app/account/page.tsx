"use client";

import { FormEvent, useState } from "react";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/api/account/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } finally {
      setStatus("sent"); // always show the same result — see API route comment
    }
  }

  if (status === "sent") {
    return (
      <section>
        <div className="wrap empty-state">
          <h1 style={{ fontSize: 32 }}>Check your email</h1>
          <p>
            If that email has an order history with us, a link to view it is on its way — it
            usually arrives within a minute or two.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="wrap" style={{ maxWidth: 480 }}>
        <p className="eyebrow">Your Orders</p>
        <h1>View your order history</h1>
        <p className="desc" style={{ marginBottom: 28 }}>
          Enter the email you used when ordering, and we'll send you a link to view your past
          Velluvia orders — no password needed.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send me a login link"}
          </button>
        </form>
      </div>
    </section>
  );
}
