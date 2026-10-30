"use client";

import Image from "next/image";
import LandingNavbar from "@/components/navbar/WebSiteNav";
import { Container } from "@/components/sectionComponants";

interface AccommodationDetailHeroProps {
  bgImage: string;
  alt: string;
  title: string;
}

const AccommodationDetailHero = ({
  bgImage,
  alt,
  title,
}: AccommodationDetailHeroProps) => {
  const roomName = title.includes("•") ? title.split("•")[0].trim() : title;

  return (
    <section className="relative w-full max_screen_width mx-auto min-h-[70vh] md:min-h-187.5 max-h-225 overflow-hidden flex flex-col group">
      {/* Background Hero Image */}
      <Image
        src={bgImage}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Soft gradient overlay matching luxury aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50 z-10 pointer-events-none" />

      {/* Top Navbar Header */}
      <div className="relative z-20 w-full">
        <LandingNavbar />
      </div>

      {/* Centered Hero Room Title (Vertically & Horizontally) */}
      <div className="relative z-20 w-full flex-1 flex items-center justify-center my-auto py-12">
        <Container>
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-[serif] uppercase tracking-wide drop-shadow-lg">
              {roomName}
            </h1>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default AccommodationDetailHero;
