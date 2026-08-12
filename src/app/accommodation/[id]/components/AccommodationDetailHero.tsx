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
    <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] min-h-[500px] overflow-hidden">
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
