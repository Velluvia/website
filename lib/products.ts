import { Collection, Product } from "./types";

export const collections: Collection[] = [
  {
    slug: "signature",
    name: "Signature Gifting",
    tagline: "Curated with care. Delivered with purpose.",
    description:
      "Our core collection — thoughtfully assembled gift boxes for welcomes, farewells, birthdays and every occasion in between, wrapped in the full Velluvia unboxing ritual.",
    accent: "gold",
    image: "/images/product-giftbox-1.jpg",
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
    slug: "sport",
    name: "Velluvia Sport",
    tagline: "Built for movement, gifted with intention.",
    description:
      "An angular, performance-driven edit for active recipients — bags, kits and accessories carrying the Velluvia mark in matte, embossed monochrome.",
    accent: "navy",
    image: "/images/logo-sport.jpg",
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
    slug: "the-signature-gift-box",
    collection: "signature",
    name: "The Signature Gift Box",
    price: 6800,
    currency: "gbp",
    description:
      "Our founding gift box — a considered edit wrapped in monogrammed tissue, closed with a wax-style seal, and finished with our satin ribbon and hand-tied hang tag.",
    details: [
      "Includes gold-monogrammed tissue wrap, sticker seal, thank-you card and hang tag",
      "Sage satin ribbon printed with the Velluvia wordmark",
      "Presented in a rigid kraft gift box",
      "Contents curated seasonally — enquire for current edit",
    ],
    images: ["/images/product-giftbox-1.jpg", "/images/product-giftbox-2.jpg"],
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
    slug: "sport-backpack",
    collection: "sport",
    name: "Velluvia Sport Backpack",
    price: 12000,
    currency: "gbp",
    description:
      "A weatherproof, structured backpack in matte recycled nylon, with the Velluvia Sport mark debossed on the front panel.",
    details: [
      "22L capacity, padded laptop sleeve to 15”",
      "Weatherproof recycled nylon shell",
      "Debossed Velluvia Sport monogram",
      "Available in Charcoal and Deep Navy",
    ],
    images: ["/images/logo-sport.jpg"],
  },
  {
    slug: "sport-recovery-kit",
    collection: "sport",
    name: "Sport Recovery Kit",
    price: 5400,
    currency: "gbp",
    description:
      "A compact kit for the recipient always on the move — recovery essentials packed in a branded, water-resistant pouch.",
    details: [
      "Water-resistant zip pouch with debossed monogram",
      "Includes recovery essentials and a printed care card",
      "Fits inside the Sport Backpack front pocket",
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
