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
