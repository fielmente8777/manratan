"use client";

import { SectionWithContainer } from "@/components/sectionComponants";

interface GalleryIntroProps {
  title: {
    heading: string;
    subHeading: string;
  };
  description: string;
}

const GalleryIntro = ({
  title,
  description,
}: GalleryIntroProps) => {
  return (
    <SectionWithContainer sectionClassName="bg-tertiary"
    defaultPadding={false}
    >
      <div className="mx-auto max-w-[543px] text-center mt-10">

        <h1
          className="
            text-primary
            text-5xl
            md:text-[56px]
            leading-none
            font-[serif]
            uppercase
          "
        >
          {title.heading}
        </h1>

        <p
          className="
            lg:ml-40
            mt-4
            font-golden
            text-primary
            text-3xl
            sm:text-[40px]
            leading-none
          "
        >
          {title.subHeading}
        </p>

        <p
          className="
            mx-auto
            mt-4
            max-w-[700px]
            text-secondary
            md:text-[20px]
            text-[15px]
            leading-6
          "
        >
          {description}
        </p>

        {/* Decorative line */}
        <div className="mx-auto mt-10 flex w-[230px] items-center justify-center">
          <div className="h-px flex-1 bg-[#C9C1B7]" />

          <span className="mx-3 text-[#C9C1B7]">
            ✦
          </span>

          <div className="h-px flex-1 bg-[#C9C1B7]" />
        </div>

      </div>
    </SectionWithContainer>
  );
};

export default GalleryIntro;