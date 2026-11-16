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
    image: "fort",
    alt: "Aerial view of Narsinghgarh Fort on a forested hill",
  },
  {
    title: "Jal Mandir",
    note: "Temple in Paras Ram Sagar",
    image: "jal-mandir",
    alt: "Aerial view of Paras Ram Sagar lake and the town of Narsinghgarh",
  },
  {
    title: "Solah Khamba",
    note: "16th-century memorial",
    image: "solah-khamba",
    alt: "The carved red-stone pillars of Solah Khamba",
  },
  {
    title: "Chidikho",
    note: "Wildlife sanctuary & lake",
    image: "chidikho",
    alt: "Entrance gate of the Narsinghgarh (Chidikho) Wildlife Sanctuary",
  },
  {
    title: "Shyamji Sanka Temple",
    note: "Painted temple walls",
    image: "shyamji",
    alt: "Shyamji Sanka Temple at dusk",
  },
  {
    title: "Bada Mahadev",
    note: "Shiva temple",
    image: "bada-mahadev",
    alt: "Temples by the water",
  },
  {
    title: "Hanuman Gadi",
    note: "Hanuman temple",
    image: "hanuman",
    alt: "A temple with a carved spire among trees",
  },
  {
    title: "Baijnath Mahadeo",
    note: "Hilltop temple",
    image: "baijnath",
    alt: "Carved stone temple pavilion",
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
        src={`/media/narsinghgarh-${place.image}.jpg`}
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
          <PlaceTile key={place.image} place={place} index={index} onOpen={() => openGallery(index)} />
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
            <SwiperSlide key={place.image}>
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
      {open !== null && <PhotoLightbox initialIndex={open} onClose={closeGallery} photos={places.map(place => ({ src: `/media/narsinghgarh-${place.image}.jpg`, alt: place.alt, title: place.title }))} />}
    </SectionWithContainer>
  );
}
