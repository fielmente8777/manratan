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
  paragraphs,
  closingQuote,
  description,
}: AboutHistoryProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const slideList = images.length > 0 ? images : [image];

  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="bg-[#E6E2DB] py-8 sm:py-12 lg:py-16"
    >
      {/* ================= COMPONENT HEADER (CENTERED AT TOP) ================= */}
      <div className="mb-6 sm:mb-8 lg:mb-10 flex flex-col items-center justify-center text-center">
        <div className="relative inline-block text-left">
          <h2
            className="
              text-primary
              text-3xl
              sm:text-4xl
              lg:text-[46px]
              font-[serif]
              uppercase
              leading-none
              tracking-wide
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
                  mt-1
                  sm:mt-1.5
                  font-golden
                  text-primary
                  text-2xl
                  sm:text-3xl
                  lg:text-[28px]
                  normal-case
                  whitespace-nowrap
                "
              >
                {subTitle}
              </span>
            </span>
          </h2>

          <div className="h-5 sm:h-6" aria-hidden="true" />
        </div>
      </div>

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[1.2fr_1fr]
          items-center
          gap-8
          lg:gap-10
          xl:gap-14
        "
      >
        {/* ================= IMAGE SLIDER (LEFT ON DESKTOP, TOP ON MOBILE) ================= */}
        <div
          className="
            relative
            group
            h-[360px]
            sm:h-[450px]
            lg:h-[580px]
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
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            renderSlide={(imgSrc, index) => (
              <div className="relative w-full h-[360px] sm:h-[450px] lg:h-[580px] overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={`${title} Resort - Heritage and Story of Narsinghgarh`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={85}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            )}
          />

          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
            className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-10 lg:w-11 h-10 lg:h-11 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-sm text-white text-2xl flex items-center justify-center transition-all shadow-lg cursor-pointer select-none"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
            className="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-10 lg:w-11 h-10 lg:h-11 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-sm text-white text-2xl flex items-center justify-center transition-all shadow-lg cursor-pointer select-none"
          >
            ›
          </button>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div
          className="
            flex
            flex-col
            justify-center
            py-2
            lg:py-0
            w-full
          "
        >
          {/* TRIBUTE SECTION (FROM SCREENSHOT 2) */}
          <div className="w-full text-center">
            {/* Headline */}
            <h3 className="font-[serif] text-2xl sm:text-3xl lg:text-[31px] xl:text-[34px] leading-[1.25] text-primary font-normal">
              It was{" "}
              <span className="italic text-[#9E8568] font-[serif]">their name</span>{" "}
              that
              <br />
              became our new beginning.
            </h3>

            {/* Divider Line Top */}
            <div className="w-full border-t border-[#DCD4C7] mt-5 sm:mt-6 mb-4 sm:mb-5" />

            {/* Sub Tribute */}
            <div className="space-y-2 sm:space-y-2.5">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9E8568] font-medium">
                GRANDMOTHER <span className="inline-block text-[8px] sm:text-[9px] mx-1.5 align-middle text-[#9E8568]">♦</span> MOTHER
              </p>
              <p className="font-[serif] italic text-primary text-[15.5px] sm:text-[17px] lg:text-[18px] leading-relaxed">
                Named in honour of a beloved grandmother
                <br className="hidden sm:inline" />
                {" "}and mother, Manratan is a legacy of love.
              </p>
            </div>

            {/* Divider Line Bottom */}
            <div className="w-full border-b border-[#DCD4C7] mt-4 sm:mt-5 mb-5 sm:mb-6" />
          </div>

          {/* DESCRIPTION PARAGRAPHS */}
          <div className="space-y-3 lg:space-y-3.5 text-secondary text-[13.5px] lg:text-[14px]">
            {paragraphs && paragraphs.length > 0 ? (
              paragraphs.map((p, idx) => (
                <p key={idx} className="text-secondary text-[13.5px] lg:text-[14px] leading-[1.65]">
                  {p}
                </p>
              ))
            ) : (
              description && (
                <p className="text-secondary text-[13.5px] lg:text-[14px] leading-[1.65]">
                  {description}
                </p>
              )
            )}

            {closingQuote && (
              <p className="font-medium text-primary text-[13.5px] lg:text-[14px] leading-relaxed pt-1">
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
