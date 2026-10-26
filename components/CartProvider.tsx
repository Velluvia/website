"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CartLine, Product } from "@/lib/types";
import { products } from "@/lib/products";

type CartContextValue = {
  lines: CartLine[];
  addItem: (slug: string, quantity?: number, variant?: string) => void;
  removeItem: (key: string) => void; // key = lineKey(slug, variant); a plain slug works for products without variants
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  items: CartItem[];
  subtotal: number;
  count: number;
  hydrated: boolean;
};

export type CartItem = { product: Product; quantity: number; variant?: string; key: string };

// One cart line per product *and* colour, so a red and a blue set sit side by side.
export function lineKey(slug: string, variant?: string) {
  return variant ? `${slug}|${variant}` : slug;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "velluvia-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // persist on change
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  function addItem(slug: string, quantity = 1, variant?: string) {
    const key = lineKey(slug, variant);
    setLines((prev) => {
      const existing = prev.find((l) => lineKey(l.slug, l.variant) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l.slug, l.variant) === key ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, variant ? { slug, quantity, variant } : { slug, quantity }];
    });
  }

  function removeItem(key: string) {
    setLines((prev) => prev.filter((l) => lineKey(l.slug, l.variant) !== key));
  }

  function setQuantity(key: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(key);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (lineKey(l.slug, l.variant) === key ? { ...l, quantity } : l))
    );
  }

  function clear() {
    setLines([]);
  }

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = products.find((p) => p.slug === line.slug);
          if (!product) return null;
          return {
            product,
            quantity: line.quantity,
            variant: line.variant,
            key: lineKey(line.slug, line.variant),
          };
        })
        .filter(Boolean) as CartItem[],
    [lines]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  const value: CartContextValue = {
    lines,
    addItem,
    removeItem,
    setQuantity,
    clear,
    items,
    subtotal,
    count,
    hydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
