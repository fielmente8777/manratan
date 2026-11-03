"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { rooms } from "@/data/site";
import { Container, LineLink, Title } from "@/components/site/ui";

export default function RoomsRail() {
  const rail = useRef<HTMLDivElement>(null);
  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 24), behavior: "smooth" });
  };

  return (
    <section className="bg-stone-deep py-24 md:py-32" aria-labelledby="rooms-title">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Title main="Elegant" script="Accommodation" />
            <p id="rooms-title" className="t-body mt-6 max-w-[52ch]">
              Sixty-five rooms and suites in five styles, each with plush bedding, air conditioning, Wi-Fi and tea and coffee in the room.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-2" aria-label="Scroll rooms">
              <ArrowButton label="Previous rooms" onClick={() => step(-1)} flip />
              <ArrowButton label="Next rooms" onClick={() => step(1)} />
            </div>
            <LineLink href="/accommodation">All rooms</LineLink>
          </div>
        </div>
      </Container>

      <div
        ref={rail}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 sm:scroll-px-8 sm:px-8 lg:px-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] lg:scroll-px-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]"
      >
        {rooms.map((r) => (
          <Link
            key={r.id}
            href={`/accommodation/${r.id}`}
            data-card
            className="group w-[80vw] shrink-0 snap-start sm:w-[46vw] lg:w-[380px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-ink/10">
              <Image src={r.cover.src} alt={r.cover.alt} fill sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 380px" className="img-drift object-cover" style={r.focus ? { objectPosition: r.focus } : undefined} />
            </div>
            <h3 className="t-display mt-5 text-[1.4rem]">{r.name}</h3>
            <p className="mt-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-taupe">{r.specs.join("  •  ")}</p>
            <p className="t-body mt-3 max-w-[38ch]">{r.summary}</p>
          </Link>
        ))}
        <span className="w-px shrink-0" aria-hidden="true" />
      </div>
    </section>
  );
}

function ArrowButton({ label, onClick, flip = false }: { label: string; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors duration-500 hover:bg-ink hover:text-stone"
    >
      <svg viewBox="0 0 24 24" className={`h-4 w-4 ${flip ? "rotate-180" : ""}`} aria-hidden="true">
        <path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </button>
  );
}
