import { SectionWithContainer } from "@/components/sectionComponants";
import Headings from "@/components/typography/Headings";
import LinkButton from "@/components/buttons/LinkButton";

interface EventsCTAProps {
  title: {
    heading: string;
  };
  description: string;
  link: {
    label: string;
    href: string;
  };
}

export default function EventsCTA({
  title,
  description,
  link,
}: EventsCTAProps) {
  return (
    <SectionWithContainer sectionClassName="bg-white border-t border-secondary/10 py-12 md:py-16">
      <div className="max-w mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        {/* Left Info */}
        <div className="max-w-2xl text-center md:text-left">
          <Headings
            level={2}
            heading={title.heading}
            className="text-primary text-xl sm:text-2xl md:text-3xl font-[serif] font-normal uppercase tracking-[0.05em] mb-2"
          />
          <p className="text-secondary text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right CTA Button using project LinkButton component */}
        <div className="shrink-0">
          <LinkButton
            href={link.href}
            label={link.label}
            className="bg-primary text-white font-medium text-xs sm:text-sm tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-primary/90 rounded-none shadow-md border-0"
          />
        </div>
      </div>
    </SectionWithContainer>
  );
}
