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
    <SectionWithContainer sectionClassName="relative lg:aspect-16/8 aspect-[4/5.2] w-full overflow-hidden">

      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />


      <div className="absolute inset-0 bg-black/30" />


      <div className="absolute inset-x-0 bottom-12 z-10 flex flex-col items-center text-center text-white sm:bottom-14 lg:bottom-16">


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