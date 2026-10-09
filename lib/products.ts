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
    slug: "baby",
    name: "Velluvia Baby",
    tagline: "Little moments, lasting memories.",
    description:
      "Beautifully boxed baby clothing gift sets for newborns and little ones — genuine Barcellino clothing, sweet details and our signature Velluvia presentation, ready to welcome a new arrival.",
    accent: "gold",
    image: "/images/baby-collection/baby-collection-card.jpg",
  },
  {
    slug: "new-arrivals",
    name: "New Arrivals",
    tagline: "The next chapter of Velluvia Signature — landing soon.",
    description:
      "Freshly designed gift sets, currently in production and not yet available to order. A preview of what's coming to Signature Gifting next.",
    accent: "gold",
    image: "/images/hugs-in-a-box/new-arrivals-collection-card.jpg",
    comingSoon: true,
  },
  {
    slug: "office",
    name: "Velluvia Office",
    tagline: "Considered pieces for the modern workplace.",
    description:
      "A practical, polished edit for desks and onboarding — notebooks, organisers and welcome kits designed for hybrid teams and new starters alike.",
    accent: "navy",
    image: "/images/office-pen/office-pen-hero.jpg",
  },
  {
    slug: "home",
    name: "Velluvia Home",
    tagline: "Everyday essentials, exceptional choices.",
    description:
      "Warm, considered pieces for the kitchen and the home — the softer side of Velluvia, marked by our navy-and-blush botanical monogram.",
    accent: "sage",
    image: "/images/cookware-set/home-collection-card.jpg",
    comingSoon: true,
  },
];

export const products: Product[] = [
  {
    slug: "blush-bloom-gift-set",
    collection: "signature",
    name: "The Blush & Bloom Gift Set",
    price: 2599,
    currency: "gbp",
    rrpPence: 3599,
    description:
      "A beautifully curated celebration of femininity, comfort, and self-care. Presented in Velluvia's signature blush-pink packaging, The Blush & Bloom Gift Set brings together cosy comforts and pampering treats — designed to turn an ordinary moment into something wonderfully memorable.",
    details: [
      "120oz insulated tumbler with straw and cleaning brush",
      "Scented candle, ultra-soft micro-flannel fleece blanket, and embroidered fuzzy socks",
      "Freesia and rose bath bombs, oatmeal soap bar",
      "Satin eye mask, keepsake piggy bank and matching accessories",
      "Wrapped in a premium marbled gift box, satin ribbon and gift card",
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
    price: 2999,
    currency: "gbp",
    rrpPence: 3999,
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
    price: 2999,
    currency: "gbp",
    rrpPence: 3999,
    description:
      "A magical gift designed for little dreamers who love sparkle, imagination, and cosy moments. The Frozen Dreams Gift Set brings together a beautiful collection of winter-inspired essentials in enchanting shades of icy blue, soft white, and pastel pink — all wrapped up in a snow-castle-themed gift box that makes the reveal part of the fun.",
    details: [
      "12oz insulated tumbler with straw and cleaning brush",
      "Ultra-soft fleece blanket (approx. 100 x 150cm)",
      "Five-pointed plush star cushion with an embroidered smiling face",
      "A5 fantasy-print notebook with a shimmering starlit cover",
      "Faux-fur, star-print sleep mask",
      "Half-moon plush coin purse with a bow detail",
      "Blue cartoon pen and a silver diamanté tiara headband",
      "Blue polka-dot fleece headband",
      "Handwritten-style greeting card",
      "Presented in a snow-castle-themed gift box, ready to give straight from the box",
      "Perfect for: birthdays, Christmas, princess lovers, sleepovers, children's gifts, get-well gifts, special achievements, or magical moments",
    ],
    images: [
      "/images/frozen-dreams/frozen-dreams-hero.jpg",
      "/images/frozen-dreams/frozen-dreams-box.jpg",
      "/images/frozen-dreams/frozen-dreams-flatlay.jpg",
      "/images/frozen-dreams/frozen-dreams-star.jpg",
      "/images/frozen-dreams/frozen-dreams-blanket.jpg",
      "/images/frozen-dreams/frozen-dreams-lifestyle.jpg",
      "/images/frozen-dreams/frozen-dreams-fullset-front.jpg",
      "/images/frozen-dreams/frozen-dreams-starclose.jpg",
      "/images/frozen-dreams/frozen-dreams-overhead.jpg",
      "/images/frozen-dreams/frozen-dreams-table.jpg",
      "/images/frozen-dreams/frozen-dreams-fullset-white.jpg",
      "/images/frozen-dreams/frozen-dreams-lifestyle.jpg",
    ],
  },
  {
    slug: "blush-serenity-gift-set",
    collection: "signature",
    name: "The Blush Serenity Gift Set",
    soldOut: true,

    price: 1999,
    currency: "gbp",
    rrpPence: 2499,
    description:
      "A Little Luxury, Just for Her. A beautifully curated gift of comfort, relaxation, and self-care, The Blush Serenity Gift Set is designed to make her feel cherished, appreciated, and truly special. Thoughtfully brought together in soft blush and elegant neutral tones, this indulgent collection combines everyday luxuries with soothing treats.",
    details: [
      "12oz insulated tumbler with straw and cleaning brush",
      "Rose dried-flower bath bomb (100g)",
      "White heart-shaped handmade cold-process soap (45g)",
      "British pear and freesia scented candle (110g)",
      "Pink ribbon tassel gift towel",
      "Matte-pink imitation silk eye mask",
      "Pink greeting card",
      "Presented in a premium gift box",
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
    price: 1999,
    currency: "gbp",
    rrpPence: 2599,
    description:
      "A Little Pretty. A Little Pampering. A Lot of Love. A playful, feminine treat designed to make her smile, The Pretty & Pampered Gift Set brings together cosy comforts, sweet indulgences, and relaxing self-care essentials in one beautifully presented package, arranged in a soft pink aesthetic.",
    details: [
      "12oz rose-gold tumbler with straw & brush",
      "100g scented candle and embroidered pink imitation-silk eye mask",
      "100g rose donut bath ball and 100g natural bath salts",
      "Printed canvas cosmetic bag and rose-themed gift accessories",
      "Folded greeting card and gift card, presented in a premium gift box",
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
    price: 2599,
    currency: "gbp",
    rrpPence: 3099,
    description:
      "Thoughtful. Timeless. Truly Him. A refined collection created for the man who deserves to feel appreciated, celebrated, and effortlessly looked after. The Gentleman's Signature Gift Set combines practical everyday essentials with moments of relaxation and indulgence in a sophisticated black-and-gold presentation.",
    details: [
      "20oz insulated tumbler with straw & brush",
      "Black imitation-silk sleep mask and 100g foil-stamped black diamond soap",
      "Scented candle, men's socks and blue resin massage ball",
      "'MY MAN' keychain and large bottle opener",
      "A6 business notebook and motivational greeting card",
      "Presented in a premium gift box",
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
    price: 1899,
    currency: "gbp",
    rrpPence: 2599,
    description:
      "A Burst of Sunshine. A Moment Just for You. Bright, uplifting, and beautifully curated, The Citrus Bright Gift Set is a joyful collection designed to bring a little sunshine into someone's day, inspired by the fresh, cheerful energy of citrus.",
    details: [
      "20oz tumbler with straw & brush and 100g yellow diamond soap",
      "100g lemon scented candle and 100g lemon bath bomb",
      "100ml lemon-scented bath salt",
      "Yellow coral fleece headband and coral fleece heart-embroidered socks",
      "Gold imitation-silk eye mask and yellow dried flower arrangement",
      "Presented in a premium gift box",
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
    price: 2599,
    currency: "gbp",
    rrpPence: 3099,
    description:
      "Made Especially. Just for You. A beautifully curated celebration of love, appreciation, and togetherness, The Pink Blossom Gift Set is designed to make someone feel cherished, valued, and truly special. Wrapped in soft pinks and romantic floral details, this luxurious collection combines cosy comforts, indulgent self-care treats, and heartfelt keepsakes.",
    details: [
      "12oz tumbler with straw & brush and 30×30cm soft towel",
      "Gift flower bouquet and 50g British pear-freesia scented candle",
      "100g black-label rose diamond soap and rose red cake gift socks",
      "OMO rose-red coral fleece headband and flamingo keychain",
      "Pink dried flower greeting card and flip-folding makeup mirror",
      "Gold powder imitation-silk eye mask, 100ml love bath salt and 100g rose bath bomb",
      "Presented in a premium gift box",
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
    price: 2599,
    currency: "gbp",
    rrpPence: 3599,
    description:
      "Sparkle. Dream. Believe. A magical collection created for little dreamers, The Unicorn Dream Gift Set brings together adorable plush treasures and delightful everyday essentials in a dreamy world of pastel rainbows and unicorns — all presented in a rainbow unicorn-themed gift box.",
    details: [
      "Insulated flip-lid tumbler in a pink-to-lilac ombre finish",
      "Rainbow star-shaped plush cushion with a smiling face",
      "Unicorn-face plush zip pouch",
      "Fluffy unicorn ear and horn headband",
      "Unicorn-shaped sleep mask with closed-eye embroidery",
      "Furry rainbow notebook with a unicorn and heart appliqué",
      "Pom-pom keychain and star-shaped keychains",
      "'Believe in Unicorns' greeting card",
      "Presented in a rainbow unicorn-themed gift box, ready to give straight from the box",
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
      "/images/unicorn-dream/unicorn-dream-fullset.jpg",
      "/images/unicorn-dream/unicorn-dream-unboxing2.jpg",
    ],
  },
  {
    slug: "luxe-writing-set",
    collection: "office",
    name: "Luxe Saffiano Writing Set",
    price: 999,
    currency: "gbp",
    rrpPence: 2599,
    description:
      "A faux-leather saffiano folio and pen set, foil-stamped with the Velluvia Luxe mark — a polished, practical gift made for executive onboarding and client gifting.",
    details: [
      "A5 faux-leather folio with saffiano texture, card slot and closure strap",
      "Black ballpoint pen engraved with 'Velluvia', plus a spare refill",
      "Gold foil-stamped monogram on the cover",
      "Presented in a rigid black gift box",
      "Perfect for: onboarding new joiners, client gifts, promotions, retirements, corporate milestones, or a smart desk upgrade",
    ],
    images: [
      "/images/luxe/luxe-writing-set-lifestyle.jpg",
      "/images/luxe/luxe-writing-set-details.jpg",
      "/images/luxe/luxe-writing-set-open.jpg",
      "/images/luxe/luxe-writing-set-hero.jpg",
      "/images/luxe/luxe-writing-set-boxed.jpg",
      "/images/luxe/luxe-writing-set-bag.jpg",
    ],
  },
  {
    slug: "luxe-golf-umbrella",
    collection: "office",
    name: "Luxe Umbrella",
    price: 999,
    currency: "gbp",
    rrpPence: 1999,
    description:
      "A full-size golf umbrella built to actually hold up in UK weather, finished with the Velluvia mark in gold foil on the canopy — the kind of practical, well-made gift that gets used on the very first rainy day.",
    details: [
      "Full-size, wind-resistant golf umbrella canopy",
      "Foil-printed Velluvia wordmark and logo on the canopy",
      "Sturdy black frame with a comfortable foam handle",
      "Presented ready to gift",
      "Perfect for: client gifts, corporate events, new joiners, golf days, Father's Day, or anyone who's ever been caught in the rain",
    ],
    images: [
      "/images/luxe/luxe-umbrella-rain.jpg",
      "/images/luxe/luxe-umbrella-details.jpg",
      "/images/luxe/luxe-umbrella-standing.jpg",
      "/images/luxe/luxe-umbrella-hero.jpg",
    ],
  },
  {
    slug: "luxe-executive-gift-set",
    collection: "office",
    name: "The Luxe Executive Gift Set",
    price: 1799,
    currency: "gbp",
    rrpPence: 2598,

    rrpIsSeparatePrice: true,
    badge: "new",
    description:
      "Polished at the Desk, Prepared for the Weather. The Luxe Executive Gift Set brings together our Luxe Saffiano Writing Set and Luxe Umbrella in one considered gift — a smart faux-leather folio and engraved pen for the meeting room, and a full-size golf umbrella for the walk there. Both are finished with the Velluvia mark in gold, making it an impressive, genuinely useful choice for welcoming new joiners, thanking clients or marking a promotion.",
    details: [
      "Luxe Saffiano Writing Set: A5 faux-leather folio with saffiano texture, card slot and closure strap",
      "Black ballpoint pen engraved with 'Velluvia', plus a spare refill",
      "Gold foil-stamped monogram on the folio cover, presented in a rigid black gift box",
      "Luxe Umbrella: full-size, wind-resistant golf umbrella with a sturdy black frame and foam handle",
      "Foil-printed Velluvia wordmark and logo on the canopy",
      "Save compared with buying the Writing Set and Umbrella separately",
      "Perfect for: onboarding new joiners, client gifts, promotions, retirements, corporate events, Father's Day, or a thoughtful thank-you",
    ],
    images: [
      "/images/luxe/luxe-executive-set-hero.jpg",
      "/images/luxe/luxe-writing-set-lifestyle.jpg",
      "/images/luxe/luxe-umbrella-rain.jpg",
      "/images/luxe/luxe-writing-set-details.jpg",
      "/images/luxe/luxe-umbrella-details.jpg",
    ],
  },
  {
    slug: "office-signature-pen",
    collection: "office",
    name: "The Velluvia Signature Pen",
    price: 599,
    currency: "gbp",
    rrpPence: 1099,
    description:
      "Timeless Elegance, Thoughtful Impression. The Velluvia Signature Pen is a premium ballpoint crafted for the moments that matter — signing a contract, welcoming a new hire, or simply making a well-appointed desk feel a little more considered. Finished in deep black lacquer with polished gold-tone trim and engraved with the Velluvia mark, it's designed to be picked up and noticed, not left in a drawer.",
    details: [
      "Black lacquer barrel with polished gold-tone clip, bands and tip",
      "Engraved Velluvia 'V' monogram and wordmark on the barrel",
      "Smooth twist-action ballpoint mechanism",
      "Presented in a rigid, foil-branded premium gift box with satin ribbon",
      "A refined pairing with our notebooks and correspondence sets for a complete desk gift",
      "Perfect for: onboarding new joiners, promotions, retirements, client thank-yous, corporate milestones, or as a personal everyday-carry upgrade",
    ],
    images: [
      "/images/office-pen/office-pen-hero.jpg",
      "/images/office-pen/office-pen-lifestyle-writing.jpg",
      "/images/office-pen/office-pen-boxed.jpg",
      "/images/office-pen/office-pen-notebook.jpg",
      "/images/office-pen/office-pen-macro.jpg",
      "/images/office-pen/office-pen-marble-card.jpg",
      "/images/office-pen/office-pen-hand-writing.jpg",
      "/images/office-pen/office-pen-birdseye.jpg",
      "/images/office-pen/office-pen-flatlay.jpg",
      "/images/office-pen/office-pen-angled.jpg",
    ],
    video: {
      src: "/videos/velluvia-signature-pen.mp4",
      poster: "/videos/velluvia-signature-pen-poster.jpg",
    },
  },
  {
    slug: "home-11-piece-cast-iron-cookware-set",
    collection: "home",
    name: "11-Piece Enamelled Cast Iron Cookware Set",
    price: 16599,
    currency: "gbp",
    rrpPence: 20000,
    badge: "new",
    order: 0,
    description:
      "There is a quiet confidence in a kitchen stocked with cookware that simply works — pieces you reach for without a second thought, that go from stovetop to oven to table without missing a beat. The Velluvia 11-Piece Enamelled Cast Iron Cookware Set was built around that idea: fewer gaps, better choices, everyday essentials elevated to something you're proud to cook with. Each piece is finished with a smooth, glossy enamel exterior and a cream interior, so food releases cleanly and colour is easy to judge as you cook — no seasoning, no rust, and none of the maintenance that traditional bare cast iron demands.",
    details: [
      "11 coordinated pieces: large and medium round casseroles with lids, an oval casserole with lid, a shallow braiser with lid, a saucepan with lid, a mini cocotte with lid, a rectangular roasting dish, a square ridged griddle pan, a round skillet, a loaf/terrine dish and a round serving dish",
      "Even, reliable heat retention across every piece, for consistent searing, braising and roasting",
      "Enamelled cast iron resists chipping and cracking under normal use, with no seasoning required",
      "Hob, oven and grill safe (see care notes); hand wash recommended to preserve the glaze",
      "Available in Cobalt Blue, Signature Red or Turquoise",
      "Presented in Velluvia's signature packaging with tissue wrap, branded seal, ribbon and thank-you card",
      "Perfect for: housewarmings, weddings, first homes, kitchen upgrades, or a considered gift for the cook in your life",
    ],
    images: [
      "/images/cookware-set/cookware-set-hero.jpg",
      "/images/cookware-set/cookware-set-red-lifestyle.jpg",
      "/images/cookware-set/cookware-set-blue-full.jpg",
      "/images/cookware-set/cookware-set-red-full.jpg",
      "/images/cookware-set/cookware-set-blue-full-alt.jpg",
      "/images/cookware-set/cookware-set-colour-swatch.jpg",
    ],
    variants: [
      {
        name: "Cobalt Blue",
        hex: "#2C5F8A",
        images: [
          "/images/cookware-set/cookware-set-hero.jpg",
          "/images/cookware-set/cookware-set-blue-full.jpg",
          "/images/cookware-set/cookware-set-blue-full-alt.jpg",
        ],
      },
      {
        name: "Signature Red",
        hex: "#A6241E",
        images: [
          "/images/cookware-set/cookware-set-red-lifestyle.jpg",
          "/images/cookware-set/cookware-set-red-full.jpg",
        ],
      },
      {
        name: "Turquoise",
        hex: "#2E93A0",
        // Photography for this colourway is limited to the comparison shot below —
        // swap in dedicated Turquoise product photos here once available.
        images: ["/images/cookware-set/cookware-set-colour-swatch.jpg"],
      },
    ],
  },
  {
    slug: "hello-sunshine-gift-set",
    collection: "new-arrivals",
    name: "The Hello Sunshine Gift Set",
    price: 2499,
    currency: "gbp",
    comingSoon: true,
    description:
      "A warm, sunflower-bright pick-me-up for anyone who could use a little more sunshine in their day. Cosy, cheerful, and finished with a hand-tied ribbon bow, it's built around the small comforts that make an ordinary afternoon feel a little better.",
    details: [
      "Ultra-soft knitted throw blanket, tied with a satin ribbon bow",
      "Sunflower-embroidered socks",
      "Handmade sunflower crochet bouquet",
      "Ceramic mug — 'Good things take time'",
      "Vanilla & coconut scented candle (150g)",
      "Gold-tone spoon",
      "Presented in a premium gift box",
      "Perfect for: thinking-of-you gifts, get-well wishes, birthdays, thank-you gifts, or just because",
    ],
    images: ["/images/hello-sunshine/hello-sunshine-hero.jpg"],
  },
  {
    slug: "hugs-in-a-box-gift-set",
    collection: "new-arrivals",
    name: "The Hugs in a Box Gift Set",
    price: 2899,
    currency: "gbp",
    comingSoon: true,
    description:
      "A soft, wildflower-pretty collection built for comfort — the kind of gift that says 'thinking of you' better than words do. Every piece is chosen to slow someone down for an afternoon: something to wrap up in, something to sip from, something to write in.",
    details: [
      "Knitted throw blanket, tied with a satin ribbon bow",
      "A6 notebook and matching pen",
      "Ceramic mug",
      "Lavender scented candle",
      "Chamomile bath salts",
      "Oatmeal soap bar",
      "Embroidered face towel with a gold heart detail",
      "Small artificial succulent and a gold-tone spoon",
      "Presented in a premium wildflower-print gift box",
      "Perfect for: thinking-of-you gifts, sympathy, get-well wishes, birthdays, or a little comfort on a hard day",
    ],
    images: [
      "/images/hugs-in-a-box/hugs-beige-hero.jpg",
      "/images/hugs-in-a-box/hugs-beige-flatlay-open.jpg",
      "/images/hugs-in-a-box/hugs-beige-flatlay-items.jpg",
      "/images/hugs-in-a-box/hugs-beige-lifestyle.jpg",
    ],
  },
  {
    slug: "especially-for-you-gift-set",
    collection: "new-arrivals",
    name: "The Especially For You Gift Set",
    price: 2999,
    currency: "gbp",
    comingSoon: true,
    description:
      "A romantic, rose-toned collection made to make someone feel genuinely spoiled — soft textures, a rose-scented candle, and delicate floral touches throughout, all finished with a hand-tied bow.",
    details: [
      "40oz insulated tumbler with straw",
      "Natural stone bracelet",
      "Rose scented candle (110g)",
      "Rose heart-shaped soap (50g) and rose bath bomb (100g)",
      "Handmade crochet flower bouquet",
      "Satin sleep mask and hair ties",
      "Floral cosmetic pouch",
      "Quicksand compact mirror",
      "Dried-flower greeting card",
      "Presented in a premium floral gift box",
      "Perfect for: birthdays, anniversaries, romantic gestures, Valentine's Day, or just because",
    ],
    images: [
      "/images/especially-for-you/especially-pink-hero.jpg",
      "/images/especially-for-you/especially-pink-flatlay-open.jpg",
      "/images/especially-for-you/especially-pink-flatlay-items.jpg",
      "/images/especially-for-you/especially-pink-lifestyle.jpg",
    ],
  },
  {
    slug: "hugs-in-a-box-cream-gift-set",
    collection: "new-arrivals",
    name: "The Hugs in a Box Gift Set (Cream)",
    price: 2899,
    currency: "gbp",
    comingSoon: true,
    description:
      "A gentle, motivational pick-me-up dressed in soft cream — built for someone who needs reminding they've got this. Cosy textures and encouraging little touches throughout, finished with a satin ribbon.",
    details: [
      "Off-white pineapple-check knitted throw blanket",
      "White powder-coated 12oz mug",
      "Cosy socks and a matching waist belt",
      "Apricot & coconut sleep mask",
      "Oatmeal soap bar (100g)",
      "Vanilla & coconut scented bath bomb and candle (100g each)",
      "Handmade knitted doll",
      "A5 notebook (40 pages) and greeting card",
      "Presented in a premium gift box",
      "Perfect for: thinking-of-you gifts, encouragement, exam season, new job nerves, or a hard week",
    ],
    images: [
      "/images/hugs-in-a-box-cream/hugs-cream-hero.jpg",
      "/images/hugs-in-a-box-cream/hugs-cream-flatlay-open.jpg",
      "/images/hugs-in-a-box-cream/hugs-cream-flatlay-items.jpg",
      "/images/hugs-in-a-box-cream/hugs-cream-lifestyle.jpg",
    ],
  },
  {
    slug: "happy-birthday-daisy-gift-set",
    collection: "new-arrivals",
    name: "The Happy Birthday Gift Set",
    price: 1799,
    currency: "gbp",
    comingSoon: true,
    description:
      "A bright, daisy-covered birthday treat that keeps things simple and sweet — a pretty glass to sip from, a couple of hair accessories, and a candle to mark the day.",
    details: [
      "16oz daisy-print glass with stainless steel straw and cleaning brush",
      "Vanilla & coconut scented candle (100g)",
      "Off-white hairband and hair clip",
      "Chamomile bath bomb (100g)",
      "Bracelet and paper cutout decorations",
      "Presented in a kraft gift box with a lockable ribbon closure",
      "Perfect for: birthdays, milestone birthdays, or a small daily treat",
    ],
    images: [
      "/images/happy-birthday-daisy/birthday-daisy-hero.jpg",
      "/images/happy-birthday-daisy/birthday-daisy-flatlay-open.jpg",
      "/images/happy-birthday-daisy/birthday-daisy-flatlay-items.jpg",
      "/images/happy-birthday-daisy/birthday-daisy-lifestyle.jpg",
    ],
  },
  {
    slug: "little-miss-newborn-gift-set",
    collection: "baby",
    name: "The Little Miss Newborn Gift Set",
    price: 2799,
    currency: "gbp",
    rrpPence: 10000,
    rrpIsSeparatePrice: true,
    apparel: { gender: "female", ageGroup: "newborn", size: "0-3M", color: "White/Pink" },
    description:
      "Celebrate the arrival of a beautiful baby girl with a sweet, beautifully coordinated collection of newborn essentials, thoughtfully put together and ready to gift. Perfect for a newborn baby gift, baby shower, maternity celebration, or simply a little surprise to welcome a new arrival — this adorable set brings together charming, genuine Barcellino pieces for those precious first days.",
    details: [
      "Featuring genuine Barcellino baby clothing",
      "A cute bodysuit dress",
      "Coordinating little cardigan sleeves",
      "A soft baby bib",
      "A sweet baby hat",
      "A matching headband",
      "Beautifully presented, ready to gift",
      "Velluvia is an independent retailer and is not affiliated with Barcellino.",
      "Perfect for: baby showers, newborn visits, maternity celebrations, new mums, or welcoming a new arrival",
      "Please check garment sizing and care instructions before purchase. Always supervise babies while wearing accessories such as headbands, and remove during sleep.",
    ],
    images: [
      "/images/newborn-little-miss/newborn-hero.jpg",
      "/images/newborn-little-miss/newborn-flatlay-box.jpg",
      "/images/newborn-little-miss/newborn-flatlay-items.jpg",
      "/images/newborn-little-miss/newborn-lifestyle-baby.jpg",
      "/images/newborn-little-miss/newborn-lifestyle-unboxing.jpg",
    ],
  },
  {
    slug: "little-prince-newborn-gift-set",
    collection: "baby",
    name: "The Little Prince Newborn Gift Set",
    price: 2799,
    currency: "gbp",
    rrpPence: 12000,
    rrpIsSeparatePrice: true,
    apparel: { gender: "male", ageGroup: "newborn", size: "0-3M", color: "Blue/White" },
    description:
      "Smart, Soft and Simply Adorable. Welcome a brand-new baby boy in style with The Little Prince Newborn Gift Set — a beautifully coordinated newborn wardrobe that's as practical as it is photo-ready. A classic blue gingham shirt romper for special occasions sits alongside a soft white romper with a sweet teddy appliqué for everyday cuddles, finished with two hats and two pairs of tiny pram shoes. Every piece is genuine Barcellino, chosen for those precious first weeks and presented in our signature white Velluvia gift box, so it's ready to give the moment it arrives. Six pieces, one unforgettable first outfit collection.",
    details: [
      "Featuring genuine Barcellino baby clothing",
      "Blue gingham shirt romper with button front and collar",
      "Soft white short romper with teddy bear appliqué",
      "White baby beanie with appliqué detail",
      "Navy baby beanie",
      "Blue 'Prince' teddy bear pram booties",
      "White sailboat lace-up pram shoes",
      "Sized for newborns, 0–3 months",
      "Presented in Velluvia's signature white gift box, ready to give",
      "Velluvia is an independent retailer and is not affiliated with Barcellino.",
      "Perfect for: baby showers, newborn visits, new baby boys, maternity leave gifts, new mums, christenings, or welcoming a new arrival",
      "Please check garment sizing and care instructions before purchase. Pram shoes are designed for non-walking babies. Always supervise babies while wearing hats and shoes, and remove them during sleep.",
    ],
    images: [
      "/images/little-gentleman-newborn-set/little-gentleman-newborn-set-02.jpg",
      "/images/little-gentleman-newborn-set/little-gentleman-newborn-set-01.jpg",
      "/images/little-gentleman-newborn-set/little-gentleman-newborn-set-03.jpg",
      "/images/little-gentleman-newborn-set/little-gentleman-newborn-set-04.jpg",
      "/images/little-gentleman-newborn-set/little-gentleman-newborn-set-05.jpg",
      "/images/little-gentleman-newborn-set/little-gentleman-newborn-set-06.jpg",
      "/images/little-gentleman-newborn-set/little-gentleman-newborn-set-07.jpg",
      "/images/little-gentleman-newborn-set/little-gentleman-newborn-set-08.jpg",
    ],
  },
  {
    slug: "little-explorer-newborn-gift-set",
    collection: "baby",
    name: "The Little Explorer Newborn Gift Set",
    price: 1799,
    currency: "gbp",
    rrpPence: 11000,
    rrpIsSeparatePrice: true,
    apparel: { gender: "male", ageGroup: "newborn", size: "0-3M", color: "Grey/White" },
    description:
      "Big Adventures Start Small. Playful, cosy and full of charm, The Little Explorer Newborn Gift Set is made for the newest little adventurer in the family. A heather-grey short romper with a buttercup-yellow collar and a teddy-and-train appliqué brings the fun by day, while a soft white footed sleepsuit keeps him snug through the night. A cheerful red-and-grey striped knot hat and two pairs of tiny pram shoes complete the look. Made up of genuine Barcellino pieces, thoughtfully put together and presented in our signature white Velluvia gift box, it's a joyful, ready-to-give welcome at a truly lovely price.",
    details: [
      "Featuring genuine Barcellino baby clothing",
      "Heather-grey short romper with yellow collar and teddy-and-train appliqué",
      "Soft white footed sleepsuit with a delicate grey print",
      "Red-and-grey striped knot hat",
      "Blue 'Prince' teddy bear pram booties",
      "White sailboat lace-up pram shoes",
      "Sized for newborns, 0–3 months",
      "Presented in Velluvia's signature white gift box, ready to give",
      "Velluvia is an independent retailer and is not affiliated with Barcellino.",
      "Perfect for: baby showers, newborn visits, new baby boys, welcome-home gifts, new mums, colleague collections, or welcoming a new arrival",
      "Please check garment sizing and care instructions before purchase. Pram shoes are designed for non-walking babies. Always supervise babies while wearing hats and shoes, and remove them during sleep. Props shown in lifestyle photos are not included.",
    ],
    images: [
      "/images/little-explorer-newborn-set/little-explorer-newborn-set-03.jpg",
      "/images/little-explorer-newborn-set/little-explorer-newborn-set-01.jpg",
      "/images/little-explorer-newborn-set/little-explorer-newborn-set-02.jpg",
      "/images/little-explorer-newborn-set/little-explorer-newborn-set-04.jpg",
      "/images/little-explorer-newborn-set/little-explorer-newborn-set-05.jpg",
    ],
  },
  {
    slug: "little-cherry-6m-gift-set",
    collection: "baby",
    name: "The Little Cherry Baby Gift Set (6M)",
    price: 2299,
    currency: "gbp",
    rrpPence: 12000,
    rrpIsSeparatePrice: true,
    apparel: { gender: "female", ageGroup: "infant", size: "6M", color: "Red/White" },
    description:
      "Sweet as a Cherry. The Little Cherry Gift Set brings together eight genuine Barcellino pieces in a cheerful palette of cherry red, coral pink and soft ivory. A classic red-and-white striped footed sleepsuit and an elegant ivory bodysuit with a Peter Pan collar and sparkling monogram form the heart of the set, finished with a coral bolero cardigan, a polka-dot hat, a headband with hand-crocheted cherries, two beautifully detailed bibs and a pair of 'I Love Mum' pram shoes. Presented in our signature white Velluvia gift box, it's a charming, complete wardrobe for her six-month milestone — and a gift she'll look adorable in.",
    details: [
      "Featuring genuine Barcellino baby clothing",
      "Red-and-white striped footed sleepsuit",
      "Ivory short-sleeve bodysuit with Peter Pan collar and sparkling monogram",
      "Coral-pink bolero cardigan",
      "Ivory hat with red polka dots",
      "Ivory headband with hand-crocheted cherries",
      "Ivory bib with embroidered teddy bear",
      "Ivory bib with lace trim and gold monogram",
      "Pink 'I Love Mum' pram shoes",
      "Size: 6 months",
      "Presented in Velluvia's signature white gift box, ready to give",
      "Velluvia is an independent retailer and is not affiliated with Barcellino.",
      "Perfect for: baby girls, half-birthdays, baby showers, new mums, christenings, visiting family, or a special little treat",
      "Please check garment sizing and care instructions before purchase. Pram shoes are designed for non-walking babies. Always supervise babies while wearing hats, headbands and shoes, and remove them during sleep. Props shown in photos are not included.",
    ],
    images: [
      "/images/baby-6m-cherry/baby-6m-cherry-01.jpg",
      "/images/baby-6m-cherry/baby-6m-cherry-02.jpg",
      "/images/baby-6m-cherry/baby-6m-cherry-03.jpg",
      "/images/baby-6m-cherry/baby-6m-cherry-04.jpg",
      "/images/baby-6m-cherry/baby-6m-cherry-05.jpg",
      "/images/baby-6m-cherry/baby-6m-cherry-06.jpg",
    ],
  },
  {
    slug: "little-sweetheart-6m-gift-set",
    collection: "baby",
    name: "The Little Sweetheart Baby Gift Set (6M)",
    price: 2799,
    currency: "gbp",
    rrpPence: 13000,
    rrpIsSeparatePrice: true,
    apparel: { gender: "female", ageGroup: "infant", size: "6M", color: "Pink/White" },
    description:
      "Hearts, Clouds and a Little Sparkle. Soft pinks, delicate ivory and just the right amount of shimmer — The Little Sweetheart Gift Set is seven genuine Barcellino pieces made for your little princess. A dreamy pink romper with sparkling heart balloons, embroidered clouds and frilled legs sits beside an ivory-and-pink romper finished with silver shimmer stripes, a satin bow and a tiny heart charm. A long-sleeve ivory bodysuit for layering, a white hat with a lace bow, two pretty bibs and a pair of 'I Love Mum' pram shoes complete the look. Presented in our signature white Velluvia gift box, it's a gift that feels as special as she is.",
    details: [
      "Featuring genuine Barcellino baby clothing",
      "Pink romper with sparkling heart balloons, embroidered clouds and frilled legs",
      "Ivory-and-pink romper with silver shimmer stripes, satin bow and heart charm",
      "Ivory long-sleeve bodysuit",
      "White hat with lace bow and sparkle detail",
      "Pink bib with ditsy floral print",
      "White bib with flower appliqué and sparkling monogram",
      "Pink 'I Love Mum' pram shoes",
      "Size: 6 months",
      "Presented in Velluvia's signature white gift box, ready to give",
      "Velluvia is an independent retailer and is not affiliated with Barcellino.",
      "Perfect for: baby girls, half-birthdays, baby showers, new mums, christenings, visiting family, or a special little treat",
      "Please check garment sizing and care instructions before purchase. Decorative sparkles and charms are securely attached, but please check garments regularly. Pram shoes are designed for non-walking babies. Always supervise babies while wearing hats and shoes, and remove them during sleep. Props shown in photos are not included.",
    ],
    images: [
      "/images/baby-6m-sweetheart/baby-6m-sweetheart-01.jpg",
      "/images/baby-6m-sweetheart/baby-6m-sweetheart-02.jpg",
      "/images/baby-6m-sweetheart/baby-6m-sweetheart-03.jpg",
      "/images/baby-6m-sweetheart/baby-6m-sweetheart-04.jpg",
      "/images/baby-6m-sweetheart/baby-6m-sweetheart-05.jpg",
      "/images/baby-6m-sweetheart/baby-6m-sweetheart-06.jpg",
      "/images/baby-6m-sweetheart/baby-6m-sweetheart-07.jpg",
      "/images/baby-6m-sweetheart/baby-6m-sweetheart-08.jpg",
    ],
  },
  {
    slug: "little-butterfly-18m-gift-set",
    collection: "baby",
    name: "The Little Butterfly Jumbo Baby Gift Set (18M)",
    price: 2999,
    currency: "gbp",
    rrpPence: 12000,
    rrpIsSeparatePrice: true,
    apparel: { gender: "female", ageGroup: "toddler", size: "18M", color: "Pink/White" },
    badge: "new",
    description:
      "Our Biggest Baby Set Yet — Seven Pieces of Pure Sweetness. The Little Butterfly Jumbo Gift Set is a complete little wardrobe for her 18-month milestone, made up of seven genuine Barcellino pieces in soft blush pink and ivory. The star is a pink romper with a Peter Pan collar, a padded butterfly appliqué with a fluffy pom-pom and tiered tulle ruffles — made for twirling. Layer it with a pink bolero tied with a satin ribbon, a white bolero with a sparkling monogram or a classic white button-front cardigan, and finish with three ivory long-sleeve pieces edged in delicate scalloped lace. Mix, match and layer through the seasons — all presented in our signature white Velluvia gift box, ready to give.",
    details: [
      "Featuring genuine Barcellino baby clothing",
      "Pink short-sleeve romper with Peter Pan collar, butterfly appliqué and tiered tulle ruffle skirt",
      "Pink long-sleeve bolero with satin ribbon tie and sparkling monogram",
      "White short-sleeve bolero with button and sparkling monogram",
      "White V-neck button-front cardigan with pockets",
      "Three ivory long-sleeve pieces with scalloped lace trim",
      "Seven pieces in total",
      "Size: 18 months",
      "Presented in Velluvia's signature white gift box, ready to give",
      "Velluvia is an independent retailer and is not affiliated with Barcellino.",
      "Perfect for: first birthdays and beyond, baby girls, christenings, family celebrations, visiting family, or spoiling a little one",
      "Please check garment sizing and care instructions before purchase. Decorative sparkles, appliqués and pom-poms are securely attached, but please check garments regularly. Props shown in lifestyle photos are not included.",
    ],
    images: [
      "/images/baby-18m-butterfly-set/baby-18m-butterfly-set-01.jpg",
      "/images/baby-18m-butterfly-set/baby-18m-butterfly-set-02.jpg",
      "/images/baby-18m-butterfly-set/baby-18m-butterfly-set-03.jpg",
      "/images/baby-18m-butterfly-set/baby-18m-butterfly-set-04.jpg",
      "/images/baby-18m-butterfly-set/baby-18m-butterfly-set-05.jpg",
      "/images/baby-18m-butterfly-set/baby-18m-butterfly-set-06.jpg",
      "/images/baby-18m-butterfly-set/baby-18m-butterfly-set-07.jpg",
      "/images/baby-18m-butterfly-set/baby-18m-butterfly-set-08.jpg",
      "/images/baby-18m-butterfly-set/baby-18m-butterfly-set-09.jpg",
    ],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCollection(slug: string): Product[] {
  return products
    .filter((p) => p.collection === slug)
    .sort((a, b) => {
      if (Boolean(a.soldOut) !== Boolean(b.soldOut)) return a.soldOut ? 1 : -1;
      const orderA = a.order ?? Infinity;
      const orderB = b.order ?? Infinity;
      if (orderA !== orderB) return orderA - orderB;
      return a.price - b.price;
    });
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// Pulls the first couple of real occasions from a product's own "Perfect for: ..." detail
// line, so any tags shown on cards are always genuine product content, never invented.
export function getOccasionTags(product: Product, count = 2): string[] {
  const line = product.details.find((d) => d.toLowerCase().startsWith("perfect for"));
  if (!line) return [];
  const afterColon = line.split(":")[1] || "";
  return afterColon
    .replace(/\bor\b/gi, ",")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, count);
}

// Shared with app/api/checkout/route.ts so the cart page's "you're £X away
// from free delivery" messaging can never drift out of sync with what's
// actually charged at checkout.
export const FREE_DELIVERY_THRESHOLD = 20000; // £200.00, in pence
export const STANDARD_DELIVERY_COST = 399; // £3.99
export const EXPRESS_DELIVERY_COST = 799; // £7.99

export function formatPrice(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}

// Only meaningful when rrpPence is a genuine, verified figure (see the field
// comment in types.ts) — never derive rrpPence from price, always the reverse.
export function getSavingsPercent(product: Product): number | null {
  if (!product.rrpPence || product.rrpPence <= product.price) return null;
  return Math.round(((product.rrpPence - product.price) / product.rrpPence) * 100);
}
