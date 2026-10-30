"use client";

import { SectionWithContainer } from "@/components/sectionComponants";
import Image from "next/image";
import Link from "next/link";

interface ExperienceSectionProps {
  title: {
    heading: string;
    subHeading: string;
  };
  description: string;
  images: {
    image: string;
    alt: string;
  }[];
  link: {
    label: string;
    href: string;
  };
}

const ExperienceSection = ({
  title,
  description,
  images,
  link,
}: ExperienceSectionProps) => {
  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="bg-tertiary pt-8 pb-6 md:py-20"
    >
      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden lg:grid grid-cols-2 gap-10 xl:gap-14 items-center">
        {/* Left Content (Vertically Centered with Image Collage) */}
        <div className="flex flex-col justify-center my-auto">
          <h2 className="text-2xl md:text-[52px] xl:text-[56px] text-primary font-[serif] text-start leading-none max-w-xl">
            {title.heading}
          </h2>

          <p className="text-base sm:text-xl md:text-2xl lg:text-[2rem] xl:text-[2.3rem] font-golden text-primary ml-28 sm:ml-12 lg:ml-36 xl:ml-44 mt-2 md:mt-4 leading-none whitespace-nowrap">
            {title.subHeading}
          </p>

          <p className="mt-6 md:mt-8 text-primary/80 leading-7 lg:leading-8 max-w-lg text-sm md:text-[16px]">
            {description}
          </p>

          <Link
            href={link.href}
            className="inline-block mt-6 md:mt-8 uppercase text-xs text-primary underline"
          >
            {link.label}
          </Link>
        </div>

        {/* Right Images (1-Top Wide + 2-Bottom Side by Side with Sharp Corners) */}
        <div className="flex flex-col gap-3.5 sm:gap-4 w-full max-w-[540px] ml-auto">
          {/* Top Wide Image */}
          {images && images[0] && (
            <div className="relative w-full aspect-[16/10] overflow-hidden group bg-neutral-200">
              <Image
                src={images[0].image}
                alt={images[0].alt || "Dining Experience"}
                fill
                priority
                unoptimized
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          )}

          {/* Bottom Two Images */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4 w-full">
            {images && images[1] && (
              <div className="relative w-full aspect-[4/3.3] overflow-hidden group bg-neutral-200">
                <Image
                  src={images[1].image}
                  alt={images[1].alt || "Restaurant Experience"}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            )}
            {images && images[2] && (
              <div className="relative w-full aspect-[4/3.3] overflow-hidden group bg-neutral-200">
                <Image
                  src={images[2].image}
                  alt={images[2].alt || "Fine Dining"}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE VIEW (IMAGES ABOVE DESCRIPTION) ================= */}
      <div className="block lg:hidden w-full">
        {/* 1. Heading */}
        <div>
          <h2 className="text-2xl sm:text-3xl text-primary font-[serif] text-start leading-none max-w-xl">
            {title.heading}
          </h2>

          <p className="text-base sm:text-xl font-golden text-primary ml-24 sm:ml-12 mt-2 leading-none whitespace-nowrap">
            {title.subHeading}
          </p>
        </div>

        {/* 2. Images Collage (Above Description on Mobile) */}
        <div className="flex flex-col gap-2.5 sm:gap-3.5 w-full mt-4 sm:mt-6">
          {/* Top Wide Image */}
          {images && images[0] && (
            <div className="relative w-full aspect-[16/10] overflow-hidden group bg-neutral-200">
              <Image
                src={images[0].image}
                alt={images[0].alt || "Dining Experience"}
                fill
                priority
                unoptimized
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          )}

          {/* Bottom Two Images */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full">
            {images && images[1] && (
              <div className="relative w-full aspect-[4/3.3] overflow-hidden group bg-neutral-200">
                <Image
                  src={images[1].image}
                  alt={images[1].alt || "Restaurant Experience"}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            )}
            {images && images[2] && (
              <div className="relative w-full aspect-[4/3.3] overflow-hidden group bg-neutral-200">
                <Image
                  src={images[2].image}
                  alt={images[2].alt || "Fine Dining"}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            )}
          </div>
        </div>

        {/* 3. Description + Link (Below Images on Mobile) */}
        <div className="mt-3.5 sm:mt-4">
          <p className="text-primary/80 leading-relaxed text-sm">
            {description}
          </p>

          <Link
            href={link.href}
            className="inline-block mt-2.5 uppercase text-xs text-primary underline"
          >
            {link.label}
          </Link>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default ExperienceSection;
