"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionWithContainer } from "@/components/sectionComponants";

interface AboutProps {
  title: {
    heading: string;
    subHeading: string;
  };
  topContent: {
    description: string;
    link: {
      label: string;
      href: string;
    };
  };
  gallery: {
    image: string;
    alt: string;
  }[];
}

const About = ({
  title,
  topContent,
  gallery,
}: AboutProps) => {
  return (
    <SectionWithContainer sectionClassName="bg-tertiary">
     
      <div className="grid lg:grid-cols-[1fr_2fr]">
        {/* Heading */}
        <div className="px-6 py-8 lg:px-0 lg:py-0">
          <h2
            className="
              text-primary
              text-3xl
              lg:text-[56px]
              leading-none
              font-normal
            "
          >
            {title.heading}
          </h2>

          <p
            className="
              font-golden
              text-primary
              text-2xl
              lg:text-5xl
              leading-none
              ml-24
              mt-4
            "
          >
            {title.subHeading}
          </p>
        </div>

        {/* Description + Link */}
        <div className="flex flex-col justify-between px-6 pb-7 lg:px-0 lg:pb-7">
          <p
            className="
              text-secondary
              text-sm
              lg:text-[16px]
              leading-6
              lg:leading-7
              max-w-full
            "
          >
            {topContent.description}
          </p>

          <div className="flex justify-end mt-6">
            <Link
              href={topContent.link.href}
              className="
                text-primary
                text-[11px]
                uppercase
                tracking-[0.2em]
                underline
                underline-offset-4
                decoration-[0.5px]
              "
            >
              {topContent.link.label}
            </Link>
          </div>
        </div>
      </div>

      {/* ================= IMAGES ================= */}
      <div className="grid grid-cols-[1fr_2fr] gap-6">
        {gallery.map((item, index) => (
          <div
            key={index}
            className="
              relative
              h-[300px]
              md:h-[380px]
              lg:h-[600px]
              overflow-hidden
            "
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </SectionWithContainer>
  );
};

export default About;