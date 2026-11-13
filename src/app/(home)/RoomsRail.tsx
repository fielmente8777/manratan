"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { roomsPremiumFirst } from "@/data/site";
import { LineLink, Title } from "@/components/site/ui";
import { SectionWithContainer } from "@/components/sectionComponants";
import "swiper/css";
import styles from "./RoomsRail.module.css";

export default function RoomsRail() {
  const swiper = useRef<SwiperType | null>(null);

  return (
    <SectionWithContainer defaultPadding={false} sectionClassName="bg-stone-deep py-24 md:py-32" sectionProps={{ "aria-labelledby": "rooms-title" }}>
        <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12">
          <div id="rooms-title">
            <Title main="Elegant" script="Accommodation" />
          </div>
          <div className="lg:justify-self-end">
            <p className="t-body max-w-[52ch] lg:max-w-none lg:whitespace-nowrap">
              <span className="lg:block">Sixty-five rooms and suites in five styles, each with plush bedding,</span>{" "}
              <span className="lg:block">air conditioning, Wi-Fi and tea and coffee in the room.</span>
            </p>
            <div className="mt-4 hidden items-center justify-end md:flex">
              <LineLink href="/accommodation">All rooms</LineLink>
            </div>
          </div>
        </div>
        <div className={styles.rail}>
        <Swiper
          modules={[Autoplay, A11y]}
          onSwiper={(instance) => { swiper.current = instance; }}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop
          speed={900}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          a11y={{ containerMessage: "Rooms and suites", prevSlideMessage: "Previous rooms", nextSlideMessage: "Next rooms" }}
          onFocusCapture={() => swiper.current?.autoplay.pause()}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              swiper.current?.autoplay.resume();
            }
          }}
          className="w-full [--swiper-wrapper-transition-timing-function:var(--ease-lux)]"
        >
          {roomsPremiumFirst.map((r) => (
            <SwiperSlide key={r.id}>
              <Link href={`/accommodation/${r.id}`} className="group block text-center md:text-left">
                <div className="relative aspect-[5/6] overflow-hidden bg-ink/10">
                  <Image src={r.cover.src} alt={r.cover.alt} fill quality={85} sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(50vw - 44px), (max-width: 1320px) calc((100vw - 128px) / 3), 398px" className="img-drift object-cover" style={r.focus ? { objectPosition: r.focus } : undefined} />
                </div>
                <h3 className="t-display mt-5 text-[1.4rem]">{r.name}</h3>
                <p className="mt-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-taupe">{r.specs.join("  •  ")}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

          <ArrowButton label="Previous rooms" onClick={() => swiper.current?.slidePrev()} flip className={styles.previous} />
          <ArrowButton label="Next rooms" onClick={() => swiper.current?.slideNext()} className={styles.next} />
        </div>

        <div className="mt-6 text-center md:hidden"><LineLink href="/accommodation">All rooms</LineLink></div>

        <div className="mt-6 flex flex-col items-center gap-3 border-t border-ink/15 pt-5 md:mt-10 md:flex-row md:gap-8 md:pt-7">
          <p className="t-label shrink-0 text-taupe">Also at Manratan</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-ink">
            <span className="rounded-full border border-ink/20 bg-white/30 px-5 py-2 shadow-[0_2px_8px_rgba(34,24,17,0.08)]">Pooja Room</span>
            <span className="rounded-full border border-ink/20 bg-white/30 px-5 py-2 shadow-[0_2px_8px_rgba(34,24,17,0.08)]">Parlour Room</span>
          </div>
        </div>
    </SectionWithContainer>
  );
}

function ArrowButton({ label, onClick, flip = false, className = "" }: { label: string; onClick: () => void; flip?: boolean; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`${className} flex h-10 w-10 items-center justify-center rounded-full border border-ink/25 bg-stone text-ink shadow-md transition-colors duration-300 hover:bg-ink hover:text-stone md:h-12 md:w-12`}
    >
      <svg viewBox="0 0 24 24" className={`h-4 w-4 ${flip ? "rotate-180" : ""}`} aria-hidden="true">
        <path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </button>
  );
}
