import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";

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
              className="group relative w-full aspect-[3/4] rounded-none overflow-hidden shadow-xl bg-neutral-900 border border-white/10 cursor-pointer"
            >
              {/* Background Image with smooth GPU-accelerated zoom */}
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark Gradient Overlay - pointer-events-none prevents any hover flicker */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />

              {/* Title Text Overlay */}
              <div className="absolute top-6 left-6 right-6 z-10 pointer-events-none">
                <h3 className="text-white text-lg sm:text-xl font-[serif] font-medium tracking-[0.08em] uppercase drop-shadow-md">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWithContainer>
  );
}
