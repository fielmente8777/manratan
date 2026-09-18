"use client";

import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useWebContext } from "@/context-api/WebContext";

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
  const { setIsOpenPopUpForm } = useWebContext();
  const rawImages = images && images.length > 0 ? images : ["/landing/image1.jpg"];
  const displayImages =
    rawImages.length < 6
      ? [...rawImages, ...rawImages, ...rawImages]
      : rawImages;

  const desktopSwiperRef = useRef<SwiperType | null>(null);
  const mobileSwiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative w-full bg-tertiary py-10 md:py-16 lg:py-[100px] overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-[24px] px-4 sm:px-6 lg:pl-0 lg:pr-[max(60px,calc((100vw-1440px)/2+60px))] min-h-0 lg:min-h-[601px]">

        {/* Heading */}
        <div className="block lg:hidden flex flex-col items-start w-full">
          <p className="font-montserrat font-normal not-italic text-[13px] sm:text-[16px] leading-[20px] sm:leading-[24px] tracking-normal text-secondary uppercase">
            {tagline}
          </p>

          <h2 className="mt-3 font-ivy text-[28px] sm:text-[46px] font-normal leading-[1.15] tracking-[0.05em] text-[#221811]">
            <span className="italic font-normal normal-case">Royal</span>
            <span className="not-italic font-normal uppercase"> CHARM</span>
          </h2>

          <p className="font-golden font-normal not-italic text-[22px] sm:text-[34px] leading-[30px] sm:leading-[36px] tracking-[0.05em] text-[#221811] ml-[92px] sm:ml-[180px] -mt-1 sm:mt-[2px]">
            {subtitle}
          </p>
        </div>

        {/* Image Slider */}
        <div className="block lg:hidden relative w-full h-[260px] sm:h-[380px] overflow-hidden shrink-0">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => {
              mobileSwiperRef.current = swiper;
            }}
            loop={rawImages.length > 1}
            className="h-full w-full"
          >
            {rawImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={image}
                    alt={`${title} - image ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Previous Button */}
          {rawImages.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => mobileSwiperRef.current?.slidePrev()}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
            >
              <SliderPrevIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
          )}

          {/* Next Button */}
          {rawImages.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={() => mobileSwiperRef.current?.slideNext()}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
            >
              <SliderNextIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
          )}
        </div>

        {/* Image Slider */}
        <div className="hidden lg:block relative w-[860px] h-[600px] overflow-hidden shrink-0 select-none">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => {
              desktopSwiperRef.current = swiper;
            }}
            loop={true}
            speed={600}
            slidesPerView="auto"
            spaceBetween={15}
            slidesOffsetBefore={115}
            className="h-full w-full"
          >
            {displayImages.map((image, index) => (
              <SwiperSlide key={index} className="!w-[745px] h-full shrink-0">
                <div className="w-[745px] h-full relative overflow-hidden bg-black/5">
                  <Image
                    src={image}
                    alt={`${title} slide ${index + 1}`}
                    fill
                    sizes="745px"
                    priority={index === 0 || index === 1}
                    className="object-cover pointer-events-none"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <div className="pointer-events-none absolute left-[115px] top-0 z-20 flex h-full w-[745px] items-center justify-between px-[8px]">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => desktopSwiperRef.current?.slidePrev()}
              className="pointer-events-auto flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
            >
              <SliderPrevIcon className="w-10 h-10" />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={() => desktopSwiperRef.current?.slideNext()}
              className="pointer-events-auto flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
            >
              <SliderNextIcon className="w-10 h-10" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col justify-between w-full lg:w-[536px] lg:h-[600px] min-h-0 lg:min-h-[600px] py-0 lg:py-0">

          {/* Heading */}
          <div className="hidden lg:flex flex-col items-start w-full">
            <p className="font-montserrat font-normal not-italic text-[16px] leading-[24px] tracking-normal text-secondary uppercase">
              {tagline}
            </p>

            <h2 className="mt-[24px] font-ivy text-[56px] font-normal leading-[64px] tracking-[0.07em] text-[#221811]">
              <span className="italic font-normal normal-case">Royal</span>
              <span className="not-italic font-normal uppercase"> CHARM</span>
            </h2>

            <p className="font-golden font-normal not-italic text-[40px] leading-[48px] tracking-[0.07em] text-[#221811] ml-[240px] mt-[2px]">
              {subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="mt-0 lg:mt-[24px] font-montserrat font-normal not-italic text-[14px] sm:text-[15px] lg:text-[16px] leading-[22px] sm:leading-[24px] tracking-normal text-secondary max-w-[536px]">
            {description}
          </p>

          {/* Points */}
          <ul className="mt-4 sm:mt-[24px] space-y-2">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 font-montserrat font-normal not-italic text-[13.5px] sm:text-[15px] lg:text-[16px] leading-[20px] sm:leading-[24px] tracking-normal text-secondary"
              >
                <CheckIcon className="mt-[4px] sm:mt-[8px] shrink-0 text-[#221811] w-4 h-4 sm:w-auto sm:h-auto" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="mt-6 sm:mt-auto pt-2 sm:pt-[24px] flex flex-row items-center gap-2 sm:gap-[12px] w-full max-w-[332px]">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                onClick={(e) => {
                  if (button.link === "#form") {
                    e.preventDefault();
                    setIsOpenPopUpForm(true);
                  }
                }}
                className={`flex items-center justify-center gap-1.5 sm:gap-[8px] flex-1 sm:flex-none sm:w-[160px] h-[41px] px-2 sm:px-[16px] py-[12px] font-montserrat font-normal not-italic text-[12px] sm:text-[14px] leading-none tracking-[0.02em] sm:tracking-[0.03em] uppercase transition-all duration-200 ${index === 0
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
