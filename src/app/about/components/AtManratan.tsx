"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SectionWithContainer } from "@/components/sectionComponants";

interface Slide {
  image: string;
  logo?: string;
  description: string;
}

interface AtManratanProps {
  title: string;
  subTitle: string;
  slides: Slide[];
}

const AtManratan = ({
  title,
  subTitle,
  slides,
}: AtManratanProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];

  const previousIndex =
    activeIndex === 0 ? slides.length - 1 : activeIndex - 1;

  const previousSlide = slides[previousIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <SectionWithContainer sectionClassName="bg-tertiary">
      {/* ================= TITLE ================= */}
      <div className="mb-10 text-center">
        <h2
          className="
            text-primary
            text-4xl
            md:text-5xl
            lg:text-[48px]
            font-normal
            uppercase
            leading-none
          "
        >
          {title}
        </h2>

        <p
          className="
            font-golden
            text-primary
            text-2xl
            md:text-3xl
            leading-none
            mt-1
          "
        >
          {subTitle}
        </p>
      </div>

      {/* ================= SLIDER ================= */}
      <div className="relative mx-auto w-full max-w-[1168px]">
        <div
          className="
            relative
            w-full
            h-[544px]
          "
        >
          {/* ================= BACKGROUND IMAGE ================= */}
          <div
            className="
              absolute
              left-0
              top-0
              w-[60%]
              h-[88%]
              overflow-hidden
              z-0
            "
          >
            <Image
              src={previousSlide.image}
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* ================= FRONT IMAGE ================= */}
          <div
            className="
              absolute
              left-[48px]
              top-[27px]
              w-[64%]
              h-[80%]
              overflow-hidden
              z-10
            "
          >
            <Image
              key={activeSlide.image}
              src={activeSlide.image}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* ================= CONTENT CARD ================= */}
          <div
            className="
              absolute
              right-0
              top-[19.5%]
              z-20
              w-[31%]
              h-[302px]
              bg-primary
              px-8
              py-8
              flex
              flex-col
              justify-between
            "
          >
            <div
              key={activeIndex}
              className="animate-content"
            >
              {activeSlide.logo && (
                <div className="relative h-[55px] w-[150px] mx-auto">
                  <Image
                    src={activeSlide.logo}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <p
                className="
                  mt-7
                  text-[13px]
                  leading-6
                  text-white
                  text-center
                "
              >
                {activeSlide.description}
              </p>
            </div>

            {/* ================= SLIDE COUNT ================= */}
            <button
              type="button"
              onClick={nextSlide}
              className="
                flex
                items-center
                gap-3
                text-white
                text-sm
                w-fit
              "
            >
              <span>
                {activeIndex + 1}/{slides.length}
              </span>

              <span className="text-xl">
                ›
              </span>
            </button>
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default AtManratan;