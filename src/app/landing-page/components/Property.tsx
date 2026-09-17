import LinkButton from "@/components/buttons/LinkButton";
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
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/80 md:text-xs">
            {tagline}
          </p>

          <h2 className="mt-3 font-ivy text-3xl font-normal uppercase leading-[1] text-white sm:text-4xl md:text-5xl lg:text-[52px]">
            {title}
          </h2>
        </div>

        {/* Features */}
        <div className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
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
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {buttons.map((button, index) => (
            <LinkButton
              key={index}
              href={button.link}
              label={button.label}
              className={`rounded-md px-4 py-2 text-xs uppercase ${
                index === 0
                  ? "border border-white bg-white text-primary"
                  : "border border-primary bg-primary text-white"
              }`}
            />
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
    <div className="min-h-[150px] border border-white/40 p-4 md:min-h-[120px] md:p-3.5 lg:min-h-[120px]">
      {/* Icon */}
      <div className="mb-3 text-[#C5A24A]">
        {icon ?? (
          <div className="flex h-6 w-6 items-center justify-center text-lg">
            ≋
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-ivy text-lg leading-none text-white md:text-xl">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-[240px] text-[10px] leading-[1.35] text-white/80 md:text-[11px]">
        {description}
      </p>
    </div>
  );
};
