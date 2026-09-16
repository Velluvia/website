"use client";

import { FormEvent, useState } from "react";

const AMOUNTS_GBP = [25, 50, 75, 100, 150];

type Status = "idle" | "sending" | "error";

export default function GiftCardForm() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const effectiveAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const amountGbp = Number(data.amount);
    if (!amountGbp || amountGbp < 5 || amountGbp > 500) {
      setStatus("error");
      setErrorMsg("Please choose an amount between £5 and £500.");
      return;
    }

    try {
      const res = await fetch("/api/gift-cards/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, amountPence: Math.round(amountGbp * 100) }),
      });
      const result = await res.json();
      if (!res.ok || !result.url) {
        throw new Error(result.error || "Something went wrong.");
      }
      window.location.href = result.url; // off to Stripe Checkout
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong starting checkout. Please try again.");
    }
  }

  return (
    <form className="gift-card-form" onSubmit={handleSubmit}>
      <label className="eyebrow" style={{ display: "block", marginBottom: 10 }}>
        Choose an amount
      </label>
      <div className="gift-card-amounts">
        {AMOUNTS_GBP.map((a) => (
          <button
            key={a}
            type="button"
            className={`gift-card-amount-btn ${!customAmount && amount === a ? "active" : ""}`}
            onClick={() => {
              setAmount(a);
              setCustomAmount("");
            }}
          >
            £{a}
          </button>
        ))}
        <input
          type="number"
          min={5}
          max={500}
          placeholder="Other"
          className={`gift-card-amount-custom ${customAmount ? "active" : ""}`}
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
        />
      </div>
      <input type="hidden" name="amount" value={effectiveAmount || ""} />

      <div className="form-field">
        <label>Recipient's name (optional)</label>
        <input type="text" name="recipientName" placeholder="Leave blank to send to yourself" />
      </div>
      <div className="form-field">
        <label>Recipient's email (optional)</label>
        <input type="email" name="recipientEmail" placeholder="Leave blank to send to yourself" />
      </div>
      <div className="form-field">
        <label>Your email</label>
        <input type="email" name="purchaserEmail" required placeholder="you@example.com" />
      </div>
      <div className="form-field">
        <label>A short message (optional)</label>
        <textarea name="message" rows={3} maxLength={300} />
      </div>

      {status === "error" && <p className="form-error">{errorMsg}</p>}

      <button type="submit" className="btn btn-primary btn-block" disabled={status === "sending"}>
        {status === "sending" ? "Redirecting to checkout…" : `Buy Gift Card — £${effectiveAmount || 0}`}
      </button>
    </form>
  );
}
