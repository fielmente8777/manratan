"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";
import Headings from "@/components/typography/Headings";
import SwiperCarousel from "@/components/sliders/SwiperCarousel";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

interface CategoryItem {
  id: string;
  title: string;
  image: string;
  alt: string;
}

interface HostYourEventsProps {
  title: {
    heading: string;
    subHeading: string;
  };
  categories: CategoryItem[];
}

export default function HostYourEvents({
  title,
  categories,
}: HostYourEventsProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const data = categories.length < 5 ? [...categories, ...categories, ...categories] : categories;

  return (
    <SectionWithContainer sectionClassName="bg-tertiary py-16 md:py-24 overflow-hidden">
      <div className="max-w mx-auto text-center">
        {/* Section Header */}
        <div className="w-fit mx-auto text-right mb-12">
          <Headings
            level={2}
            heading={title.heading}
            className="text-primary text-3xl sm:text-4xl md:text-5xl font-[serif] font-normal uppercase tracking-[0.05em]"
          />

          <p className="font-golden text-primary/80 text-2xl sm:text-3xl md:text-4xl mt-1 text-right -mr-4 sm:-mr-8 md:-mr-12">
            {title.subHeading}
          </p>
        </div>

        {/* Swiper Carousel using project SwiperCarousel component */}
        <div className="relative w-full">
          <SwiperCarousel
            data={data || []}
            modules={[EffectCoverflow, Autoplay]}
            className="w-full we-offer-slider"
            swiperSlideClassName="swiper-slide"
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 20,
              depth: 300,
              modifier: 2.5,
              slideShadows: false,
            }}
            speed={800}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            renderSlide={(item) => (
              <div className="w-full group cursor-pointer">
                <div className="w-full relative aspect-[4/2.5] rounded-none overflow-hidden shadow-[20px_0_25px_-5px_rgba(0,0,0,0.35),-20px_0_25px_-5px_rgba(0,0,0,0.35)] border border-black/10">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            )}
          />

          {/* Previous Button - Positioned at left end of active center slide */}
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-[10%] md:left-[26.5%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-sm text-white text-2xl flex items-center justify-center transition-all shadow-xl cursor-pointer select-none"
          >
            ‹
          </button>

          {/* Next Button - Positioned at right end of active center slide */}
          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
            className="absolute right-3 sm:right-[10%] md:right-[26.5%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-sm text-white text-2xl flex items-center justify-center transition-all shadow-xl cursor-pointer select-none"
          >
            ›
          </button>
        </div>
      </div>
    </SectionWithContainer>
  );
}
