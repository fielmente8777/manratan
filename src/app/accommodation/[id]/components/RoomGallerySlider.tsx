"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import SwiperCarousel from "@/components/sliders/SwiperCarousel";

interface RoomGalleryImage {
  src: string;
  alt: string;
}

interface RoomGallerySliderProps {
  specs: string;
  images: RoomGalleryImage[];
}

const RoomGallerySlider = ({ specs, images }: RoomGallerySliderProps) => {
  if (!images || images.length === 0) return null;

  const sliderImages = images.length > 3 ? images : [...images, ...images];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full max_screen_width mx-auto bg-[#f6f4f0] pb-12 pt-2 md:pb-16 md:pt-4 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        {/* Room Specifications Title Header */}
        {specs && (
          <h2 className="text-[#1c1613] text-lg sm:text-xl md:text-2xl lg:text-3xl font-[serif] tracking-[0.18em] font-normal uppercase text-center mb-8 md:mb-12 px-4">
            {specs}
          </h2>
        )}

        <div className="relative w-full lg:aspect-[4/1.59]">
          <SwiperCarousel
            data={sliderImages}
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".room-slider-next",
              prevEl: ".room-slider-prev",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            spaceBetween={24}
            loop
            centeredSlides={true}
            breakpoints={{
              768: {
                slidesPerView: 1.55,
                spaceBetween: 80,
              },
            }}
            speed={900}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full"
            renderSlide={(item, index) => (
              <div
                className={`w-full relative overflow-hidden group transition-all duration-500 ${
                  index === activeIndex
                    ? "md:aspect-4/2.5 aspect-4/3"
                    : "md:aspect-[4/2.2] aspect-4/3 opacity-80 lg:mt-8"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt || "Room Image"}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            )}
          />

          {/* Navigation Controls: Over the image on both ends (Mobile & Desktop) */}
          <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-full lg:max-w-272 z-10 pointer-events-none">
            <div className="flex items-center justify-between w-full px-3 sm:px-4">
              <button
                className="room-slider-prev pointer-events-auto flex items-center justify-center w-10 h-10 aspect-square bg-black/60 hover:bg-black/80 rounded-full transition shadow-md cursor-pointer text-white"
                aria-label="Previous slide"
              >
                <BtnIcon />
              </button>
              <button
                className="room-slider-next pointer-events-auto flex items-center justify-center w-10 h-10 aspect-square bg-black/60 hover:bg-black/80 rounded-full rotate-180 transition shadow-md cursor-pointer text-white"
                aria-label="Next slide"
              >
                <BtnIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Centered Contact Us Button */}
        <div className="mt-8 sm:mt-12 md:mt-14 flex justify-center w-full px-4">
          <Link
            href="/contactus"
            className="inline-block bg-primary hover:bg-[#1a120c] text-white text-xs sm:text-sm font-medium tracking-[0.18em] uppercase px-8 py-3.5 sm:px-12 sm:py-4 transition-all duration-300 shadow-md hover:shadow-lg text-center select-none"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoomGallerySlider;

export const BtnIcon = () => (
  <svg
    width={8}
    height={16}
    viewBox="0 0 8 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.97462 16L8 14.8239L2.05075 8L8 1.17612L6.97462 0L0 8L6.97462 16Z"
      fill="white"
    />
  </svg>
);
