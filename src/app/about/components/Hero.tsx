"use client";

import { SectionWithContainer } from "@/components/sectionComponants";
import Image from "next/image";

interface AboutHeroProps {
  image: string;
  tagline: string;
  title: string;
  subTitle: string;
}

const Hero = ({
  image,
  tagline,
  title,
  subTitle,
}: AboutHeroProps) => {
  return (
    <SectionWithContainer sectionClassName="relative lg:aspect-16/8 aspect-[4/5.2] w-full overflow-hidden group">
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark overlay + gradient layer for clear text readability */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

      <div className="absolute inset-x-0 bottom-12 z-10 flex flex-col items-center text-center text-white sm:bottom-14 lg:bottom-16 drop-shadow-md">
        <p className="text-xl uppercase">
          {tagline}
        </p>

        <h1
          className="
            mt-2
            font-[serif]
            text-4xl
            font-normal
            uppercase
            sm:text-5xl
            lg:text-[56px]
          "
        >
          {title}
        </h1>

        <p
          className="
            mt-2
            font-golden
            text-2xl
            leading-none
            sm:text-3xl
            lg:text-[34px]
            ml-44
            lg:ml-[275px]
          "
        >
          {subTitle}
        </p>
      </div>
    </SectionWithContainer>
  );
};

export default Hero;
