import type { Collection, Product } from "./types";

/**
 * Search-engine titles and descriptions.
 *
 * The visible product names (in products.ts) are written for shoppers on the site.
 * These are written for Google: they lead with the words people actually type
 * ("baby girl gift box 6 months", "pamper gift set for her"), stay inside the
 * lengths Google shows in results (title ~50 chars before " — Velluvia" is added,
 * description ~155 chars), and are also used as the product title in the
 * Google Shopping feed.
 *
 * Anything missing here falls back to the product's own name and description,
 * so new products still work; add an entry when you add a product.
 */
type Seo = { title: string; description: string };

export const productSeo: Record<string, Seo> = {
  // ---------- Signature Gifting ----------
  "blush-bloom-gift-set": {
    title: "Luxury Pamper Gift Set for Her | Blush & Bloom",
    description:
      "Pamper gift box for her with tumbler, scented candle, fleece blanket, bath bombs, eye mask & cosy socks. Gift-wrapped, UK delivery. Perfect for birthdays.",
  },
  "blush-serenity-gift-set": {
    title: "Self-Care Gift Box for Her | Blush Serenity",
    description:
      "Self-care gift box for women with candle, tumbler, bath bomb, handmade soap, towel & silk-feel eye mask. Thoughtful birthday or thank-you gift, UK delivery.",
  },
  "pretty-pampered-gift-set": {
    title: "Pink Pamper Gift Box for Women | Pretty & Pampered",
    description:
      "Pink pamper hamper for her: rose-gold tumbler, candle, bath salts, bath bomb, eye mask & cosmetic bag. Gift-boxed and ready to give. UK delivery.",
  },
  "citrus-bright-gift-set": {
    title: "Lemon Self-Care Gift Box | Citrus Bright",
    description:
      "Sunshine-yellow self-care gift box with lemon candle, bath bomb, bath salts, socks, headband & tumbler. A cheerful pick-me-up gift for her, UK delivery.",
  },
  "pink-blossom-gift-set": {
    title: "Birthday & Mother's Day Gift Box for Her",
    description:
      "Romantic pink gift box for her with flower bouquet, candle, tumbler, bath bomb, socks & mirror. Ideal for Mother's Day, birthdays & anniversaries. UK delivery.",
  },
  "gentlemans-signature-gift-set": {
    title: "Men's Gift Box Set | The Gentleman's Signature",
    description:
      "Black and gold gift box for men with tumbler, candle, socks, massage ball, bottle opener & notebook. Great for birthdays, Father's Day or him. UK delivery.",
  },
  "dino-adventure-gift-set": {
    title: "Dinosaur Gift Set for Kids | Dino Adventure",
    description:
      "Dinosaur gift box for kids with backpack, blanket, tumbler, sleep mask, toys & stationery. A fun birthday or Christmas gift for little explorers. UK delivery.",
  },
  "frozen-dreams-gift-set": {
    title: "Girls' Winter Princess Gift Set | Frozen Dreams",
    description:
      "Icy blue & pink girls' gift box with star cushion, fleece blanket, tumbler, tiara headband, notebook & sleep mask. Magical birthday gift. UK delivery.",
  },
  "unicorn-dream-gift-set": {
    title: "Unicorn Gift Set for Girls | Unicorn Dream",
    description:
      "Rainbow unicorn gift box for girls with plush star cushion, unicorn pouch, headband, sleep mask, notebook & tumbler. Perfect birthday gift. UK delivery.",
  },

  // ---------- Velluvia Office ----------
  "office-signature-pen": {
    title: "Engraved Gift Pen in Box | Velluvia Signature Pen",
    description:
      "Black lacquer & gold ballpoint pen engraved with the Velluvia mark, in a premium gift box. A smart, affordable gift for new starters, clients & promotions.",
  },
  "luxe-writing-set": {
    title: "A5 Notebook & Pen Gift Set | Luxe Saffiano",
    description:
      "Faux-leather A5 saffiano folio and engraved pen gift set in a rigid gift box. A polished corporate gift for onboarding, clients and promotions. UK delivery.",
  },
  "luxe-golf-umbrella": {
    title: "Branded Golf Umbrella Gift | Luxe Umbrella",
    description:
      "Full-size, wind-resistant golf umbrella with gold Velluvia print. A practical corporate gift for clients, events and new joiners. UK delivery.",
  },
  "luxe-executive-gift-set": {
    title: "Executive Gift Set | Pen, Notebook & Umbrella",
    description:
      "Corporate gift set with faux-leather A5 folio, engraved pen and golf umbrella. Ideal for client gifts, onboarding and promotions. Save vs buying separately.",
  },

  // ---------- Velluvia Baby ----------
  "little-sunflower-1m-gift-set": {
    title: "Newborn Baby Girl Gift Box 1 Month | 6-Piece Set",
    description:
      "New baby girl gift box (1 month): romper, 2 hats, 2 bibs & headband featuring genuine Barcellino. Gift-boxed, ready to give. Ideal baby shower gift.",
  },
  "little-rose-butterfly-1m-gift-set": {
    title: "Newborn Baby Girl Outfit Gift Box 1 Month | 6-Piece",
    description:
      "Rose & butterfly newborn girl gift box: top, leggings, 2 bibs, pram shoes & headband featuring genuine Barcellino. Gift-boxed. Perfect new baby gift.",
  },
  "little-miss-newborn-gift-set": {
    title: "Newborn Baby Girl Clothes Gift Set | 5-Piece Box",
    description:
      "Newborn baby girl gift box with bodysuit dress, cardigan, bib, hat & headband featuring genuine Barcellino. Gift-boxed for baby showers & new arrivals.",
  },
  "little-prince-newborn-gift-set": {
    title: "Newborn Baby Boy Gift Box 0-3 Months | 6-Piece Set",
    description:
      "Baby boy gift box (0-3 months): gingham romper, teddy romper, 2 hats & 2 pairs of pram shoes featuring genuine Barcellino. Gift-boxed, UK delivery.",
  },
  "little-explorer-newborn-gift-set": {
    title: "Baby Boy Clothes Gift Set 0-3 Months | 5-Piece Box",
    description:
      "New baby boy gift box (0-3 months): train romper, sleepsuit, knot hat & 2 pairs of pram shoes featuring genuine Barcellino. Gift-boxed, UK delivery.",
  },
  "little-doll-3m-gift-set": {
    title: "Baby Girl Gift Box 3 Months | 9-Piece Clothing Set",
    description:
      "9-piece baby girl gift box (3 months): bodysuit, bolero, 2 hats, 4 bibs & pram shoes featuring genuine Barcellino. Gift-boxed. Great baby shower gift.",
  },
  "little-cherry-6m-gift-set": {
    title: "Baby Girl Gift Box 6 Months | 8-Piece Clothing Set",
    description:
      "Cherry-red baby girl gift box (6 months): sleepsuit, bodysuit, cardigan, hat, headband, 2 bibs & pram shoes featuring genuine Barcellino. Gift-boxed.",
  },
  "little-sweetheart-6m-gift-set": {
    title: "Pink Baby Girl Gift Box 6 Months | 7-Piece Set",
    description:
      "Pink baby girl gift box (6 months): 2 rompers, bodysuit, hat, 2 bibs & pram shoes featuring genuine Barcellino. Gift-boxed and ready to give.",
  },
  "little-polka-dot-6m-gift-set": {
    title: "Baby Girl Dress Gift Set 6 Months | 7-Piece Box",
    description:
      "Polka-dot baby girl gift box (6 months): dress, bloomers, knit bolero, ruffle piece, 2 bibs & pram shoes featuring genuine Barcellino. Gift-boxed.",
  },
  "little-bluebell-6m-gift-set": {
    title: "Baby Girl Clothing Gift Box 6 Months | 7-Piece Set",
    description:
      "Blue floral baby girl gift box (6 months): bodysuit, 2 cardigans, hat, bib, bloomers & pram shoes featuring genuine Barcellino. Gift-boxed.",
  },
  "little-darling-9m-gift-set": {
    title: "Baby Girl Gift Box 9 Months | 7-Piece Clothing Set",
    description:
      "Baby girl gift box (9 months): 3 cardigans, striped sleepsuit, hat, headband & bandana bib featuring Barcellino. Gift-boxed and ready to give.",
  },
  "little-sunflower-12m-gift-set": {
    title: "1st Birthday Girl Outfit Gift Box 12 Months | 7-Piece",
    description:
      "First birthday baby girl gift box (12 months): dress, bloomers, 3 cardigans & 2 hats featuring genuine Barcellino. Gift-boxed, UK delivery.",
  },
  "little-butterfly-18m-gift-set": {
    title: "Toddler Girl Gift Box 18 Months | 7-Piece Clothing Set",
    description:
      "Toddler girl gift box (18 months): butterfly tutu romper, 2 boleros, cardigan & 3 lace-trim pieces featuring genuine Barcellino. Gift-boxed.",
  },
};

export const collectionSeo: Record<string, Seo> = {
  signature: {
    title: "Luxury Gift Boxes & Pamper Hampers UK",
    description:
      "Curated luxury gift boxes for her, him and kids: pamper hampers, self-care sets and birthday gifts, beautifully wrapped with UK delivery.",
  },
  baby: {
    title: "Baby Gift Boxes & New Baby Gift Sets UK",
    description:
      "Baby girl and baby boy gift boxes from newborn to 18 months, featuring genuine Barcellino clothing. Beautifully boxed baby shower and new baby gifts.",
  },
  office: {
    title: "Corporate Gifts & Executive Gift Sets UK",
    description:
      "Corporate gifts for clients, new starters and promotions: engraved pens, A5 notebook sets, golf umbrellas and executive gift sets. UK delivery.",
  },
};

export const siteSeo = {
  title: "Luxury Gift Boxes, Baby Gift Sets & Corporate Gifts",
  description:
    "Velluvia curates luxury gift boxes for every occasion: baby gift sets, pamper hampers for her, gifts for him and corporate gifts. Gift-wrapped, UK delivery.",
};

export function getProductSeo(p: Product): Seo {
  const s = productSeo[p.slug];
  if (s) return s;
  const d = p.description.length > 155 ? p.description.slice(0, 152).replace(/\s+\S*$/, "") + "…" : p.description;
  return { title: p.name, description: d };
}

export function getCollectionSeo(c: Collection): Seo {
  return collectionSeo[c.slug] ?? { title: c.name, description: c.description };
}
