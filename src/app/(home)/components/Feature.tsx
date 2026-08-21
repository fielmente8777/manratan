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
    <SectionWithContainer 
    
    sectionClassName="bg-tertiary">
      <div className="flex flex-col gap-4">
        {/* Heading */}
        <div>
          <h2 className="text-primary text-3xl md:text-[56px] leading-none font-normal">
            {title.heading}
          </h2>

          <p className="font-golden text-primary text-xl md:text-5xl ml-40 md:ml-58 mt-2 md:mt-4 leading-none">
            {title.subHeading}
          </p>
        </div>

        {/* Top Description */}
        <p className="text-secondary text-xs md:text-lg ">
          {topDescription}
        </p>

        {/* Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {gallery.map((item, index) => (
            <div key={index} className="relative h-[250px] md:h-[520px] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
                <h3 className="font-golden text-white text-2xl md:text-5xl text-right leading-none">
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
