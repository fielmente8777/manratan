"use client";

import Image from "next/image";
import LandingNavbar from "../navbar/WebSiteNav";
import { Container, Section } from "../sectionComponants";
import Form1 from "../forms/Form1";

interface ImageBannerProps {
  image: string;
  logo: string;
  videoLink?: string;
  booking: {
    benefits: string;
  };
}

const ImageBanner = ({ image, logo }: ImageBannerProps) => {
  return (
    <Section
      defaultPadding={false}
      className="relative w-full min-h-[660px] sm:min-h-[700px] lg:min-h-0 lg:aspect-16/8.5 aspect-[4/5.2] overflow-hidden group"
    >
      <Image
        src={image}
        alt="Hero Banner"
        fill
        priority
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/55 z-10" />

      <LandingNavbar />

      <div className="absolute inset-x-0 top-16 bottom-[250px] lg:top-0 lg:bottom-0 z-20 flex items-center justify-center">
        <Image
          src={logo}
          alt="Manratan Resort"
          width={240}
          height={240}
          priority
        />
      </div>

      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-0 w-full z-20">
        <Container>
          <div className="relative">
            <Form1 />
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default ImageBanner;
