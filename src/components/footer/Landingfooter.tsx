"use client";

import Image from "next/image";
import Link from "next/link";

import { Section, SectionWithContainer } from "../sectionComponants";
import { footerData } from "./footerdata";

const Footer = () => {
  return (
    <footer className="text-white">
     
        <SectionWithContainer sectionClassName="bg-primary">
          <div className="grid lg:grid-cols-[1.5fr_.6fr_.6fr_auto] gap-16 items-start">
            <div>
              <Image
                src={footerData.logo}
                alt="Manratan"
                width={270}
                height={90}
                className="object-contain"
              />
            </div>

            {footerData.links.map((section) => (
              <div key={section.title}>
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
            ))}

            <div className="lg:justify-self-end">
              <Link
                href={footerData.cta.href}
                className="bg-white text-primary px-10 py-4 uppercase tracking-wider text-sm font-medium hover:bg-secondary transition"
              >
                {footerData.cta.label}
              </Link>
            </div>
          </div>

          <div className="border-t border-white/20 mt-16 pt-8 flex justify-between items-center text-xs text-white/70">
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
