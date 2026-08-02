import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Lazily construct the Stripe client so the app can still build/run
 * (e.g. on preview deployments) before STRIPE_SECRET_KEY is configured.
 */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it in your Vercel project's Environment Variables."
    );
  }
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
  }
  return stripeClient;
}
