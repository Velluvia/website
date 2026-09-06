# Velluvia — Website & Shop

A Next.js storefront for Velluvia: brand pages (Home, Collections, About, Contact) plus a working
cart and Stripe checkout. Built to deploy on **Vercel**, with domain/DNS on **Cloudflare** and
mail on **Zoho Mail**.

## Stack

- **Next.js 14** (App Router, TypeScript) — pages + API routes
- **Stripe Checkout** — payments (redirect-based, no card data touches our server)
- **Nodemailer + Zoho SMTP** — contact form delivery
- Plain CSS with design tokens in `app/globals.css` (no Tailwind) — matches the Velluvia brand
  guide: ivory/navy/gold, with sage + blush accents for the Home line and charcoal for Luxe.
- Cart state lives in the browser (React context + `localStorage`) — no database required for v1.

## Project structure

```
app/
  page.tsx                    Home
  about/page.tsx               Our Story
  contact/page.tsx             Contact + enquiry form
  collections/page.tsx         Collections index
  collections/[slug]/page.tsx  Signature / Luxe / Sport / Home
  products/[slug]/page.tsx     Product detail
  cart/page.tsx                Cart
  checkout/success/page.tsx    Post-payment confirmation
  checkout/cancel/page.tsx     Payment cancelled
  api/checkout/route.ts        Creates a Stripe Checkout Session
  api/contact/route.ts         Sends enquiry form via Zoho SMTP
components/                    Header, Footer, cards, cart provider, forms
lib/products.ts                Product & collection catalog (edit this to add products)
lib/stripe.ts                  Server-side Stripe client
public/images/                 Brand + product imagery
```

## 1. Run locally

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

Visit `http://localhost:3000`.

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Velluvia storefront"
git branch -M main
git remote add origin https://github.com/<your-org>/velluvia-website.git
git push -u origin main
```

## 3. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected). No build command changes needed.
3. Add Environment Variables (Project → Settings → Environment Variables) — see the table below.
4. Deploy. Vercel gives you a `*.vercel.app` preview URL immediately.
5. Once your domain is ready (step 4), add it under Project → Settings → Domains.

### Environment variables (set in Vercel, not committed to git)

| Variable | Where to get it | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | — | e.g. `https://www.velluvia.co.uk`. Used to build Stripe redirect URLs. |
| `STRIPE_SECRET_KEY` | [Stripe Dashboard → API keys](https://dashboard.stripe.com/apikeys) | Use `sk_test_…` while testing, `sk_live_…` once ready to take real payments. |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API Keys | Powers the chat widget. Without it, chat still works but every message is immediately forwarded to `CONTACT_TO_EMAIL` instead of being answered. Pay-per-use — check current pricing before high-traffic launch. |
| `CHAT_MODEL` | — | Optional, defaults to `claude-3-5-haiku-latest`. |
| `ZOHO_SMTP_HOST` | — | `smtp.zoho.com` (global) or `smtp.zoho.eu` (EU data centre) |
| `ZOHO_SMTP_PORT` | — | `465` |
| `ZOHO_SMTP_USER` | Your Zoho mailbox | e.g. `hello@velluvia.co.uk` |
| `ZOHO_SMTP_PASS` | Zoho Mail → Settings → Security → **App Passwords** | Do not use your normal login password |
| `CONTACT_TO_EMAIL` | — | Inbox that receives contact-form submissions **and** escalated chat conversations |

Redeploy after adding/changing env vars (Vercel does this automatically on the next push, or use
"Redeploy" in the dashboard).

## 4. Point your domain — Cloudflare + Vercel

1. **Add the domain to Cloudflare** (if not already) and make Cloudflare your DNS host at your
   registrar.
2. **In Vercel:** Project → Settings → Domains → add `velluvia.co.uk` and `www.velluvia.co.uk`.
   Vercel will show you the exact records it needs.
3. **In Cloudflare DNS**, add:
   - `A` record: `@` → `76.76.21.21` (Vercel's anycast IP — confirm the current value shown in
     your Vercel dashboard, it's occasionally updated)
   - `CNAME` record: `www` → `cname.vercel-dns.com`
   - Set both records' proxy status to **DNS only** (grey cloud) initially. Once the domain is
     verified in Vercel and the SSL certificate is issued, you can switch to **Proxied** (orange
     cloud) if you want Cloudflare's CDN/WAF in front of Vercel — test thoroughly after switching.
4. Wait for DNS propagation (usually minutes, sometimes up to a few hours) and confirm the domain
   shows "Valid Configuration" in Vercel.

## 5. Email — Zoho Mail via Cloudflare DNS

To send/receive mail at `@velluvia.co.uk` through Zoho, add these records in **Cloudflare DNS**
(get the exact values from Zoho Mail → Settings → Domains → your domain → DNS records, as Zoho
sometimes varies these per account):

- **MX records** (usually three, in priority order):
  - `mx.zoho.com` (priority 10)
  - `mx2.zoho.com` (priority 20)
  - `mx3.zoho.com` (priority 50)
- **TXT record (SPF):** `v=spf1 include:zoho.com ~all`
  - If you also send transactional mail from elsewhere, merge SPF into one record — don't add two.
- **TXT record (domain verification):** Zoho gives you a one-time verification TXT record — add
  it exactly as shown, then click "Verify" in Zoho.
- **DKIM:** Zoho Mail → Settings → DKIM → generate, then add the CNAME/TXT record it gives you.
  This significantly improves deliverability.
- Keep all mail-related DNS records **DNS only** (grey cloud) in Cloudflare — proxying MX/TXT
  records breaks mail.

Once MX + SPF + DKIM are verified, `hello@velluvia.co.uk` will receive mail in Zoho, and the
same mailbox (with an **app password**, not your login password) powers the website's contact
form via `ZOHO_SMTP_*` env vars above.

## 6. Stripe — going live

1. While testing, use Stripe's **test mode** keys and Stripe's test card `4242 4242 4242 4242`
   (any future expiry, any CVC).
2. Complete Stripe's account activation (business details, bank account) before going live.
3. Switch `STRIPE_SECRET_KEY` in Vercel to your **live** secret key.
4. Optional but recommended: add a Stripe webhook (`checkout.session.completed`) pointing at a new
   `/api/webhooks/stripe` route if you want server-side order confirmation emails/records beyond
   Stripe's own receipt email — not included in this initial build.

## Editing content

- **Products & collections:** `lib/products.ts` — add/edit objects in the `products` and
  `collections` arrays. Prices are in pence (minor units).
- **Images:** drop files in `public/images/` and reference as `/images/your-file.jpg`. Products
  without real photography automatically show a styled monogram tile (see `monogramTile` on the
  product data / `ProductCard.tsx`).
- **Copy & brand tokens:** colours, type and spacing are defined as CSS variables at the top of
  `app/globals.css` — update once, it cascades everywhere.

## Legal pages (placeholder content)

`/privacy-policy`, `/terms-conditions` and `/returns-policy` are template starting points, clearly
marked with a red "PLACEHOLDER" note on each page. They include blanks for your **Company
Number** and **ICO Registration Number** once you have them — search each file in
`app/privacy-policy/`, `app/terms-conditions/`, `app/returns-policy/` for `[to be added]` and
replace. Have a solicitor review before relying on these commercially.

## AI chat assistant

The chat bubble (bottom-right on every page) answers common questions about collections,
occasions and policies directly, using Claude (Anthropic's API) with a system prompt scoped to
Velluvia's actual facts — it's instructed not to invent prices, policies or company details it
wasn't given. When a visitor asks about a specific order, wants a refund, needs a bulk/corporate
quote, or the assistant isn't confident, it asks for their email and forwards the full transcript
to `CONTACT_TO_EMAIL` via the same Zoho mailbox as the contact form.

Requires `ANTHROPIC_API_KEY` (see env var table above). To adjust what the assistant knows or how
it behaves, edit `SYSTEM_PROMPT` in `app/api/chat/route.ts`.

## Product reviews (verified purchase)

Each product page has a review section: visitors can write a review, but it's only accepted
if the email they provide matches a **completed Stripe order that included that specific
product** — this is checked live against Stripe at submission time, not a separate order
database that could fall out of sync.

### One-time setup

1. In your Vercel project: **Storage → Create Database**. Vercel's native "Vercel Postgres" was
   discontinued — Postgres is now offered via the Marketplace, powered by **Neon**. Choose
   **Neon** under "Marketplace Database Providers," then follow the prompts (region, a name for
   the database, free tier is fine) and **Continue** through to connect it to this project.
2. Vercel automatically injects `DATABASE_URL` into your project's environment variables —
   nothing to copy by hand.
3. Redeploy. The reviews table creates itself automatically on first use (`CREATE TABLE IF NOT
   EXISTS` runs on every request — cheap once it already exists). No migration step.

### How verification works

When someone submits a review, the API (`app/api/reviews/route.ts`) scans your recent completed
Stripe Checkout Sessions for one where the `customer_details.email` matches what they entered
**and** the order included a line item for that product (matched via the `slug` metadata already
attached to each product at checkout — see `app/api/checkout/route.ts`). If no match is found,
the review is rejected with an explanatory message rather than posted as unverified.

A customer can revise their own review later — resubmitting with the same product + email updates
their existing review rather than creating a duplicate.

### Known limitations, honestly

- **Scan-based verification, not indexed lookup** — Stripe's Checkout Sessions don't support
  searching by email directly, so this pages through recent completed sessions (capped at 500) to
  find a match. Completely fine at small-shop order volumes; if you ever have thousands of orders,
  this should move to a proper order database indexed by email instead.
- **No moderation queue** — verified reviews post immediately. If you want to approve reviews
  before they go live, add a `status` column (`pending`/`approved`) and filter the public GET
  route to `approved` only, with a simple admin view to flip the status.
- **No photo uploads** — text and star rating only for now.

## What's intentionally out of scope for v1

- No admin/CMS — product edits are code changes (fast to extend to a headless CMS later if the
  catalog grows).
- No order database — Stripe is the system of record for payments; add a webhook + database if
  you need order history inside the app itself.
- No inventory/stock tracking.
