import { SectionWithContainer } from "@/components/sectionComponants";

interface AccommodationIntroProps {
  heading: string;
  subHeading: string;
  paragraphs: string[];
}

const AccommodationIntro = ({
  heading,
  subHeading,
  paragraphs,
}: AccommodationIntroProps) => {
  return (
    <SectionWithContainer sectionClassName="bg-tertiary">
      <div className="flex flex-col items-center text-center w-full">
        {/* Heading Block: ELEGANT with cursive Accommodation positioned underneath towards right side */}
        <div className="flex flex-col items-start w-fit mx-auto text-left">
          <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-none tracking-[0.07em] font-[serif] font-normal uppercase">
            {heading}
          </h2>

          <h3 className="text-primary font-golden text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-none tracking-[0.07em] ml-16 sm:ml-24 md:ml-36 lg:ml-44 mt-1 sm:mt-2">
            {subHeading}
          </h3>
        </div>

        {/* Summary Description Section */}
        <div className="flex flex-col gap-4 text-secondary text-sm sm:text-base leading-relaxed font-normal tracking-normal text-center  w-full mt-6 md:mt-8">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="wrap-break-word">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default AccommodationIntro;
