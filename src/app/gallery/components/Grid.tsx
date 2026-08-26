"use client";

import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";
import { useMemo, useState } from "react";

interface GalleryImage {
  image: string;
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

const CATEGORIES = [
  "All Images",
  "Exterior",
  "Accommodation",
  "Reception",
  "Garden",
  "Restaurant",
];

const GalleryGrid = ({ images }: GalleryGridProps) => {
  const [selected, setSelected] = useState("All Images");
  const categories = CATEGORIES;

  const filteredImages =
    selected === "All Images"
      ? images
      : images.filter((item) => item.alt === selected);

  return (
    <SectionWithContainer defaultPadding={false} sectionClassName="bg-tertiary py-14">
      {/* TABS */}
      {/* FILTER BUTTONS */}
      <div className="mb-8 flex justify-center gap-6 overflow-x-auto hide-scroll">
        {categories.map((alt) => (
          <button
            key={alt}
            type="button"
            onClick={() => setSelected(alt)}
            className={`shrink-0 border border-primary px-6 py-2 text-sm transition-all duration-300 rounded-sm ${
              selected === alt
                ? "bg-primary text-white"
                : "bg-white text-primary"
            }`}
          >
            {alt}
          </button>
        ))}
      </div>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 lg:gap-8 space-y-4 md:space-y-6 lg:space-y-8">
        {filteredImages.map((item, index) => (
          <div
            key={index}
            className="break-inside-avoid group relative w-full overflow-hidden rounded-sm bg-gray-100 shadow-sm"
          >
            <Image
              src={item.image}
              alt={item.alt || "Gallery Image"}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </SectionWithContainer>
  );
};

export default GalleryGrid;
