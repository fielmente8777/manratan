"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionWithContainer } from "@/components/sectionComponants";
import { LineLink, Title } from "@/components/site/ui";
import FilmModal from "@/components/site/FilmModal";
import styles from "./Narsinghgarh.module.css";
import { walkthrough } from "@/data/site";

const chapterIndex = walkthrough.chapters.findIndex((chapter) => chapter.title === "Narsinghgarh");
const chapterStart = walkthrough.chapters[chapterIndex]?.start ?? 0;
const chapterEnd = walkthrough.chapters[chapterIndex + 1]?.start ?? walkthrough.duration;

export default function Narsinghgarh() {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionId="nearby"
      sectionClassName="bg-[#F2EADD] pt-16 sm:pt-20 md:pt-32"
      sectionProps={{ "aria-labelledby": "nearby-title" }}
    >
      <div className={styles.heading}>
        <p className="t-label text-brass">DISCOVER THE HIDDEN CHARM OF MALWA</p>
        <div id="nearby-title">
          <Title
            main="Narsinghgarh"
            script="The Mini Kashmir of Malwa"
            align="center"
          />
        </div>
        <p className="t-body">
          Once the seat of a princely state, Narsinghgarh is a hill town of
          forts, lakes and temples &ndash; loveliest at first light or at
          sunset.
        </p>
      </div>

      <figure className={styles.film}>
        <div
          className={`${styles.frame} cursor-pointer`}
          onClick={() => setFilmOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Play the Narsinghgarh film"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setFilmOpen(true);
            }
          }}
        >
          <video
            src="/final-view/narsinghar (1).mp4"
            poster="/media/narsinghgarh-film.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className={styles.scrim} aria-hidden="true" />
          <figcaption className={styles.tag}>
            <span className="t-label">The film</span>
            <b>Narsinghgarh</b>
          </figcaption>
        </div>
        <div className={styles.bar}>
          <ul className={styles.reach}>
            <li>
              <b>70 km</b>Bhopal Airport &middot; 1.5 hrs
            </li>
            <li>
              <b>30 km</b>Railway station &middot; 30 mins
            </li>
            <li>
              <b>210 km</b>Indore &middot; 3&ndash;4 hrs
            </li>
          </ul>
          <LineLink href="/contact-us">Live the legacy <span aria-hidden="true">&rarr;</span></LineLink>
        </div>
      </figure>

      {filmOpen && (
        <FilmModal
          title="Narsinghgarh — The Mini Kashmir of Malwa"
          src="/final-view/narsinghar (1).mp4"
          chapters={false}
          onClose={() => setFilmOpen(false)}
        />
      )}
    </SectionWithContainer>
  );
}
