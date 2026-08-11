"use client";

import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";

interface AtManratanProps {
  title: string;
  subTitle: string;
  image: string;
  logo?: string;
  description: string;
  slideCount?: string;
}

const AtManratan = ({
  title,
  subTitle,
  image,
  logo,
  description,
  slideCount = "1/4",
}: AtManratanProps) => {
  return (
    <SectionWithContainer>
      {/* ================= HEADING ================= */}
      <div className="mb-10 text-center">
        <h2
          className="
            text-primary
            text-3xl
            font-normal
            uppercase
            leading-none
            sm:text-4xl
            lg:text-[40px]
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1
            font-golden
            text-primary
            text-2xl
            leading-none
            sm:text-3xl
          "
        >
          {subTitle}
        </p>
      </div>

      {/* ================= IMAGE + CARD ================= */}
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[850px]
        "
      >
        {/* IMAGE */}
        <div
          className="
            relative
            z-10
            h-[300px]
            w-[85%]
            overflow-hidden
            sm:h-[400px]
            lg:h-[500px]
          "
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* DARK INFORMATION CARD */}
        <div
          className="
            relative
            z-20
            -mt-16
            ml-auto
            flex
            min-h-[240px]
            w-[55%]
            flex-col
            justify-between
            bg-primary
            px-6
            py-7
            sm:-mt-24
            sm:min-h-[280px]
            sm:px-8
            sm:py-8
            lg:-mt-32
            lg:min-h-[300px]
            lg:w-[42%]
          "
        >
          {/* LOGO / TITLE */}
          <div>
            {logo ? (
              <div className="relative h-[45px] w-[130px]">
                <Image
                  src={logo}
                  alt="Restaurant"
                  fill
                  className="object-contain object-left"
                />
              </div>
            ) : (
              <h3
                className="
                  font-[serif]
                  text-2xl
                  uppercase
                  leading-none
                  text-white
                  sm:text-3xl
                "
              >
                Swadika
              </h3>
            )}

            <p
              className="
                mt-6
                text-[12px]
                leading-5
                text-white/80
                sm:text-[13px]
                sm:leading-6
              "
            >
              {description}
            </p>
          </div>

          {/* SLIDE INDICATOR */}
          <div
            className="
              mt-6
              flex
              items-center
              gap-2
              text-xs
              text-white
            "
          >
            <span>{slideCount}</span>

            <span className="text-base leading-none">›</span>
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default AtManratan;