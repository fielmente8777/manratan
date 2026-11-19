"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import styles from "./NightGallery.module.css";

// Photo order follows the supplied Figma reference, left to right.
// The ZIP repeats photo 3; its mirrored display matches reference photo 4.
const photos = [
  { src: "/media/night/new-gallery.webp", alt: "Manratan Resort illuminated at night" },
  { src: "/media/night/new-gallery-1.webp", alt: "Manratan Resort illuminated facade and gardens at night" },
  { src: "/media/night/new-gallery-2.webp", alt: "Manratan Resort illuminated entrance at night" },
  { src: "/media/night/new-gallery-3.webp", alt: "Manratan Resort aerial view at night" },
  { src: "/media/night/new-gallery-4.webp", alt: "Manratan Resort grounds and driveway at night" },
];

export default function NightGallery() {
  const zoomPhoto = (swiper: SwiperInstance) => {
    const frame = swiper.slides[swiper.activeIndex]?.querySelector<HTMLElement>("[data-night-photo]");
    if (!frame) return;
    frame.getAnimations().forEach((animation) => animation.cancel());
    // The outgoing photo keeps its zoom while its slide fades away.
    frame.animate([{ transform: "scale(1)" }, { transform: "scale(1.14)" }], {
      duration: 7600,
      easing: "linear",
      fill: "forwards",
    });
  };
  return (
    <Swiper
      modules={[A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination]}
      slidesPerView={1}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      // Rewind keeps fade slides in place and accepts controls during a transition.
      rewind
      speed={1200}
      onSwiper={zoomPhoto}
      onRealIndexChange={zoomPhoto}
      lazyPreloadPrevNext={1}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        waitForTransition: true,
      }}
      navigation
      pagination={{ clickable: true, bulletElement: "button" }}
      keyboard={{ enabled: true, onlyInViewport: true }}
      a11y={{
        containerMessage: "Manratan by night photo gallery",
        prevSlideMessage: "Previous night photo",
        nextSlideMessage: "Next night photo",
        paginationBulletMessage: "Go to night photo {{index}}",
      }}
      className={`${styles.gallery} aspect-[4/3] w-full bg-ink md:aspect-video`}
    >
      {photos.map((photo, index) => (
        <SwiperSlide key={index}>
          <div className={styles.photo} data-night-photo>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              quality={85}
              sizes="100vw"
              loading={index === 0 ? "eager" : "lazy"}
              data-no-hover
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
