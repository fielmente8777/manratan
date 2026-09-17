import LandingAccordion from "./LandingAccordion";
import Link from "next/link";
import { WhatsAppIcon, CalendarIcon } from "@/utils/icons";
import { SectionWithContainer } from "@/components/sectionComponants";

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
  return (
    <SectionWithContainer sectionClassName="bg-[#F5F5F5] py-12 md:py-16 lg:py-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[64px] max-w-[1320px] mx-auto">
        {/* Left Column (581px width, gap 40px, top aligned) */}
        <div className="flex flex-col justify-start items-start gap-[40px] w-full lg:w-[581px]">
          {/* Top Info Group (Tagline + Heading) */}
          <div className="flex flex-col items-start w-full">
            <p className="font-montserrat font-normal not-italic text-[16px] leading-[24px] tracking-normal text-[#C99E54] uppercase">
              {tagline}
            </p>

            {/* Heading (423px x 192px, IvyOra 56px / 64px, 7% spacing, 'uests' italic) */}
            <h2 className="mt-[24px] max-w-[423px] w-full font-ivy font-normal text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.14] lg:leading-[64px] tracking-[0.07em] text-primary uppercase">
              <span>QUESTIONS </span>
              <br />
              <span className="not-italic uppercase">G</span>
              <span className="italic font-normal normal-case">uests</span>
              <span> ASK US</span>
              <br />
              <span>MOST!</span>
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-[12px] w-full max-w-[332px]">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                className={`flex items-center justify-center gap-[8px] w-full sm:w-[160px] h-[41px] px-[16px] py-[12px] font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] uppercase transition-all duration-200 ${
                  index === 0
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

        {/* Right Column: Accordion Box (647px x 610px) */}
        <div className="flex flex-col justify-between w-full lg:w-[647px] min-h-[610px]">
          {items.map((item, index) => (
            <LandingAccordion
              key={index}
              question={item.q}
              answer={item.a}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Faq;
