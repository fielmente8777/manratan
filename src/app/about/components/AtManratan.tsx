"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SectionWithContainer } from "@/components/sectionComponants";

interface Slide {
  image: string;
  logo?: string;
  description: string;
}

interface AtManratanProps {
  title: string;
  subTitle: string;
  slides: Slide[];
}

const AtManratan = ({
  title,
  subTitle,
  slides,
}: AtManratanProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];

  const previousIndex =
    activeIndex === 0 ? slides.length - 1 : activeIndex - 1;

  const previousSlide = slides[previousIndex];

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <SectionWithContainer sectionClassName="bg-tertiary">
      {/* ================= TITLE ================= */}
      <div className="mb-8 md:mb-10 flex flex-col items-center justify-center text-center">
        <div className="relative inline-block text-left">
          <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-[serif] uppercase leading-none">
            {title}
          </h2>

          <p className="font-golden text-primary text-2xl sm:text-3xl leading-none text-right mt-1 -mr-2">
            {subTitle}
          </p>
        </div>
      </div>

      {/* ================= MOBILE SLIDER (ARCH DOME MOCKUP UI) ================= */}
      <div className="block md:hidden w-full max-w-[320px] sm:max-w-[340px] mx-auto pt-8 px-2">
        <div className="relative w-full h-[440px] mx-auto">
          {/* Background Layer 2 (Deepest Arch Frame directly behind at top center) */}
          <div className="absolute -top-6 inset-x-3 h-full rounded-t-[180px] overflow-hidden bg-[#5E534A]/30 border border-[#5E534A]/40 z-0">
            <Image
              src={slides[(activeIndex + 2) % slides.length].image}
              alt=""
              fill
              className="object-cover opacity-50"
            />
          </div>

          {/* Background Layer 1 (Middle Arch Frame directly behind at top center) */}
          <div className="absolute -top-3 inset-x-1.5 h-full rounded-t-[180px] overflow-hidden bg-[#5E534A]/50 border border-[#5E534A]/60 z-10">
            <Image
              src={previousSlide.image}
              alt=""
              fill
              className="object-cover opacity-75"
            />
          </div>

          {/* Front Main Arch Image Container */}
          <div className="relative w-full h-full rounded-t-[180px] overflow-hidden shadow-lg z-20">
            {/* Active Slide Image */}
            <Image
              key={activeSlide.image}
              src={activeSlide.image}
              alt={title}
              fill
              priority
              className="object-cover object-center"
            />

            {/* Bottom Dark Gradient Overlay with Logo & Description */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-16 pb-6 px-6 flex flex-col items-center justify-end text-center z-30">
              {activeSlide.logo && (
                <div className="relative h-[45px] w-[130px] mb-3">
                  <Image
                    src={activeSlide.logo}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <p className="text-white/90 text-xs leading-relaxed text-center font-light">
                {activeSlide.description}
              </p>
            </div>
          </div>
        </div>

        {/* Slide Navigation Controls Below Arch */}
        <div className="flex items-center justify-center gap-6 mt-6 text-primary select-none">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="text-lg p-2 hover:opacity-70 transition cursor-pointer"
          >
            ‹
          </button>

          <span className="text-sm font-[serif] tracking-widest text-primary font-normal">
            {activeIndex + 1}/{slides.length}
          </span>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="text-lg p-2 hover:opacity-70 transition cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>

      {/* ================= DESKTOP SLIDER ================= */}
      <div className="hidden md:block relative mx-auto w-full max-w-[1100px]">
        <div className="relative w-full h-[520px]">
          {/* ================= LAYER 1 (DEEPEST BACKGROUND IMAGE - FAR LEFT) ================= */}
          <div className="absolute left-0 top-0 w-[60%] h-[440px] overflow-hidden z-0 shadow-md">
            <Image
              src={slides[(activeIndex + 2) % slides.length].image}
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* ================= LAYER 2 (MIDDLE LAYERED IMAGE) ================= */}
          <div className="absolute left-[30px] top-[20px] w-[60%] h-[440px] overflow-hidden z-10 shadow-md">
            <Image
              src={previousSlide.image}
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* ================= LAYER 3 (FRONT MAIN ACTIVE IMAGE) ================= */}
          <div className="absolute left-[60px] top-[40px] w-[62%] h-[440px] overflow-hidden z-20 shadow-xl">
            <Image
              key={activeSlide.image}
              src={activeSlide.image}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* ================= CONTENT CARD (ATTACHED FLUSH TO FRONT IMAGE RIGHT EDGE WITH ZERO OVERLAP & VERTICALLY CENTERED) ================= */}
          <div className="absolute right-0 top-[109px] z-30 w-[calc(100%-60px-62%)] h-[302px] bg-primary px-8 py-8 flex flex-col justify-between shadow-2xl">
            <div key={activeIndex} className="animate-content">
              {activeSlide.logo && (
                <div className="relative h-[55px] w-[150px] mx-auto">
                  <Image
                    src={activeSlide.logo}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <p className="mt-7 text-[13px] leading-6 text-white text-center">
                {activeSlide.description}
              </p>
            </div>

            {/* ================= SLIDE COUNT ================= */}
            <button
              type="button"
              onClick={nextSlide}
              className="flex items-center gap-3 text-white text-sm w-fit hover:opacity-80 transition cursor-pointer"
            >
              <span>
                {activeIndex + 1}/{slides.length}
              </span>

              <span className="text-xl">›</span>
            </button>
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default AtManratan;