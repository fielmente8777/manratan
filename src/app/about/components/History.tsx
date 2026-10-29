"use client";

import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";

interface AboutHistoryProps {
  image: string;
  title: string;
  subTitle: string;
  description: string;
}

const History = ({
  image,
  title,
  subTitle,
  description,
}: AboutHistoryProps) => {
  return (
    <SectionWithContainer defaultPadding={false}
      sectionClassName="bg-tertiary">
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[2fr_0.9fr]
        "
      >

        <div
          className="
            hidden lg:relative
            lg:block
            h-[350px]
            overflow-hidden
            sm:h-[450px]
            lg:h-[590px]
          "
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <div
          className="
            flex
            flex-col
            
            py-10
            
            lg:px-0
            lg:pl-10
            lg:pt-0
          "
        >
          {/* TITLE */}
          <div className="relative inline-block w-fit">
            <h2
              className="
                text-primary
                text-4xl
                font-[serif]
                uppercase
                leading-none
                sm:text-5xl
                lg:text-[48px]
              "
            >
              <span>{title.slice(0, -1)}</span>
              <span className="relative inline-block">
                {title.slice(-1)}
                <span
                  className="
                    absolute
                    top-full
                    -left-1
                    sm:-left-1.5
                    mt-1.5
                    sm:mt-2
                    font-golden
                    text-primary
                    text-2xl
                    leading-none
                    sm:text-3xl
                    lg:text-[30px]
                    normal-case
                    whitespace-nowrap
                  "
                >
                  {subTitle}
                </span>
              </span>
            </h2>

            <div className="h-6 sm:h-8" aria-hidden="true" />
          </div>
          <div
            className="
            lg:hidden 
            relative
            mt-6
            sm:mt-8
            lg:mt-0
            h-[350px]
            overflow-hidden
            sm:h-[450px]
            lg:h-[590px]
          "
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              md:mt-14
              text-secondary
              text-sm
              leading-6
              sm:text-[15px]
              sm:leading-7
              lg:mt-16
            "
          >
            {description}
          </p>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default History;