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
  const [prevIndex, setPrevIndex] = useState(slides.length - 1);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const prevSlide = () => {
    setDirection("prev");
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection("next");
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setPrevIndex(activeIndex);
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, slides.length]);

  const activeSlide = slides[activeIndex];

  const previousIndex =
    activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
  const prevLayer2Index =
    prevIndex === 0 ? slides.length - 1 : prevIndex - 1;

  const layer1Index = (activeIndex + 2) % slides.length;
  const prevLayer1Index = (prevIndex + 2) % slides.length;

  const getSlideAnimClass = (
    idx: number,
    targetActive: number,
    targetPrev: number,
    offsetDistance: "sm" | "md" | "lg"
  ) => {
    const dist =
      offsetDistance === "lg"
        ? "translate-x-24"
        : offsetDistance === "md"
        ? "translate-x-16"
        : "translate-x-10";

    const negDist =
      offsetDistance === "lg"
        ? "-translate-x-24"
        : offsetDistance === "md"
        ? "-translate-x-16"
        : "-translate-x-10";

    if (idx === targetActive) {
      return "translate-x-0 opacity-100 scale-100 z-10 pointer-events-auto";
    }
    if (idx === targetPrev) {
      return `${direction === "next" ? negDist : dist} opacity-0 scale-[0.98] z-0 pointer-events-none`;
    }
    return `${direction === "next" ? dist : negDist} opacity-0 scale-[0.98] z-0 pointer-events-none`;
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
          <div className="absolute -top-6 inset-x-3 h-full rounded-t-[180px] overflow-hidden bg-[#5E534A]/30 border border-[#5E534A]/40 z-0 filter blur-[2.5px] opacity-80">
            {slides.map((slide, idx) => (
              <div
                key={`m-l2-${idx}`}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${getSlideAnimClass(
                  idx,
                  layer1Index,
                  prevLayer1Index,
                  "sm"
                )}`}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Background Layer 1 (Middle Arch Frame directly behind at top center) */}
          <div className="absolute -top-3 inset-x-1.5 h-full rounded-t-[180px] overflow-hidden bg-[#5E534A]/50 border border-[#5E534A]/60 z-10 filter blur-[1.5px] opacity-90">
            {slides.map((slide, idx) => (
              <div
                key={`m-l1-${idx}`}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${getSlideAnimClass(
                  idx,
                  previousIndex,
                  prevLayer2Index,
                  "md"
                )}`}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Front Main Arch Image Container */}
          <div className="relative w-full h-full rounded-t-[180px] overflow-hidden shadow-lg z-20 group">
            {slides.map((slide, idx) => (
              <div
                key={`m-front-${idx}`}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${getSlideAnimClass(
                  idx,
                  activeIndex,
                  prevIndex,
                  "lg"
                )}`}
              >
                <Image
                  src={slide.image}
                  alt={title}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ))}

            {/* Bottom Dark Gradient Overlay with Logo & Description */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-16 pb-6 px-6 flex flex-col items-center justify-end text-center z-30 pointer-events-none">
              {slides[0]?.logo && (
                <div className="relative h-[45px] w-[130px] mb-7 pointer-events-auto">
                  <Image
                    src={slides[0].logo}
                    alt="Swadika"
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <p key={activeIndex} className="animate-content text-white/90 text-xs leading-relaxed text-center font-light pointer-events-auto">
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

          <span className="text-sm font-ivy font-['IvyOra_Display',serif] tracking-[0.07em] text-primary font-normal">
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
      <div className="hidden md:block w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_0.9fr] items-start">
          {/* ================= 3-LAYERED IMAGE SLIDER (MATCHING HISTORY'S 2fr COLUMN) ================= */}
          <div className="relative w-full h-[520px]">
            {/* Layer 1 (Deepest Background Image - Starts at Left: 0, Blurred) */}
            <div className="absolute left-0 top-0 w-[calc(100%-60px)] h-[480px] overflow-hidden z-0 shadow-md filter blur-[2.5px] opacity-80">
              {slides.map((slide, idx) => (
                <div
                  key={`layer1-${slide.image}-${idx}`}
                  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${getSlideAnimClass(
                    idx,
                    layer1Index,
                    prevLayer1Index,
                    "sm"
                  )}`}
                >
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Layer 2 (Middle Layered Image - Blurred) */}
            <div className="absolute left-[30px] top-[20px] w-[calc(100%-60px)] h-[480px] overflow-hidden z-10 shadow-md filter blur-[1.5px] opacity-90">
              {slides.map((slide, idx) => (
                <div
                  key={`layer2-${slide.image}-${idx}`}
                  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${getSlideAnimClass(
                    idx,
                    previousIndex,
                    prevLayer2Index,
                    "md"
                  )}`}
                >
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Layer 3 (Front Main Active Image - Crystal Clear, Ends exactly at 100% of 2fr Column) */}
            <div
              className="absolute left-[60px] top-[40px] w-[calc(100%-60px)] h-[480px] overflow-hidden z-20 shadow-2xl group cursor-pointer"
              onClick={nextSlide}
            >
              {slides.map((slide, idx) => (
                <div
                  key={`layer3-${slide.image}-${idx}`}
                  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${getSlideAnimClass(
                    idx,
                    activeIndex,
                    prevIndex,
                    "lg"
                  )}`}
                >
                  <Image
                    src={slide.image}
                    alt={title}
                    fill
                    priority={idx === 0}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= CONTENT CARD (TOP MATCHES BACK IMAGE, BOTTOM MATCHES FRONT IMAGE, LOGO & TEXT CENTERED) ================= */}
          <div className="w-full lg:pl-10">
            <div className="w-full h-[520px] bg-primary p-8 lg:p-10 flex flex-col justify-between shadow-2xl">
              <div aria-hidden="true" className="h-2" />

              {/* Centered Logo & Description */}
              <div className="my-auto flex flex-col items-center justify-center text-center">
                {slides[0]?.logo && (
                  <div className="relative h-[65px] w-[160px] mx-auto mb-14 lg:mb-16">
                    <Image
                      src={slides[0].logo}
                      alt="Swadika"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <p
                  key={activeIndex}
                  className="animate-content text-[16px] leading-7 text-white text-center font-light max-w-sm mx-auto"
                >
                  {activeSlide.description}
                </p>
              </div>

              {/* ================= SLIDE COUNT ================= */}
              <button
                type="button"
                onClick={nextSlide}
                className="flex items-center gap-4 text-white text-[32px] leading-none w-fit hover:opacity-80 transition cursor-pointer font-ivy font-['IvyOra_Display',serif] tracking-[0.07em]"
              >
                <span>
                  {activeIndex + 1}/{slides.length}
                </span>

                <span className="text-[32px] leading-none">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default AtManratan;