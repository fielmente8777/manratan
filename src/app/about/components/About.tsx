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
              text-4xl
              font-normal
              uppercase
              sm:text-5xl
              lg:text-[48px]
            "
          >
            {intro.title}
          </h2>

          <p
            className="
              mt-2            
              md:absolute
              -bottom-7
              right-0
              font-golden
              text-primary
              text-2xl
              leading-none
              sm:text-3xl
              lg:text-[30px]
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
