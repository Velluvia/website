"use client";

import { FormEvent, useEffect, useState } from "react";

type Review = {
  id: number;
  name: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  createdAt: string;
};

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="stars" style={{ fontSize: size }} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(value) ? "star filled" : "star"}>
          &#9733;
        </span>
      ))}
    </span>
  );
}

export default function ReviewsSection({
  productSlug,
  productName,
}: {
  productSlug: string;
  productName: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [ratingInput, setRatingInput] = useState(5);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?product=${encodeURIComponent(productSlug)}`);
      const data = await res.json();
      setReviews(data.reviews || []);
      setAverage(data.average || 0);
      setCount(data.count || 0);
    } catch {
      // fail quietly — reviews are supplementary, not core page function
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, productSlug, rating: ratingInput }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Something went wrong submitting your review.");
        return;
      }
      setSuccess(true);
      form.reset();
      setRatingInput(5);
      load();
      setTimeout(() => {
        setFormOpen(false);
        setSuccess(false);
      }, 2500);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="reviews-section">
      <div className="wrap">
        <div className="reviews-head">
          <div>
            <span className="eyebrow">Reviews</span>
            <h2>What people are saying</h2>
            {count > 0 ? (
              <div className="reviews-summary">
                <Stars value={average} size={22} />
                <span className="avg-text">
                  {average.toFixed(1)} out of 5 · {count} review{count === 1 ? "" : "s"}
                </span>
              </div>
            ) : (
              !loading && <p className="no-reviews">Be the first to review this set.</p>
            )}
          </div>
          <button className="btn btn-outline" type="button" onClick={() => setFormOpen((o) => !o)}>
            {formOpen ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {formOpen && (
          <div className="review-form-wrap">
            {success ? (
              <p className="review-success">Thank you — your review has been posted.</p>
            ) : (
              <form onSubmit={handleSubmit} className="review-form">
                <p className="review-form-note">
                  Reviews are limited to verified purchasers — we'll check the email below
                  against your order for <strong>{productName}</strong> before posting.
                </p>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="rv-name">Name</label>
                    <input id="rv-name" name="name" type="text" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="rv-email">Email used at checkout</label>
                    <input id="rv-email" name="email" type="email" required />
                  </div>
                </div>
                <div className="form-field">
                  <label>Rating</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        type="button"
                        key={i}
                        className={i <= ratingInput ? "star-btn filled" : "star-btn"}
                        onClick={() => setRatingInput(i)}
                        aria-label={`${i} star${i > 1 ? "s" : ""}`}
                      >
                        &#9733;
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="rv-title">Review title</label>
                  <input id="rv-title" name="title" type="text" required maxLength={120} />
                </div>
                <div className="form-field">
                  <label htmlFor="rv-body">Your review</label>
                  <textarea id="rv-body" name="body" rows={4} required maxLength={2000} />
                </div>
                <button className="btn btn-primary" type="submit" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit Review"}
                </button>
                {error && <p className="review-error">{error}</p>}
              </form>
            )}
          </div>
        )}

        <div className="review-list">
          {reviews.map((r) => (
            <div className="review-item" key={r.id}>
              <div className="review-item-head">
                <Stars value={r.rating} />
                {r.verified && <span className="badge">Verified Purchase</span>}
              </div>
              <p className="review-title">{r.title}</p>
              <p className="review-body">{r.body}</p>
              <p className="review-meta">
                {r.name} ·{" "}
                {new Date(r.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
