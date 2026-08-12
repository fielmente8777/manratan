import { SectionWithContainer } from "@/components/sectionComponants";

interface AccommodationDetailIntroProps {
  text: string;
}

const AccommodationDetailIntro = ({ text }: AccommodationDetailIntroProps) => {
  return (
    <SectionWithContainer sectionClassName="bg-[#f6f4f0]">
      <div className="flex flex-col items-center justify-center text-center w-full mx-auto">

        <p className="text-[#3A3939] text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed sm:leading-loose tracking-normal font-light">
          {text}
        </p>
      </div>
    </SectionWithContainer>
  );
};

export default AccommodationDetailIntro;
