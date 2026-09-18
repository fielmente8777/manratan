"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import Link from "next/link";
import { WhatsAppIcon, SliderPrevIcon, SliderNextIcon } from "@/utils/icons";

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
    <section className="relative w-full bg-tertiary py-10 md:py-16 lg:py-20 overflow-hidden">
      <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-0">

        {/* Background */}
        <div
          className="relative w-full max-w-[1320px] lg:h-[673px] min-h-0 lg:min-h-[673px] overflow-hidden p-4 sm:p-8 lg:pt-[64px] lg:pb-[64px] lg:px-[31px] flex flex-col justify-center bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/landing/Wedding-bg.png')",
            backgroundSize: "cover",
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 -z-10 w-full h-full">
            <Image
              src="/landing/Wedding-bg.png"
              alt="Wedding celebration background"
              fill
              priority
              className="object-cover sm:object-fill w-full h-full pointer-events-none"
            />
          </div>

          {/* Content Container */}
          <div className="relative w-full max-w-[1258px] lg:h-[545px] mx-auto flex flex-col justify-between gap-6 sm:gap-[30px] lg:gap-[40px]">

            {/* Heading */}
            <div className="block lg:hidden flex flex-col items-start w-full gap-2.5 sm:gap-3 text-white">
              <p className="font-dmsans font-normal not-italic text-[13px] sm:text-[16px] leading-[15px] tracking-[2px] sm:tracking-[2.3px] text-[#D2BD68] uppercase align-middle">
                {tagline}
              </p>

              <h2 className="font-ivy font-normal text-[28px] sm:text-[44px] leading-[1.15] tracking-[0.05em] text-white align-middle">
                <span className="italic normal-case">Celebrate</span>{" "}
                <span className="not-italic uppercase">YOUR</span>
                <br />
                <span className="not-italic uppercase">FOREVER AMIDST</span>
                <br />
                <span className="italic normal-case">Royal</span>{" "}
                <span className="not-italic uppercase">GRANDEUR</span>
              </h2>
            </div>

            {/* Row */}
            <div className="flex flex-col lg:flex-row items-center w-full max-w-[1258px] lg:h-[464px] gap-6 sm:gap-[24px]">

              {/* Image Slider */}
              <div className="relative w-full lg:w-[624px] h-[240px] sm:h-[380px] lg:h-[464px] shrink-0 overflow-hidden">
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
                          alt={`Wedding celebration ${index + 1}`}
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
                    aria-label="Previous wedding image"
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
                    aria-label="Next wedding image"
                    onClick={() => swiperRef.current?.slideNext()}
                    className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
                  >
                    <SliderNextIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center w-full lg:w-[610px] lg:h-[464px] gap-3.5 sm:gap-[23px] text-white">
                {/* Heading */}
                <div className="hidden lg:flex flex-col gap-[23px]">
                  <p className="font-dmsans font-normal not-italic text-[16px] leading-[15px] tracking-[2.3px] text-[#D2BD68] uppercase align-middle">
                    {tagline}
                  </p>

                  <h2 className="font-ivy font-normal text-[56px] leading-[64px] tracking-[0.07em] text-white align-middle">
                    <span className="italic normal-case">Celebrate</span>{" "}
                    <span className="not-italic uppercase">YOUR</span>
                    <br />
                    <span className="not-italic uppercase">FOREVER AMIDST</span>
                    <br />
                    <span className="italic normal-case">Royal</span>{" "}
                    <span className="not-italic uppercase">GRANDEUR</span>
                  </h2>
                </div>

                {/* Description */}
                <p className="font-montserrat font-medium not-italic text-[14px] sm:text-[18px] leading-[22px] sm:leading-[30px] tracking-normal text-white/90 w-full align-middle">
                  {description}
                </p>
              </div>

            </div>

            {/* Button */}
            <div className="flex justify-center w-full mt-2 lg:mt-0">
              <Link
                href={button.link}
                className="flex items-center justify-center gap-[8px] h-[41px] px-[20px] py-[12px] font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] uppercase bg-white text-[#221811] hover:opacity-90 active:scale-[0.98] transition-all duration-200"
              >
                <WhatsAppIcon className="shrink-0 w-[14px] h-[14px]" />
                <span className="whitespace-nowrap">{button.label}</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WeddingSection;