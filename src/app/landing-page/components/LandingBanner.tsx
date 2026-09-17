"use client";

import Image from "next/image";
import Link from "next/link";
import { LocationIcon, CalendarIcon } from "@/utils/icons";
import Form2 from "@/components/forms/Form2";
import { useState } from "react";

export interface LandingBannerProps {
  image?: string;
  logo?: string;
  videoLink?: string;
  location?: string;
  offerText?: string;
  booking?: {
    benefits?: string;
  };
}

const LandingBanner: React.FC<LandingBannerProps> = ({
  image = "/images/hero.jpg",
  logo = "/images/nav.png",
  videoLink = "https://www.youtube.com",
  location = "Narsinghgarh, MP",
  offerText = "**EXCLUSIVE DIRECT BOOKING OFFER: SAVE 15% + ENJOY COMPLIMENTARY BREAKFAST**",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full flex flex-col bg-[#1C130D]">
      {/* ================= 1. TOP NAVBAR HEADER ================= */}
      <header className="w-full bg-[#1C130D] text-white z-30 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto h-[74px] sm:h-[84px] px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left: Location Pin & Name */}
          <div className="flex items-center gap-2 text-white/90 shrink-0">
            <span className="text-[#D2BD68]">
              <LocationIcon />
            </span>
            <span className="font-montserrat font-medium text-[13px] sm:text-[14px] tracking-[0.03em] whitespace-nowrap">
              {location}
            </span>
          </div>

          {/* Center: Resort Logo */}
          <Link href="/landing-page" className="relative h-[48px] sm:h-[58px] w-[140px] sm:w-[190px] shrink-0 mx-2">
            <Image
              src={logo}
              alt="Manratan Resort"
              fill
              priority
              className="object-contain"
            />
          </Link>

          {/* Right: BOOK NOW Button  */}
          <div className="shrink-0">
            <Link
              href="#form"
              className="flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-[#221811] px-4 sm:px-6 py-2 sm:py-2.5 rounded-[2px] font-montserrat font-semibold text-[12px] sm:text-[13px] tracking-[0.05em] uppercase transition-all duration-200 shadow-sm active:scale-[0.98]"
            >
              <CalendarIcon className="w-4 h-4 shrink-0" />
              <span>BOOK NOW</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= 2. OFFER ANNOUNCEMENT STRIP ================= */}
      <div className="w-full bg-[#F3EEE7] py-2.5 sm:py-3 px-4 text-center border-b border-[#DFD6C9] z-20">
        <p className="font-montserrat font-semibold text-[11px] sm:text-[13px] lg:text-[13.5px] text-[#221811] tracking-[0.04em] uppercase">
          {offerText.replace(/\*\*/g, "")}
        </p>
      </div>

      {/* ================= 3. HERO IMAGE WITH CENTERED PLAY BUTTON ================= */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/8.2] min-h-[380px] lg:min-h-[540px] overflow-hidden">
        <Image
          src={image}
          alt="Manratan Resort Exterior"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Subtle Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/25 z-10" />

        {/* Centered Play Button */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <Link
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto flex items-center justify-center w-[64px] sm:w-[76px] h-[46px] sm:h-[54px] bg-white text-[#221811] rounded-[14px] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer drop-shadow-xl"
            aria-label="Play video"
          >
            {/* Play triangle SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="translate-x-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ================= 4. BOTTOM BOOKING FORM BAR ================= */}
      <div
        id="form"
        className="w-full bg-[#1C130D] py-5 sm:py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10 z-20"
      >
        <div className="max-w-[1320px] mx-auto flex flex-col items-center">
          <Form2 />

          {/* Subtitle / Guarantee Note */}
          <p className="mt-3.5 text-center font-montserrat font-normal not-italic text-[12px] sm:text-[13px] text-[#DFD6C9]/90 tracking-wide">
            Save 15% when you book direct · Free cancellation on most dates*
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingBanner;
