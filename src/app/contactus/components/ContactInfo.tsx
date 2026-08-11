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
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">


        <div className="relative lg:h-[800px] overflow-hidden h-[650px]">
          <Image
            src={image}
            alt="Manratan Resort"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex min-h-[500px] flex-col justify-center bg-primary px-8 py-16 sm:px-12 lg:min-h-[650px] lg:px-12 xl:px-16">
          <div className="w-full max-w-[600px]">
            {items.map((item, index) => (
              <div
                key={item.type}
                className={`
                  py-8
                  ${
                    index !== items.length - 1
                      ? "border-b border-[#766C62]"
                      : ""
                  }
                `}
              >
                <div className="flex items-center gap-3 text-white">
                  <span className="flex shrink-0 items-center justify-center">
                    {getIcon(item.type)}
                  </span>

                  <h3 className="text-[25px] font-normal uppercase leading-none text-white sm:text-[27px] lg:text-[28px]">
                    {item.title}:
                  </h3>
                </div>

                <div className="mt-5">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-white transition-opacity hover:opacity-70 sm:text-[15px]"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <p className="max-w-[600px] text-sm leading-6 text-white sm:text-[15px]">
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