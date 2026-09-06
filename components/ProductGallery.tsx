"use client";

import { useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 45; // px of horizontal movement before it counts as a swipe, not a tap
const TAP_MAX_MOVEMENT = 10; // px — below this, a pointer-up counts as a tap/click, not a drag
const ZOOM_SCALE = 2.4;

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const hasImages = images.length > 0;

  // Pointer-tracking refs (not state — these change on every move event, and we
  // don't want a re-render on each pixel of drag, only when `pan` itself updates).
  const pointerDown = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const moved = useRef(0);

  function next() {
    setActive((i) => (i + 1) % images.length);
  }
  function prev() {
    setActive((i) => (i - 1 + images.length) % images.length);
  }

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, images.length]);

  // Reset zoom/pan whenever the image changes or the lightbox closes, so the
  // next photo always opens fit-to-screen rather than still zoomed in.
  useEffect(() => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  }, [active, lightboxOpen]);

  function handlePointerDown(e: React.PointerEvent) {
    pointerDown.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    moved.current = 0;
  }

  function handlePointerMoveMain(e: React.PointerEvent) {
    if (!pointerDown.current) return;
    moved.current = Math.max(moved.current, Math.abs(e.clientX - startX.current));
  }

  function handlePointerUpMain(e: React.PointerEvent) {
    if (!pointerDown.current) return;
    pointerDown.current = false;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD && images.length > 1) {
      dx < 0 ? next() : prev();
    } else if (moved.current < TAP_MAX_MOVEMENT) {
      setLightboxOpen(true);
    }
  }

  function handlePointerMoveLightbox(e: React.PointerEvent) {
    if (!pointerDown.current) return;
    const dx = e.clientX - lastX.current;
    const dy = e.clientY - lastY.current;
    moved.current = Math.max(moved.current, Math.abs(e.clientX - startX.current));
    if (zoomed) {
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    }
    lastX.current = e.clientX;
    lastY.current = e.clientY;
  }

  function handlePointerUpLightbox(e: React.PointerEvent) {
    if (!pointerDown.current) return;
    pointerDown.current = false;
    const dx = e.clientX - startX.current;

    if (!zoomed && Math.abs(dx) > SWIPE_THRESHOLD && images.length > 1) {
      dx < 0 ? next() : prev();
      return;
    }
    if (moved.current < TAP_MAX_MOVEMENT) {
      // A genuine tap/click on the image itself — toggle zoom.
      setZoomed((z) => !z);
      setPan({ x: 0, y: 0 });
    }
  }

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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMoveMain}
        onPointerUp={handlePointerUpMain}
        aria-label="View larger image"
        type="button"
      >
        <img src={images[active]} alt={alt} draggable={false} />
        <span className="expand-hint">Tap to enlarge{images.length > 1 ? " · swipe for more" : ""}</span>
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
        <div
          className={`lightbox ${zoomed ? "is-zoomed" : ""}`}
          onClick={() => !zoomed && setLightboxOpen(false)}
        >
          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            aria-label="Close"
            type="button"
          >
            &times;
          </button>

          {images.length > 1 && !zoomed && (
            <button
              className="lightbox-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              type="button"
            >
              &#8249;
            </button>
          )}

          <div
            className="lightbox-stage"
            onPointerDown={(e) => {
              e.stopPropagation();
              handlePointerDown(e);
              if (zoomed) setIsDragging(true);
            }}
            onPointerMove={(e) => {
              e.stopPropagation();
              handlePointerMoveLightbox(e);
            }}
            onPointerUp={(e) => {
              e.stopPropagation();
              handlePointerUpLightbox(e);
              setIsDragging(false);
            }}
          >
            <img
              src={images[active]}
              alt={alt}
              className="lightbox-img"
              draggable={false}
              style={{
                transform: zoomed
                  ? `scale(${ZOOM_SCALE}) translate(${pan.x / ZOOM_SCALE}px, ${pan.y / ZOOM_SCALE}px)`
                  : "scale(1) translate(0, 0)",
                cursor: zoomed ? "grab" : "zoom-in",
                transition: isDragging ? "none" : "transform 0.25s ease",
              }}
            />
          </div>

          {images.length > 1 && !zoomed && (
            <button
              className="lightbox-nav next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              type="button"
            >
              &#8250;
            </button>
          )}

          <div className="lightbox-count">
            {!zoomed && images.length > 1 && (
              <span>
                {active + 1} / {images.length} ·{" "}
              </span>
            )}
            {zoomed ? "Tap to zoom out" : "Tap to zoom in"}
          </div>
        </div>
      )}
    </div>
  );
}
