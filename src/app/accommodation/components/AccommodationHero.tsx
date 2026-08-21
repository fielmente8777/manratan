"use client";

import Image from "next/image";
import LandingNavbar from "@/components/navbar/WebSiteNav";
import { Container } from "@/components/sectionComponants";

interface AccommodationHeroProps {
  bgImage: string;
  alt: string;
  title: string;
  scrollText: string;
}

const AccommodationHero = ({
  bgImage,
  alt,
  title,
  scrollText,
}: AccommodationHeroProps) => {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-187.5 max-h-225 overflow-hidden flex flex-col justify-between">
      {/* Background Hero Image */}
      <Image
        src={bgImage}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Subtle top/bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 z-10 pointer-events-none" />

      {/* Top Navbar */}
      <div className="relative z-20 w-full">
        <LandingNavbar />
      </div>

      {/* Center Hero Heading & Mouse Scroll Indicator */}
      <div className="relative z-20 w-full pb-10 sm:pb-14 md:pb-16 mt-auto">
        <Container>
          <div className="flex flex-col items-center justify-center text-center">
            {/* Main Title */}
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-[serif] uppercase drop-shadow-md">
              {title}
            </h1>

            {/* Scroll To Explore Indicator */}
            <div className="flex flex-col items-center gap-2 mt-6 sm:mt-8 md:mt-10">
              {/* White Mouse Scroll Icon */}
              <div className="w-[1.375rem] h-[2.125rem] border-[0.09375rem] border-white rounded-full flex justify-center pt-2 shrink-0">
                <div className="w-[0.1875rem] h-[0.4375rem] bg-white rounded-full animate-bounce" />
              </div>

              <p className="text-white/90 text-xs md:text-[0.8125rem] leading-[1.0625rem] tracking-[0.08em] font-light text-center">
                {scrollText}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default AccommodationHero;
