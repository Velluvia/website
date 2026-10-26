"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Shares the colour picked in the product gallery with the Add to cart button,
// which sit in different parts of the product page.
type Ctx = { selected: number; setSelected: (i: number) => void };
const VariantContext = createContext<Ctx | null>(null);

export function VariantSelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState(0);
  return <VariantContext.Provider value={{ selected, setSelected }}>{children}</VariantContext.Provider>;
}

export function useVariantSelection(): Ctx {
  const ctx = useContext(VariantContext);
  // Outside a provider, behave like a standalone picker with the first option selected.
  const [local, setLocal] = useState(0);
  return ctx ?? { selected: local, setSelected: setLocal };
}
