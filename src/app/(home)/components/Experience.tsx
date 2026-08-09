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
      sectionClassName="bg-tertiary"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-[56px] text-primary text-start leading-none max-w-xl">
            {title.heading}
          </h2>

          <p className="text-xl md:text-5xl font-golden text-primary ml-24 mt-4">
            {title.subHeading}
          </p>

          <p className="mt-8 text-primary/80 leading-8 max-w-lg text-sm md:text-[16px]">
            {description}
          </p>

          <Link
            href={link.href}
            className="inline-block mt-8 uppercase text-xs tracking-[0.25em] text-primary underline"
          >
            {link.label}
          </Link>
        </div>

        {/* Right Images */}
        <div className="grid grid-cols-3 gap-3 h-[520px]">
          {images.map((item, index) => (
            <div
              key={index}
              className={`relative overflow-hidden ${

                index === 0 ? "mt-16 mb-12" : ""
              } ${index === 2 ? "mt-16 mb-12" : ""}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default ExperienceSection;