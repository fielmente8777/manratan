"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { SectionWithContainer } from "../sectionComponants";
import { footerData } from "./footerdata";

export const DropDown = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 7L21 16H3L12 7Z" fill="currentColor" />
  </svg>
);

const Footer = () => {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const pathName = usePathname();

  if (pathName?.startsWith("/landing-page")) {
    return null;
  }

  return (
    <footer className="text-white">
      <SectionWithContainer sectionClassName="bg-primary">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="shrink-0">
            <Image
              src={footerData.logo}
              alt="Manratan"
              width={270}
              height={90}
              className="object-contain w-[210px] sm:w-[240px] lg:w-[270px] h-auto"
            />
          </div>

          {footerData.links.map((section, index) => (
            <div key={section.title} className="w-full lg:w-auto">
              {/* DESKTOP VIEW */}
              <div className="hidden lg:block">
                <h3 className="text-[24px] font-medium uppercase mb-6">
                  {section.title}
                </h3>

                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-white/80 hover:text-white transition text-lg"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MOBILE ACCORDION VIEW */}
              <div className="lg:hidden border-b border-white/20 pb-4">
                <button
                  onClick={() => setIsOpen(isOpen === index ? null : index)}
                  className="text-[17px] font-medium uppercase flex items-center justify-between w-full py-2 text-white text-left"
                  type="button"
                >
                  <span>{section.title}</span>

                  <span
                    className={`transition-transform duration-300 ${
                      isOpen === index ? "rotate-180" : ""
                    }`}
                  >
                    <DropDown />
                  </span>
                </button>

                <ul
                  className={`flex flex-col gap-3 mt-3 pl-2 ${
                    isOpen === index ? "block" : "hidden"
                  }`}
                >
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-white/80 hover:text-white transition text-base block py-1"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="shrink-0 mt-4 lg:mt-0">
            <Link
              href={footerData.cta.href}
              className="bg-white text-primary px-10 py-4 uppercase tracking-wider text-sm font-medium hover:bg-secondary transition inline-block"
            >
              {footerData.cta.label}
            </Link>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 lg:mt-16 pt-8 flex flex-col lg:flex-row items-center justify-between gap-2.5 lg:gap-0 text-center lg:text-left text-xs text-white/70">
          <p>{footerData.copyright}</p>

          <Link
            href={footerData.poweredBy.href}
            target="_blank"
            className="hover:text-white"
          >
            {footerData.poweredBy.label}
          </Link>
        </div>
      </SectionWithContainer>
    </footer>
  );
};

export default Footer;

