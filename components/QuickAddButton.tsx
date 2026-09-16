"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

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
  }

  return (
    <button type="button" className="quick-add-btn" onClick={handleClick}>
      {added ? "Added ✓" : "+ Quick Add"}
    </button>
  );
}
