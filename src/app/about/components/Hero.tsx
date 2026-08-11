"use client";

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
    <section className="relative h-[650px] w-full overflow-hidden lg:h-[720px]">
      {/* BACKGROUND IMAGE */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* HERO CONTENT */}
      <div className="absolute inset-x-0 bottom-12 z-10 flex flex-col items-center text-center text-white sm:bottom-14 lg:bottom-16">

        {/* TAGLINE */}
        <p className="text-xs uppercase tracking-[0.18em]">
          {tagline}
        </p>

        {/* TITLE */}
        <h1
          className="
            mt-2
            font-[serif]
            text-4xl
            font-normal
            uppercase
            leading-none
            tracking-[0.08em]
            sm:text-5xl
            lg:text-[56px]
          "
        >
          {title}
        </h1>

        {/* SUB TITLE */}
        <p
          className="
            mt-[-2px]
            font-golden
            text-2xl
            leading-none
            sm:text-3xl
            lg:text-[34px]
          "
        >
          {subTitle}
        </p>
      </div>
    </section>
  );
};

export default Hero;