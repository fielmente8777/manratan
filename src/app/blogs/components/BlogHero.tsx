"use client";

import LandingNavbar from "@/components/navbar/WebSiteNav";
import { Container, SectionWithContainer } from "@/components/sectionComponants";

interface BlogHeroProps {
  title?: string;
  subTitle?: string;
}

const BlogHero = ({
  title = "MANRATAN",
  subTitle = "Blogs",
}: BlogHeroProps) => {
  return (
    <SectionWithContainer defaultPadding={false} sectionClassName="relative w-full bg-[#5E534A] text-tertiary overflow-hidden py-10">
      {/* Top Header Navbar Bar - Full 100% Width */}
      <div className="">
        <LandingNavbar />
      </div>

      {/* Header Banner Centered Title */}
      <Container>
        <div className="flex flex-col items-center justify-center text-center pb-16 ">
          <div className="relative inline-block text-left">
            {/* Main Title */}
            <h1 className="text-[#221811] text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-[serif] uppercase drop-shadow-sm mb-2">
              {title}
            </h1>

            {/* Cursive Subtitle */}
            <span className="absolute right-0 -bottom-6 sm:-bottom-8 md:-bottom-12 text-[#221811] font-golden text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-normal translate-x-3 sm:translate-x-6 md:translate-x-10">
              {subTitle}
            </span>
          </div>
        </div>
      </Container>
    </SectionWithContainer>
  );
};

export default BlogHero;
