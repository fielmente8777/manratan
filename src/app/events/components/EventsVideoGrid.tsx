import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";
import { PlayIcon } from "@/utils/icons";

interface CardItem {
  id: string;
  title: string;
  image: string;
  alt: string;
}

interface EventsVideoGridProps {
  cards: CardItem[];
}

export default function EventsVideoGrid({ cards }: EventsVideoGridProps) {
  return (
    <SectionWithContainer sectionClassName="bg-[#1b1511] py-16 md:py-24 text-white">
      <div className="max-w mx-auto">
        {/* Grid of 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative w-full aspect-[3/4] rounded-none overflow-hidden shadow-xl bg-neutral-900 border border-white/10 transition-transform duration-500 hover:-translate-y-1.5"
            >
              {/* Background Image */}
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center filter brightness-90 group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />

              {/* Title Text Overlay */}
              <div className="absolute top-6 left-6 right-6 z-10">
                <h3 className="text-white text-lg sm:text-xl font-[serif] font-medium tracking-[0.08em] uppercase drop-shadow-md">
                  {card.title}
                </h3>
              </div>

              {/* Reused PlayIcon from @/utils/icons */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="flex items-center justify-center">
                  <PlayIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWithContainer>
  );
}
