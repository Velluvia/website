import { Collection, Product } from "./types";

export const collections: Collection[] = [
  {
    slug: "signature",
    name: "Signature Gifting",
    tagline: "Curated with care. Delivered with purpose.",
    description:
      "Our core collection — thoughtfully assembled gift boxes for welcomes, farewells, birthdays and every occasion in between, wrapped in the full Velluvia unboxing ritual.",
    accent: "gold",
    image: "/images/blush-bloom/blush-bloom-hero.jpg",
  },
  {
    slug: "luxe",
    name: "Velluvia Luxe",
    tagline: "For the gifts that mark real milestones.",
    description:
      "Our premium tier for executive and high-value corporate gifting — fine writing instruments, leather goods and keepsakes finished in gold on black.",
    accent: "charcoal",
    image: "/images/product-writingset-1.jpg",
  },
  {
    slug: "office",
    name: "Velluvia Office",
    tagline: "Considered pieces for the modern workplace.",
    description:
      "A practical, polished edit for desks and onboarding — notebooks, organisers and welcome kits designed for hybrid teams and new starters alike.",
    accent: "navy",
  },
  {
    slug: "home",
    name: "Velluvia Home",
    tagline: "Everyday essentials, exceptional choices.",
    description:
      "Warm, considered pieces for the kitchen and the home — the softer side of Velluvia, marked by our navy-and-blush botanical monogram.",
    accent: "sage",
    image: "/images/logo-home.jpg",
  },
];

export const products: Product[] = [
  {
    slug: "blush-bloom-gift-set",
    collection: "signature",
    name: "The Blush & Bloom Gift Set",
    price: 6800,
    currency: "gbp",
    description:
      "A beautifully curated celebration of femininity, comfort, and self-care. Presented in Velluvia's signature blush-pink packaging, The Blush & Bloom Gift Set brings together cosy comforts and pampering treats — designed to turn an ordinary moment into something wonderfully memorable.",
    details: [
      "120oz insulated tumbler with straw and cleaning brush",
      "Scented candle, ultra-soft micro-flannel fleece blanket, and embroidered fuzzy socks",
      "Freesia and rose bath bombs, oatmeal soap bar",
      "Satin eye mask, keepsake piggy bank and matching accessories",
      "Wrapped in Velluvia's signature marbled box, satin ribbon and gift card",
      "Perfect for: birthdays, self-care, girls' night in, thank-you gifts, anniversaries, Mother's Day, bridesmaids, or just because",
    ],
    images: [
      "/images/blush-bloom/blush-bloom-hero.jpg",
      "/images/blush-bloom/blush-bloom-box.jpg",
      "/images/blush-bloom/blush-bloom-flatlay.jpg",
      "/images/blush-bloom/blush-bloom-blanket.jpg",
      "/images/blush-bloom/blush-bloom-essentials.jpg",
      "/images/blush-bloom/blush-bloom-lifestyle.jpg",
    ],
  },
  {
    slug: "little-explorer-gift-set",
    collection: "signature",
    name: "Little Explorer Gift Set",
    price: 4200,
    currency: "gbp",
    description:
      "A playful set for the smallest recipients on your list — soft blanket, sleep mask, drawstring bag and keepsakes, packed with the same Velluvia care as our adult boxes.",
    details: [
      "Includes plush blanket, sleep mask, drawstring bag and travel cup",
      "Finished with a Velluvia branded hang tag and thank-you card",
      "A considered welcome gift for a new arrival or young family",
    ],
    images: ["/images/product-dino-1.jpg", "/images/product-dino-2.jpg"],
  },
  {
    slug: "luxe-leather-writing-set",
    collection: "luxe",
    name: "Luxe Leather Writing Set",
    price: 9500,
    currency: "gbp",
    description:
      "A saffiano-leather folio and twin-pen set, foil-stamped with the Velluvia Luxe mark — our most requested piece for executive onboarding and client gifting.",
    details: [
      "A5 saffiano-leather folio with card slot and closure strap",
      "Matched ballpoint and stylus pen, engraved with 'Velluvia'",
      "Gold foil-stamped monogram on the cover",
      "Presented in a rigid black gift box",
    ],
    images: ["/images/product-writingset-1.jpg", "/images/product-writingset-2.jpg"],
  },
  {
    slug: "luxe-correspondence-set",
    collection: "luxe",
    name: "Luxe Correspondence Card Set",
    price: 3800,
    currency: "gbp",
    description:
      "Ten foil-edged correspondence cards and matching envelopes, for handwritten thanks that feel as considered as the gift itself.",
    details: [
      "10 cards, 10 lined envelopes, gold foil edge",
      "Blind-embossed Velluvia monogram",
      "Packaged in a rigid presentation box",
    ],
    images: [],
    monogramTile: true,
  },
  {
    slug: "office-welcome-kit",
    collection: "office",
    name: "Office Welcome Kit",
    price: 5600,
    currency: "gbp",
    description:
      "A polished first-day set for new starters — notebook, pen and desk essentials, presented the Velluvia way from the moment they sit down.",
    details: [
      "Branded notebook, pen and desk organiser",
      "Finished with a Velluvia hang tag and thank-you card",
      "Popular for onboarding programmes and hybrid teams",
    ],
    images: [],
    monogramTile: true,
  },
  {
    slug: "office-desk-essentials",
    collection: "office",
    name: "Desk Essentials Set",
    price: 4800,
    currency: "gbp",
    description:
      "A considered edit of everyday desk pieces — for a thank-you, a promotion, or simply a well-appointed workspace.",
    details: [
      "Curated desk accessories, seasonally refreshed",
      "Packed in Velluvia Signature packaging",
      "A practical, professional gift with a personal finish",
    ],
    images: [],
    monogramTile: true,
  },
  {
    slug: "home-kitchen-edit",
    collection: "home",
    name: "Everyday Essentials Kitchen Edit",
    price: 5800,
    currency: "gbp",
    description:
      "A warm-toned edit of kitchen staples, gifted the Velluvia way — presented with our botanical monogram and a hand-tied ribbon.",
    details: [
      "Curated seasonal kitchen essentials",
      "Wrapped in Velluvia Home packaging with botanical accent",
      "Includes a handwritten-style thank-you card",
    ],
    images: [],
    monogramTile: true,
  },
  {
    slug: "home-warming-hamper",
    collection: "home",
    name: "Home Warming Hamper",
    price: 7200,
    currency: "gbp",
    description:
      "A generous hamper for a first home, a housewarming, or simply a thank you — soft furnishings and pantry pieces layered in tissue and ribbon.",
    details: [
      "A mix of pantry and soft-furnishing pieces, curated seasonally",
      "Packed in a lined presentation basket",
      "Finished with the Velluvia Home ribbon and hang tag",
    ],
    images: [],
    monogramTile: true,
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCollection(slug: string): Product[] {
  return products.filter((p) => p.collection === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}
