"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import LinkButton from "@/components/buttons/LinkButton";
import { SectionWithContainer } from "@/components/sectionComponants";


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
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <SectionWithContainer sectionClassName="bg-tertiary">
      <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr]">
        
        {/* ================= IMAGE SLIDER ================= */}
        <div className="relative aspect-[1.35/1] min-h-[350px] overflow-hidden lg:aspect-[1.45/1] lg:min-h-0">
          <Swiper
            modules={[Navigation]}
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
                    alt={`${title} ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => swiperRef.current?.slidePrev()}
            className="
              absolute left-4 top-1/2 z-20
              flex h-10 w-10
              -translate-y-1/2
              items-center justify-center
              rounded-full bg-white
              text-primary
              transition-transform duration-300
              hover:scale-105
              md:left-6 md:h-11 md:w-11
            "
          >
            {/* <BtnPrevIcon /> */}
          </button>

          {/* NEXT BUTTON */}
          <button
            type="button"
            aria-label="Next image"
            onClick={() => swiperRef.current?.slideNext()}
            className="
              absolute right-4 top-1/2 z-20
              flex h-10 w-10
              -translate-y-1/2
              items-center justify-center
              rounded-full bg-white
              text-primary
              transition-transform duration-300
              hover:scale-105
              md:right-6 md:h-11 md:w-11
            "
          >
            {/* <BtnNext /> */}
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-8 md:px-10 lg:px-12 xl:px-14">
          
          {/* TAGLINE */}
          <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-secondary md:text-xs">
            {tagline}
          </p>

          {/* TITLE */}
          <h2 className="font-ivy text-4xl font-normal leading-[0.95] text-primary sm:text-5xl md:text-[52px] lg:text-[48px] xl:text-[54px]">
            {title}
          </h2>

          {/* HANDWRITTEN SUBTITLE */}
          <p className="mt-1 font-golden text-xl text-primary md:text-2xl">
            {subtitle}
          </p>

          {/* DESCRIPTION */}
          <p className="mt-7 max-w-[560px] text-sm leading-[1.65] text-secondary md:text-[13px] lg:text-sm">
            {description}
          </p>

          {/* POINTS */}
          <ul className="mt-5 space-y-2.5">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs leading-[1.5] text-secondary md:text-[13px]"
              >
                <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-secondary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-2">
            {buttons.map((button, index) => (
              <LinkButton
                key={index}
                href={button.link}
                label={button.label}
                className={`
                  rounded-md
                  px-4 py-2
                  text-xs
                  uppercase
                  justify-center
                  ${
                    index === 0
                      ? "border border-primary bg-white text-primary"
                      : "border border-primary bg-primary text-white"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Legacy;