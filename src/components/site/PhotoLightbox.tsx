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
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-[#120e0b]/95 p-3 text-white backdrop:bg-black/90 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20 blur-2xl" style={{ backgroundImage: `url(${photo.src})` }} />
      <div className="relative grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-3 sm:gap-5">
        <div className="flex items-center justify-between">
          <span aria-live="polite" className="rounded-full bg-black/50 px-4 py-2 text-sm">{active + 1} / {photos.length}</span>
          <button autoFocus type="button" onClick={onClose} aria-label="Close photo gallery" className="grid h-11 w-11 place-items-center rounded-full bg-black/60 text-3xl">×</button>
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
          <Image src={photo.src} alt={photo.alt} fill unoptimized sizes="100vw" className="object-contain" draggable={false} />
          <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-0 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-3xl sm:left-3">‹</button>
          <button type="button" aria-label="Next photo" onClick={() => go(1)} className="absolute right-0 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-3xl sm:right-3">›</button>
        </div>
        <div className="min-w-0">
          <p className="mb-3 text-center text-sm" aria-live="polite">{photo.title}</p>
          <div ref={strip} className="mx-auto flex w-fit max-w-full snap-x justify-center gap-2 overflow-x-auto pb-2 sm:gap-3" aria-label="All destination photos">
            {photos.map((item, index) => (
              <button key={item.src} type="button" onClick={() => setActive(index)} aria-label={`View ${item.title}`} aria-current={active === index ? "true" : undefined}
                className={`relative h-16 w-20 shrink-0 snap-center overflow-hidden rounded-lg border-2 sm:h-20 sm:w-24 ${active === index ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`}>
                <Image src={item.src} alt="" fill unoptimized sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </dialog>, document.body
  );
}
