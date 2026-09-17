"use client";

import Image from "next/image";
import Form2 from "@/components/forms/Form2";
import { LocationPinIcon } from "@/utils/icons";
import { CallIcon, MailIcon } from "@/utils/formIcons";
import { contact } from "@/utils/constent";

const LandingFooter = () => {
  return (
    <footer className="w-full flex flex-col">
      {/* ================= 1. TOP BOOKING FORM BAR ================= */}
      <div className="w-full bg-[#1C130D] py-5 sm:py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-[1320px] mx-auto flex flex-col items-center">
          <Form2 />

          {/* Subtitle / Guarantee Note */}
          <p className="mt-3.5 text-center font-montserrat font-normal not-italic text-[12px] sm:text-[13px] text-[#DFD6C9]/90 tracking-wide">
            Save 15% when you book direct · Free cancellation on most dates*
          </p>
        </div>
      </div>

      {/* ================= 2. MAIN FOOTER CONTENT ================= */}
      <div className="w-full bg-[#5E534A] text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-start justify-start gap-8 md:gap-12 lg:gap-[238px]">
          {/* Column 1: Logo */}
          <div className="flex items-start">
            <div className="relative h-[65px] w-[200px] shrink-0">
              <Image
                src="/images/nav.png"
                alt="Manratan Resort"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Column 2: Location */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] align-middle text-white/90 uppercase">
              Location
            </h4>
            <div className="flex items-start gap-2.5 text-white/80">
              <LocationPinIcon className="w-4 h-4 text-[#C99E54] mt-1 shrink-0" />
              <p className="font-montserrat font-medium not-italic text-[18px] leading-[30px] tracking-normal align-middle text-white/90">
                NH-46, Biaora Road ·<br />
                Narsinghgarh, Madhya Pradesh
              </p>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] align-middle text-white/90 uppercase">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5 text-white/80">
              <div className="flex items-center gap-2.5">
                <span className="text-[#C99E54] shrink-0">
                  <CallIcon />
                </span>
                <a
                  href={contact.callCta}
                  className="font-dmsans font-normal not-italic text-[18px] leading-[26px] tracking-normal align-middle text-white/80 hover:text-white transition"
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
                  className="font-dmsans font-normal not-italic text-[18px] leading-[26px] tracking-normal align-middle text-white/80 hover:text-white transition"
                >
                  Email: demo@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. COPYRIGHT BAR ================= */}
      <div className="w-full bg-[#5E534A] border-t border-white/20 py-4 px-4 sm:px-8 lg:px-16 text-white/70">
        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-[13px] font-montserrat">
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
      </div>
    </footer>
  );
};

export default LandingFooter;
