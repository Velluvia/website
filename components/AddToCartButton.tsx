"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { getProduct } from "@/lib/products";
import { useVariantSelection } from "./VariantSelection";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export default function AddToCartButton({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const { selected } = useVariantSelection();
  const variant = getProduct(slug)?.variants?.[selected]?.name;

  function handleClick() {
    addItem(slug, 1, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);

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
    <button className="btn btn-primary btn-block" onClick={handleClick}>
      {added ? "Added to cart" : variant ? `Add to cart — ${variant}` : "Add to cart"}
    </button>
  );
}
