"use client";

import { useEffect, useState } from "react";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasImages = images.length > 0;

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, images.length]);

  if (!hasImages) {
    return (
      <div className="pdp-gallery">
        <div className="main">
          <div className="monogram-tile">
            <span className="glyph">V</span>
            <span className="label">Velluvia</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pdp-gallery">
      <button
        className="main"
        onClick={() => setLightboxOpen(true)}
        aria-label="View larger image"
        type="button"
      >
        <img src={images[active]} alt={alt} />
        <span className="expand-hint">Click to enlarge</span>
      </button>

      {images.length > 1 && (
        <div className="thumbs">
          {images.map((src, i) => (
            <button
              type="button"
              className={`thumb ${i === active ? "active" : ""}`}
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={src} alt={alt} />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <button
            className="lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            type="button"
          >
            &times;
          </button>

          {images.length > 1 && (
            <button
              className="lightbox-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i - 1 + images.length) % images.length);
              }}
              aria-label="Previous image"
              type="button"
            >
              &#8249;
            </button>
          )}

          <img
            src={images[active]}
            alt={alt}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              className="lightbox-nav next"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i + 1) % images.length);
              }}
              aria-label="Next image"
              type="button"
            >
              &#8250;
            </button>
          )}

          {images.length > 1 && (
            <div className="lightbox-count">
              {active + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
