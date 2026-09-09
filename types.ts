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
};

export type CartLine = {
  slug: string;
  quantity: number;
};
