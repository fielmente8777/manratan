"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionWithContainer } from "@/components/sectionComponants";
import SwiperCarousel from "@/components/sliders/SwiperCarousel";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

interface AboutProps {
  title: {
    heading: string;
    subHeading: string;
  };
  topContent: {
    description: string;
    link: {
      label: string;
      href: string;
    };
  };
  gallery: {
    image: string;
    alt: string;
  }[];
}

const About = ({ title, topContent, gallery }: AboutProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const mobileSlides = gallery.length < 4 ? [...gallery, ...gallery] : gallery;

  return (
    <SectionWithContainer sectionClassName="bg-tertiary">
      <div className="grid lg:grid-cols-[1fr_2fr]">
        {/* Heading */}
        <div className="px-0 lg:px-0 lg:py-0">
          <h2
            className="
              text-primary
              text-3xl
              lg:text-[56px]
              leading-none
              font-[serif]
            "
          >
            {title.heading}
          </h2>

          <p
            className="
              font-golden
              text-primary
              text-2xl
              lg:text-5xl
              leading-none
              ml-16
              sm:ml-24
              mt-2
              md:mt-4
            "
          >
            {title.subHeading}
          </p>
        </div>

        {/* Desktop Description + Link */}
        <div className="hidden md:flex flex-col justify-between px-0 pb-7 lg:px-0 lg:pb-7">
          <p
            className="
              text-secondary
              text-sm
              lg:text-[16px]
              leading-6
              lg:leading-7
              max-w-full
            "
          >
            {topContent.description}
          </p>

          <div className="flex justify-end mt-6">
            <Link
              href={topContent.link.href}
              className="
                text-primary
                text-[11px]
                uppercase
                tracking-[0.2em]
                underline
                underline-offset-4
                decoration-[0.5px]
              "
            >
              {topContent.link.label}
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MOBILE VIEW SLIDER (COMES IMMEDIATELY AFTER HEADING ON MOBILE) ================= */}
      <div className="block md:hidden w-full relative mt-6">
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

      {/* ================= MOBILE VIEW DESCRIPTION + LINK (COMES AFTER SLIDER ON MOBILE) ================= */}
      <div className="block md:hidden mt-6">
        <p className="text-secondary text-sm leading-6 max-w-full">
          {topContent.description}
        </p>

        <div className="flex justify-end mt-4">
          <Link
            href={topContent.link.href}
            className="
              text-primary
              text-[11px]
              uppercase
              tracking-[0.2em]
              underline
              underline-offset-4
              decoration-[0.5px]
            "
          >
            {topContent.link.label}
          </Link>
        </div>
      </div>

      {/* ================= DESKTOP IMAGES (100% UNTOUCHED & UNCHANGEABLE) ================= */}
      <div className="hidden md:grid grid-cols-[1fr_2fr] gap-6">
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
    </SectionWithContainer>
  );
};

export default About;
