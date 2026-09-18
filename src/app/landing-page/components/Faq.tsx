"use client";

import LandingAccordion from "./LandingAccordion";
import Link from "next/link";
import { WhatsAppIcon, CalendarIcon } from "@/utils/icons";
import { SectionWithContainer } from "@/components/sectionComponants";
import { useWebContext } from "@/context-api/WebContext";

interface FaqProps {
  tagline: string;
  title: string;
  description: string;
  items: {
    q: string;
    a: string;
  }[];
  buttons: {
    label: string;
    link: string;
  }[];
}

const Faq: React.FC<FaqProps> = ({
  tagline,
  title,
  description,
  items,
  buttons,
}) => {
  const { setIsOpenPopUpForm } = useWebContext();
  return (
    <SectionWithContainer sectionClassName="relative overflow-hidden bg-[#F5F5F5] py-10 md:py-16 lg:py-20">
      {/* Background Image */}
      <div
        className="pointer-events-none absolute bottom-0 left-[-120px] sm:left-[-160px] lg:left-[-205px] z-0 w-[240px] h-[212px] sm:w-[320px] sm:h-[283px] lg:w-[401px] lg:h-[353.99px] flex items-center justify-start"
      >
        <img
          src="/landing/bg-image1.png"
          alt="FAQ Background Ornament"
          width={401}
          height={354}
          style={{
            filter: "brightness(0) contrast(200%)",
            opacity: 1,
          }}
          className="w-full h-full object-contain object-left-bottom pointer-events-none select-none"
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[64px] max-w-[1320px] mx-auto">
        {/* Left Column */}
        <div className="flex flex-col justify-start items-start gap-6 lg:gap-[40px] w-full lg:w-[581px]">
          {/* Heading */}
          <div className="flex flex-col items-start w-full">
            <p className="font-montserrat font-normal not-italic text-[13px] sm:text-[16px] leading-[20px] sm:leading-[24px] tracking-normal text-[#C99E54] uppercase">
              {tagline}
            </p>

            {/* Title */}
            <h2 className="mt-3 sm:mt-[24px] max-w-[423px] w-full font-ivy font-normal text-[28px] sm:text-[44px] lg:text-[56px] leading-[1.15] lg:leading-[64px] tracking-[0.05em] sm:tracking-[0.07em] text-primary uppercase">
              <span>QUESTIONS </span>
              <br />
              <span className="not-italic uppercase">G</span>
              <span className="italic font-normal normal-case">uests</span>
              <span> ASK US</span>
              <br />
              <span>MOST!</span>
            </h2>
          </div>

          {/* Buttons */}
          <div className="hidden lg:flex flex-row items-center gap-[12px] w-full max-w-[332px]">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                onClick={(e) => {
                  if (button.link === "#form") {
                    e.preventDefault();
                    setIsOpenPopUpForm(true);
                  }
                }}
                className={`flex items-center justify-center gap-[8px] w-[160px] h-[41px] px-[16px] py-[12px] font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] uppercase transition-all duration-200 ${index === 0
                    ? "bg-white text-[#221811] border border-[#221811] hover:opacity-90 active:scale-[0.98]"
                    : "bg-[#221811] text-white border border-[#221811] hover:opacity-90 active:scale-[0.98]"
                  }`}
              >
                {index === 0 ? (
                  <WhatsAppIcon className="shrink-0 w-[14px] h-[14px]" />
                ) : (
                  <CalendarIcon className="shrink-0 w-[16px] h-[16px]" />
                )}
                <span className="whitespace-nowrap">{button.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between w-full lg:w-[647px] lg:ml-auto lg:translate-x-[3px] min-h-0 lg:min-h-[610px] h-full">
          <div className="flex flex-col justify-between w-full h-full flex-1">
            {items.map((item, index) => (
              <LandingAccordion
                key={index}
                question={item.q}
                answer={item.a}
                isFirst={index === 0}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex lg:hidden mt-6 flex-row items-center gap-2 sm:gap-[12px] w-full max-w-[332px]">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                onClick={(e) => {
                  if (button.link === "#form") {
                    e.preventDefault();
                    setIsOpenPopUpForm(true);
                  }
                }}
                className={`flex items-center justify-center gap-1.5 sm:gap-[8px] flex-1 sm:flex-none sm:w-[160px] h-[41px] px-2 sm:px-[16px] py-[12px] font-montserrat font-normal not-italic text-[12px] sm:text-[14px] leading-none tracking-[0.02em] sm:tracking-[0.03em] uppercase transition-all duration-200 ${index === 0
                    ? "bg-white text-[#221811] border border-[#221811] hover:opacity-90 active:scale-[0.98]"
                    : "bg-[#221811] text-white border border-[#221811] hover:opacity-90 active:scale-[0.98]"
                  }`}
              >
                {index === 0 ? (
                  <WhatsAppIcon className="shrink-0 w-[14px] h-[14px]" />
                ) : (
                  <CalendarIcon className="shrink-0 w-[16px] h-[16px]" />
                )}
                <span className="whitespace-nowrap">{button.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Faq;
