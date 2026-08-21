"use client";

import Image from "next/image";
import LandingNavbar from "../navbar/WebSiteNav";
import { Container, Section } from "../sectionComponants";
import Form1 from "../forms/Form1";
import Link from "next/link";
import { PlayIcon } from "@/utils/icons";

interface ImageBannerProps {
  image: string;
  logo: string;
  videoLink: string;
  booking: {
    benefits: string;
  };
}

const ImageBanner = ({ image, logo, videoLink, booking }: ImageBannerProps) => {
  return (
    <Section
      defaultPadding={false}
      className="relative w-full lg:aspect-16/8.5 aspect-[4/5.2] overflow-hidden"
    >
      <Image
        src={image}
        alt="Hero Banner"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55 z-10" />

      <LandingNavbar />

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <Image
          src={logo}
          alt="Manratan Resort"
          width={240}
          height={240}
          priority
        />
      </div>

      <div className="absolute bottom-10 left-0 w-full z-20">
        <Container>
          <div className="relative">
            <div className="hidden lg:block">
              <Form1 />
            </div>

            <Link
              href={videoLink}
              className="absolute right-0 -top-16 flex items-center justify-center text-primary hover:scale-105 transition"
            >
              <PlayIcon />
            </Link>
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default ImageBanner;
