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
};

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
