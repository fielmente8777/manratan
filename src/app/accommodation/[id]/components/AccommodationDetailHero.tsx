"use client";

import Image from "next/image";
import LandingNavbar from "@/components/navbar/WebSiteNav";

interface AccommodationDetailHeroProps {
  bgImage: string;
  alt: string;
}

const AccommodationDetailHero = ({
  bgImage,
  alt,
}: AccommodationDetailHeroProps) => {
  return (
    <section className="relative w-full max_screen_width mx-auto min-h-[70vh] md:min-h-187.5 max-h-225 overflow-hidden flex flex-col justify-between">
      {/* Background Hero Image */}
      <Image
        src={bgImage}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Soft gradient overlay matching luxury aesthetic */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/40 z-10 pointer-events-none" />

      {/* Top Navbar Header */}
      <div className="relative z-20 w-full">
        <LandingNavbar />
      </div>


    </section>
  );
};

export default AccommodationDetailHero;
