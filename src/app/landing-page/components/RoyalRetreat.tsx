import Link from "next/link";
import { SectionWithContainer } from "@/components/sectionComponants";
import {
  RoyalEmblemIcon,
  WhatsAppIcon,
  CalendarIcon,
  LocationPinIcon,
} from "@/utils/icons";
import React from "react";

export interface AboutIntroProps {
  title?: string;
  description: string;
  location: string;
  buttons: {
    label: string;
    link: string;
  }[];
  floralImage?: string;
}

const AboutIntro: React.FC<AboutIntroProps> = ({
  description,
  location,
  buttons,
  floralImage,
}) => {
  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="relative overflow-hidden bg-tertiary py-16 md:py-24 lg:py-[120px]"
    >
      {/* Floral / Mandala Background */}
      {floralImage && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] md:h-[480px] md:w-[480px]">
          <img
            src={floralImage}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col justify-between items-start lg:flex-row lg:items-center gap-8 lg:gap-[136px]">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start max-w-[648px] w-full">
          {/* Royal Emblem Icon from @/utils/icons */}
          <RoyalEmblemIcon className="mb-5 h-9 w-9 md:h-[41px] md:w-[44px]" />

          {/* Heading */}
          <h2 className="font-ivy text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-normal not-italic leading-[1.14] lg:leading-[64px] tracking-[0.07em] text-[#221811] uppercase max-w-[648px] w-full">
            <span>A </span>
            <span className="italic font-normal normal-case">Royal</span>
            <span> MALWA</span>
            <br />
            <span>RETREAT, BUILT FOR</span>
            <br />
            <span>YOUR FINEST DAYS</span>
          </h2>

          {/* Buttons */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-[12px] w-full max-w-[332px]">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                className={`flex items-center justify-center gap-[8px] w-full sm:w-[160px] h-[41px] px-[16px] py-[12px] font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] uppercase transition-all duration-200 ${
                  index === 0
                    ? "bg-white text-[#221811] border border-[#221811] hover:opacity-90 active:scale-[0.98]"
                    : "bg-[#221811] text-white border border-[#221811] hover:opacity-90 active:scale-[0.98]"
                }`}
              >
                {index === 0 ? (
                  <WhatsAppIcon className="shrink-0 w-[14px] h-[14px]" />
                ) : (
                  <CalendarIcon className="shrink-0 w-[16px] h-[16px]" />
                )}
                <span className="whitespace-nowrap">{button.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-center items-start gap-6 max-w-[536px] lg:ml-auto w-full">
          <p className="font-montserrat font-medium text-[15px] sm:text-[16px] lg:text-[18px] leading-[26px] lg:leading-[30px] text-secondary tracking-normal">
            {description}
          </p>

          {/* Location Chip */}
          <div className="w-fit">
            <div
              style={{
                background:
                  "linear-gradient(90.33deg, #BCA049 -24.07%, #221811 123.59%)",
              }}
              className="flex items-center gap-2 rounded-[16px] border border-[#BCA049]/30 px-3 py-2 text-white shadow-sm max-w-[451px]"
            >
              <LocationPinIcon className="shrink-0 w-[11px] h-[14px]" />

              <span className="font-montserrat font-normal italic text-[14px] leading-none tracking-[0.03em] text-white align-middle">
                {location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default AboutIntro;