"use client";

import Image from "next/image";
import LinkButton from "@/components/buttons/LinkButton";
import { SectionWithContainer } from "@/components/sectionComponants";
import ImageSlider2 from "@/components/sliders/ImageSlider2";

interface GallerySectionProps {
  tagline: string;
  title: string;
  italicTitle: string;
  images: string[];
  floralImage?: string;
  buttons: {
    label: string;
    link: string;
  }[];
}

const GallerySection: React.FC<GallerySectionProps> = ({
  tagline,
  title,
  italicTitle,
  images,
  floralImage,
  buttons,
}) => {
  return (
    <SectionWithContainer sectionClassName="relative overflow-hidden bg-tertiary">
      {/* Floral Decoration */}
      {floralImage && (
        <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[280px] w-[220px] md:block lg:h-[340px] lg:w-[280px]">
          <Image
            src={floralImage}
            alt=""
            fill
            className="object-contain object-right-top opacity-40"
          />
        </div>
      )}

      <div className="relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <p className="text-[9px] uppercase tracking-[0.18em] text-secondary md:text-[10px]">
            {tagline}
          </p>

          <h2 className="mt-3 font-ivy text-3xl font-normal uppercase leading-[0.95] text-primary sm:text-4xl md:text-5xl lg:text-[48px]">
            {title}
            <br />
            <span className="italic">{italicTitle}</span>
          </h2>
        </div>

        {/* Existing Slider */}
        <div className="mt-8 md:mt-10">
          <ImageSlider2 images={images} title="Gallery Slider" />
        </div>

        {/* Buttons */}
        <div className="mt-5 flex justify-center gap-2.5">
          {buttons.map((button, index) => (
            <LinkButton
              key={index}
              href={button.link}
              label={button.label}
              whatsAppIcon={index === 0}
              calendarIcon={index === 1}
              className={`
                rounded-md
                px-4 py-2
                text-[10px]!
                uppercase
                justify-center
                ${
                  index === 0
                    ? "border border-primary bg-white text-primary"
                    : "border border-primary bg-primary text-white"
                }
              `}
            />
          ))}
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default GallerySection;
