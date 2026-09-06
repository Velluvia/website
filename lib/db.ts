import { neon, NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Vercel's native "Vercel Postgres" was discontinued and replaced with a Neon
 * integration via the Vercel Marketplace. That integration injects the
 * connection string as DATABASE_URL, so this uses Neon's own driver directly
 * rather than @vercel/postgres (which expects a differently-named variable).
 *
 * Lazily constructed (like lib/stripe.ts) so the app can still build before
 * a database is connected — it only throws when a review is actually read
 * or written, not at import time.
 */
let client: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Connect a Neon Postgres database to this project in Vercel: Storage > Create Database > Neon."
    );
  }
  if (!client) {
    client = neon(process.env.DATABASE_URL);
  }
  return client;
}

let tableReady = false;
let ordersTableReady = false;
let remindersTableReady = false;

/**
 * Creates the reviews table if it doesn't exist yet. Safe to call on every
 * request — CREATE TABLE IF NOT EXISTS is a cheap no-op once it's there.
 * This means there's no manual migration step: connect a Neon database in
 * Vercel and the schema sets itself up on first use.
 */
export async function ensureReviewsTable() {
  if (tableReady) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      product_slug TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      verified BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (product_slug, customer_email)
    );
  `;
  await sql`CREATE INDEX IF NOT EXISTS reviews_product_idx ON reviews (product_slug);`;
  tableReady = true;
}

/**
 * Tracks completed orders — populated by the Stripe webhook, not by the
 * checkout flow itself (webhooks are the only reliable signal that a
 * payment actually completed; the client redirect to /checkout/success can
 * be skipped, retried, or hit without a real payment behind it). Used to:
 *   1. Avoid sending duplicate order-confirmation emails if Stripe retries
 *      the webhook (it does, on non-2xx responses).
 *   2. Know which orders are old enough to receive a "leave a review" email,
 *      and avoid sending that twice.
 */
export async function ensureOrdersTable() {
  if (ordersTableReady) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      stripe_session_id TEXT NOT NULL UNIQUE,
      customer_email TEXT NOT NULL,
      customer_name TEXT,
      product_slugs TEXT[] NOT NULL,
      amount_total INTEGER NOT NULL,
      confirmation_sent BOOLEAN NOT NULL DEFAULT FALSE,
      review_request_sent BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await sql`CREATE INDEX IF NOT EXISTS orders_review_pending_idx ON orders (review_request_sent, created_at);`;
  ordersTableReady = true;
}

/**
 * Stores customer-submitted "remind me about this occasion every year" signups
 * — the same mechanism Moonpig credits as a core growth driver (their own
 * reported figure: ~40% of orders happen within 7 days of a reminder email).
 * Month/day are stored separately (not a full date) so "does this occasion
 * recur today" is a simple equality check rather than year-aware date math.
 */
export async function ensureRemindersTable() {
  if (remindersTableReady) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS occasion_reminders (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      recipient_name TEXT,
      occasion_label TEXT NOT NULL,
      occasion_month INTEGER NOT NULL CHECK (occasion_month BETWEEN 1 AND 12),
      occasion_day INTEGER NOT NULL CHECK (occasion_day BETWEEN 1 AND 31),
      last_sent_year INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await sql`CREATE INDEX IF NOT EXISTS reminders_date_idx ON occasion_reminders (occasion_month, occasion_day);`;
  remindersTableReady = true;
}
