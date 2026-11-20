"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import PhotoLightbox from "@/components/site/PhotoLightbox";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { SectionWithContainer } from "@/components/sectionComponants";
import { Title } from "@/components/site/ui";
import styles from "./PlacesToDiscover.module.css";
import "swiper/css";

const places = [
  {
    title: "Narsinghgarh Fort",
    note: "Hilltop fort-palace",
    src: "/new-narsinghgarh.webp",
    alt: "Aerial view of Narsinghgarh Fort on a forested hill",
  },
  {
    title: "Jal Mandir",
    note: "Temple in Paras Ram Sagar",
    src: "/final-view/narsinghgarh3.webp",
    alt: "Jal Mandir in Paras Ram Sagar lake, with Narsinghgarh town and fort behind it",
  },
  {
    title: "Solah Khamba",
    note: "16th-century memorial",
    src: "/final-view/narsinghgarh2.webp",
    alt: "The carved red-stone pillars of Solah Khamba",
  },
  {
    title: "Chidikho",
    note: "Wildlife sanctuary & lake",
    src: "/media/narsinghgarh-chidikho-deer-v3.jpg",
    alt: "A deer with velvet-covered antlers against a warm golden background",
  },
  {
    title: "Shyamji Sanka Temple",
    note: "Painted temple walls",
    src: "/media/narsinghgarh-shyamji.jpg",
    alt: "Shyamji Sanka Temple at dusk",
  },
  {
    title: "Bada Mahadev",
    note: "Shiva temple",
    src: "/media/narsinghgarh-bada-mahadev.jpg",
    alt: "Temples by the water",
  },
  {
    title: "Hanuman Gadi",
    note: "Hanuman temple",
    src: "/final-view/narsinghgarh4.webp",
    alt: "Aerial view of Hanuman Gadi temple surrounded by green hills and its approach road",
  },
];

function PlaceTile({
  place,
  index,
  mobile = false,
  onOpen,
}: {
  place: (typeof places)[number];
  index: number;
  mobile?: boolean;
  onOpen: () => void;
}) {
  return (
    <figure
      className={`${styles.tile} ${mobile ? styles.mobileTile : styles[`tile${index + 1}`]}`}
    >
      <Image
        src={place.src}
        alt={place.alt}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <span className={styles.number} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <figcaption>
        <h3>{place.title}</h3>
        <p>{place.note}</p>
      </figcaption>
      <button type="button" onClick={onOpen} aria-label={`Enlarge ${place.title}`} aria-haspopup="dialog" className="absolute inset-0 z-[4] cursor-zoom-in focus-visible:outline-2 focus-visible:outline-white focus-visible:-outline-offset-4" />
    </figure>
  );
}

export default function PlacesToDiscover() {
  const slider = useRef<SwiperType | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const closeGallery = useCallback(() => { setOpen(null); slider.current?.autoplay?.start(); }, []);
  const openGallery = (index: number) => { slider.current?.autoplay?.stop(); setOpen(index); };

  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionId="nearby-places"
      sectionClassName="scroll-mt-24 bg-[#F2EADD] pb-16 pt-12 sm:pb-20 md:pb-32 md:pt-24"
      sectionProps={{ "aria-labelledby": "places-title" }}
    >
      <div className="mb-12 border-t border-ink/25 md:mb-20" aria-hidden="true" />
      <div id="places-title" className={styles.heading}>
        <Title
          main="Places to discover"
          script="Narsinghgarh & around"
          align="center"
          className="flex flex-col gap-3 [&>.t-script]:mt-0 [&>.t-script>span]:translate-x-0"
        />
      </div>
      <div className={styles.bento}>
        {places.map((place, index) => (
          <PlaceTile key={place.title} place={place} index={index} onOpen={() => openGallery(index)} />
        ))}
      </div>
      <div className={styles.mobileGallery}>
        <Swiper
          modules={[Autoplay, A11y]}
          onSwiper={(instance) => {
            slider.current = instance;
          }}
          slidesPerView={1}
          spaceBetween={16}
          speed={850}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          a11y={{ containerMessage: "Places around Narsinghgarh" }}
        >
          {places.map((place, index) => (
            <SwiperSlide key={place.title}>
              <PlaceTile place={place} index={index} mobile onOpen={() => openGallery(index)} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={`${styles.arrow} ${styles.previous}`}
          type="button"
          aria-label="Previous place"
          onClick={() => slider.current?.slidePrev()}
        >
          &larr;
        </button>
        <button
          className={`${styles.arrow} ${styles.next}`}
          type="button"
          aria-label="Next place"
          onClick={() => slider.current?.slideNext()}
        >
          &rarr;
        </button>
      </div>
      {open !== null && <PhotoLightbox initialIndex={open} onClose={closeGallery} photos={places.map(place => ({ src: place.src, alt: place.alt, title: place.title }))} />}
    </SectionWithContainer>
  );
}
