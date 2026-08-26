"use client";

import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";

interface AboutStoryProps {
  intro: {
    title: string;
    subTitle: string;
    description: string;
  }
}

const About = ({ intro }: AboutStoryProps) => {
  return (
    <SectionWithContainer sectionClassName="bg-tertiary">
      <div className="mx-auto max-w-[760px] text-center">
        <div className="relative inline-block">
          <h2
            className="
              text-primary
              text-3xl
              sm:text-4xl
              md:text-[42px]
              lg:text-[46px]
              leading-none
              font-[serif]
              uppercase
              tracking-wide
            "
          >
            {intro.title}
          </h2>

          <p
            className="
              mt-2            
              md:absolute
              -bottom-7
              md:-bottom-8
              right-0
              md:-right-2
              lg:-right-15
              font-golden
              text-primary
              text-xl
              sm:text-2xl
              md:text-[26px]
              lg:text-[28px]
              leading-none
              whitespace-nowrap
              ml-60
            "
          >
            {intro.subTitle}
          </p>
        </div>

        <p
          className="
            mt-4
            md:mt-16
            text-secondary
            md:text-[16px]
            text-xs
            
          "
        >
          {intro.description}
        </p>
      </div>


    </SectionWithContainer>
  );
};

export default About;
