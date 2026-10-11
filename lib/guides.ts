import { products, getSavingsPercent } from "./products";
import type { Product } from "./types";

/**
 * Gift guides: helpful, search-friendly articles that answer the questions
 * shoppers type into Google ("best baby shower gifts UK", "what to buy a
 * newborn baby girl", "corporate gifts for new starters") and link to the
 * products that fit.
 *
 * Product lists are built from live product data, so prices, sold-out status
 * and new products stay correct automatically. Prices are deliberately not
 * written into the prose for the same reason.
 *
 * To add a guide, add an entry to `guides` — the page, the index card and the
 * sitemap entry are created automatically.
 */

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  /** Products to show under this section: a list of slugs, or a rule. */
  products?: string[] | ((all: Product[]) => Product[]);
  /** Optional call-to-action link under the section. */
  cta?: { href: string; label: string };
};

export type Guide = {
  slug: string;
  title: string; // the H1 on the page
  seoTitle: string; // shown in Google (" — Velluvia" is added automatically)
  seoDescription: string;
  summary: string; // shown on the gift-guides index card
  heroImage: string;
  updated: string; // ISO date, shown as "Updated …" and used in structured data
  intro: string[];
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
};

const live = (all: Product[]) => all.filter((p) => !p.comingSoon && !p.soldOut);
const pick = (slugs: string[]) => (all: Product[]) =>
  slugs.map((slug) => live(all).find((p) => p.slug === slug)).filter((p): p is Product => Boolean(p));
const bestValue = (pool: (all: Product[]) => Product[], n: number) => (all: Product[]) =>
  [...pool(all)]
    .filter((p) => (getSavingsPercent(p) ?? 0) > 0)
    .sort((a, b) => (getSavingsPercent(b) ?? 0) - (getSavingsPercent(a) ?? 0))
    .slice(0, n);

const KIDS = ["unicorn-dream-gift-set", "frozen-dreams-gift-set", "dino-adventure-gift-set"];
const FOR_HER = [
  "pink-blossom-gift-set",
  "blush-bloom-gift-set",
  "pretty-pampered-gift-set",
  "citrus-bright-gift-set",
  "blush-serenity-gift-set",
];
const CHRISTMAS_DELIVERY: GuideSection = {
  heading: "Ordering in time for Christmas",
  paragraphs: [
    "Orders are usually prepared and dispatched within 1 to 2 business days. Standard delivery then takes an estimated 3 to 5 business days, and Express delivery an estimated 1 to 2 business days.",
    "Couriers get very busy in December, so the earlier you order, the more relaxed your Christmas will be. Every gift arrives ready to give, so there's no wrapping to do.",
  ],
  cta: { href: "/delivery", label: "See delivery options" },
};
const baby = (all: Product[]) => live(all).filter((p) => p.collection === "baby");
const bySize = (sizes: string[]) => (all: Product[]) =>
  baby(all).filter((p) => p.apparel && sizes.includes(p.apparel.size));

export const guides: Guide[] = [
  {
    slug: "best-baby-shower-gifts-uk",
    title: "The Best Baby Shower Gifts in the UK: A Gift Box Guide",
    seoTitle: "Best Baby Shower Gifts UK | Baby Gift Box Ideas",
    seoDescription:
      "Looking for the best baby shower gift? Our UK guide covers what new parents really use, which size to buy, and beautiful baby gift boxes for girls and boys.",
    summary:
      "What new parents actually use, which size to choose, and boxed baby gifts that look as good as they feel.",
    heroImage: "/images/baby-3m-little-doll/baby-3m-little-doll-01.jpg",
    updated: "2026-10-11",
    intro: [
      "A baby shower gift has two jobs: it has to feel special when it's opened in front of everyone, and it has to be genuinely useful once the baby arrives. Clothing gift boxes do both. They arrive complete, they look beautiful unwrapped, and every piece gets worn.",
      "This guide covers what to look for in a baby shower gift, how to pick the right size, and our favourite boxed sets for baby girls and baby boys.",
    ],
    sections: [
      {
        heading: "What makes a good baby shower gift?",
        paragraphs: [
          "Think about what parents will reach for in the first few months. Soft bodysuits, rompers and sleepsuits are worn every day, bibs are always in demand, and a couple of special outfits are perfect for first photos and family visits.",
          "A coordinated set saves the parents from mixing and matching, and a gift box means there is nothing extra to wrap. Look for soft fabrics, easy poppers and pieces that layer, so the set works across the seasons.",
        ],
      },
      {
        heading: "Which size should you buy?",
        paragraphs: [
          "Newborn clothes are outgrown quickly, and new parents are often given lots of them. If you don't know the baby's expected size, a 3-month or 6-month set is a safe choice that will still fit in the months ahead, when gifts have slowed down.",
          "If you do want to give something for the first days, choose a newborn or 1-month set, ideally with a gift receipt. Our sets are clearly labelled by size so you can choose with confidence.",
        ],
      },
      {
        heading: "Baby shower gifts for a girl",
        paragraphs: [
          "Our baby girl gift boxes bring together dresses, rompers, cardigans, hats and bibs in pretty, coordinated colours, featuring genuine Barcellino clothing.",
        ],
        products: (all) => baby(all).filter((p) => p.apparel?.gender === "female").slice(0, 6),
        cta: { href: "/collections/baby", label: "See all baby gift boxes" },
      },
      {
        heading: "Baby shower gifts for a boy",
        paragraphs: [
          "For a baby boy, think smart-but-soft: gingham rompers, cosy sleepsuits, little hats and tiny pram shoes, presented ready to give.",
        ],
        products: (all) => baby(all).filter((p) => p.apparel?.gender === "male"),
      },
      {
        heading: "Baby shower gifts on a budget",
        paragraphs: [
          "A thoughtful gift doesn't have to cost a lot. These boxed sets are our most affordable, and still arrive complete and beautifully presented.",
        ],
        products: (all) => [...baby(all)].sort((a, b) => a.price - b.price).slice(0, 3),
      },
    ],
    faqs: [
      {
        q: "How much should I spend on a baby shower gift?",
        a: "There's no set rule: spend what feels right for you. A complete boxed clothing set gives a lot of value, because it's several useful pieces in one ready-to-give gift.",
      },
      {
        q: "Is it better to buy newborn or bigger sizes?",
        a: "Bigger sizes are usually more useful. Babies outgrow newborn clothes within weeks, and parents receive many of them, so a 3-month or 6-month set is often appreciated more.",
      },
      {
        q: "Do your baby sets come gift-wrapped?",
        a: "Yes. Every Velluvia baby set is presented in our signature gift box, ready to give.",
      },
      {
        q: "What if the size isn't right?",
        a: "You can cancel within 14 days of receiving your order and return the items unused and in their original condition. See our returns policy for full details.",
      },
    ],
  },
  {
    slug: "newborn-baby-girl-gift-ideas",
    title: "What to Buy a Newborn Baby Girl: Gift Ideas Parents Will Love",
    seoTitle: "Newborn Baby Girl Gift Ideas UK | What to Buy",
    seoDescription:
      "Not sure what to buy for a newborn baby girl? Practical, beautiful gift ideas, sizing tips and boxed baby girl clothing sets, with UK delivery.",
    summary:
      "Practical, pretty gift ideas for a brand-new baby girl, plus simple sizing advice.",
    heroImage: "/images/baby-1m-rose-butterfly/baby-1m-rose-butterfly-06.jpg",
    updated: "2026-10-11",
    intro: [
      "Buying for a new baby girl is one of the nicest shopping trips there is, and one of the easiest to overthink. The best gifts are the ones parents use every day and remember for years.",
      "Here's what to consider, and the boxed sets we'd choose for a brand-new arrival.",
    ],
    sections: [
      {
        heading: "Choose pieces that get worn",
        paragraphs: [
          "In the first weeks, parents live in bodysuits, rompers and sleepsuits. A set that combines everyday basics with one or two special pieces, such as a pretty collar or a little cardigan, gives them both comfort and something lovely for visitors and photos.",
          "Bibs are always useful, and soft hats keep tiny heads warm. Headbands, hats and pram shoes should only be worn while baby is supervised and should be removed for sleep.",
        ],
      },
      {
        heading: "Gift sets for her very first weeks",
        paragraphs: [
          "These newborn and 1-month sets are made for the first days at home: soft, coordinated and ready to give.",
        ],
        products: (all) =>
          baby(all).filter((p) => p.apparel?.gender === "female" && ["1M", "0-3M"].includes(p.apparel.size)),
      },
      {
        heading: "Thinking ahead: sets she'll grow into",
        paragraphs: [
          "Because newborn sizes are outgrown so quickly, a 3-month or 6-month set is a clever gift. It will be ready and waiting just as the first wave of gifts no longer fits.",
        ],
        products: (all) => [...bySize(["3M"])(all), ...bySize(["6M"])(all)].filter((p) => p.apparel?.gender === "female").slice(0, 3),
        cta: { href: "/gift-guides/baby-gifts-by-age", label: "See gifts by age" },
      },
    ],
    faqs: [
      {
        q: "What size should I buy for a newborn baby girl?",
        a: "For something to wear straight away, choose newborn or 1 month. For a gift that will last longer, a 3-month or 6-month size is a safe choice.",
      },
      {
        q: "Are your baby girl sets genuine Barcellino?",
        a: "Our baby sets feature genuine Barcellino clothing. Each product page lists exactly what's inside. Velluvia is an independent retailer and is not affiliated with Barcellino.",
      },
      {
        q: "Can I send the gift straight to the new parents?",
        a: "Yes. Every set arrives in our signature gift box, so you can enter their address at checkout and it's ready to open.",
      },
    ],
  },
  {
    slug: "baby-gifts-by-age",
    title: "Baby Gift Ideas by Age: Newborn to 18 Months",
    seoTitle: "Baby Gift Ideas by Age | Newborn to 18 Months UK",
    seoDescription:
      "Baby gift ideas for every age, from newborn to 3, 6, 9, 12 and 18 months, including first birthday outfits. Boxed baby clothing sets with UK delivery.",
    summary:
      "The right gift for every stage, from the first days to a first birthday and beyond.",
    heroImage: "/images/baby-12m-sunflower/baby-12m-sunflower-01.jpg",
    updated: "2026-10-11",
    intro: [
      "Babies change fast, and so do their wardrobes. This guide groups our gift boxes by size, so you can find the right fit whether you're visiting a newborn, celebrating a half-birthday or shopping for a first birthday.",
      "Sizes are a guide. Babies grow at different rates, so if in doubt, go one size up.",
    ],
    sections: [
      {
        heading: "Newborn and 1 month",
        paragraphs: ["Soft, simple pieces for the very first weeks at home."],
        products: bySize(["1M", "0-3M"]),
      },
      {
        heading: "3 months",
        paragraphs: [
          "A brilliant size for a baby shower gift: it fits once the newborn clothes have been outgrown.",
        ],
        products: bySize(["3M"]),
      },
      {
        heading: "6 months",
        paragraphs: [
          "At six months babies are more alert, sitting up and on the move, so comfortable sets with something special for photos are ideal. A lovely half-birthday gift.",
        ],
        products: bySize(["6M"]),
      },
      {
        heading: "9 months",
        paragraphs: ["Layering pieces and easy sleepsuits for busy, crawling little ones."],
        products: bySize(["9M"]),
      },
      {
        heading: "12 months: first birthday outfits",
        paragraphs: [
          "A first birthday deserves an outfit to remember. Our 12-month sets include a special dress and coordinating layers, perfect for the party and the photos.",
        ],
        products: bySize(["12M"]),
      },
      {
        heading: "18 months",
        paragraphs: ["Bigger, generous sets for toddlers with plenty to mix and match."],
        products: bySize(["18M"]),
      },
    ],
    faqs: [
      {
        q: "What's a good first birthday gift for a baby girl?",
        a: "A special outfit is a lovely choice because it's worn on the day and lives on in the photos. Our 12-month sets include a party-ready dress with layers and hats.",
      },
      {
        q: "Should I buy the baby's current size?",
        a: "Usually go one size up. Babies grow quickly and the gift will be worn for longer.",
      },
    ],
  },
  {
    slug: "corporate-gifts-for-new-starters",
    title: "Corporate Gifts for New Starters and Clients: A UK Guide",
    seoTitle: "Corporate Gifts for New Starters & Clients UK",
    seoDescription:
      "Welcome new starters and thank clients with practical corporate gifts: engraved pens, A5 notebook sets, golf umbrellas and executive gift sets. UK delivery.",
    summary:
      "Simple, practical gifts that make a great first impression on new joiners and clients.",
    heroImage: "/images/luxe/luxe-executive-set-hero.jpg",
    updated: "2026-10-11",
    intro: [
      "A welcome gift on someone's first day tells them they're expected and valued. A thank-you to a client keeps you front of mind. In both cases the best corporate gifts are practical, well presented and used every day.",
      "Here's how to choose, and the Velluvia Office pieces we recommend.",
    ],
    sections: [
      {
        heading: "What makes a good corporate gift?",
        paragraphs: [
          "Choose something useful at work: a good pen, a smart notebook or an umbrella for the commute. Presentation matters too, so a proper gift box turns a small item into a memorable gesture.",
          "Keep it inclusive and universal. Desk and travel essentials suit everyone, whatever their role.",
        ],
      },
      {
        heading: "Our corporate gift picks",
        paragraphs: [
          "From a single engraved pen for every new joiner to a complete executive set for key clients:",
        ],
        products: (all) => live(all).filter((p) => p.collection === "office"),
      },
      {
        heading: "Ordering for a team",
        paragraphs: [
          "Welcoming several new starters or thanking a whole client list? Get in touch and we'll help you with larger orders.",
        ],
        cta: { href: "/contact", label: "Enquire about a corporate order" },
      },
    ],
    faqs: [
      {
        q: "What is a good welcome gift for a new employee?",
        a: "Practical desk items work best: an engraved pen, a quality notebook or a complete writing set. They are used every day and remind the new starter of a positive first day.",
      },
      {
        q: "Do you offer bulk corporate orders?",
        a: "Yes. Contact us with the quantity and dates, and we'll help you plan the order.",
      },
    ],
  },
  {
    slug: "christmas-gifts-for-kids",
    title: "Christmas Gift Ideas for Kids: Gift Boxes They'll Love",
    seoTitle: "Christmas Gifts for Kids UK | Gift Box Ideas",
    seoDescription:
      "Christmas gift ideas for kids and babies: unicorn, winter princess and dinosaur gift boxes, plus baby's first Christmas outfits. Gift-boxed, UK delivery.",
    summary:
      "Magical Christmas gift boxes for girls, boys and babies, ready to put under the tree.",
    heroImage: "/images/unicorn-dream/unicorn-dream-hero.jpg",
    updated: "2026-10-11",
    intro: [
      "There's nothing quite like a child's face when they lift the lid on a gift that feels made just for them. A themed gift box turns one present into a whole collection of little surprises, and it arrives beautifully presented, so there's nothing left to wrap.",
      "Here are our favourite Christmas gift boxes for children, plus beautiful outfits for a baby's very first Christmas.",
    ],
    sections: [
      {
        heading: "Why a gift box makes a great Christmas present",
        paragraphs: [
          "Instead of one toy that's forgotten by Boxing Day, a gift box combines cosy things, fun things and useful things around a theme they love. Blankets, cushions and sleep masks get used all winter, while the little extras make unwrapping last longer.",
        ],
      },
      {
        heading: "Christmas gifts for girls",
        paragraphs: [
          "For little dreamers who love rainbows, sparkle and snowy castles: plush cushions, soft blankets, tiaras and headbands, all in one magical box.",
        ],
        products: pick(KIDS.slice(0, 2)),
      },
      {
        heading: "Christmas gifts for dinosaur fans",
        paragraphs: [
          "For curious little explorers of any kind: a dinosaur backpack, a cosy printed blanket, toys and stationery for roaring adventures.",
        ],
        products: pick(KIDS.slice(2)),
      },
      {
        heading: "Baby's first Christmas",
        paragraphs: [
          "A first Christmas only happens once. A boxed outfit set is a gift parents treasure, perfect for Christmas Day photos and family visits. Choose the size the baby will be on Christmas Day; these sets show the biggest savings against their worth if bought separately.",
        ],
        products: bestValue(bySize(["3M", "6M"]), 4),
        cta: { href: "/gift-guides/baby-gifts-by-age", label: "Find the right size" },
      },
      CHRISTMAS_DELIVERY,
    ],
    faqs: [
      {
        q: "When should I order Christmas gifts?",
        a: "As early as you can. Orders are usually dispatched within 1 to 2 business days, then standard delivery takes an estimated 3 to 5 business days. Express delivery is available for later orders, but couriers are busiest in December.",
      },
      {
        q: "Do the gift boxes need wrapping?",
        a: "No. Every Velluvia gift arrives beautifully presented and ready to give.",
      },
      {
        q: "What size should I choose for a baby's first Christmas?",
        a: "Choose the size the baby will be on Christmas Day, or one size up if you're unsure. Babies grow quickly.",
      },
    ],
  },
  {
    slug: "christmas-gifts-for-her",
    title: "Christmas Gifts for Her: Luxury Pamper Gift Boxes",
    seoTitle: "Christmas Gifts for Her UK | Pamper Gift Boxes",
    seoDescription:
      "Christmas gifts for her: luxury pamper gift boxes with candles, cosy socks, eye masks and tumblers for mum, wife, sister or friend. UK delivery.",
    summary:
      "Cosy, pampering Christmas gift boxes for mum, your partner, your sister or your best friend.",
    heroImage: "/images/pink-blossom/pink-blossom-hero.jpg",
    updated: "2026-10-11",
    intro: [
      "Christmas is the one time of year she might actually slow down, so give her something that helps her do exactly that. A pamper gift box brings together cosy textures, soft lighting and little indulgences in one beautifully presented gift.",
      "Here's how to choose, and the gift boxes we'd put under the tree.",
    ],
    sections: [
      {
        heading: "How to choose a Christmas gift for her",
        paragraphs: [
          "Think about how she likes to unwind. A scented candle and a soft blanket suit someone who loves a cosy night in, while a tumbler and pretty accessories are ideal for someone always on the go. A gift box covers several of these at once, so you don't have to guess.",
        ],
      },
      {
        heading: "Our Christmas pamper gift boxes",
        paragraphs: [
          "Each box is curated around a colour and a mood, from romantic pinks to sunshine yellow, and arrives ready to give. They're shown with the biggest savings against RRP first.",
        ],
        products: bestValue(pick(FOR_HER), 6),
        cta: { href: "/collections/signature", label: "See all gifts for her" },
      },
      {
        heading: "Christmas gifts for her under £20",
        paragraphs: [
          "Secret Santa, a colleague or a little something for a friend: these boxes feel generous without the big price tag.",
        ],
        products: (all) => pick(FOR_HER)(all).filter((p) => p.price < 2000),
      },
      {
        heading: "For new mums this Christmas",
        paragraphs: [
          "Know someone celebrating a first Christmas with a new baby? A boxed baby outfit set is a gift for the whole family.",
        ],
        cta: { href: "/gift-guides/christmas-gifts-for-kids", label: "Baby's first Christmas gifts" },
      },
      CHRISTMAS_DELIVERY,
    ],
    faqs: [
      {
        q: "What is a good Christmas gift for her?",
        a: "A pamper gift box is a safe and thoughtful choice: it combines several things she'll enjoy, like a candle, cosy socks and an eye mask, and arrives beautifully presented.",
      },
      {
        q: "When should I order for Christmas delivery?",
        a: "Order as early as you can. Orders are usually dispatched within 1 to 2 business days, and standard delivery takes an estimated 3 to 5 business days after that.",
      },
      {
        q: "Can I send the gift directly to her?",
        a: "Yes. Enter her address at checkout and the gift arrives ready to open.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuideProducts(section: GuideSection): Product[] {
  if (!section.products) return [];
  if (typeof section.products === "function") return section.products(products);
  const list = section.products;
  return products.filter((p) => list.includes(p.slug) && !p.comingSoon);
}
