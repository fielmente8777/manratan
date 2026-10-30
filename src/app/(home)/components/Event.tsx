"use client";

import { useState } from "react";
import { SectionWithContainer } from "@/components/sectionComponants";
import Image from "next/image";
import Link from "next/link";
import SwiperCarousel from "@/components/sliders/SwiperCarousel";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

interface EventsProps {
  title: {
    heading: string;
    subHeading: string;
  };
  gallery: {
    image: string;
    alt: string;
    video: string;
  }[];
  description: string;
  link: {
    label: string;
    href: string;
  };
}

const Event = ({ title, gallery, description, link }: EventsProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <SectionWithContainer sectionClassName="bg-primary">
      <div className="text-center text-tertiary">
        <h2 className="text-4xl md:text-[56px] leading-none font-[serif]">
          {title.heading}
        </h2>

        <p className="font-golden text-xl md:text-5xl leading-none ml-24 sm:ml-12 lg:ml-50 mt-2 md:mt-4">
          {title.subHeading}
        </p>
      </div>

      {/* ================= DESKTOP GALLERY (100% UNTOUCHED & UNCHANGEABLE) ================= */}
      <div className="hidden md:grid grid-cols-2 gap-4 mt-8">
        {gallery.map((item, index) => (
          <Link
            key={index}
            href={item.video}
            className="relative group overflow-hidden aspect-[648/400]"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>

      {/* ================= MOBILE VIEW SLIDER WITH BUTTONS ================= */}
      <div className="block md:hidden w-full relative mt-8">
        <div className="relative w-full overflow-hidden shadow-lg">
          <SwiperCarousel
            data={gallery}
            modules={[Autoplay]}
            loop={true}
            speed={600}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full"
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            renderSlide={(item) => (
              <Link
                href={item.video}
                className="relative block w-full aspect-[648/400] overflow-hidden group"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>
            )}
          />

          {/* Centered Navigation Buttons */}
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous event"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white text-2xl flex items-center justify-center hover:bg-black/80 transition-colors shadow-lg cursor-pointer select-none"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next event"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white text-2xl flex items-center justify-center hover:bg-black/80 transition-colors shadow-lg cursor-pointer select-none"
          >
            ›
          </button>
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="max-w-5xl mx-auto mt-7 text-center">
        <p className="text-tertiary text-xs md:text-[16px]">
          {description}
        </p>

        <Link
          href={link.href}
          className="
            inline-block
            mt-6
            text-tertiary
            uppercase
            text-[10px]
            tracking-[0.15em]
            underline
            underline-offset-4
          "
        >
          {link.label}
        </Link>
      </div>
    </SectionWithContainer>
  );
};

export default Event;
