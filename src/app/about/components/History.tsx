"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";
import SwiperCarousel from "@/components/sliders/SwiperCarousel";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

interface AboutHistoryProps {
  image?: string;
  images?: string[];
  title: string;
  subTitle: string;
  tagline?: string;
  subTagline?: string;
  paragraphs?: string[];
  closingQuote?: string;
  description?: string;
}

const History = ({
  image = "/aboutpage/history_11zon.webp",
  images = [],
  title,
  subTitle,
  tagline,
  subTagline,
  paragraphs,
  closingQuote,
  description,
}: AboutHistoryProps) => {
  const [desktopSwiper, setDesktopSwiper] = useState<SwiperType | null>(null);
  const [mobileSwiper, setMobileSwiper] = useState<SwiperType | null>(null);

  const slideList = images.length > 0 ? images : [image];

  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="bg-tertiary"
    >
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[2fr_0.9fr]
          lg:items-center
        "
      >
        {/* ================= DESKTOP VIEW SLIDER (LEFT) ================= */}
        <div
          className="
            hidden
            lg:block
            lg:relative
            group
            h-[620px]
            overflow-hidden
            shadow-sm
          "
        >
          <SwiperCarousel
            data={slideList}
            modules={[Autoplay]}
            loop={true}
            speed={600}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full h-full"
            onSwiper={(swiper) => setDesktopSwiper(swiper)}
            renderSlide={(imgSrc) => (
              <div className="relative w-full h-[620px] overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            )}
          />

          {/* Desktop Navigation Buttons */}
          <button
            type="button"
            onClick={() => desktopSwiper?.slidePrev()}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-sm text-white text-2xl flex items-center justify-center transition-all shadow-lg cursor-pointer select-none"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => desktopSwiper?.slideNext()}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-sm text-white text-2xl flex items-center justify-center transition-all shadow-lg cursor-pointer select-none"
          >
            ›
          </button>
        </div>

        {/* ================= RIGHT CONTENT (VERTICALLY CENTERED WITH IMAGE) ================= */}
        <div
          className="
            flex
            flex-col
            justify-center
            py-10
            lg:px-0
            lg:pl-10
            lg:py-0
          "
        >
          {/* TITLE */}
          <div className="relative inline-block w-fit">
            <h2
              className="
                text-primary
                text-4xl
                font-[serif]
                uppercase
                leading-none
                sm:text-5xl
                lg:text-[48px]
              "
            >
              <span>{title.slice(0, -1)}</span>
              <span className="relative inline-block">
                {title.slice(-1)}
                <span
                  className="
                    absolute
                    top-full
                    -left-1
                    sm:-left-1.5
                    mt-1.5
                    sm:mt-2
                    font-golden
                    text-primary
                    text-2xl
                    leading-none
                    sm:text-3xl
                    lg:text-[30px]
                    normal-case
                    whitespace-nowrap
                  "
                >
                  {subTitle}
                </span>
              </span>
            </h2>

            <div className="h-6 sm:h-8" aria-hidden="true" />
          </div>

          {/* ================= MOBILE VIEW SLIDER ================= */}
          <div
            className="
              lg:hidden 
              group
              relative
              mt-6
              sm:mt-8
              h-[350px]
              sm:h-[450px]
              overflow-hidden
              shadow-md
            "
          >
            <SwiperCarousel
              data={slideList}
              modules={[Autoplay]}
              loop={true}
              speed={600}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="w-full h-full"
              onSwiper={(swiper) => setMobileSwiper(swiper)}
              renderSlide={(imgSrc) => (
                <div className="relative w-full h-[350px] sm:h-[450px] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              )}
            />

            {/* Mobile Navigation Buttons */}
            <button
              type="button"
              onClick={() => mobileSwiper?.slidePrev()}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white text-2xl flex items-center justify-center transition-colors shadow-lg cursor-pointer select-none"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => mobileSwiper?.slideNext()}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white text-2xl flex items-center justify-center transition-colors shadow-lg cursor-pointer select-none"
            >
              ›
            </button>
          </div>

          {/* CONTENT SECTION */}
          <div className="mt-6 lg:mt-8 space-y-3.5 text-secondary text-sm leading-relaxed sm:text-[15px] sm:leading-7">
            {tagline && (
              <p className="font-semibold text-primary uppercase tracking-wide text-xs sm:text-[13px] leading-snug">
                {tagline}
              </p>
            )}

            {subTagline && (
              <p className="font-medium text-primary text-xs sm:text-[13px] leading-snug">
                {subTagline}
              </p>
            )}

            {paragraphs && paragraphs.length > 0 ? (
              paragraphs.map((p, idx) => (
                <p key={idx} className="text-secondary text-sm sm:text-[15px] leading-relaxed sm:leading-7">
                  {p}
                </p>
              ))
            ) : (
              description && (
                <p className="text-secondary text-sm sm:text-[15px] leading-relaxed sm:leading-7">
                  {description}
                </p>
              )
            )}

            {closingQuote && (
              <p className="font-medium text-primary text-sm sm:text-[15px] pt-1">
                {closingQuote}
              </p>
            )}
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default History;
