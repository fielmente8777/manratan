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

const GalleryGrid = ({ images }: GalleryGridProps) => {
  const [selected, setSelected] = useState("All Images");
  const categories = useMemo(
    () => ["All Images", ...new Set(images.map((item) => item.alt))],
    [images]
  );

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredImages.map((item, index) => (
          <div key={index} className="relative w-full overflow-hidden">
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
