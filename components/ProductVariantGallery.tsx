"use client";

import ProductGallery from "./ProductGallery";
import type { ProductVariant } from "@/lib/types";
import { useVariantSelection } from "./VariantSelection";

export default function ProductVariantGallery({
  variants,
  fallbackImages,
  alt,
}: {
  variants?: ProductVariant[];
  fallbackImages: string[];
  alt: string;
}) {
  const { selected, setSelected } = useVariantSelection();

  if (!variants || variants.length === 0) {
    return <ProductGallery images={fallbackImages} alt={alt} />;
  }

  const active = variants[selected] ?? variants[0];
  const galleryImages = active.images.length > 0 ? active.images : fallbackImages;

  return (
    <div>
      <ProductGallery images={galleryImages} alt={`${alt} — ${active.name}`} />

      <div className="variant-picker">
        <p className="variant-label">
          Colour: <strong>{active.name}</strong>
        </p>
        <div className="variant-swatches" role="radiogroup" aria-label="Colour">
          {variants.map((v, i) => (
            <button
              key={v.name}
              type="button"
              role="radio"
              aria-checked={i === selected}
              className={`variant-swatch ${i === selected ? "active" : ""}`}
              style={{ backgroundColor: v.hex }}
              onClick={() => setSelected(i)}
              title={v.name}
            >
              <span className="sr-only">{v.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
