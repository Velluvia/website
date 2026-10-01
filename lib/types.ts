export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: "gold" | "charcoal" | "sage" | "navy";
  image?: string;
  comingSoon?: boolean; // true while its products are still awaiting stock/photography
};

export type ProductVariant = {
  name: string; // e.g. "Cobalt Blue"
  hex: string; // swatch colour shown in the picker
  images: string[]; // this colour's own photos — falls back to the product's main images if omitted
};

export type Product = {
  slug: string;
  collection: string;
  name: string;
  price: number; // in minor units (pence)
  currency: "gbp";
  description: string;
  details: string[];
  images: string[]; // paths under /public/images, may be empty
  monogramTile?: boolean; // render styled fallback tile instead of photography
  order?: number; // optional manual position within its collection; lower shows first. Products without it sort after, by price.
  variants?: ProductVariant[]; // optional colour/style options; when present, the PDP shows a swatch picker
  rrpPence?: number; // genuine supplier/manufacturer RRP, in pence. Only set this when you have a real, verifiable figure — it renders as a struck-through comparison price. Leave unset rather than estimate.
  // Clothing details Google Shopping requires for apparel listings (baby sets)
  apparel?: {
    gender: "female" | "male" | "unisex";
    ageGroup: "newborn" | "infant" | "toddler" | "kids" | "adult"; // Google: newborn = 0–3 months, infant = 3–12 months
    size: string; // as shown on the garment labels, e.g. "0-3M", "6M"
    color: string; // main colours, e.g. "Pink/White"
  };
  rrpIsSeparatePrice?: boolean; // true when rrpPence is the combined price of the set's items bought separately (a bundle value, not a manufacturer RRP) — shows "Worth £X if bought separately" instead of "RRP"
  badge?: "new" | "bestseller"; // "bestseller" should only be set once you have real sales data backing it up — never guess
  comingSoon?: boolean; // true for an individual product not yet purchasable, even inside an otherwise-live collection (e.g. a new design awaiting a decided launch date)
};

export type CartLine = {
  slug: string;
  quantity: number;
};
