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
    price: 3099,
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
    slug: "dino-adventure-gift-set",
    collection: "signature",
    name: "The Dino Adventure Gift Set",
    price: 3499,
    currency: "gbp",
    description:
      "A playful, thoughtfully curated gift designed to spark curiosity, creativity, and big smiles in little explorers. The Dino Adventure Gift Set brings together fun, comfort, and practical everyday essentials in a charming dinosaur theme.",
    details: [
      "Dinosaur drawstring backpack and cosy printed blanket",
      "Insulated tumbler, satin sleep mask and educational toys",
      "Coin purse, stationery and matching accessories",
      "Arrives beautifully presented in Velluvia's signature packaging",
      "Perfect for: birthdays, children's gifts, Christmas, baby & toddler gifting, special achievements, educational gifting, or just because",
    ],
    images: [
      "/images/dino-adventure/dino-adventure-hero.jpg",
      "/images/dino-adventure/dino-adventure-box.jpg",
      "/images/dino-adventure/dino-adventure-flatlay.jpg",
      "/images/dino-adventure/dino-adventure-blanket.jpg",
      "/images/dino-adventure/dino-adventure-essentials.jpg",
      "/images/dino-adventure/dino-adventure-lifestyle.jpg",
    ],
  },
  {
    slug: "frozen-dreams-gift-set",
    collection: "signature",
    name: "The Frozen Dreams Gift Set",
    price: 3499,
    currency: "gbp",
    description:
      "A magical gift designed for little dreamers who love sparkle, imagination, and cosy moments. The Frozen Dreams Gift Set brings together a beautiful collection of winter-inspired essentials in enchanting shades of icy blue, soft white, and pastel pink.",
    details: [
      "Soft fleece blanket and insulated tumbler",
      "Dreamy sleep mask and fantasy-themed notebook",
      "Adorable plush star, cosy headband and coin purse",
      "Beautifully presented in a castle-inspired gift box",
      "Perfect for: birthdays, Christmas, princess lovers, sleepovers, children's gifts, special achievements, or magical moments",
    ],
    images: [
      "/images/frozen-dreams/frozen-dreams-hero.jpg",
      "/images/frozen-dreams/frozen-dreams-box.jpg",
      "/images/frozen-dreams/frozen-dreams-flatlay.jpg",
      "/images/frozen-dreams/frozen-dreams-star.jpg",
      "/images/frozen-dreams/frozen-dreams-blanket.jpg",
      "/images/frozen-dreams/frozen-dreams-lifestyle.jpg",
    ],
  },
  {
    slug: "blush-serenity-gift-set",
    collection: "signature",
    name: "The Blush Serenity Gift Set",
    price: 1899,
    currency: "gbp",
    description:
      "A Little Luxury, Just for Her. A beautifully curated gift of comfort, relaxation, and self-care, The Blush Serenity Gift Set is designed to make her feel cherished, appreciated, and truly special. Thoughtfully brought together in soft blush and elegant neutral tones, this indulgent collection combines everyday luxuries with soothing treats.",
    details: [
      "Rose-gold insulated tumbler with straw & brush",
      "Soft cosy fleece blanket and scented candle",
      "Bath bomb, handmade cold-process soap and heart-shaped bath treat",
      "Pink ribbon towel, compact/beauty accessory and greeting card",
      "Presented in a premium Velluvia gift box",
      "Perfect for: birthdays, self-care, Mother's Day, anniversaries, thank-you gifts, best friends, romantic gestures, or just because",
    ],
    images: [
      "/images/blush-serenity/blush-serenity-hero.jpg",
      "/images/blush-serenity/blush-serenity-box.jpg",
      "/images/blush-serenity/blush-serenity-flatlay.jpg",
      "/images/blush-serenity/blush-serenity-blanket.jpg",
      "/images/blush-serenity/blush-serenity-candle.jpg",
      "/images/blush-serenity/blush-serenity-tumbler.jpg",
    ],
  },
  {
    slug: "pretty-pampered-gift-set",
    collection: "signature",
    name: "The Pretty & Pampered Gift Set",
    price: 1599,
    currency: "gbp",
    description:
      "A Little Pretty. A Little Pampering. A Lot of Love. A playful, feminine treat designed to make her smile, The Pretty & Pampered Gift Set brings together cosy comforts, sweet indulgences, and relaxing self-care essentials in one beautifully presented package, arranged in a soft pink aesthetic.",
    details: [
      "12oz rose-gold tumbler with straw & brush",
      "100g scented candle and embroidered pink imitation-silk eye mask",
      "100g rose donut bath ball and 100g natural bath salts",
      "Printed canvas cosmetic bag and rose-themed gift accessories",
      "Folded greeting card and gift card, presented in a premium Velluvia gift box",
      "Perfect for: birthdays, best friends, self-care, girls' night in, thank-you gifts, Mother's Day, bridesmaids, or just because",
    ],
    images: [
      "/images/pretty-pampered/pretty-pampered-hero.jpg",
      "/images/pretty-pampered/pretty-pampered-box.jpg",
      "/images/pretty-pampered/pretty-pampered-flatlay.jpg",
      "/images/pretty-pampered/pretty-pampered-eyemask.jpg",
      "/images/pretty-pampered/pretty-pampered-candle.jpg",
      "/images/pretty-pampered/pretty-pampered-tumbler.jpg",
    ],
  },
  {
    slug: "gentlemans-signature-gift-set",
    collection: "signature",
    name: "The Gentleman's Signature Gift Set",
    price: 2999,
    currency: "gbp",
    description:
      "Thoughtful. Timeless. Truly Him. A refined collection created for the man who deserves to feel appreciated, celebrated, and effortlessly looked after. The Gentleman's Signature Gift Set combines practical everyday essentials with moments of relaxation and indulgence in a sophisticated black-and-gold presentation.",
    details: [
      "20oz insulated tumbler with straw & brush",
      "Black imitation-silk sleep mask and 100g foil-stamped black diamond soap",
      "Scented candle, men's socks and blue resin massage ball",
      "'MY MAN' keychain and large bottle opener",
      "A6 business notebook and motivational greeting card",
      "Presented in a premium Velluvia Signature gift box",
      "Perfect for: birthdays, anniversaries, Father's Day, Valentine's Day, promotions, graduations, thank-you gifts, partners, husbands, dads, or just because",
    ],
    images: [
      "/images/gentleman/gentleman-hero.jpg",
      "/images/gentleman/gentleman-box.jpg",
      "/images/gentleman/gentleman-flatlay.jpg",
      "/images/gentleman/gentleman-tumbler.jpg",
      "/images/gentleman/gentleman-candle.jpg",
      "/images/gentleman/gentleman-massageball.jpg",
      "/images/gentleman/gentleman-lifestyle.jpg",
    ],
  },
  {
    slug: "citrus-bright-gift-set",
    collection: "signature",
    name: "The Citrus Bright Gift Set",
    price: 1999,
    currency: "gbp",
    description:
      "A Burst of Sunshine. A Moment Just for You. Bright, uplifting, and beautifully curated, The Citrus Bright Gift Set is a joyful collection designed to bring a little sunshine into someone's day, inspired by the fresh, cheerful energy of citrus.",
    details: [
      "20oz tumbler with straw & brush and 100g yellow diamond soap",
      "100g lemon scented candle and 100g lemon bath bomb",
      "100ml lemon-scented bath salt",
      "Yellow coral fleece headband and coral fleece heart-embroidered socks",
      "Gold imitation-silk eye mask and yellow dried flower arrangement",
      "Presented in a beautiful Velluvia Signature gift box",
      "Perfect for: birthdays, self-care, thank-you gifts, best friends, friendship, pick-me-ups, or just because",
    ],
    images: [
      "/images/citrus-bright/citrus-bright-hero.jpg",
      "/images/citrus-bright/citrus-bright-box.jpg",
      "/images/citrus-bright/citrus-bright-flatlay.jpg",
      "/images/citrus-bright/citrus-bright-tumbler.jpg",
      "/images/citrus-bright/citrus-bright-candle.jpg",
      "/images/citrus-bright/citrus-bright-socks.jpg",
      "/images/citrus-bright/citrus-bright-card.jpg",
    ],
  },
  {
    slug: "pink-blossom-gift-set",
    collection: "signature",
    name: "The Pink Blossom Gift Set",
    price: 2499,
    currency: "gbp",
    description:
      "Made Especially. Just for You. A beautifully curated celebration of love, appreciation, and togetherness, The Pink Blossom Gift Set is designed to make someone feel cherished, valued, and truly special. Wrapped in soft pinks and romantic floral details, this luxurious collection combines cosy comforts, indulgent self-care treats, and heartfelt keepsakes.",
    details: [
      "12oz tumbler with straw & brush and 30×30cm soft towel",
      "Gift flower bouquet and 50g British pear-freesia scented candle",
      "100g black-label rose diamond soap and rose red cake gift socks",
      "OMO rose-red coral fleece headband and flamingo keychain",
      "Pink dried flower greeting card and flip-folding makeup mirror",
      "Gold powder imitation-silk eye mask, 100ml love bath salt and 100g rose bath bomb",
      "Presented in a premium Velluvia Signature gift box",
      "Perfect for: Mother's Day, birthdays, anniversaries, best friends, thank-you gifts, self-care, daughter & mum, sisters, or just because",
    ],
    images: [
      "/images/pink-blossom/pink-blossom-hero.jpg",
      "/images/pink-blossom/pink-blossom-box.jpg",
      "/images/pink-blossom/pink-blossom-flatlay.jpg",
      "/images/pink-blossom/pink-blossom-bouquet.jpg",
      "/images/pink-blossom/pink-blossom-tumbler.jpg",
      "/images/pink-blossom/pink-blossom-candle.jpg",
      "/images/pink-blossom/pink-blossom-bathsalt.jpg",
      "/images/pink-blossom/pink-blossom-sleepmask.jpg",
    ],
  },
  {
    slug: "unicorn-dream-gift-set",
    collection: "signature",
    name: "The Unicorn Dream Gift Set",
    price: 2399,
    currency: "gbp",
    description:
      "Sparkle. Dream. Believe. A magical collection created for little dreamers, The Unicorn Dream Gift Set brings together adorable treasures and delightful everyday essentials in a dreamy world of pastel colours, rainbows, and unicorns.",
    details: [
      "15oz gradient purple & pink coffee cup",
      "Unicorn bracelet and unicorn lock notebook",
      "Star glowing cushion and pom-pom pen",
      "Unicorn wallet, eye mask and headband",
      "Unicorn greeting card and soft unicorn-themed accessories",
      "Presented in a premium Velluvia Signature gift box",
      "Perfect for: birthdays, sleepovers, party gifts, Christmas, back-to-school, little dreamers, unicorn lovers, or just because",
    ],
    images: [
      "/images/unicorn-dream/unicorn-dream-hero.jpg",
      "/images/unicorn-dream/unicorn-dream-box.jpg",
      "/images/unicorn-dream/unicorn-dream-sleepmask.jpg",
      "/images/unicorn-dream/unicorn-dream-tumbler.jpg",
      "/images/unicorn-dream/unicorn-dream-plush.jpg",
      "/images/unicorn-dream/unicorn-dream-star.jpg",
      "/images/unicorn-dream/unicorn-dream-notebook.jpg",
    ],
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
  return products.filter((p) => p.collection === slug).sort((a, b) => a.price - b.price);
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
