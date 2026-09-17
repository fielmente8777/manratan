// import { SectionWithContainer } from "@/components/sectionComponants";
// import { SectionHeading } from "@/components/typography";
// import TestimonialsSlider from "./slider/TestimonialsSlider";
// import { TestimonialsProps } from "@/@types/landingPageTypes";

// const Testimonials: React.FC<TestimonialsProps> = ({ tagline, title, reviews }) => {
//   return (
//     <SectionWithContainer containerClassName="space-y-8 lg:space-y-12">
//       <div className="space-y-4">
//         <p className="uppercase text-p1 text-xs tracking-widest">{tagline}</p>
//         <SectionHeading title={title} />
//       </div>
//       <TestimonialsSlider reviews={reviews} />
//     </SectionWithContainer>
//   );
// };

// export default Testimonials;

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
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#C5A24A]">
          {tagline}
        </p>

        <h2 className="mt-3 font-ivy text-3xl font-normal uppercase leading-none text-white sm:text-4xl md:text-5xl lg:text-[42px]">
          {title}
        </h2>
      </div>

      <TestimonialsSlider reviews={reviews} />
    </SectionWithContainer>
  );
};

export default Testimonials;
