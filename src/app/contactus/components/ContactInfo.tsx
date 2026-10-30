"use client";

import { Section } from "@/components/sectionComponants";
import { MailIcon, MapIcon, PhoneIcon } from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";

interface ContactItem {
  type: "email" | "phone" | "address";
  title: string;
  value: string;
  href?: string;
}

interface ContactInformationProps {
  image: string;
  items: ContactItem[];
}

const ContactInformation = ({
  image,
  items,
}: ContactInformationProps) => {
  const getIcon = (type: ContactItem["type"]) => {
    if (type === "email") return <MailIcon />;
    if (type === "phone") return <PhoneIcon />;
    return <MapIcon />;
  };

  return (
    <Section defaultPadding={false}>
      <div className="flex flex-col lg:grid w-full lg:grid-cols-2">
        {/* IMAGE (On Mobile: Below Contact Info. On Desktop: Left Col 1) */}
        <div className="relative order-2 lg:order-1 w-full h-[350px] sm:h-[450px] lg:h-[800px] overflow-hidden group">
          <Image
            src={image}
            alt="Manratan Resort"
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* CONTACT INFO CARD (On Mobile: Above Image. On Desktop: Right Col 2) */}
        <div className="relative order-1 lg:order-2 flex flex-col justify-center bg-primary px-4 py-8 sm:px-8 lg:min-h-[650px] lg:px-12 xl:px-16 lg:py-16">
          <div className="w-full max-w-[600px] mx-auto lg:mx-0">
            {items.map((item, index) => (
              <div
                key={item.type}
                className={`
                  py-4 sm:py-6 lg:py-8
                  ${
                    index !== items.length - 1
                      ? "border-b border-[#766C62]"
                      : ""
                  }
                `}
              >
                <div className="flex items-center gap-2 sm:gap-3 text-white">
                  <span className="flex shrink-0 items-center justify-center transform scale-85 sm:scale-100">
                    {getIcon(item.type)}
                  </span>

                  <h3 className="text-base sm:text-xl font-[serif] uppercase text-white lg:text-[28px]">
                    {item.title}:
                  </h3>
                </div>

                <div className="mt-2 sm:mt-3 lg:mt-5">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm leading-5 sm:leading-6 text-white transition-opacity hover:opacity-70 lg:text-[15px]"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <p className="max-w-[600px] text-xs sm:text-sm leading-5 sm:leading-6 text-white lg:text-[15px]">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactInformation;
