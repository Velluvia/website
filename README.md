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
| `ZOHO_SMTP_HOST` | — | `smtp.zoho.com` (global) or `smtp.zoho.eu` (EU data centre) |
| `ZOHO_SMTP_PORT` | — | `465` |
| `ZOHO_SMTP_USER` | Your Zoho mailbox | e.g. `hello@velluvia.co.uk` |
| `ZOHO_SMTP_PASS` | Zoho Mail → Settings → Security → **App Passwords** | Do not use your normal login password |
| `CONTACT_TO_EMAIL` | — | Inbox that should receive contact-form submissions |

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

## What's intentionally out of scope for v1

- No admin/CMS — product edits are code changes (fast to extend to a headless CMS later if the
  catalog grows).
- No order database — Stripe is the system of record for payments; add a webhook + database if
  you need order history inside the app itself.
- No inventory/stock tracking.
