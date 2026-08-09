"use client";

import { SectionWithContainer } from "@/components/sectionComponants";
import { PlayIcon } from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

interface EventsProps {
  title: {
    heading: string;
    subHeading: string;
  };
  gallery: {
    image: string;
    alt: string;
    video: string;
  }[];
  description: string;
  link: {
    label: string;
    href: string;
  };
}

const Event = ({ title, gallery, description, link }: EventsProps) => {
  return (
    <SectionWithContainer sectionClassName="bg-primary">

      <div className="text-center text-tertiary">
        <h2 className="text-4xl md:text-[56px] leading-none font-normal">
          {title.heading}
        </h2>

        <p className="font-golden text-2xl md:text-5xl leading-none ml-70 mt-4">
          {title.subHeading}
        </p>
      </div>

      {/* ================= GALLERY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {gallery.map((item, index) => (
          <Link
            key={index}
            href={item.video}
            className="relative group overflow-hidden aspect-[648/400]"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className=" flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="max-w-5xl mx-auto mt-7 text-center">
        <p className="text-tertiary text-xs md:text-[16px] leading-5">
          {description}
        </p>

        <Link
          href={link.href}
          className="
            inline-block
            mt-6
            text-tertiary
            uppercase
            text-[10px]
            tracking-[0.15em]
            underline
            underline-offset-4
          "
        >
          {link.label}
        </Link>
      </div>
    </SectionWithContainer>
  );
};

export default Event;
