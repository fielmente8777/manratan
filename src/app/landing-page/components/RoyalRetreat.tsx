import LinkButton from "@/components/buttons/LinkButton";
import { SectionWithContainer } from "@/components/sectionComponants";
import { LocationIcon } from "@/utils/icons";

export interface AboutIntroProps {
  title: string;
  description: string;
  location: string;
  buttons: {
    label: string;
    link: string;
  }[];
  floralImage?: string;
}

const AboutIntro: React.FC<AboutIntroProps> = ({
  title,
  description,
  location,
  buttons,
  floralImage,
}) => {
  return (
    <SectionWithContainer
      sectionClassName="relative overflow-hidden bg-tertiary"
    >
      {/* Floral Background */}
      {floralImage && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]">
          <img
            src={floralImage}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col">
          <h2 className="max-w-[700px] font-ivy text-[40px] font-normal uppercase leading-[0.95] text-primary sm:text-[48px] md:text-[56px] lg:text-[58px] xl:text-[62px]">
            {title}
          </h2>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {buttons.map((button, index) => (
              <LinkButton
                key={index}
                href={button.link}
                label={button.label}
                className={`rounded-md px-5 py-2.5 uppercase ${
                  index === 0
                    ? "bg-white text-primary border border-primary"
                    : "bg-primary text-white border border-primary"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-center">
          <p className="max-w-[580px] text-sm leading-[1.7] text-secondary md:text-base">
            {description}
          </p>

          {/* Location */}
          <div className="mt-5 w-fit">
            <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs italic text-white shadow-md md:text-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-primary">
                <LocationIcon />
              </span>

              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default AboutIntro;