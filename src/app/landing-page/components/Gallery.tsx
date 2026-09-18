"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { WhatsAppIcon, CalendarIcon, SliderPrevIcon, SliderNextIcon } from "@/utils/icons";
import { useWebContext } from "@/context-api/WebContext";

interface GallerySectionProps {
  tagline: string;
  title: string;
  italicTitle: string;
  images: string[];
  floralImage?: string;
  buttons: {
    label: string;
    link: string;
  }[];
}

const GallerySection: React.FC<GallerySectionProps> = ({
  tagline,
  title,
  italicTitle,
  images,
  floralImage,
  buttons,
}) => {
  const { setIsOpenPopUpForm } = useWebContext();
  const desktopSwiperRef = useRef<SwiperType | null>(null);
  const mobileSwiperRef = useRef<SwiperType | null>(null);

  // Duplicate images for desktop
  const displayImages = images.length < 6 ? [...images, ...images, ...images] : images;

  return (
    <section className="relative w-full overflow-visible bg-tertiary py-12 md:py-16 lg:py-20">
      {/* Background Image */}
      <div
        className="pointer-events-none absolute right-0 top-[-33px] md:top-[-57px] lg:top-[-73px] z-0 w-[200px] h-[177px] sm:w-[300px] sm:h-[265px] lg:w-[401px] lg:h-[353.99px] flex items-center justify-end"
        style={{ opacity: 1 }}
      >
        <img
          src="/landing/bg-image2.png"
          alt="Gallery Background Ornament"
          width={401}
          height={354}
          className="h-full w-auto object-contain object-right pointer-events-none select-none"
        />
      </div>

      <div className="relative z-10 w-full">
        {/* Heading */}
        <div className="flex flex-col items-center text-center px-4 max-w-[1440px] mx-auto">
          <p className="font-dmsans font-normal not-italic text-[13px] sm:text-[16px] leading-[15px] tracking-[2px] sm:tracking-[2.3px] text-secondary uppercase align-middle">
            {tagline}
          </p>

          <h2 className="mt-3 sm:mt-[24px] font-ivy font-normal text-[28px] sm:text-[44px] lg:text-[56px] leading-[1.15] lg:leading-[64px] tracking-[0.05em] sm:tracking-[0.07em] text-primary text-center align-middle">
            <span className="not-italic uppercase block">{title}</span>
            <span className="block">
              <span className="italic normal-case">Manratan</span>
              <span className="not-italic uppercase"> RESORT</span>
            </span>
          </h2>
        </div>

        {/* Mobile Gallery */}
        <div className="block lg:hidden relative mt-6 w-full px-4 sm:px-6 select-none">
          <div className="relative w-full h-[260px] sm:h-[380px] overflow-hidden">
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
              loop={images.length > 1}
              slidesPerView={1}
              spaceBetween={0}
              className="h-full w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full">
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
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
                aria-label="Previous gallery image"
                onClick={() => mobileSwiperRef.current?.slidePrev()}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-[#221811] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
              >
                <SliderPrevIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                aria-label="Next gallery image"
                onClick={() => mobileSwiperRef.current?.slideNext()}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-[#221811] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
              >
                <SliderNextIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Gallery */}
        <div className="hidden lg:block relative mt-12 w-full select-none overflow-hidden py-2">
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
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={72}
            loop={true}
            speed={600}
            className="gallery-swiper h-[600px]"
          >
            {displayImages.map((image, index) => (
              <SwiperSlide
                key={index}
                className="!w-auto flex items-center justify-center shrink-0 h-full"
              >
                <div className="gallery-card-wrapper">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    sizes="872px"
                    priority={index === 0 || index === 1}
                    className="object-cover rounded-none pointer-events-none"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
            {/* Previous Button */}
            <button
              type="button"
              aria-label="Previous gallery image"
              onClick={() => desktopSwiperRef.current?.slidePrev()}
              className="pointer-events-auto absolute left-[calc(50%-472px)] -translate-x-1/2 -translate-y-1/2 top-1/2 flex items-center justify-center text-[#221811] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer drop-shadow-md"
            >
              <SliderPrevIcon className="w-10 h-10" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              aria-label="Next gallery image"
              onClick={() => desktopSwiperRef.current?.slideNext()}
              className="pointer-events-auto absolute left-[calc(50%+472px)] -translate-x-1/2 -translate-y-1/2 top-1/2 flex items-center justify-center text-[#221811] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer drop-shadow-md"
            >
              <SliderNextIcon className="w-10 h-10" />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 lg:mt-12 flex flex-row items-center justify-center gap-2 sm:gap-[12px] w-full max-w-[332px] mx-auto">
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
    </section>
  );
};

export default GallerySection;
