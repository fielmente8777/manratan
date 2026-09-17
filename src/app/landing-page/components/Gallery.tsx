"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { WhatsAppIcon, CalendarIcon, SliderPrevIcon, SliderNextIcon } from "@/utils/icons";

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
  const swiperRef = useRef<SwiperType | null>(null);

  // Duplicate images 
  const displayImages = images.length < 6 ? [...images, ...images, ...images] : images;

  return (
    <section className="relative w-full overflow-hidden bg-tertiary py-12 md:py-16 lg:py-20">
      {/* Floral Decoration */}
      {floralImage && (
        <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[280px] w-[220px] md:block lg:h-[340px] lg:w-[280px]">
          <Image
            src={floralImage}
            alt=""
            fill
            className="object-contain object-right-top opacity-40"
          />
        </div>
      )}

      <div className="relative z-10 w-full">
        {/* Heading */}
        <div className="flex flex-col items-center text-center px-4 max-w-[1440px] mx-auto">
          <p className="font-dmsans font-normal not-italic text-[16px] leading-[15px] tracking-[2.3px] text-secondary uppercase align-middle">
            {tagline}
          </p>

          <h2 className="mt-[24px] font-ivy font-normal text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.14] lg:leading-[64px] tracking-[0.07em] text-primary text-center align-middle">
            <span className="not-italic uppercase block">{title}</span>
            <span className="block">
              <span className="italic normal-case">Manratan</span>
              <span className="not-italic uppercase"> RESORT</span>
            </span>
          </h2>
        </div>

        {/* ================= FULL-BLEED GALLERY SLIDER ================= */}
        <div className="relative mt-10 lg:mt-12 w-full select-none overflow-hidden py-2">
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
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={24}
            breakpoints={{
              640: {
                spaceBetween: 36,
              },
              1024: {
                spaceBetween: 72,
              },
            }}
            loop={true}
            speed={600}
            className="gallery-swiper h-[340px] sm:h-[450px] lg:h-[600px]"
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
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 600px, 872px"
                    priority={index === 0 || index === 1}
                    className="object-cover rounded-none pointer-events-none"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls placed in the spacing between center and side images  */}
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
            {/* Left Prev Button */}
            <button
              type="button"
              aria-label="Previous gallery image"
              onClick={() => swiperRef.current?.slidePrev()}
              className="pointer-events-auto absolute left-[24px] sm:left-[36px] lg:left-[calc(50%-472px)] -translate-x-1/2 -translate-y-1/2 top-1/2 flex items-center justify-center text-[#221811] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer drop-shadow-md"
            >
              <SliderPrevIcon className="w-10 h-10" />
            </button>

            {/* Right Next Button */}
            <button
              type="button"
              aria-label="Next gallery image"
              onClick={() => swiperRef.current?.slideNext()}
              className="pointer-events-auto absolute right-[-16px] sm:right-[-4px] lg:right-auto lg:left-[calc(50%+472px)] -translate-x-1/2 -translate-y-1/2 top-1/2 flex items-center justify-center text-[#221811] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer drop-shadow-md"
            >
              <SliderNextIcon className="w-10 h-10" />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 lg:mt-12 flex flex-row items-center justify-center gap-[12px] w-full max-w-[332px] mx-auto">
          {buttons.map((button, index) => (
            <Link
              key={index}
              href={button.link}
              className={`flex items-center justify-center gap-[8px] w-[160px] shrink-0 h-[41px] px-[16px] py-[12px] font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] uppercase transition-all duration-200 ${index === 0
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
