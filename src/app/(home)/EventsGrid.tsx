"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/site/ui";
import { photo, video } from "@/data/site";

type Card = {
  title: string;
  img: { src: string; alt: string };
  focus?: string;
  /** Film to play in the popup, and where to start it (seconds). */
  clip: string;
  start?: number;
};

const cards: Card[] = [
  {
    title: "Destination wedding",
    img: { src: "/events/event6_11zon.webp", alt: "A royal wedding celebration at Manratan Resort" },
    clip: video.walkthrough,
    start: 39.2, // Sky Lawn, then the banquets
  },
  {
    title: "Curated Events",
    img: photo("blue-sapphire-full", "Blue Sapphire banquet hall fully set for a celebration"),
    clip: video.walkthrough,
    start: 42, // Banquets
  },
  {
    title: "Poolside Events",
    img: { src: video.poolDinnerPoster, alt: "A candlelit table by the Blue Diamond pool at night" },
    clip: video.poolDinner,
  },
  {
    title: "Staycation",
    img: photo("suite-bed", "Executive Suite bed dressed in Manratan linen"),
    focus: "60% 50%",
    clip: video.walk,
  },
];

export default function EventsGrid() {
  const [open, setOpen] = useState<Card | null>(null);

  return (
    <>
      <div className="mt-14 grid gap-2 sm:grid-cols-2">
        {cards.map((c) => (
          <button
            key={c.title}
            type="button"
            onClick={() => setOpen(c)}
            aria-haspopup="dialog"
            aria-label={`Play film: ${c.title}`}
            className="group relative block aspect-[16/10] w-full overflow-hidden bg-black text-stone sm:aspect-[27/14]"
          >
            <Image
              src={c.img.src}
              alt={c.img.alt}
              fill
              quality={85}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="img-drift object-cover"
              style={c.focus ? { objectPosition: c.focus } : undefined}
            />
            <span className="absolute inset-0 bg-black/35 transition-colors duration-700 group-hover:bg-black/20" aria-hidden="true" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-5 pt-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-stone/90 transition-transform duration-700 group-hover:scale-110">
                <PlayIcon className="h-5 w-5 translate-x-0.5" />
              </span>
              <span className="font-ivy text-[clamp(1.5rem,2.3vw,2.1rem)] leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                {c.title}
              </span>
            </span>
          </button>
        ))}
      </div>

      {open && <ClipModal card={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function ClipModal({ card, onClose }: { card: Card; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const begin = () => {
    const v = vidRef.current;
    if (!v) return;
    if (card.start) v.currentTime = card.start;
    void v.play().catch(() => {});
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={card.title} className="fixed inset-0 z-[60] overflow-y-auto bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-4 py-16 sm:px-8 sm:py-20">
        <div className="mb-6 flex items-center justify-between">
          <p className="t-display text-xl text-stone">{card.title}</p>
          <button ref={closeRef} type="button" onClick={onClose} className="t-label link-line text-stone">
            Close
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <video
            ref={vidRef}
            src={card.clip}
            controls
            playsInline
            preload="auto"
            onLoadedMetadata={begin}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
