import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";
import Headings from "@/components/typography/Headings";

interface EventsIntroProps {
  title: {
    heading: string;
    subHeading: string;
  };
  gallery: {
    image: string;
    alt: string;
  }[];
  headingLabel: string;
  description: string;
}

export default function EventsIntro({
  title,
  gallery,
  headingLabel,
  description,
}: EventsIntroProps) {
  return (
    <SectionWithContainer sectionClassName="bg-tertiary py-16 md:py-24">
      <div className="max-w mx-auto text-center">
        {/* Section Header */}
        <Headings
          level={1}
          heading={title.heading}
          className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[serif] font-normal uppercase tracking-[0.05em] leading-tight"
        />

        <p className="font-golden text-primary/80 text-3xl sm:text-4xl md:text-5xl mt-1 ml-18 text-right pr-16 sm:pr-20 md:pr-32 lg:pr-40 mb-10 md:mb-16">
          {title.subHeading}
        </p>


        {/* IMAGES GRID (matching About.tsx) */}
        <div className="grid grid-cols-[1fr_2fr] gap-6 mb-10 md:mb-12">
          {gallery.map((item, index) => (
            <div
              key={index}
              className="
                relative
                h-[300px]
                md:h-[380px]
                lg:h-[600px]
                overflow-hidden
              "
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Description Body */}
        <div className="max-w mx-auto text-left sm:text-justify text-secondary text-sm sm:text-base leading-relaxed space-y-3 font-normal">
          <p>
            <strong className="text-primary font-semibold">{headingLabel} </strong>
            {description}
          </p>
        </div>
      </div>
    </SectionWithContainer>
  );
}
