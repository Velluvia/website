/**
 * Black Friday 2026 campaign settings — the only file to edit for the campaign.
 *
 * Before the offers are decided, leave `offersLive: false`: the page invites
 * people to join the early-access list and says offers are revealed to them
 * first. When you're ready, fill in `offers` and set `offersLive: true`.
 *
 * Keep every claim true (UK consumer law, enforced by the CMA): a Black Friday
 * price must be genuinely lower than the price you charged before, and an
 * offer must really end when the page says it ends.
 */
export type CampaignOffer = {
  title: string; // e.g. "15% off when you buy 2 gift boxes"
  detail: string; // e.g. "Use code BF15 at checkout. Ends Monday 30 November, 11:59pm."
};

export const blackFriday = {
  campaign: "black-friday-2026",
  year: 2026,
  /** Shown on the page as the key dates. */
  earlyAccess: "2026-11-23",
  blackFriday: "2026-11-27",
  cyberMonday: "2026-11-30",
  /** After this moment the page switches to "Black Friday has ended" wording. */
  endsAt: "2026-11-30T23:59:00Z",
  offersLive: false,
  offers: [] as CampaignOffer[],
  /**
   * The discount code emailed to everyone on the early-access list. Leave it
   * empty until the code exists in Stripe. Once it's filled in, offersLive is
   * true and the early-access date has arrived, the site emails the list
   * automatically each morning at 8am (UK) until everyone has had it.
   */
  earlyAccessCode: "",
};

/**
 * Early Christmas pre-sale, running before Black Friday.
 *
 * Tiered and automatic: 10% off one item, 15% off when the basket has two or
 * more. No code to type: checkout applies it by itself while the pre-sale is
 * on, and the cart shows the saving. The announcement bar at the top of every
 * page appears between `startsAt` and `endsAt` and hides itself afterwards.
 *
 * Nothing needs setting up in Stripe. To switch it on, set `enabled: true`.
 * Keep the tiers smaller than your Black Friday offer so Black Friday stays
 * the best deal, and don't extend the end date once it's advertised.
 */
export const preSale = {
  enabled: true,
  headline: "Early Christmas Pre-Sale: 10% off one gift box, 15% off two or more",
  shortHeadline: "Pre-Sale: up to 15% off gift boxes",
  /** Percent off by number of items in the basket (highest matching tier wins). */
  tiers: [
    { minItems: 1, percent: 10 },
    { minItems: 2, percent: 15 },
  ],
  startsAt: "2026-10-12T00:00:00Z",
  endsAt: "2026-11-01T23:59:00Z",
  link: "/black-friday",
};

export function preSaleIsActive(now = new Date()) {
  return (
    preSale.enabled &&
    now.getTime() >= new Date(preSale.startsAt).getTime() &&
    now.getTime() <= new Date(preSale.endsAt).getTime()
  );
}

/** Percent off for a basket with `itemCount` items, or 0 if none applies. */
export function preSalePercent(itemCount: number, now = new Date()) {
  if (!preSaleIsActive(now)) return 0;
  return preSale.tiers.reduce((best, t) => (itemCount >= t.minItems && t.percent > best ? t.percent : best), 0);
}

/** The next tier up, if adding items would unlock a bigger discount. */
export function preSaleNextTier(itemCount: number, now = new Date()) {
  if (!preSaleIsActive(now)) return null;
  const next = preSale.tiers
    .filter((t) => t.minItems > itemCount)
    .sort((a, b) => a.minItems - b.minItems)[0];
  return next ? { itemsNeeded: next.minItems - itemCount, percent: next.percent } : null;
}

export function formatCampaignDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function campaignHasEnded(now = new Date()) {
  return now.getTime() > new Date(blackFriday.endsAt).getTime();
}
