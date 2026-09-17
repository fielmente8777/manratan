"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import LinkButton from "@/components/buttons/LinkButton";
import { SectionWithContainer } from "@/components/sectionComponants";
// import { BtnNext, BtnPrevIcon } from "@/utils/icons";

interface WeddingSectionProps {
  tagline: string;
  title: {
    first: string;
    second: string;
    italic: string;
  };
  description: string;
  images: string[];
  button: {
    label: string;
    link: string;
  };
}

const WeddingSection: React.FC<WeddingSectionProps> = ({
  tagline,
  title,
  description,
  images,
  button,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <SectionWithContainer
      sectionClassName="bg-[#4C0D18] px-4 py-10 md:px-6 md:py-14 lg:py-16"
    >
      <div className="relative mx-auto w-full max-w-[1320px]">

        {/* INNER BORDER */}
        <div className="relative border border-[#C9B7A7]">

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">

            {/* =========================================
                IMAGE SLIDER
            ========================================= */}
            <div className="relative aspect-[1.15/1] min-h-[320px] overflow-hidden lg:aspect-auto lg:min-h-[400px]">

              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={images.length > 1}
                className="h-full w-full"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-full w-full">
                      <Image
                        src={image}
                        alt={`Wedding celebration ${index + 1}`}
                        fill
                        priority={index === 0}
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* PREVIOUS */}
              {images.length > 1 && (
                <button
                  type="button"
                  aria-label="Previous wedding image"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="
                    absolute left-3 top-1/2 z-20
                    flex h-9 w-9
                    -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    bg-white
                    text-primary
                    transition-transform duration-300
                    hover:scale-105
                    md:left-4
                    md:h-10 md:w-10
                  "
                >
                  {/* <BtnPrevIcon /> */}
                </button>
              )}

              {/* NEXT */}
              {images.length > 1 && (
                <button
                  type="button"
                  aria-label="Next wedding image"
                  onClick={() => swiperRef.current?.slideNext()}
                  className="
                    absolute right-3 top-1/2 z-20
                    flex h-9 w-9
                    -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    bg-white
                    text-primary
                    transition-transform duration-300
                    hover:scale-105
                    md:right-4
                    md:h-10 md:w-10
                  "
                >
                  {/* <BtnNext /> */}
                </button>
              )}
            </div>

            {/* =========================================
                CONTENT
            ========================================= */}
            <div className="flex flex-col justify-center px-6 py-8 text-white sm:px-8 md:px-10 lg:px-8 xl:px-10">

              {/* TAGLINE */}
              <p className="text-[9px] uppercase tracking-[0.15em] text-[#D4A96A] md:text-[10px]">
                {tagline}
              </p>

              {/* TITLE */}
              <h2 className="mt-3 font-ivy text-3xl font-normal uppercase leading-[0.95] text-white sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[48px]">
                <span>{title.first} </span>
                <span>{title.second} </span>
                <br />
                <span className="italic">{title.italic}</span>
              </h2>

              {/* DESCRIPTION */}
              <p className="mt-5 max-w-[550px] text-xs leading-[1.6] text-white/90 md:text-[13px]">
                {description}
              </p>
            </div>
          </div>

          {/* =========================================
              BUTTON
          ========================================= */}
          <div className="flex justify-center py-5">
            <LinkButton
              href={button.link}
              label={button.label}
              className="
                rounded-md
                border border-primary
                bg-white
                px-4 py-2
                text-[10px]!
                uppercase
                text-primary
              "
            />
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default WeddingSection;