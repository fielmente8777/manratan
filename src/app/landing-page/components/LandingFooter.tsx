"use client";

import Image from "next/image";
import Form2 from "@/components/forms/Form2";
import { LocationPinIcon } from "@/utils/icons";
import { CallIcon, MailIcon } from "@/utils/formIcons";
import { contact } from "@/utils/constent";
import { SectionWithContainer } from "@/components/sectionComponants";

const LandingFooter = () => {
  return (
    <footer className="w-full flex flex-col">
      {/* Booking Form */}
      <SectionWithContainer
        defaultPadding={false}
        sectionClassName="w-full bg-[#1C130D] py-5 sm:py-6 border-t border-white/10"
        containerClassName="flex flex-col items-center"
      >
        <Form2 />

        {/* Subtitle */}
        <p className="mt-[22px] text-center font-montserrat font-normal not-italic text-[12px] sm:text-[14px] leading-none tracking-[0.03em] text-[#DFD6C9]/90 align-middle">
          Save 15% when you book direct · Free cancellation on most dates*
        </p>
      </SectionWithContainer>

      {/* Footer Content */}
      <SectionWithContainer
        defaultPadding={false}
        sectionClassName="w-full bg-[#5E534A] text-white py-10 sm:py-16"
      >
        <div className="w-full flex flex-col md:flex-row items-start justify-start gap-8 md:gap-12 lg:gap-[238px]">
          {/* Logo */}
          <div className="flex items-start">
            <div className="relative h-[52px] sm:h-[65px] w-[160px] sm:w-[200px] shrink-0">
              <Image
                src="/images/nav.png"
                alt="Manratan Resort"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col items-start gap-2.5 sm:gap-3">
            <h4 className="font-montserrat font-normal not-italic text-[13px] sm:text-[14px] leading-none tracking-[0.03em] align-middle text-white/90">
              Location
            </h4>
            <div className="flex items-start gap-2.5 text-white/80">
              <LocationPinIcon className="w-4 h-4 text-[#C99E54] mt-1 shrink-0" />
              <p className="font-montserrat font-medium not-italic text-[15px] sm:text-[18px] leading-[24px] sm:leading-[30px] tracking-normal align-middle text-white/90">
                NH-46, Biaora Road ·<br />
                Narsinghgarh, Madhya Pradesh
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start gap-2.5 sm:gap-3">
            <h4 className="font-montserrat font-normal not-italic text-[13px] sm:text-[14px] leading-none tracking-[0.03em] align-middle text-white/90">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5 text-white/80">
              <div className="flex items-center gap-2.5">
                <span className="text-[#C99E54] shrink-0">
                  <CallIcon />
                </span>
                <a
                  href={contact.callCta}
                  className="font-dmsans font-normal not-italic text-[15px] sm:text-[18px] leading-[24px] sm:leading-[26px] tracking-normal align-middle text-white/80 hover:text-white transition"
                >
                  Call: +91 xxxxx xxxxx
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-[#C99E54] shrink-0">
                  <MailIcon />
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-dmsans font-normal not-italic text-[15px] sm:text-[18px] leading-[24px] sm:leading-[26px] tracking-normal align-middle text-white/80 hover:text-white transition"
                >
                  Email: demo@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionWithContainer>

      {/* Copyright */}
      <SectionWithContainer
        defaultPadding={false}
        sectionClassName="w-full bg-[#5E534A] border-t border-white/20 py-4 text-white/70"
      >
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] sm:text-[13px] font-montserrat text-center sm:text-left">
          <p>© 2026 Manratan Resort. All rights reserved.</p>
          <a
            href="https://fielmente.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Powered by Fielmente
          </a>
        </div>
      </SectionWithContainer>
    </footer>
  );
};

export default LandingFooter;
