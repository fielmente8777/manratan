"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gallery, galleryCategories, type GallerySlug } from "@/data/site";

const bySlug = new Map(galleryCategories.map((c) => [c.slug, c]));

const slugAliases: Record<string, GallerySlug> = {
  exteriors: "exterior",
  narsingha: "narsinghgarh",
};

/** Read category from pathname (/gallery/swimming-pool) or ?category=; unknown values fall back to All. */
function slugFromUrl(): GallerySlug {
  if (typeof window === "undefined") return "all";
  const path = window.location.pathname;
  const match = path.match(/^\/gallery\/([^/?#]+)/);
  if (match) {
    const raw = match[1];
    const s = (slugAliases[raw] || raw) as GallerySlug;
    if (bySlug.has(s)) return s;
  }
  const rawParam = new URLSearchParams(window.location.search).get("category");
  const v = (rawParam ? slugAliases[rawParam] || rawParam : null) as GallerySlug | null;
  return v && bySlug.has(v) ? v : "all";
}

interface GalleryGridProps {
  initialSlug?: GallerySlug;
}

export default function GalleryGrid({ initialSlug }: GalleryGridProps = {}) {
  const [mounted, setMounted] = useState(false);
  const [slug, setSlug] = useState<GallerySlug>(initialSlug || "all");
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  const label = bySlug.get(slug)?.label ?? "All Images";
  const items = useMemo(() => (slug === "all" ? gallery : gallery.filter((g) => g.category === label)), [slug, label]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const activeThumbRef = useRef<HTMLButtonElement | null>(null);

  // Height-balanced column layout (shortest-column masonry) so all columns end evenly with no empty right spaces
  const desktopCols = useMemo(() => {
    const cols: Array<Array<{ it: (typeof items)[number]; originalIndex: number }>> = [[], [], []];
    const heights = [0, 0, 0];
    items.forEach((it, originalIndex) => {
      let minCol = 0;
      for (let c = 1; c < 3; c++) {
        if (heights[c] < heights[minCol]) minCol = c;
      }
      cols[minCol].push({ it, originalIndex });
      heights[minCol] += (it.height || 1000) / (it.width || 1000);
    });
    return cols;
  }, [items]);

  const tabletCols = useMemo(() => {
    const cols: Array<Array<{ it: (typeof items)[number]; originalIndex: number }>> = [[], []];
    const heights = [0, 0];
    items.forEach((it, originalIndex) => {
      let minCol = 0;
      if (heights[1] < heights[0]) minCol = 1;
      cols[minCol].push({ it, originalIndex });
      heights[minCol] += (it.height || 1000) / (it.width || 1000);
    });
    return cols;
  }, [items]);

  useEffect(() => {
    if (open !== null && activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [open]);

  // Deep links: /gallery/swimming-pool opens straight on the pool photographs.
  useEffect(() => {
    const current = initialSlug || slugFromUrl();
    setSlug(current);

    // If accessed via query string ?category=foo, rewrite address bar cleanly to /gallery/foo
    if (typeof window !== "undefined" && window.location.search.includes("category=")) {
      const v = new URLSearchParams(window.location.search).get("category") as GallerySlug | null;
      if (v && bySlug.has(v)) {
        const cleanPath = v === "all" ? "/gallery" : `/gallery/${v}`;
        window.history.replaceState(null, "", cleanPath);
      }
    }

    const onPop = () => {
      setOpen(null);
      setSlug(slugFromUrl());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [initialSlug]);

  const choose = (next: GallerySlug) => {
    setSlug(next);
    setOpen(null);
    const newPath = next === "all" ? "/gallery" : `/gallery/${next}`;
    window.history.pushState(null, "", newPath);
  };

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const g of gallery) m.set(g.category, (m.get(g.category) ?? 0) + 1);
    return m;
  }, []);

  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab" && dialogRef.current) {
        // Keep keyboard focus inside the viewer.
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      lastTrigger.current?.focus();
    };
  }, [open, go]);

  const current = open !== null ? items[open] : null;

  return (
    <>
      <div role="tablist" aria-label="Gallery categories" className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto px-5 pb-2 lg:justify-center">
        {galleryCategories.map((c) => {
          const on = slug === c.slug;
          const n = c.slug === "all" ? gallery.length : counts.get(c.label) ?? 0;
          return (
            <button
              key={c.slug}
              role="tab"
              aria-selected={on}
              aria-controls="gallery-grid"
              onClick={() => choose(c.slug)}
              className={`t-label relative shrink-0 py-2 transition-colors ${on ? "text-ink" : "text-taupe/70 hover:text-ink"}`}
            >
              {c.label}
              <span className="ml-1.5 text-[0.65em] tabular-nums opacity-60">{n}</span>
              <span className={`absolute inset-x-0 -bottom-px h-px bg-brass transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs tracking-[0.18em] text-taupe" aria-live="polite">
        {slug === "all" ? `${items.length} photographs` : `${label} · ${items.length} photographs`}
      </p>

      <div id="gallery-grid" role="tabpanel" className="mt-10">
        {/* Desktop: 3 columns height-balanced masonry */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-5 items-start">
          {desktopCols.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-5">
              {col.map(({ it, originalIndex }) => (
                <button
                  key={`${it.src}-${originalIndex}`}
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setOpen(originalIndex);
                  }}
                  className="group block w-full overflow-hidden bg-ink/10 text-left"
                  aria-label={`Open photo: ${it.alt}`}
                >
                  <Image
                    src={it.src}
                    alt={it.alt}
                    width={it.width}
                    height={it.height}
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="img-drift h-auto w-full"
                  />
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Tablet: 2 columns height-balanced masonry */}
        <div className="hidden sm:grid lg:hidden sm:grid-cols-2 sm:gap-5 items-start">
          {tabletCols.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-5">
              {col.map(({ it, originalIndex }) => (
                <button
                  key={`${it.src}-${originalIndex}`}
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setOpen(originalIndex);
                  }}
                  className="group block w-full overflow-hidden bg-ink/10 text-left"
                  aria-label={`Open photo: ${it.alt}`}
                >
                  <Image
                    src={it.src}
                    alt={it.alt}
                    width={it.width}
                    height={it.height}
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="img-drift h-auto w-full"
                  />
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: 1 column */}
        <div className="flex flex-col gap-5 sm:hidden">
          {items.map((it, idx) => (
            <button
              key={`${it.src}-${idx}`}
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setOpen(idx);
              }}
              className="group block w-full overflow-hidden bg-ink/10 text-left"
              aria-label={`Open photo: ${it.alt}`}
            >
              <Image
                src={it.src}
                alt={it.alt}
                width={it.width}
                height={it.height}
                quality={85}
                sizes="100vw"
                className="img-drift h-auto w-full"
              />
            </button>
          ))}
        </div>
      </div>

      {mounted && current && createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[70] flex flex-col justify-between bg-black/95 text-stone select-none"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={(e) => {
            if (!touch.current) return;
            const dx = e.changedTouches[0].clientX - touch.current.x;
            const dy = e.changedTouches[0].clientY - touch.current.y;
            touch.current = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
          }}
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="flex items-center justify-between px-4 py-3 sm:px-6 w-full z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-md bg-black/60 px-3 py-1 text-xs font-medium tabular-nums tracking-wider text-white shadow">
              {open! + 1} / {items.length}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close viewer"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-black/60 hover:bg-black/90 text-white transition-colors shadow"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Center Main Image Area */}
          <div
            className="relative flex-1 flex items-center justify-center w-full min-h-0 px-4 sm:px-16 py-1 pointer-events-auto"
            onClick={() => setOpen(null)}
          >
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              data-no-hover
              style={{ transform: "none", transition: "none" }}
              className="gallery-viewer-img max-h-[75vh] max-w-[90vw] w-auto h-auto object-contain select-none shadow-2xl rounded-sm cursor-default !transform-none !transition-none"
              onClick={(e) => e.stopPropagation()}
            />

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors shadow-lg z-20"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors shadow-lg z-20"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip: strictly constrained width under the image, not full-width */}
          {items.length > 1 && (
            <div
              className="w-full flex justify-center pb-4 pt-1 z-20 pointer-events-auto"
              onClick={() => setOpen(null)}
            >
              <div
                style={{ maxWidth: "520px", width: "100%" }}
                className="min-w-0 max-w-full flex justify-center px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`flex items-center gap-2 overflow-x-auto px-2 py-1.5 no-scrollbar scroll-smooth max-w-full ${
                    items.length > 7 ? "justify-start" : "justify-center"
                  }`}
                >
                  {items.map((it, idx) => (
                    <button
                      key={`${it.src}-${idx}`}
                      ref={idx === open ? activeThumbRef : null}
                      type="button"
                      onClick={() => setOpen(idx)}
                      className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden transition-all duration-200 ${
                        idx === open
                          ? "ring-2 ring-white scale-105 opacity-100 shadow-md"
                          : "opacity-40 hover:opacity-85"
                      }`}
                      aria-label={`Go to photo ${idx + 1}`}
                    >
                      <img
                        src={it.src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
