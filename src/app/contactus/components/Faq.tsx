"use client";

import Accordion from "@/components/accordion/Accordion";
import { Section } from "@/components/sectionComponants";


interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  return (
    <Section defaultPadding={false} className="bg-tertiary">
      <div
        className="
          py-10
          px-8
          mx-auto
          w-full
          max-w-7xl!
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
        <div className="mx-auto w-full max-w-[575px]">
          {faqs.map((faq) => (
            <Accordion
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FAQSection;