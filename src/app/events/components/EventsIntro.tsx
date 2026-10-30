"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";
import Headings from "@/components/typography/Headings";
import SwiperCarousel from "@/components/sliders/SwiperCarousel";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

interface EventsIntroProps {
  title: {
    heading: string;
    subHeading: string;
  };
  gallery: {
    image: string;
    alt: string;
  }[];
  headingLabel: string;
  description: string;
}

export default function EventsIntro({
  title,
  gallery,
  headingLabel,
  description,
}: EventsIntroProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const mobileSlides = gallery.length < 3 ? [...gallery, ...gallery] : gallery;

  return (
    <SectionWithContainer sectionClassName="bg-tertiary py-16 md:py-24">
      <div className="max-w mx-auto text-center">
        {/* Section Header */}
        <Headings
          level={1}
          heading={title.heading}
          className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[serif] font-normal uppercase tracking-[0.05em] leading-tight"
        />

        <p className="font-golden text-primary/80 text-3xl sm:text-4xl md:text-5xl mt-1 ml-18 text-right pr-16 sm:pr-20 md:pr-32 lg:pr-40 mb-10 md:mb-16">
          {title.subHeading}
        </p>

        {/* ================= DESKTOP VIEW IMAGES GRID (100% UNTOUCHED) ================= */}
        <div className="hidden md:grid grid-cols-[1fr_2fr] gap-6 mb-10 md:mb-12">
          {gallery.map((item, index) => (
            <div
              key={index}
              className="
                relative
                h-[300px]
                md:h-[380px]
                lg:h-[600px]
                overflow-hidden
                group
              "
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* ================= MOBILE VIEW SLIDER (MATCHING HOMEPAGE ABOUT) ================= */}
        <div className="block md:hidden w-full relative mb-8">
          <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden group shadow-md">
            <SwiperCarousel
              data={mobileSlides}
              modules={[Autoplay]}
              loop={true}
              speed={600}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="w-full h-full"
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              renderSlide={(item) => (
                <div className="relative w-full h-[360px] sm:h-[400px]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              )}
            />

            {/* Navigation Controls (Vertically Centered on Image) */}
            <button
              type="button"
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white text-2xl flex items-center justify-center hover:bg-black/80 transition-colors shadow-lg cursor-pointer select-none"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white text-2xl flex items-center justify-center hover:bg-black/80 transition-colors shadow-lg cursor-pointer select-none"
            >
              ›
            </button>
          </div>
        </div>

        {/* Description Body */}
        <div className="max-w mx-auto text-left sm:text-justify text-secondary text-sm sm:text-base leading-relaxed space-y-3 font-normal">
          <p>
            <strong className="text-primary font-semibold">{headingLabel} </strong>
            {description}
          </p>
        </div>
      </div>
    </SectionWithContainer>
  );
}
