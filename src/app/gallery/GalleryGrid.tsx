"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gallery, galleryCategories } from "@/data/site";

type Cat = (typeof galleryCategories)[number];

export default function GalleryGrid() {
  const [cat, setCat] = useState<Cat>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = useMemo(() => (cat === "All" ? gallery : gallery.filter((g) => g.category === cat)), [cat]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

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
      <div role="tablist" aria-label="Gallery categories" className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto px-5 pb-2 sm:justify-center">
        {galleryCategories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`t-label relative shrink-0 py-2 transition-colors ${cat === c ? "text-ink" : "text-taupe/70 hover:text-ink"}`}
          >
            {c}
            <span className={`absolute inset-x-0 -bottom-px h-px bg-brass transition-transform duration-500 ${cat === c ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-xs tracking-[0.18em] text-taupe" aria-live="polite">
        {items.length} photographs
      </p>

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            onClick={(e) => {
              lastTrigger.current = e.currentTarget;
              setOpen(i);
            }}
            className="group block w-full break-inside-avoid overflow-hidden bg-ink/10 text-left"
            aria-label={`Open photo: ${it.alt}`}
          >
            <Image
              src={it.src}
              alt={it.alt}
              width={it.width}
              height={it.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="img-drift h-auto w-full"
            />
          </button>
        ))}
      </div>

      {current && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[70] flex flex-col bg-ink/97 text-stone">
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-xs tracking-[0.2em] tabular-nums text-stone/70">
              {open! + 1} / {items.length}
            </p>
            <button ref={closeRef} type="button" onClick={() => setOpen(null)} className="link-line t-label text-stone">
              Close
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain px-4 sm:px-20" />
            <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 sm:left-6">
              <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-180" aria-hidden="true"><path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
            </button>
            <button type="button" aria-label="Next photo" onClick={() => go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 sm:right-6">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
            </button>
          </div>
          <p className="px-5 py-5 text-center text-sm text-stone/80">
            {current.alt}
            <span className="ml-3 text-xs uppercase tracking-[0.2em] text-brass-light">{current.category}</span>
          </p>
        </div>
      )}
    </>
  );
}
