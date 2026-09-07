# Velluvia — Website & Shop

A Next.js storefront for Velluvia: brand pages (Home, Collections, About, Contact) plus a working
cart and Stripe checkout. Built to deploy on **Vercel**, with domain/DNS on **Cloudflare**, mail
*receiving* on **Zoho Mail**, and outbound email *sending* via **Resend**.

## Stack

- **Next.js 14** (App Router, TypeScript) — pages + API routes
- **Stripe Checkout** — payments (redirect-based, no card data touches our server)
- **Resend** — outbound email (contact form, order confirmations, review/occasion reminders).
  Zoho Mail's free plan blocks external SMTP access for new accounts, so sending goes through
  Resend instead — `hello@velluvia.co.uk` still receives mail in Zoho completely normally.
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
  api/contact/route.ts         Sends enquiry form via Resend
components/                    Header, Footer, cards, cart provider, forms
lib/products.ts                Product & collection catalog (edit this to add products)
lib/stripe.ts                  Server-side Stripe client
lib/mailer.ts                  Resend email client
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
| `CHAT_MODEL` | — | Optional, defaults to `claude-haiku-4-5`. Anthropic periodically retires older models — if the chat widget ever silently stops responding again in the future, check [Anthropic's model deprecation page](https://platform.claude.com/docs/en/about-claude/model-deprecations) first before assuming it's a config/billing issue. |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys | Powers all outbound email — contact form, order confirmations, review/occasion reminders. Free tier covers 3,000 emails/month. |
| `EMAIL_FROM` | — | e.g. `Velluvia <hello@velluvia.co.uk>` — must be at a domain verified in Resend (Resend → Domains), not just any address |
| `CONTACT_TO_EMAIL` | — | Inbox that receives contact-form submissions, new-order notifications, **and** escalated chat conversations — this stays your normal Zoho inbox, only *sending* moved to Resend |

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

## 5. Email — receiving via Zoho, sending via Resend

These are two separate systems now, each doing one job:

### Receiving mail (`hello@velluvia.co.uk` inbox) — Zoho Mail via Cloudflare DNS

To receive mail at `@velluvia.co.uk` through Zoho's free webmail, add these records in
**Cloudflare DNS** (get exact values from Zoho Mail → Settings → Domains → your domain → DNS
records, as Zoho sometimes varies these per account):

- **MX records** (usually three, in priority order):
  - `mx.zoho.com` (priority 10)
  - `mx2.zoho.com` (priority 20)
  - `mx3.zoho.com` (priority 50)
- **TXT record (SPF):** `v=spf1 include:zoho.com ~all`
  - If you also send transactional mail from elsewhere, merge SPF into one record — don't add two.
  - Once Resend is added (below), this record needs Resend's SPF include merged in too.
- **TXT record (domain verification):** Zoho gives you a one-time verification TXT record — add
  it exactly as shown, then click "Verify" in Zoho.
- **DKIM:** Zoho Mail → Settings → DKIM → generate, then add the CNAME/TXT record it gives you.
- Keep all mail-related DNS records **DNS only** (grey cloud) in Cloudflare — proxying MX/TXT
  records breaks mail.

**Important — this is receiving only.** Zoho Mail's free plan does not include SMTP/IMAP/POP
access for external apps (confirmed directly in Zoho's own documentation), so no SMTP password
generated here will ever work for *sending* mail from the website. That's what Resend is for.

### Sending mail (contact form, order confirmations, reminders) — Resend

1. Create a free account at [resend.com](https://resend.com)
2. **Domains → Add Domain** → enter `velluvia.co.uk`
3. Add the DNS records Resend gives you (its own SPF/DKIM records) at your DNS provider —
   these sit alongside the Zoho records above, not in place of them
4. Wait for Resend to show the domain as **Verified**
5. **API Keys → Create API Key** → copy it into `RESEND_API_KEY` in Vercel
6. Set `EMAIL_FROM` to an address at the now-verified domain, e.g.
   `Velluvia <hello@velluvia.co.uk>`

Once both are set up: customers and the contact form send mail *out* through Resend, and any
replies land normally in the Zoho inbox you already use day to day — nothing changes about how
you read or reply to email, only how the website sends it.

## 6. Stripe — going live

1. While testing, use Stripe's **test mode** keys and Stripe's test card `4242 4242 4242 4242`
   (any future expiry, any CVC).
2. Complete Stripe's account activation (business details, bank account) before going live.
3. Switch `STRIPE_SECRET_KEY` in Vercel to your **live** secret key.
4. Optional but recommended: add a Stripe webhook (`checkout.session.completed`) pointing at a new
   `/api/webhooks/stripe` route if you want server-side order confirmation emails/records beyond
   Stripe's own receipt email — not included in this initial build.

## A note on type-checking during deploys

`next.config.mjs` has `typescript: { ignoreBuildErrors: true }` — added after Vercel's build
machine repeatedly and silently died during the "Checking validity of types..." step with no
error text printed at all (not a normal TypeScript failure; those always print "Type error:
...."). The code was independently verified to type-check cleanly elsewhere, pointing to an
environment-specific issue on that particular build step rather than an actual mistake in the
code.

**The tradeoff to know about:** with this setting, a genuine type error in a future change would
no longer block deployment — it would ship anyway. Run `npx tsc --noEmit` locally (or in any
sandbox) before pushing real code changes to catch mistakes that this bypass would otherwise let
through silently.

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
to `CONTACT_TO_EMAIL` via Resend (see "Email — receiving via Zoho, sending via Resend" above),
the same path the contact form uses.

Requires `ANTHROPIC_API_KEY` (see env var table above). To adjust what the assistant knows or how
it behaves, edit `SYSTEM_PROMPT` in `app/api/chat/route.ts`.

## Shipping

Checkout offers two delivery options, calculated server-side from the real cart subtotal (not
trusted from the client):

- **Standard Delivery** — £3.99, or **free automatically once the cart subtotal reaches £200**
- **Express Delivery** — £7.99, always (a paid speed upgrade, not affected by the free-delivery
  threshold)

To change the threshold or prices, edit `FREE_DELIVERY_THRESHOLD` and the two `shipping_rate_data`
blocks in `app/api/checkout/route.ts`.

## Occasion reminders ("never forget a birthday")

A homepage signup lets visitors save a recurring date (birthday, anniversary, etc.) and email —
a smaller version of the mechanism Moonpig's own leadership credits as a core growth driver
(they report ~40% of orders happen within 7 days of one of their reminder emails). A second daily
scheduled job (`app/api/cron/occasion-reminders/route.ts`) checks for saved occasions landing
7 days out and sends a gentle nudge pointing back to Signature Gifting, then automatically
re-arms for next year — no extra setup beyond what's already configured for the review-request
job (same `CRON_SECRET`, same Resend account, same Neon database). To change how far ahead it
reminds people, edit `DAYS_BEFORE_OCCASION` in that file.

## Meta Pixel (Facebook/Instagram ads)

Loaded directly in `app/layout.tsx` (not a separate component file — kept inline deliberately so
there's only one file to keep in sync) using Next.js's `next/script` loader
(`strategy="afterInteractive"`) rather than a raw script tag pasted into `<head>` — this lets the
browser finish rendering the page before loading Meta's script, rather than blocking on it.

**Setup:** add `NEXT_PUBLIC_META_PIXEL_ID` in Vercel with the ID from Meta Events Manager →
Connect data → Set up Meta Pixel (just the number passed to `fbq('init', '...')`, not the whole
code block). If this variable isn't set, nothing renders — safe to deploy without it.

**Worth doing next:** this only tracks from the customer's browser, which ad blockers and
Safari/iOS privacy settings increasingly block or degrade — Meta's own setup wizard recommends
pairing it with **Conversions API**, which reports events like completed purchases from the
*server* instead, where nothing can block it. The Stripe webhook (`app/api/webhooks/stripe/route.ts`)
that already fires on every completed order is the natural place to add this — not yet built, but
straightforward to add there when ready.

## Trust signals & cross-sell

- `components/TrustBadges.tsx` — shown on every product page (full version) and in the cart
  summary (compact version): secure checkout, the free-delivery threshold, and the returns
  window. Edit the `items` array in that file to change the wording.
- `components/YouMayAlsoLike.tsx` — shows up to 4 other products from the same collection at the
  bottom of each product page. No tracking or "recently viewed" data involved — it's a direct,
  honest "more like this."
- The cart page shows a live progress bar toward the free-delivery threshold, using the same
  `FREE_DELIVERY_THRESHOLD` constant the checkout route charges against (`lib/products.ts`), so
  the two can't drift out of sync.

## Order confirmation & review-request emails

Two things happen automatically after a real purchase, both requiring one-time setup:

### 1. Order confirmation email (sent immediately)

Stripe Checkout does **not** email your customer on its own unless you enable it — and even then,
it's a generic Stripe-branded receipt, not something in your own voice. Instead, this site listens
for the payment event directly via a **webhook** and sends its own branded confirmation through
Resend, to both the customer and to `CONTACT_TO_EMAIL`.

**Setup:**
1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. Endpoint URL: `https://www.velluvia.co.uk/api/webhooks/stripe`
3. Select the event: **checkout.session.completed**
4. After creating it, copy the **Signing secret** (starts with `whsec_`) into `STRIPE_WEBHOOK_SECRET`
   in Vercel, then redeploy

Without this webhook configured, checkout still works fine — customers just won't get a
confirmation email from Velluvia (Stripe's own receipt will still fire if that's enabled
separately in Stripe's dashboard settings).

### 2. "Leave a review" email (sent ~7 days later)

There's no real signal available for "the parcel has actually arrived" (Stripe and couriers don't
tell this site that), so this uses a fixed **7 days after purchase** as a reasonable proxy for UK
delivery. A scheduled job (`app/api/cron/review-requests/route.ts`, run daily via `vercel.json`)
checks for orders old enough that haven't had this email yet, sends it, and marks them done so it
never sends twice.

**Setup:**
1. Add a `CRON_SECRET` environment variable in Vercel — any random string (a password generator
   works fine). Vercel automatically attaches this as the request's Bearer token when it triggers
   the job, so nothing else needs configuring.
2. That's it — `vercel.json` already defines the daily schedule, and it ships with your next
   deploy.

**To change the delay:** edit `DAYS_BEFORE_REVIEW_REQUEST` in
`app/api/cron/review-requests/route.ts`.

**Known constraint:** Vercel's Hobby plan limits cron jobs to once per day, run sometime within the
scheduled hour (not to the exact minute) — fine for this use case. It also caps each run at 20
orders and a 10-second execution window to stay within Hobby's function timeout; if order volume
ever exceeds that in a single day, some customers would get their review email a day later than
intended, not skipped — worth upgrading to Vercel Pro if that becomes a real pattern.

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
