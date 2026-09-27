"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { getProduct } from "@/lib/products";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export default function QuickAddButton({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick(e: React.MouseEvent) {
    // The whole card is wrapped in a <Link> to the product page — without
    // these, clicking Quick Add would also navigate away.
    e.preventDefault();
    e.stopPropagation();
    addItem(slug, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);

    // See MetaViewContentEvent.tsx for why content_ids needs to match your
    // product-feed.xml item IDs — same assumption applies here (using slug).
    if (typeof window !== "undefined" && window.fbq) {
      const product = getProduct(slug);
      window.fbq("track", "AddToCart", {
        content_ids: [slug],
        content_name: product?.name,
        content_type: "product",
        value: product ? product.price / 100 : undefined,
        currency: "GBP",
      });
    }
  }

  return (
    <button type="button" className="quick-add-btn" onClick={handleClick}>
      {added ? "Added ✓" : "+ Quick Add"}
    </button>
  );
}
