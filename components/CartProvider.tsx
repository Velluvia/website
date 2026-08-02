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
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  items: { product: Product; quantity: number }[];
  subtotal: number;
  count: number;
};

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

  function addItem(slug: string, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { slug, quantity }];
    });
  }

  function removeItem(slug: string) {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }

  function setQuantity(slug: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(slug);
      return;
    }
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, quantity } : l)));
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
          return { product, quantity: line.quantity };
        })
        .filter(Boolean) as { product: Product; quantity: number }[],
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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
