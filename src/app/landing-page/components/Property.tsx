import Link from "next/link";
import { WhatsAppIcon, CalendarIcon, PoolIcon } from "@/utils/icons";
import { SectionWithContainer } from "@/components/sectionComponants";
import { contact } from "@/utils/constent";

export interface Property {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface PropertyCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface PropertyProps {
  tagline: string;
  title: string;
  features: Property[];
  buttons: {
    label: string;
    link: string;
  }[];
}

const Property: React.FC<PropertyProps> = ({
  tagline,
  title,
  features,
  buttons,
}) => {
  return (
    <SectionWithContainer sectionClassName="bg-secondary">
      <div className="flex flex-col items-center">
        {/* Heading */}
        <div className="text-center">
          <p className="font-montserrat font-normal not-italic text-[16px] leading-[24px] tracking-normal text-center text-white uppercase">
            {tagline}
          </p>

          <h2 className="mt-[24px] font-ivy text-[32px] sm:text-[44px] lg:text-[56px] font-normal leading-[1.15] lg:leading-[64px] tracking-[0.07em] text-center text-white">
            <span className="uppercase not-italic">EVERY </span>
            <span className="italic normal-case">Comfort,</span>
            <br className="hidden sm:inline" />{" "}
            <span className="uppercase not-italic">THOUGHTFULLY CURATED</span>
          </h2>
        </div>

        {/* Features */}
        <div className="mt-12 grid w-full max-w-[1320px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] justify-items-center">
          {features.map((feature, index) => (
            <PropertyCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-[12px] w-full max-w-[332px]">
          {buttons.map((button, index) => (
            <Link
              key={index}
              href={button.link}
              className={`flex items-center justify-center gap-[8px] w-full sm:w-[160px] h-[41px] px-[16px] py-[12px] font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] uppercase transition-all duration-200 ${
                index === 0
                  ? "bg-white text-[#221811] border border-white hover:opacity-90 active:scale-[0.98]"
                  : "bg-[#221811] text-white border border-[#221811] hover:opacity-90 active:scale-[0.98]"
              }`}
            >
              {index === 0 ? (
                <WhatsAppIcon className="shrink-0 w-[14px] h-[14px]" />
              ) : (
                <CalendarIcon className="shrink-0 w-[16px] h-[16px]" />
              )}
              <span className="whitespace-nowrap">{button.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Property;

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="flex flex-col justify-start w-full lg:w-[312px] h-auto lg:h-[203px] min-h-[203px] p-[24px] gap-[15px] border border-white/40">
      {/* Icon */}
      <div className="shrink-0">
        {icon ?? <PoolIcon className="w-[40px] h-[40px]" />}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[8px]">
        {/* Title */}
        <h3 className="font-ivy font-normal not-italic text-[20px] sm:text-[22px] lg:text-[24px] leading-[28px] lg:leading-[32px] tracking-[0.07em] text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="font-montserrat font-normal not-italic text-[13px] sm:text-[14px] leading-[20px] tracking-[0.03em] text-white/80">
          {description}
        </p>
      </div>
    </div>
  );
};
