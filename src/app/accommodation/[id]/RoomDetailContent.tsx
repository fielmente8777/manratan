"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import BookingForm from "@/components/BookingForm";

type ReferencePhoto = { src: string; alt: string };
export type RoomDetailData = {
  name: string;
  hero: ReferencePhoto;
  heroScript: string;
  eyebrow: string;
  title: string;
  script: string;
  intro: string;
  specs: { label: string; value: string; icon: string }[];
  photos: ReferencePhoto[];
  amenityTitle: string;
  amenities: { label: string; icon: string }[];
  bookingTitle: string;
  policies: { label: string; value: string }[];
  bookingHelp: string;
  phone: string;
  phoneLabel: string;
  otherEyebrow: string;
  otherTitle: string;
  otherScript: string;
  otherRooms: {
    href: string;
    name: string;
    summary: string;
    image: ReferencePhoto;
  }[];
};

/** Build-time validated SVG paths from the supplied reference files. */
function ReferenceIcon({ markup }: { markup: string }) {
  return (
    <span
      className="reference-icon"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

function Ornament() {
  return (
    <div
      className="orn"
      style={{ justifyContent: "flex-start" }}
      aria-hidden="true"
    >
      <span />
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
        <path d="M7 1l6 8-6 8-6-8z" stroke="currentColor" strokeWidth="1.1" />
      </svg>
      <span />
    </div>
  );
}

function ReferenceGallery({
  photos,
  name,
}: {
  photos: ReferencePhoto[];
  name: string;
}) {
  const slider = useRef<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);
  const go = (index: number) => {
    const next = (index + photos.length) % photos.length;
    slider.current?.slideToLoop(next, 1400);
  };
  return (
    <div
      className="sl"
      aria-roledescription="carousel"
      aria-label={`${name} photos`}
    >
      <Swiper
        className="sl-carousel"
        modules={[A11y, Autoplay]}
        slidesPerView={1}
        loop
        speed={1400}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true, waitForTransition: true }}
        lazyPreloadPrevNext={photos.length - 1}
        onSwiper={(instance) => { slider.current = instance; }}
        onRealIndexChange={(instance) => setActive(instance.realIndex)}
        tabIndex={0}
        aria-label="Photos, swipe or use the arrows"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            go(active + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.src + index}>
            <img src={photo.src} alt={photo.alt} loading="eager" decoding="async" data-no-hover />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="sl-ctrl">
        <div className="sl-segs" aria-label="Choose a photo">
          {photos.map((photo, index) => (
            <button
              key={photo.src + index}
              type="button"
              className={`sl-seg${index === active ? " is-on" : ""}`}
              aria-label={`Photo ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => go(index)}
            />
          ))}
        </div>
        <div className="sl-nav">
          <button
            className="arrow"
            type="button"
            aria-label="Previous photo"
            onClick={() => go(active - 1)}
          >
            <svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M18 5H2M6 1L2 5l4 4"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>
          <p className="sl-num" aria-live="polite">
            {String(active + 1).padStart(2, "0")}{" "}
            <span>/ {String(photos.length).padStart(2, "0")}</span>
          </p>
          <button
            className="arrow"
            type="button"
            aria-label="Next photo"
            onClick={() => go(active + 1)}
          >
            <svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 5h16M12 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function RoomBookingPanel({ room }: { room: RoomDetailData }) {
  return (
    <aside className="bk rv" id="book" aria-labelledby="bk-title">
      <h2 className="bk-t" id="bk-title">
        {room.bookingTitle}
      </h2>
      <div className="room-booking-form">
        <BookingForm variant="room" />
      </div>
      <ul className="bk-pol">
        {room.policies.map((policy) => (
          <li key={policy.label}>
            <span>{policy.label}</span>
            <b>{policy.value}</b>
          </li>
        ))}
      </ul>
      <p className="bk-help">{room.bookingHelp}</p>
      <a className="bk-call" href={room.phone}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />
        </svg>
        {room.phoneLabel}
      </a>
    </aside>
  );
}

export default function RoomDetailContent({ room }: { room: RoomDetailData }) {
  return (
    <main className="accommodation-page room-detail-page" id="top">
      <header className="hero ab-hero rd-hero">
        <img
          className="hero-img"
          src={room.hero.src}
          alt={room.hero.alt}
          style={{ objectPosition: "50% 50%" }}
          fetchPriority="high"
        />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="ab-hero-copy wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/accommodation">Rooms &amp; suites</a>
            <span aria-hidden="true">/</span>
            <span>{room.name}</span>
          </nav>
          <h1 className="hero-title" style={{ textAlign: "center" }}>
            <span className="hero-big">{room.name}</span>
            <span className="script" style={{ paddingLeft: "1.4em" }}>
              {room.heroScript}
            </span>
          </h1>
        </div>
      </header>
      <section className="panel" aria-labelledby="ov-title">
        <div className="wrap rd-grid">
          <div className="rd-main rv">
            <Ornament />
            <p className="eyebrow">{room.eyebrow}</p>
            <h2 className="title" id="ov-title">
              {room.title}
              <span className="script">{room.script}</span>
            </h2>
            <p className="lead">{room.intro}</p>
            <dl className="rm-specs">
              {room.specs.map((spec) => (
                <div key={spec.label}>
                  <ReferenceIcon markup={spec.icon} />
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
            <ReferenceGallery photos={room.photos} name={room.name} />
            <div className="rd-inc">
              <p className="eyebrow">{room.amenityTitle}</p>
              <ul className="rd-list">
                {room.amenities.map((amenity) => (
                  <li key={amenity.label}>
                    <ReferenceIcon markup={amenity.icon} />
                    <span>{amenity.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <RoomBookingPanel room={room} />
        </div>
      </section>
      <section
        className="sec sand"
        id="other-rooms"
        aria-labelledby="oth-title"
      >
        <div className="wrap">
          <div className="gems-head rv">
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <p className="eyebrow">{room.otherEyebrow}</p>
              <h2 className="title" id="oth-title">
                {room.otherTitle}
                <span className="script">{room.otherScript}</span>
              </h2>
            </div>
            <a className="link" href="/accommodation">
              All rooms <span aria-hidden="true">→</span>
            </a>
          </div>
          <ul className="oth">
            {room.otherRooms.map((other) => (
              <li className="rv" key={other.href}>
                <a href={other.href}>
                  <span className="oth-ph">
                    <img
                      src={other.image.src}
                      alt={other.image.alt}
                      loading="lazy"
                    />
                  </span>
                  <h3>{other.name}</h3>
                  <p>{other.summary}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
