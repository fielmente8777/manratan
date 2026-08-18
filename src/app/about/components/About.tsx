"use client";

import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";

interface AboutStoryProps {
  intro: {
    title: string;
    subTitle: string;
    description: string;
  };
  history: {
    image: string;
    title: string;
    subTitle: string;
    description: string;
  };
}

const About = ({ intro, history }: AboutStoryProps) => {
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

      {/* <div
        className="
          mt-24
          grid
          grid-cols-1
          items-center
          gap-10
          lg:grid-cols-[1.6fr_1fr]
          lg:gap-16
        "
      >
       
        <div className="relative w-full overflow-hidden">
          <Image
            src={history.image}
            alt={history.title}
            width={1000}
            height={650}
            className="h-auto w-full object-cover"
          />
        </div>

       
        <div className="lg:pb-4">

          <div className="relative inline-block">
            <h3
              className="
                text-primary
                text-4xl
                font-normal
                uppercase
                leading-none
                sm:text-5xl
                lg:text-[48px]
              "
            >
              {history.title}
            </h3>

            <p
              className="
                absolute
                -bottom-7
                right-0
                font-golden
                text-primary
                text-2xl
                leading-none
                sm:text-3xl
              "
            >
              {history.subTitle}
            </p>
          </div>

          <p
            className="
              mt-14
              text-secondary
              text-sm
              leading-6
              sm:text-[15px]
              sm:leading-7
            "
          >
            {history.description}
          </p>

        </div>
      </div> */}
    </SectionWithContainer>
  );
};

export default About;
