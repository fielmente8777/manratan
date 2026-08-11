"use client";

import { useState } from "react";
import { PlusIcon } from "@/utils/icons";
import { BiMinus } from "react-icons/bi";
import { Section } from "@/components/sectionComponants";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <Section defaultPadding={false} className=" bg-tertiary">
      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-6
          py-20
          sm:px-10
          lg:px-16
          lg:py-24
        "
      >
        {/* HEADING */}
        <div className="mb-12 text-center">
          <h2
            className="
              text-primary
              text-4xl
              sm:text-[44px]
              leading-none
              font-normal
              uppercase
            "
          >
            FAQs
          </h2>

          <p
            className="
              font-golden
              text-primary
              mt-3
              lg:ml-20
              text-3xl
              leading-none
              sm:text-[31px]
            "
          >
            Stay Informed
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mx-auto w-full max-w-[575px] border-t border-[#C9C1B7]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="border-b border-[#C9C1B7]">
                {/* QUESTION */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-6
                    px-1
                    py-5
                    text-left
                    sm:py-6
                  "
                >
                  <span
                    className="
                      text-primary
                      text-[13px]
                      uppercase
                      leading-5
                      tracking-[0.04em]
                      sm:text-[14px]
                    "
                  >
                    {faq.question}
                  </span>

                  <span
                    className="
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      text-primary
                    "
                  >
                    {isOpen ? <BiMinus size={20} /> : <PlusIcon />}
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className="
                        text-secondary
                        px-1
                        pb-6
                        pr-10
                        text-sm
                        leading-6
                      "
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default FAQSection;
