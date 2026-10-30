"use client";
import { Navigation } from "swiper/modules";
import SwiperCarousel from "./SwiperCarousel";
import Image from "next/image";

const BannerSlider = ({
  images,
  wrapperClassName,
}: {
  images: string[];
  wrapperClassName?: string;
}) => {
  return (
    <div>
      <SwiperCarousel
        data={images}
        slidesPerView={1}
        spaceBetween={0}
        modules={[Navigation]}
        navigation={{
          nextEl: ".banner-next",
          prevEl: ".banner-prev",
        }}
        className="w-full"
        renderSlide={(src) => (
          <div
            className={`w-full relative overflow-hidden group ${wrapperClassName ? wrapperClassName : "md:aspect-4/2.5 aspect-4/4.5"} aspect-4/4.5`}
          >
            <Image src={src} alt="Image" fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
          </div>
        )}
      />
    </div>
  );
};

export default BannerSlider;
