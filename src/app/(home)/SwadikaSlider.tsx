"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Container } from "@/components/sectionComponants";
import "swiper/css";

const slides = [
  {
    src: "/media/swadika-hall.webp",
    alt: "Swadika dining hall with teal velvet chairs and chandeliers",
    caption: "The chandelier-lit Swadika hall",
    widthClass: "!w-[66vw] sm:!w-[min(40vw,320px)]",
    aspectClass: "aspect-square",
    sizes: "(max-width: 640px) 66vw, (max-width: 800px) 40vw, 320px",
  },
  {
    src: "/media/swadika-guests.webp",
    alt: "Families enjoying lunch together at Swadika",
    caption: "Tables laid for a long family lunch",
    widthClass: "!w-[54vw] sm:!w-[min(33vw,260px)]",
    aspectClass: "aspect-[26/35]",
    sizes: "(max-width: 640px) 54vw, (max-width: 788px) 33vw, 260px",
  },
  {
    src: "/media/swadika-room.webp",
    alt: "Swadika restaurant set for service",
    caption: "Indian and global, all pure vegetarian",
    widthClass: "!w-[80vw] sm:!w-[min(66vw,640px)]",
    aspectClass: "aspect-[2/1]",
    sizes: "(max-width: 640px) 80vw, (max-width: 970px) 66vw, 640px",
  },
  {
    src: "/homopage/dining2_11zon.webp",
    alt: "A floating breakfast spread beside the Blue Diamond pool",
    caption: "Breakfast by the Blue Diamond pool",
    widthClass: "!w-[76vw] sm:!w-[min(56vw,540px)]",
    aspectClass: "aspect-[54/35]",
    sizes: "(max-width: 640px) 76vw, (max-width: 965px) 56vw, 540px",
  },
];

/* Loop mode needs more slides than are visible at once, so the set is doubled; the counter uses realIndex % length. */
const looped = [...slides, ...slides];
const pad = (n: number) => String(n).padStart(2, "0");

export default function SwadikaSlider() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(2);

  return (
    <div className="mt-14 md:mt-20">
      <Swiper
        modules={[Autoplay, A11y]}
        onSwiper={setSwiper}
        onRealIndexChange={(s) => setActive(s.realIndex % slides.length)}
        initialSlide={2}
        centeredSlides
        loop
        speed={1000}
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: false }}
        slidesPerView="auto"
        spaceBetween={14}
        breakpoints={{
          640: { spaceBetween: 20 },
          1024: { spaceBetween: 24 },
          1440: { spaceBetween: 28 },
        }}
        a11y={{ prevSlideMessage: "Previous photo", nextSlideMessage: "Next photo" }}
        className="!overflow-visible [--swiper-wrapper-transition-timing-function:var(--ease-lux)] [&_.swiper-wrapper]:items-end"
      >
        {looped.map((s, i) => (
          <SwiperSlide key={i} className={`!h-auto ${s.widthClass}`}>
            {({ isActive }) => (
              <figure
                className={`relative ${s.aspectClass} overflow-hidden rounded-[10px] bg-ink/10 transition-opacity duration-1000 ease-[var(--ease-lux)] ${
                  isActive ? "opacity-100" : "opacity-45"
                }`}
              >
                <Image src={s.src} alt={s.alt} fill quality={85} sizes={s.sizes} className="object-cover" />
                <span
                  className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"}`}
                  aria-hidden="true"
                />
                <figcaption
                  className={`t-label absolute bottom-5 left-5 text-[0.6rem] text-stone transition-opacity duration-700 sm:bottom-6 sm:left-6 ${isActive ? "opacity-100" : "opacity-0"}`}
                >
                  {s.caption}
                </figcaption>
              </figure>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <Container className="mt-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <p className="font-ivy text-[1.05rem] tabular-nums text-taupe" aria-live="polite">
            {pad(active + 1)} / {pad(slides.length)}
          </p>
          <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
            {slides.map((_, i) => (
              <span key={i} className={`h-px w-8 transition-colors duration-500 ${i === active ? "bg-ink" : "bg-ink/20"}`} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ArrowButton dir="prev" onClick={() => swiper?.slidePrev()} />
          <ArrowButton dir="next" onClick={() => swiper?.slideNext()} />
        </div>
      </Container>
    </div>
  );
}

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous photo" : "Next photo"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/40 text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-stone"
    >
      <svg viewBox="0 0 22 12" fill="none" aria-hidden="true" className={`h-3 w-4 ${dir === "prev" ? "rotate-180" : ""}`}>
        <path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </button>
  );
}
