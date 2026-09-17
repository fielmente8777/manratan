"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { WhatsAppIcon, CalendarIcon, CheckIcon, SliderPrevIcon, SliderNextIcon } from "@/utils/icons";

export interface LegacySectionProps {
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  images: string[];
  buttons: {
    label: string;
    link: string;
  }[];
}

const Legacy: React.FC<LegacySectionProps> = ({
  tagline,
  title,
  subtitle,
  description,
  points,
  images,
  buttons,
}) => {
  const rawImages = images.length > 0 ? images : ["/landing/image1.jpg"];
  const baseImages =
    rawImages.length < 3
      ? [...rawImages, ...rawImages, ...rawImages]
      : rawImages;

  // Extended slides with 1 clone on left and 1 clone on right
  const slides = [
    baseImages[baseImages.length - 1],
    ...baseImages,
    baseImages[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Auto sliding
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(slides.length - 2);
    } else if (currentIndex === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative w-full bg-tertiary py-12 md:py-16 lg:py-[100px] overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-[24px] pl-0 pr-4 sm:pr-6 lg:pr-[max(60px,calc((100vw-1440px)/2+60px))] min-h-[601px]">

        {/* ================= LEFT IMAGE SLIDER AREA  ================= */}
        <div
          className="relative w-full lg:w-[860px] h-[380px] sm:h-[480px] lg:h-[600px] overflow-hidden shrink-0 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* SLIDER TRACK */}
          <div
            className="flex h-full"
            style={{
              gap: "15px",
              transform: `translateX(calc(min(115px, 14vw) - ${currentIndex} * (min(745px, 85vw) + 15px)))`,
              transition: isTransitioning
                ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((image, index) => (
              <div
                key={index}
                className="w-[min(745px,85vw)] h-full shrink-0 relative overflow-hidden bg-black/5"
              >
                <Image
                  src={image}
                  alt={`${title} slide ${index}`}
                  fill
                  sizes="(max-width: 1024px) 85vw, 745px"
                  priority={index === 1}
                  className="object-cover pointer-events-none"
                />
              </div>
            ))}
          </div>

          {/* NAVIGATION CONTROLS OVER ACTIVE SLIDE  */}
          <div className="pointer-events-none absolute left-[min(115px,14vw)] top-0 z-20 flex h-full w-[min(745px,85vw)] items-center justify-between px-[8px]">
            <button
              type="button"
              aria-label="Previous image"
              onClick={handlePrev}
              className="pointer-events-auto flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
            >
              <SliderPrevIcon className="w-10 h-10" />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={handleNext}
              className="pointer-events-auto flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
            >
              <SliderNextIcon className="w-10 h-10" />
            </button>
          </div>
        </div>

        {/* ================= RIGHT CONTENT AREA  ================= */}
        <div className="flex flex-col justify-between w-full lg:w-[536px] lg:h-[600px] min-h-[600px] py-2 lg:py-0">

          {/* TOP SECTION: Tagline & Title & Subtitle */}
          <div className="flex flex-col items-start w-full">
            <p className="font-montserrat font-normal not-italic text-[16px] leading-[24px] tracking-normal text-secondary uppercase">
              {tagline}
            </p>

            <h2 className="mt-[24px] font-ivy text-[36px] sm:text-[46px] lg:text-[56px] font-normal leading-[1.14] lg:leading-[64px] tracking-[0.07em] text-[#221811]">
              <span className="italic font-normal normal-case">Royal</span>
              <span className="not-italic font-normal uppercase"> CHARM</span>
            </h2>

            <p className="font-golden font-normal not-italic text-[28px] sm:text-[34px] lg:text-[40px] leading-[36px] lg:leading-[48px] tracking-[0.07em] text-[#221811] ml-[130px] sm:ml-[180px] lg:ml-[240px] mt-[1px] sm:mt-[2px]">
              {subtitle}
            </p>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-[24px] font-montserrat font-normal not-italic text-[15px] lg:text-[16px] leading-[24px] tracking-normal text-secondary max-w-[536px]">
            {description}
          </p>

          {/* POINTS WITH CHECKMARKS  */}
          <ul className="mt-[24px] space-y-2">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 font-montserrat font-normal not-italic text-[15px] lg:text-[16px] leading-[24px] tracking-normal text-secondary"
              >
                <CheckIcon className="mt-[8px] shrink-0 text-[#221811]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* BUTTONS  */}
          <div className="mt-auto pt-[24px] flex flex-wrap items-center gap-[12px] w-full max-w-[332px]">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                className={`flex items-center justify-center gap-[8px] w-full sm:w-[160px] h-[41px] px-[16px] py-[12px] font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] uppercase transition-all duration-200 ${index === 0
                  ? "bg-white text-[#221811] border border-[#221811] hover:opacity-90 active:scale-[0.98]"
                  : "bg-[#221811] text-white border border-[#221811] hover:opacity-90 active:scale-[0.98]"
                  }`}
              >
                {index === 0 ? (
                  <WhatsAppIcon className="shrink-0 w-[14px] h-[14px]" />
                ) : (
                  <CalendarIcon className="shrink-0 w-[16px] h-[16px]" />
                )}
                <span className="whitespace-nowrap">{button.label}</span>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Legacy;
