"use client";

import { useState } from "react";
import Image from "next/image";

interface RoomGalleryImage {
  src: string;
  alt: string;
}

interface RoomGallerySliderProps {
  specs: string;
  images: RoomGalleryImage[];
}

const RoomGallerySlider = ({ specs, images }: RoomGallerySliderProps) => {
  // Default active index to 1 (center image: fireplace bed from PDF page 1)
  const defaultIndex = images && images.length > 1 ? 1 : 0;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  if (!images || images.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getPrevIndex = () => (activeIndex - 1 + images.length) % images.length;
  const getNextIndex = () => (activeIndex + 1) % images.length;

  const leftImg = images[getPrevIndex()];
  const currentImg = images[activeIndex];
  const rightImg = images[getNextIndex()];

  return (
    <section className="w-full bg-[#f6f4f0] pb-10 pt-2 md:pb-16 md:pt-4 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        {/* Room Specifications Title Header */}
        <h2 className="text-[#1c1613] text-lg sm:text-xl md:text-2xl lg:text-3xl font-[serif] tracking-[0.18em] font-normal uppercase text-center mb-8 md:mb-12 px-4">
          {specs}
        </h2>

        {/* 3-Card Carousel Matching PDF Mockup Layout */}
        <div className="relative w-full flex items-center justify-between min-h-[260px] sm:min-h-[360px] md:min-h-[460px] lg:min-h-[540px] px-0">
          {/* Left Peeking Card - Flush to left edge */}
          <div
            onClick={handlePrev}
            className="hidden sm:block relative w-[18%] md:w-[20%] lg:w-[22%] aspect-[3/4] md:aspect-[4/3] overflow-hidden opacity-90 hover:opacity-100 transition-all duration-500 cursor-pointer shadow-md shrink-0 -ml-4"
          >
            <Image
              src={leftImg.src}
              alt={leftImg.alt}
              fill
              sizes="22vw"
              className="object-cover object-center"
            />
          </div>

          {/* Center Main Active Card - Matching PDF aspect ratio & prominence */}
          <div className="relative w-[92%] sm:w-[60%] md:w-[58%] lg:w-[54%] max-w-[820px] mx-auto aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] overflow-hidden shadow-xl transition-all duration-500 shrink-0 z-10">
            <Image
              src={currentImg.src}
              alt={currentImg.alt}
              fill
              priority
              sizes="(max-width: 768px) 92vw, 54vw"
              className="object-cover object-center"
            />

            {/* Carousel Arrow Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md z-20 text-lg"
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md z-20 text-lg"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Right Peeking Card - Flush to right edge */}
          <div
            onClick={handleNext}
            className="hidden sm:block relative w-[18%] md:w-[20%] lg:w-[22%] aspect-[3/4] md:aspect-[4/3] overflow-hidden opacity-90 hover:opacity-100 transition-all duration-500 cursor-pointer shadow-md shrink-0 -mr-4"
          >
            <Image
              src={rightImg.src}
              alt={rightImg.alt}
              fill
              sizes="22vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Carousel Pagination Dots Indicator */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 mt-6 md:mt-8">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-8 bg-[#1c1613]"
                    : "w-2 bg-[#1c1613]/30 hover:bg-[#1c1613]/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomGallerySlider;
