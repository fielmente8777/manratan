"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import Link from "next/link";
import { WhatsAppIcon, CalendarIcon, SliderPrevIcon, SliderNextIcon } from "@/utils/icons";
import { SectionWithContainer } from "@/components/sectionComponants";
import { useWebContext } from "@/context-api/WebContext";

interface RoomCard {
  images: string[];
  title: string;
  description: string;
  amenities: {
    label: string;
  }[];
  buttons: {
    label: string;
    link: string;
  }[];
}

interface RoomsSectionProps {
  tagline: string;
  title: {
    main: string;
    italic: string;
  };
  description: string;
  cards: RoomCard[];
}

const RoomsSection: React.FC<RoomsSectionProps> = ({
  tagline,
  title,
  description,
  cards,
}) => {
  return (
    <SectionWithContainer
      sectionClassName="border-y border-[#DFD6C9] bg-tertiary"
    >
      <div className="flex flex-col">

        {/* Heading */}
        <div className="grid grid-cols-1 items-center justify-between gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-12">

          {/* Left Content */}
          <div>
            <p className="font-dmsans font-normal not-italic text-[13px] sm:text-[16px] leading-[15px] tracking-[2px] sm:tracking-[2.3px] text-secondary uppercase align-middle">
              {tagline}
            </p>

            <h2 className="mt-3 sm:mt-[24px] font-ivy font-normal text-[28px] sm:text-[44px] lg:text-[56px] leading-[1.15] lg:leading-[64px] tracking-[0.05em] sm:tracking-[0.07em] text-primary align-middle">
              <span className="not-italic uppercase block">{title.main}</span>
              <span className="block">
                <span className="italic normal-case">Timeless</span>
                <span className="not-italic uppercase"> ELEGANCE</span>
              </span>
            </h2>
          </div>

          {/* Right Content */}
          <p className="max-w-[448px] justify-self-end font-montserrat font-medium not-italic text-[14px] sm:text-[18px] leading-[22px] sm:leading-[30px] tracking-normal text-secondary align-middle">
            {description}
          </p>
        </div>

        {/* Room Cards */}
        <div className="mt-8 sm:mt-14 lg:mt-[56px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[24px] justify-items-center">
          {cards.map((card, index) => (
            <RoomsCard key={index} {...card} />
          ))}
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default RoomsSection;


/* Room Card */

export const RoomsCard: React.FC<RoomCard> = ({
  title,
  description,
  amenities,
  buttons,
  images,
}) => {
  const { setIsOpenPopUpForm } = useWebContext();
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="flex flex-col w-full max-w-[424px] overflow-hidden">

      {/* Image Slider */}
      <div className="relative w-full lg:w-[424px] h-[240px] sm:h-[320px] lg:h-[382px] overflow-hidden shrink-0">

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
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
        {images.length > 1 && (
          <button
            type="button"
            aria-label={`Previous ${title} image`}
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
          >
            <SliderPrevIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            aria-label={`Next ${title} image`}
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
          >
            <SliderNextIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col justify-between flex-1 p-4 sm:p-[20px] bg-[#F3EEE7] border-x border-b border-[#BCA049] border-t-0 gap-3 sm:gap-[16px]">
        <div>
          {/* Title */}
          <h3 className="font-ivy font-normal not-italic text-[22px] sm:text-[28px] leading-tight tracking-[0.05em] sm:tracking-[0.07em] text-[#221811] align-middle">
            {title}
          </h3>

          {/* Amenities */}
          <ul className="mt-2.5 sm:mt-3 flex flex-wrap gap-[6px] sm:gap-[8px]">
            {amenities.map((amenity, index) => (
              <li
                key={index}
                className="flex items-center justify-center h-[26px] sm:h-[29px] px-2.5 sm:px-[12px] py-[4px] rounded-[24px] bg-[#FFFFFF] border-[0.5px] border-[#BCA049] font-montserrat text-[11px] sm:text-[13px] leading-none text-[#221811]"
              >
                {amenity.label}
              </li>
            ))}
          </ul>

          {/* Description */}
          <p className="mt-2.5 sm:mt-3 font-montserrat font-medium not-italic text-[14px] sm:text-[18px] leading-[22px] sm:leading-[30px] tracking-normal text-secondary align-middle">
            {description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-row items-center gap-2 sm:gap-[12px] w-full pt-2 border-t border-[#DFD6C9]/60">
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
              className={`flex items-center justify-center gap-1.5 sm:gap-[8px] flex-1 h-[41px] px-2 sm:px-[16px] py-[12px] font-montserrat font-normal not-italic text-[12px] sm:text-[14px] leading-none tracking-[0.02em] sm:tracking-[0.03em] uppercase transition-all duration-200 ${index === 0
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
  );
};