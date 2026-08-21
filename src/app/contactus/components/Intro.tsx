"use client";

import { Section } from "@/components/sectionComponants";
import Image from "next/image";
import Link from "next/link";

interface ContactUsProps {
  title: string;
  subTitle: string;
  description: string;
  button: {
    label: string;
    href: string;
  };
  image: string;
  illustration: string;
}

const ContactUs = ({
  title,
  subTitle,
  description,
  button,
  image,
  illustration,
}: ContactUsProps) => {
  return (
    <Section defaultPadding={false}>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        {/* LEFT */}
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            bg-tertiary
            text-center
            max-md:py-10
          "
        >
          <div>
            <h2
              className="
                text-primary
                text-4xl
                lg:text-[48px]
                leading-none
                font-[serif]
                uppercase
              "
            >
              {title}
            </h2>

            <p
              className="
                font-golden
                text-primary
                text-3xl
                lg:text-[38px]
                leading-none
                lg:ml-54
              "
            >
              {subTitle}
            </p>
          </div>

          <div
            className="
              relative
              my-12
              aspect-[4.11/1]
              w-full
            "
          >
            <Image src={illustration} alt="" fill className="object-cover" />
          </div>

          <p
            className="
              text-secondary
              max-w-[500px]
              text-sm
              max-md:px-4
            "
          >
            {description}
          </p>

          <Link
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-10
              inline-flex
              items-center
              justify-center
              bg-primary
              px-7
              py-3
              text-[11px]
              uppercase
              tracking-[0.15em]
              text-white
              transition
              duration-300
              hover:opacity-80
            "
          >
            {button.label}
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative min-h-[500px] overflow-hidden lg:min-h-[650px]">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
};

export default ContactUs;
