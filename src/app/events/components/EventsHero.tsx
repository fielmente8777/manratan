import Image from "next/image";
import { Section } from "@/components/sectionComponants";
import { PlayIcon } from "@/utils/icons";

interface EventsHeroProps {
  image: string;
  alt: string;
}

export default function EventsHero({ image, alt }: EventsHeroProps) {
  return (
    <Section
      defaultPadding={false}
      className="relative w-full h-[70vh] sm:h-[85vh] lg:h-[90vh] bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center filter brightness-90"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Reused PlayIcon from @/utils/icons */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="flex items-center justify-center">
          <PlayIcon />
        </div>
      </div>
    </Section>
  );
}
