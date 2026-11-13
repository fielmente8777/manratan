"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { SectionWithContainer } from "@/components/sectionComponants";
import { LineLink, PlayIcon, Title } from "@/components/site/ui";
import FilmModal from "@/components/site/FilmModal";
import styles from "./Narsinghgarh.module.css";
import "swiper/css";

const places = [
  { title: "Narsinghgarh Fort", note: "Hilltop fort-palace", image: "fort", alt: "Aerial view of Narsinghgarh Fort on a forested hill" },
  { title: "Jal Mandir", note: "Temple in Paras Ram Sagar", image: "jal-mandir", alt: "Aerial view of Paras Ram Sagar lake and the town of Narsinghgarh" },
  { title: "Solah Khamba", note: "16th-century memorial", image: "solah-khamba", alt: "The carved red-stone pillars of Solah Khamba" },
  { title: "Chidikho", note: "Wildlife sanctuary & lake", image: "chidikho", alt: "Entrance gate of the Narsinghgarh (Chidikho) Wildlife Sanctuary" },
  { title: "Shyamji Sanka Temple", note: "Painted temple walls", image: "shyamji", alt: "Shyamji Sanka Temple at dusk" },
  { title: "Bada Mahadev", note: "Shiva temple", image: "bada-mahadev", alt: "Temples by the water" },
  { title: "Hanuman Gadi", note: "Hanuman temple", image: "hanuman", alt: "A temple with a carved spire among trees" },
  { title: "Baijnath Mahadeo", note: "Hilltop temple", image: "baijnath", alt: "Carved stone temple pavilion" },
];

function PlaceTile({ place, index, mobile = false }: { place: (typeof places)[number]; index: number; mobile?: boolean }) {
  return (
    <figure className={`${styles.tile} ${mobile ? styles.mobileTile : styles[`tile${index + 1}`]}`}>
      <Image src={`/media/narsinghgarh-${place.image}.jpg`} alt={place.alt} fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" />
      <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <figcaption><h3>{place.title}</h3><p>{place.note}</p></figcaption>
    </figure>
  );
}

export default function Narsinghgarh() {
  const slider = useRef<SwiperType | null>(null);
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <SectionWithContainer defaultPadding={false} sectionId="nearby" sectionClassName="bg-[#F2EADD] py-24 md:py-32" sectionProps={{ "aria-labelledby": "nearby-title" }}>
      <div className={styles.heading}>
        <p className="t-label text-brass">Escape to the Kashmir of Malwa</p>
        <div id="nearby-title"><Title main="Narsinghgarh" script="The Mini Kashmir of Malwa" align="center" /></div>
        <p className="t-body">Once the seat of a princely state, Narsinghgarh is a hill town of forts, lakes and temples &ndash; loveliest at first light or at sunset.</p>
      </div>

      <figure className={styles.film}>
        <div className={styles.frame}>
          <Image src="/media/narsinghgarh-film.jpg" alt="Narsinghgarh Fort on its green hill above the old town" fill unoptimized sizes="(max-width: 1200px) 100vw, 1120px" />
          <div className={styles.scrim} aria-hidden="true" />
          <button className={styles.play} type="button" aria-label="Play the Narsinghgarh film" aria-haspopup="dialog" onClick={() => setFilmOpen(true)}><PlayIcon className="h-6 w-6 translate-x-0.5" /></button>
          <figcaption className={styles.tag}><span className="t-label">The film</span><b>Narsinghgarh</b></figcaption>
        </div>
        <div className={styles.bar}>
          <ul className={styles.reach}>
            <li><b>70 km</b>Bhopal Airport &middot; 1.5 hrs</li>
            <li><b>30 km</b>Railway station &middot; 30 mins</li>
            <li><b>210 km</b>Indore &middot; 3&ndash;4 hrs</li>
          </ul>
          <LineLink href="/about">Live the legacy <span aria-hidden="true">&rarr;</span></LineLink>
        </div>
      </figure>

      <div id="nearby-places" className={styles.placesHeading}><h3 className="t-label">Places to discover</h3><p>Narsinghgarh &amp; around</p></div>
      <div className={styles.bento}>{places.map((place, index) => <PlaceTile key={place.image} place={place} index={index} />)}</div>
      <div className={styles.mobileGallery}>
        <Swiper modules={[Autoplay, A11y]} onSwiper={(instance) => { slider.current = instance; }} slidesPerView={1} spaceBetween={16} speed={850} loop autoplay={{ delay: 3500, disableOnInteraction: false }} a11y={{ containerMessage: "Places around Narsinghgarh" }}>
          {places.map((place, index) => <SwiperSlide key={place.image}><PlaceTile place={place} index={index} mobile /></SwiperSlide>)}
        </Swiper>
        <button className={`${styles.arrow} ${styles.previous}`} type="button" aria-label="Previous place" onClick={() => slider.current?.slidePrev()}>&larr;</button>
        <button className={`${styles.arrow} ${styles.next}`} type="button" aria-label="Next place" onClick={() => slider.current?.slideNext()}>&rarr;</button>
      </div>
      {filmOpen && <FilmModal title="Narsinghgarh — The Mini Kashmir of Malwa" startAt={50.4} endAt={58.8} chapters={false} onClose={() => setFilmOpen(false)} />}
    </SectionWithContainer>
  );
}
