export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: "gold" | "charcoal" | "sage" | "navy";
  image?: string;
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
};

export type CartLine = {
  slug: string;
  quantity: number;
};
