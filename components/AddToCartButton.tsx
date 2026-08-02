"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(slug, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button className="btn btn-primary btn-block" onClick={handleClick}>
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
