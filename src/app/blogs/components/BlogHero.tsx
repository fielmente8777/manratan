"use client";

import LandingNavbar from "@/components/navbar/WebSiteNav";
import { Container } from "@/components/sectionComponants";

interface BlogHeroProps {
  title?: string;
  subTitle?: string;
}

const BlogHero = ({
  title = "MANRATAN",
  subTitle = "Blogs",
}: BlogHeroProps) => {
  return (
    <section className="relative w-full bg-[#5E534A] text-tertiary pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-20 md:pb-24 overflow-hidden">
      {/* Top Header Navbar Bar - Full 100% Width */}
      <div className="absolute top-0 left-0 w-full h-20 sm:h-24 md:h-28 bg-[#221811] z-50">
        <LandingNavbar />
      </div>

      {/* Header Banner Centered Title */}
      <Container>
        <div className="relative z-20 flex flex-col items-center justify-center text-center mt-4 sm:mt-6 pb-2 px-2 sm:px-0">
          <div className="relative inline-block text-left">
            {/* Main Title */}
            <h1 className="text-[#221811] text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] leading-none tracking-[0.12em] sm:tracking-[0.14em] font-[serif] font-normal uppercase drop-shadow-sm">
              {title}
            </h1>

            {/* Cursive Subtitle */}
            <span className="absolute right-0 -bottom-6 sm:-bottom-8 md:-bottom-12 text-[#221811] font-golden text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] leading-none font-normal translate-x-3 sm:translate-x-6 md:translate-x-10">
              {subTitle}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogHero;
