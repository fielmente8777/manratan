"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const photos = [
  { src: "/media/night/new-gallery.webp", alt: "Manratan Resort illuminated at night" },
  { src: "/media/night/new-gallery-1.webp", alt: "Manratan Resort illuminated facade and gardens at night" },
  { src: "/media/night/new-gallery-2.webp", alt: "Manratan Resort illuminated entrance at night" },
  { src: "/media/night/new-gallery-3.webp", alt: "Manratan Resort aerial view at night" },
  { src: "/media/night/new-gallery-4.webp", alt: "Manratan Resort grounds and driveway at night" },
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
            src={photo.src}
            alt={photo.alt}
            fill
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
