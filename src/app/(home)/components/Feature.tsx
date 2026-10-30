"use client";

import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";

interface FeatureGalleryProps {
  title: {
    heading: string;
    subHeading: string;
  };
  topDescription: string;
  bottomDescription: string;
  gallery: {
    title: string;
    image: string;
  }[];
}

const Feature = ({
  title,
  topDescription,
  bottomDescription,
  gallery,
}: FeatureGalleryProps) => {
  return (
    <SectionWithContainer sectionClassName="bg-tertiary">
      <div className="flex flex-col gap-4">
        {/* Heading */}
        <div>
          <h2 className="text-primary text-3xl md:text-[56px] leading-none font-[serif]">
            {title.heading}
          </h2>

          <p className="font-golden text-primary text-[18px] sm:text-[28px] md:text-[40px] ml-36 sm:ml-16 md:ml-[260px] mt-1 sm:mt-2 leading-none whitespace-nowrap">
            {title.subHeading}
          </p>
        </div>

        {/* Top Description */}
        <p className="text-secondary text-xs md:text-lg ">{topDescription}</p>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-5">
          {gallery.map((item, index) => (
            <div
              key={index}
              className="relative h-[280px] sm:h-[380px] md:h-[520px] overflow-hidden group"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 px-3 pb-3 z-10">
                <h3 className="font-golden text-white text-2xl md:text-5xl text-right leading-none drop-shadow-md">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Description */}
        <div>
          <p className="text-secondary text-xs md:text-[16px]">
            {bottomDescription}
          </p>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Feature;
