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
      sectionClassName="bg-primary"
      containerClassName="space-y-8 lg:space-y-10"
    >
      {/* Heading */}
      <div className="flex flex-col items-center text-center">
        <p className="font-dmsans font-normal not-italic text-[16px] leading-[15px] tracking-[2.3px] text-[#D2BD68] uppercase align-middle">
          {tagline}
        </p>

        <h2 className="mt-[24px] font-ivy font-normal text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.14] lg:leading-[64px] tracking-[0.07em] text-white text-center align-middle">
          <span className="italic font-normal normal-case">Stories</span>{" "}
          <span className="not-italic uppercase">FROM THE STAY</span>
        </h2>
      </div>

      {/* Review Partner Logos */}
      <div className="mt-6 flex items-center justify-center gap-[32px] w-full max-w-[206px] h-[42px] mx-auto">
        <div className="relative h-[42px] w-[132px] flex items-center justify-center shrink-0">
          <Image
            src="/landing/MakeMyTrip.png"
            alt="MakeMyTrip"
            width={132}
            height={42}
            className="w-[132px] h-[42px] object-contain"
          />
        </div>
        <div className="relative h-[42px] w-[42px] flex items-center justify-center shrink-0">
          <Image
            src="/landing/google.png"
            alt="Google"
            width={42}
            height={42}
            className="w-[42px] h-[42px] object-contain"
          />
        </div>
      </div>

      <TestimonialsSlider reviews={reviews} />
    </SectionWithContainer>
  );
};

export default Testimonials;
