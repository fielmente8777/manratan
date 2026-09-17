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
      className={`w-full py-[14px] cursor-pointer transition-all duration-300 ease-in-out border-b-[0.5px] ${
        isFirst ? "border-t-[0.5px]" : ""
      } border-[#B58A4A]`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-montserrat font-medium not-italic text-[18px] leading-[30px] tracking-normal align-middle text-[#221811]">
          {question}
        </h3>
        <span className="shrink-0 text-[#B58A4A] flex items-center justify-center transition-transform duration-200">
          {isOpen ? (
            <MinusIcon className="w-5 h-5" />
          ) : (
            <PlusIcon className="w-5 h-5" />
          )}
        </span>
      </div>

      {/* Height animation wrapper */}
      <div
        className={`grid ${
          isOpen ? "grid-rows-[1fr] pt-3 pb-1" : "grid-rows-[0fr]"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="overflow-hidden">
          <p
            className={`font-montserrat font-normal text-[15px] leading-[24px] text-[#5E534A] ${
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
