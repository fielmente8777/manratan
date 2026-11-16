"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Photo order follows the supplied Figma reference, left to right.
// The ZIP repeats photo 3; its mirrored display matches reference photo 4.
const photos = [
  { file: 4, alt: "Manratan Resort's illuminated facade and gardens from above" },
  { file: 3, alt: "Manratan Resort's illuminated entrance viewed from the front" },
  { file: 1, alt: "Manratan Resort and its forecourt at night from the right" },
  { file: 1, alt: "Mirrored aerial view of Manratan Resort and its forecourt at night", mirrored: true },
  { file: 6, alt: "Wide front view of Manratan Resort and the driveway at night" },
  { file: 5, alt: "Wide aerial view of Manratan Resort's illuminated grounds at night" },
];

export default function NightGallery() {
  return (
    <Swiper
      modules={[A11y, Autoplay, Keyboard, Navigation, Pagination]}
      slidesPerView={1}
      loop
      speed={850}
      autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      navigation
      pagination={{ clickable: true }}
      keyboard={{ enabled: true, onlyInViewport: true }}
      a11y={{
        containerMessage: "Manratan by night photo gallery",
        prevSlideMessage: "Previous night photo",
        nextSlideMessage: "Next night photo",
        paginationBulletMessage: "Go to night photo {{index}}",
      }}
      className="aspect-[4/3] w-full bg-black [--swiper-navigation-color:#fff] [--swiper-navigation-size:24px] [--swiper-pagination-color:#fff] [--swiper-pagination-bullet-inactive-color:#fff] [--swiper-pagination-bullet-inactive-opacity:0.5] [--swiper-pagination-bottom:20px] md:aspect-video"
    >
      {photos.map((photo, index) => (
        <SwiperSlide key={index}>
          <Image
            src={`/media/night/gallery-${photo.file}.jpg`}
            alt={photo.alt}
            fill
            quality={85}
            sizes="100vw"
            className={`object-cover ${photo.mirrored ? "-scale-x-100" : ""}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
