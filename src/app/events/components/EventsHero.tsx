import Image from "next/image";
import { Section } from "@/components/sectionComponants";

interface EventsHeroProps {
  image: string;
  alt: string;
}

export default function EventsHero({ image, alt }: EventsHeroProps) {
  return (
    <Section
      defaultPadding={false}
      className="relative w-full max_screen_width mx-auto min-h-[70vh] md:min-h-187.5 max-h-225 bg-black overflow-hidden flex items-center justify-center group"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center filter brightness-90 transition-all duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
    </Section>
  );
}
