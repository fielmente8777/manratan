"use client";
import SwiperCarousel from "./SwiperCarousel";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { useState } from "react";

const ImageSlider2: React.FC<
  {
    images: string[];
  } & { title?: string }
> = ({ images, title }) => {
  images = images.length < 5 ? [...images, ...images] : images;

  const [activeIndex, setActiveIndex] = useState(0);

  const buttonNextClassName =
    ( title?.split(" ")[1].replace(/[^\\n\\w\\s-]/g, "")) + "next" ||
    "button-next";
  const buttonPrevClassName =
    ( title?.split(" ")[1].replace(/[^\\n\\w\\s-]/g, "")) + "prev" ||
    "button-prev";
  return (
    <div className="w-full aspect-[4/1.37] relative max-md:px-4">
      <SwiperCarousel
        data={images}
        slidesPerView={1}
        spaceBetween={24}
        modules={[Autoplay, Navigation]}
        centeredSlides
        loop
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        speed={1000}
        navigation={{
          nextEl: "." + buttonNextClassName,
          prevEl: "." + buttonPrevClassName,
        }}
        breakpoints={{
          768: {
            slidesPerView: 1.8,
          },
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        renderSlide={(image, index) => (
          <div
            className={`w-full relative lg:rounded-3xl rounded-2xl transition-all duration-300 ease-in-out overflow-hidden ${index === activeIndex ? "md:aspect-4/2.5 aspect-square" : "md:aspect-[4/2.15] aspect-square md:mt-8"}`}
          >
            <Image
              src={image}
              alt={"hero-image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full object-cover"
            />
          </div>
        )}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 max-w-228 w-full flex items-center justify-between">
        <button
          className={`w-12 box-shadow aspect-square rounded-full bg-background flex items-center justify-center rotate-180 ${buttonPrevClassName}`}
        >
          <ButtonNext />
        </button>
        <button
          className={`w-12 box-shadow aspect-square rounded-full bg-background flex items-center justify-center ${buttonNextClassName}`}
        >
          <ButtonNext />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider2;

export const ButtonNext = () => (
  <svg
    width={8}
    height={16}
    viewBox="0 0 8 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.02538 16L0 14.8239L5.94925 8L0 1.17612L1.02538 0L8 8L1.02538 16Z"
      fill="#29422C"
    />
  </svg>
);
