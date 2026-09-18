"use client";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "@/utils/icons";

interface LandingAccordionProps {
  question: string;
  answer: string;
  isFirst?: boolean;
}

const LandingAccordion: React.FC<LandingAccordionProps> = ({
  question,
  answer,
  isFirst,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full py-[16px] lg:py-[24px] pl-[10px] pr-2 cursor-pointer transition-all duration-300 ease-in-out border-b-[0.5px] ${
        isFirst ? "border-t-[0.5px]" : ""
      } border-[#B58A4A] min-h-[60px] lg:min-h-[78.5px] flex flex-col justify-center`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex justify-between items-center gap-3 sm:gap-4 w-full">
        <h3 className="font-montserrat font-medium not-italic text-[15px] sm:text-[18px] leading-[22px] sm:leading-[30px] tracking-normal align-middle text-[#221811] max-w-[551px]">
          {question}
        </h3>
        <span className="shrink-0 text-[#B58A4A] flex items-center justify-center transition-transform duration-200">
          {isOpen ? (
            <MinusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </span>
      </div>

      {/* Content */}
      <div
        className={`grid ${
          isOpen ? "grid-rows-[1fr] pt-2 sm:pt-3 pb-1" : "grid-rows-[0fr]"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="overflow-hidden">
          <p
            className={`font-montserrat font-normal text-[13.5px] sm:text-[15px] leading-[21px] sm:leading-[24px] text-[#5E534A] ${
              isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300 ease-in-out`}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingAccordion;
