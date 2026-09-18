import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";
import { TestimonialsProps } from "@/@types/landingPageTypes";
import TestimonialsSlider from "./slider/TestimonialsSlider";

const Testimonials: React.FC<TestimonialsProps> = ({
  tagline,
  title,
  reviews,
}) => {
  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="bg-primary pt-[50px] lg:pt-[92px] pb-12 sm:pb-20"
      containerClassName="flex flex-col items-center w-full"
    >
      {/* Tagline */}
      <p className="font-dmsans font-normal not-italic text-[13px] sm:text-[16px] leading-[15px] tracking-[2px] sm:tracking-[2.3px] text-[#D2BD68] uppercase text-center align-middle">
        {tagline}
      </p>

      {/* Heading */}
      <h2 className="mt-[16px] font-ivy font-normal text-[28px] sm:text-[44px] lg:text-[56px] leading-[1.15] lg:leading-[64px] tracking-[0.05em] sm:tracking-[0.07em] text-white text-center align-middle">
        <span className="italic font-normal normal-case">Stories</span>{" "}
        <span className="not-italic uppercase">FROM THE STAY</span>
      </h2>

      {/* Partner Logos */}
      <div className="mt-[16px] flex items-center justify-center gap-6 sm:gap-[32px] w-full max-w-[206px] h-[32px] sm:h-[42px] mx-auto">
        <div className="relative h-[30px] sm:h-[42px] w-[95px] sm:w-[132px] flex items-center justify-center shrink-0">
          <Image
            src="/landing/MakeMyTrip.png"
            alt="MakeMyTrip"
            width={132}
            height={42}
            className="w-[95px] sm:w-[132px] h-[30px] sm:h-[42px] object-contain"
          />
        </div>
        <div className="relative h-[30px] sm:h-[42px] w-[30px] sm:w-[42px] flex items-center justify-center shrink-0">
          <Image
            src="/landing/google.png"
            alt="Google"
            width={42}
            height={42}
            className="w-[30px] sm:w-[42px] h-[30px] sm:h-[42px] object-contain"
          />
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className="mt-[32px] sm:mt-[56px] w-full">
        <TestimonialsSlider reviews={reviews} />
      </div>
    </SectionWithContainer>
  );
};

export default Testimonials;
