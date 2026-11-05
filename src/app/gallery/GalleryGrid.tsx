"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gallery, galleryCategories, type GallerySlug } from "@/data/site";

const bySlug = new Map(galleryCategories.map((c) => [c.slug, c]));

/** Read ?category= from the address bar; unknown values fall back to All. */
function slugFromUrl(): GallerySlug {
  if (typeof window === "undefined") return "all";
  const v = new URLSearchParams(window.location.search).get("category") as GallerySlug | null;
  return v && bySlug.has(v) ? v : "all";
}

export default function GalleryGrid() {
  const [slug, setSlug] = useState<GallerySlug>("all");
  const [open, setOpen] = useState<number | null>(null);
  const label = bySlug.get(slug)?.label ?? "All";
  const items = useMemo(() => (slug === "all" ? gallery : gallery.filter((g) => g.category === label)), [slug, label]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  // Deep links: /gallery?category=swimming-pool opens straight on the pool photographs.
  useEffect(() => {
    // Syncing from the address bar after hydration (the server always renders "All").
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlug(slugFromUrl());
    const onPop = () => {
      setOpen(null);
      setSlug(slugFromUrl());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const choose = (next: GallerySlug) => {
    setSlug(next);
    setOpen(null);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
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

      <div id="gallery-grid" role="tabpanel" className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
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
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.category} photo viewer`}
          className="fixed inset-0 z-[70] flex flex-col bg-ink/97 text-stone"
          onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={(e) => {
            if (!touch.current) return;
            const dx = e.changedTouches[0].clientX - touch.current.x;
            const dy = e.changedTouches[0].clientY - touch.current.y;
            touch.current = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-xs tabular-nums tracking-[0.2em] text-stone/70">
              {open! + 1} / {items.length}
            </p>
            <button ref={closeRef} type="button" onClick={() => setOpen(null)} className="link-line t-label text-stone">
              Close
            </button>
          </div>
          <div className="relative flex-1">
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain px-2 sm:px-20" />
            {items.length > 1 && (
              <>
                <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 sm:left-6">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-180" aria-hidden="true"><path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
                </button>
                <button type="button" aria-label="Next photo" onClick={() => go(1)} className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 sm:right-6">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
                </button>
              </>
            )}
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
