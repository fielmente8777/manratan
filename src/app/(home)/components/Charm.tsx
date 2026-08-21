"use client";

import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";

interface CharmProps {
  image: string;
  title: string;
  subTitle: string;
  description: string;
  note: string;
}

const Charm = ({ image, title, subTitle, description, note }: CharmProps) => {
  return (
    <SectionWithContainer sectionClassName="bg-[#E6E2DB]">
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[1.55fr_1fr]
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
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div
          className="
            flex
            flex-col
            px-6
            py-10
            sm:px-10
            lg:px-0
            lg:pl-10
            lg:pt-0
          "
        >
          {/* TITLE */}
          <div className="text-left">
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
              {title}
            </h2>

            <p
              className="
                mt-2
                text-right
                font-golden
                text-primary
                text-2xl
                leading-none
                sm:text-3xl
                lg:text-[30px]
              "
            >
              {subTitle}
            </p>
          </div>
          <div
            className="
            lg:hidden 
            relative
            h-[350px]
            overflow-hidden
            sm:h-[450px]
            lg:h-[590px]
          "
          >
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              text-secondary
              md:text-[16px]
              text-sm
            "

            dangerouslySetInnerHTML={{ __html: description }}
          />

          <p
            className=" mt-8
              text-secondary
              text-sm
              font-bold
              sm:text-[15px]"
          >
            {note}
          </p>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Charm;
