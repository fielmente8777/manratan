"use client";

import Link from "next/link";
import { SectionWithContainer } from "@/components/sectionComponants";
import {
  RoyalEmblemIcon,
  WhatsAppIcon,
  CalendarIcon,
  LocationPinIcon,
} from "@/utils/icons";
import React from "react";
import { useWebContext } from "@/context-api/WebContext";

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
  const { setIsOpenPopUpForm } = useWebContext();
  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="relative overflow-hidden bg-tertiary py-12 md:py-24 lg:py-[120px]"
    >
      {/* Background Image */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[247px] sm:w-[350px] sm:h-[309px] lg:w-[401px] lg:h-[353.99px] flex items-center justify-center"
        style={{ opacity: 1 }}
      >
        <img
          src="/landing/bg-image1.png"
          alt="Mandala Background"
          width={401}
          height={354}
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between items-start lg:flex-row lg:items-center gap-8 lg:gap-[136px]">
        {/* Left Content */}
        <div className="flex flex-col items-start max-w-[648px] w-full">
          {/* Emblem Icon */}
          <RoyalEmblemIcon className="mb-4 sm:mb-5 h-8 w-8 sm:h-9 sm:w-9 md:h-[41px] md:w-[44px]" />

          {/* Heading */}
          <h2 className="font-ivy text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-normal not-italic leading-[1.15] lg:leading-[64px] tracking-[0.05em] sm:tracking-[0.07em] text-[#221811] uppercase max-w-[648px] w-full">
            <span>A </span>
            <span className="italic font-normal normal-case">Royal</span>
            <span> MALWA</span>
            <br />
            <span>RETREAT, BUILT FOR</span>
            <br />
            <span>YOUR FINEST DAYS</span>
          </h2>

          {/* Buttons */}
          <div className="hidden lg:flex mt-7 sm:mt-8 flex-wrap items-center gap-[12px] w-full max-w-[332px]">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                onClick={(e) => {
                  if (button.link === "#form") {
                    e.preventDefault();
                    setIsOpenPopUpForm(true);
                  }
                }}
                className={`flex items-center justify-center gap-[8px] w-full sm:w-[160px] h-[41px] px-[16px] py-[12px] font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] uppercase transition-all duration-200 ${index === 0
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

        {/* Right Content */}
        <div className="flex flex-col justify-center items-start gap-5 sm:gap-6 max-w-[536px] lg:ml-auto w-full">
          <p className="font-montserrat font-medium text-[14px] sm:text-[16px] lg:text-[18px] leading-[24px] sm:leading-[26px] lg:leading-[30px] text-secondary tracking-normal">
            {description}
          </p>

          {/* Location */}
          <div className="w-fit max-w-full">
            <div
              style={{
                background:
                  "linear-gradient(90.33deg, #BCA049 -24.07%, #221811 123.59%)",
              }}
              className="inline-flex items-center gap-1.5 sm:gap-[8px] w-fit sm:w-[451px] h-[35px] rounded-[16px] border border-[#BCA049] px-2.5 sm:px-[12px] py-[8px] text-white shadow-sm"
            >
              <LocationPinIcon className="shrink-0 w-[11px] h-[14px] text-white" />

              <span className="font-montserrat font-normal italic text-[9.5px] min-[360px]:text-[10px] min-[410px]:text-[11px] sm:text-[14px] leading-none tracking-tight sm:tracking-[0.03em] text-white whitespace-nowrap">
                {location}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex lg:hidden mt-4 flex-row items-center gap-2 sm:gap-[12px] w-full max-w-[332px]">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                onClick={(e) => {
                  if (button.link === "#form") {
                    e.preventDefault();
                    setIsOpenPopUpForm(true);
                  }
                }}
                className={`flex items-center justify-center gap-1.5 sm:gap-[8px] flex-1 sm:flex-none sm:w-[160px] h-[41px] px-2 sm:px-[16px] py-[12px] font-montserrat font-normal not-italic text-[12px] sm:text-[14px] leading-none tracking-[0.02em] sm:tracking-[0.03em] uppercase transition-all duration-200 ${index === 0
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
      </div>
    </SectionWithContainer>
  );
};

export default AboutIntro;