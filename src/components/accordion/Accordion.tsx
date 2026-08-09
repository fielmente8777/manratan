"use client";
import { useState } from "react";

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  return (
    <div
      className={`pt-4 cursor-pointer transition-all duration-300 ease-in-out border-b-2 border-p2`}
      onClick={() => {
        setIsPinned((prev) => !prev);
        setIsOpen((prev) => !prev);
      }}
      onMouseEnter={() => {
        if (!isPinned) setIsOpen(true);
      }}
      onMouseLeave={() => {
        if (!isPinned) setIsOpen(false);
      }}
    >
      <div className="flex justify-between items-center  pb-4">
        <h3 className="text-p2 text-base md:text-[1.375rem] font-semibold">{question}</h3>
        <DropDownIcon
          className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </div>

      {/* Height animation wrapper */}
      <div
        className={`grid ${isOpen ? "grid-rows-[1fr] pb-3.5" : "grid-rows-[0fr]"} transition-all duration-500 ease-in-out`}
      >
        <div className="overflow-hidden">
          <p
            className={` text-p2 md:text-lg text-sm bold-color ${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      </div>
    </div>
  );
};

export default Accordion;

export const DropDownIcon = ({ ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.9961 12.8962L8.65782 19.7297C8.46428 19.9099 8.23641 19.9977 7.97419 19.9932C7.71181 19.9885 7.48385 19.8961 7.29031 19.7158C7.09677 19.5355 7 19.3232 7 19.079C7 18.8348 7.09677 18.6225 7.29031 18.4422L14.7484 11.4833C14.9246 11.3192 15.122 11.1977 15.3405 11.1186C15.559 11.0395 15.7776 11 15.9961 11C16.2147 11 16.4332 11.0395 16.6518 11.1186C16.8703 11.1977 17.0677 11.3192 17.2438 11.4833L24.7171 18.4422C24.9106 18.6225 25.0048 18.8372 24.9998 19.086C24.9948 19.3349 24.8955 19.5494 24.702 19.7297C24.5084 19.9099 24.2805 20 24.0181 20C23.7559 20 23.528 19.9099 23.3344 19.7297L15.9961 12.8962Z"
      fill="#E94128"
    />
  </svg>
);
