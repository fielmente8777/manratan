"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import type { Photo } from "@/data/site";
import "swiper/css";

type Space = { label: string; focus: string; href: string; line: string; img: Photo };

function SpaceContent({ space, expanded = true }: { space: Space; expanded?: boolean }) {
  return (
    <>
      <Image src={space.img.src} alt={space.img.alt} fill quality={85} sizes="(max-width: 768px) 100vw, 50vw" className="img-drift object-cover" style={{ objectPosition: space.focus }} />
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-6 text-center text-stone md:text-right">
        <span className="t-script block text-[2.4rem] leading-none">{space.label}</span>
        <span className={`mt-3 block overflow-hidden text-sm text-stone/85 transition-[max-height,opacity] duration-500 ${expanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>{space.line}</span>
      </span>
    </>
  );
}

export default function SpacesGallery({ spaces }: { spaces: Space[] }) {
  const [active, setActive] = useState(2);
  return (
    <>
      <div
        className="mt-12 hidden h-[620px] gap-3 md:flex"
        aria-label="Spaces at Manratan Resort"
        onMouseLeave={() => setActive(2)}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(2); }}
      >
        {spaces.map((space, index) => (
          <Link
            key={space.label}
            href={space.href}
            data-space={space.label}
            data-expanded={active === index}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className="group relative min-w-0 basis-0 overflow-hidden transition-[flex-grow] duration-[900ms] ease-[var(--ease-lux)]"
            style={{ flexGrow: active === index ? 2.3 : 1 }}
          >
            <SpaceContent space={space} expanded={active === index} />
          </Link>
        ))}
      </div>
      <Swiper
        modules={[Autoplay, A11y]}
        slidesPerView={1}
        spaceBetween={14}
        speed={850}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        a11y={{ containerMessage: "Spaces at Manratan Resort" }}
        className="mt-12 [--swiper-wrapper-transition-timing-function:var(--ease-lux)] md:!hidden"
      >
        {spaces.map((space) => (
          <SwiperSlide key={space.label}>
            <Link href={space.href} className="group relative block h-[460px] sm:h-[520px]">
              <SpaceContent space={space} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
