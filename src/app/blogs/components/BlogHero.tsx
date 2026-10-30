"use client";

import Image from "next/image";
import LandingNavbar from "@/components/navbar/WebSiteNav";
import { Container } from "@/components/sectionComponants";

interface BlogHeroProps {
  title?: string;
  subTitle?: string;
  bgImage?: string;
  alt?: string;
}

const BlogHero = ({
  title = "MANRATAN",
  subTitle = "Blogs",
  bgImage = "/images/reception1.jpeg",
  alt = "Manratan Resort Blogs",
}: BlogHeroProps) => {
  return (
    <section className="relative w-full max_screen_width mx-auto min-h-[50vh] sm:min-h-[60vh] md:min-h-187.5 max-h-225 overflow-hidden flex flex-col justify-between group">
      {/* Background Hero Image */}
      <Image
        src={bgImage}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark gradient overlay matching luxury aesthetic for clear text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-10 pointer-events-none" />

      {/* Top Header Navbar Bar - Full 100% Width */}
      <div className="relative z-20 w-full">
        <LandingNavbar />
      </div>

      {/* Header Banner Centered Title */}
      <div className="relative z-20 w-full flex-1 flex items-center justify-center my-auto py-12 sm:py-16">
        <Container>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative inline-block text-left pb-2 sm:pb-3 md:pb-4">
              {/* Main Title */}
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-[serif] uppercase tracking-wide drop-shadow-lg mb-1">
                {title}
              </h1>

              {/* Cursive Subtitle */}
              <span className="absolute right-0 -bottom-7 sm:-bottom-9 md:-bottom-13 lg:-bottom-14 text-white font-golden text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-normal translate-x-3 sm:translate-x-6 md:translate-x-10 drop-shadow-md">
                {subTitle}
              </span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default BlogHero;
