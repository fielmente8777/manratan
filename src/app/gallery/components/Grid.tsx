"use client";

import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";

interface GalleryImage {
  image: string;
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

const GalleryGrid = ({ images }: GalleryGridProps) => {
  return (
    <SectionWithContainer sectionClassName="bg-tertiary">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((item, index) => (
          <div
            key={index}
            className="relative w-full overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.alt}
              width={800}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </SectionWithContainer>
  );
};

export default GalleryGrid;