"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import type { Photo } from "@/data/site";

/** Approved layout: centred slide with neighbours peeking in, prev/next over the image. */
export default function RoomGallery({ images, roomName }: { images: Photo[]; roomName: string }) {
  const first = images.length > 2 ? 1 : 0;
  const [active, setActive] = useState(first);
  const id = roomName.toLowerCase().replace(/[^a-z]+/g, "-");

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Keyboard, A11y]}
        navigation={{ prevEl: `.${id}-prev`, nextEl: `.${id}-next` }}
        keyboard={{ enabled: true }}
        a11y={{ prevSlideMessage: "Previous photo", nextSlideMessage: "Next photo" }}
        centeredSlides
        initialSlide={first}
        rewind
        slidesPerView={1.12}
        spaceBetween={14}
        breakpoints={{ 768: { slidesPerView: 1.55, spaceBetween: 40 }, 1280: { slidesPerView: 1.7, spaceBetween: 56 } }}
        speed={900}
        onSlideChange={(s) => setActive(s.activeIndex)}
        className="!overflow-visible"
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.src + i}>
            <div
              className={`relative mx-auto overflow-hidden bg-ink/10 transition-all duration-700 ${
                active === i ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3] md:aspect-[16/10] md:scale-[0.86] opacity-70"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                quality={90}
                sizes="(max-width: 768px) 90vw, 62vw"
                // Portrait shots (washrooms) are shown whole rather than cropped to a letterbox.
                className={img.height > img.width ? "bg-ink object-contain" : "object-cover"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 mx-auto flex max-w-[1100px] items-center justify-between px-3">
          {(["prev", "next"] as const).map((d) => (
            <button
              key={d}
              type="button"
              aria-label={d === "prev" ? "Previous photo" : "Next photo"}
              className={`${id}-${d} pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink/70 text-stone backdrop-blur transition-colors hover:bg-ink`}
            >
              <svg viewBox="0 0 24 24" className={`h-4 w-4 ${d === "prev" ? "rotate-180" : ""}`} aria-hidden="true">
                <path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
          ))}
        </div>
      )}
      <p className="mt-6 text-center text-xs tracking-[0.2em] text-taupe tabular-nums" aria-live="polite">
        {active + 1} / {images.length}
      </p>
    </div>
  );
}
