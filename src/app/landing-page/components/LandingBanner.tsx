"use client";

import Image from "next/image";
import Link from "next/link";
import { LocationIcon, CalendarIcon, BannerPlayIcon } from "@/utils/icons";
import Form2 from "@/components/forms/Form2";
import { useState, useEffect, useRef } from "react";
import { useWebContext } from "@/context-api/WebContext";
import { Container, SectionWithContainer } from "@/components/sectionComponants";

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
  const { setIsOpenPopUpForm } = useWebContext();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="relative w-full flex flex-col bg-[#1C130D]"
      containerClassName="!max-w-full !p-0"
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max_screen_width z-50 bg-[#1C130D] text-white border-b border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${visible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <Container className="h-[54px] sm:h-[84px] flex items-center justify-between gap-2">
          {/* Location */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-2 text-white/90 shrink-0">
            <span className="text-[#D2BD68] text-[11px] sm:text-base shrink-0">
              <LocationIcon />
            </span>
            <span className="font-montserrat font-medium text-[10px] sm:text-[14px] tracking-[0.01em] sm:tracking-[0.03em] whitespace-nowrap">
              {location}
            </span>
          </div>

          {/* Logo */}
          <Link
            href="/landing-page"
            className="relative h-[32px] sm:h-[58px] w-[100px] sm:w-[190px] shrink-0"
          >
            <Image
              src={logo}
              alt="Manratan Resort"
              fill
              priority
              className="object-contain object-left sm:object-center"
            />
          </Link>

          {/* Book Now */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setIsOpenPopUpForm(true)}
              className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-white/90 text-[#221811] h-[34px] sm:h-auto w-[34px] sm:w-auto p-0 sm:px-6 sm:py-2.5 rounded-[2px] font-montserrat font-semibold text-[13px] tracking-[0.03em] sm:tracking-[0.05em] uppercase transition-all duration-200 shadow-sm active:scale-[0.98] whitespace-nowrap cursor-pointer"
              aria-label="Book Now"
            >
              <CalendarIcon className="w-[20px] h-[20px] sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden sm:inline">BOOK NOW</span>
            </button>
          </div>
        </Container>
      </header>

      {/* Spacer */}
      <div className="h-[54px] sm:h-[84px] w-full" />

      {/* Offer Strip */}
      <div className="w-full bg-[#F3EEE7] py-2.5 sm:py-3.5 px-3 sm:px-4 text-center border-b border-[#DFD6C9] z-20 flex items-center justify-center">
        <p className="font-montserrat font-bold text-[11px] sm:text-[14px] leading-none tracking-[0.03em] text-[#5E534A] uppercase text-center align-middle">
          {offerText}
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/8.2] min-h-[240px] sm:min-h-[380px] lg:min-h-[540px] overflow-hidden">
        <Image
          src={image}
          alt="Manratan Resort Exterior"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/25 z-10" />

        {/* Play Icon */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <BannerPlayIcon className="w-[54px] h-[40px] sm:w-[80px] sm:h-[60px] drop-shadow-md" />
        </div>
      </div>

      {/* Booking Form */}
      <div
        id="form"
        className="w-full bg-[#1C130D] py-5 sm:py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10 z-20"
      >
        <div className="w-full flex flex-col items-center">
          <Form2 />

          {/* Subtitle */}
          <p className="mt-[22px] text-center font-montserrat font-normal not-italic text-[12px] sm:text-[14px] leading-none tracking-[0.03em] text-[#DFD6C9]/90 align-middle">
            Save 15% when you book direct · Free cancellation on most dates*
          </p>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default LandingBanner;
