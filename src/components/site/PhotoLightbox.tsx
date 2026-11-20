"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Photo = { src: string; alt: string; title: string };

export default function PhotoLightbox({ photos, initialIndex, onClose }: {
  photos: Photo[]; initialIndex: number; onClose: () => void;
}) {
  const [active, setActive] = useState(initialIndex);
  const dialog = useRef<HTMLDialogElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const swipe = useRef<number | null>(null);
  const photo = photos[active];
  const go = (step: number) => setActive((index) => (index + step + photos.length) % photos.length);

  useEffect(() => {
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    strip.current?.children[active]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return createPortal(
    <dialog
      ref={dialog}
      aria-label="Places to discover photo gallery"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-[#120e0b]/95 p-2 sm:px-6 sm:py-3 text-white backdrop:bg-black/90"
    >
      <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20 blur-2xl" style={{ backgroundImage: `url(${photo.src})` }} />
      <div className="relative grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-2 sm:gap-3">
        <div className="flex items-center justify-between">
          <span aria-live="polite" className="rounded-full bg-black/50 px-3.5 py-1.5 text-xs sm:text-sm tabular-nums">{active + 1} / {photos.length}</span>
          <button autoFocus type="button" onClick={onClose} aria-label="Close photo gallery" className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/60 hover:bg-black/85 text-white transition-all shadow-md">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M1.5 1.5l11 11M12.5 1.5l-11 11" />
            </svg>
          </button>
        </div>
        <div className="relative min-h-0"
          onPointerDown={(event) => { swipe.current = event.clientX; }}
          onPointerUp={(event) => {
            if (swipe.current !== null && Math.abs(event.clientX - swipe.current) > 50) go(event.clientX < swipe.current ? 1 : -1);
            swipe.current = null;
          }}
          onPointerCancel={() => { swipe.current = null; }}
          style={{ touchAction: "pan-y" }}
        >
          <Image src={photo.src} alt={photo.alt} fill unoptimized sizes="100vw" className="object-contain" draggable={false} priority />
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="absolute left-1.5 top-1/2 z-10 flex h-11 w-11 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer sm:left-4"
          >
            <svg
              width="12"
              height="20"
              viewBox="0 0 10 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7.5 2.5L2 9l5.5 6.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(1)}
            className="absolute right-1.5 top-1/2 z-10 flex h-11 w-11 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer sm:right-4"
          >
            <svg
              width="12"
              height="20"
              viewBox="0 0 10 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2.5 2.5L8 9l-5.5 6.5" />
            </svg>
          </button>
        </div>
        <div className="min-w-0">
          <p className="mb-1.5 text-center text-xs sm:text-sm font-medium tracking-wide" aria-live="polite">{photo.title}</p>
          <div ref={strip} className="mx-auto flex w-fit max-w-full snap-x justify-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-1" aria-label="All destination photos">
            {photos.map((item, index) => (
              <button key={item.src} type="button" onClick={() => setActive(index)} aria-label={`View ${item.title}`} aria-current={active === index ? "true" : undefined}
                className={`relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 snap-center overflow-hidden rounded-md border-2 transition-all ${active === index ? "border-white opacity-100 scale-105" : "border-transparent opacity-50 hover:opacity-100"}`}>
                <Image src={item.src} alt="" fill unoptimized sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </dialog>, document.body
  );
}
