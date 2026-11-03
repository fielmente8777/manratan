"use client";

import Image from "next/image";

export interface DiningGalleryItem {
  image: string;
  alt: string;
}

interface DiningGalleryStripProps {
  images: DiningGalleryItem[];
}

export default function DiningGalleryStrip({ images }: DiningGalleryStripProps) {
  if (!images || images.length === 0) return null;

  return (
    <section
      data-no-fade
      className="relative w-full max_screen_width mx-auto overflow-hidden border-t-2 border-[#C8A96A] mb-0 pb-0 bg-primary select-none animate-continuous-slide-wrapper"
    >
      <div className="flex w-full overflow-hidden">
        {/* Track 1 */}
        <div className="flex shrink-0 gap-[2px] animate-continuous-slide">
          {images.map((item, index) => (
            <div
              key={`track1-${item.image}-${index}`}
              className="relative w-[100vw] sm:w-[320px] md:w-[360px] lg:w-[400px] h-[250px] sm:h-[280px] md:h-[320px] lg:h-[340px] xl:h-[360px] shrink-0 overflow-hidden group cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.alt || "Manratan Resort Dining"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 360px, 400px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Track 2 (Exact Duplicate for Seamless Infinite Continuous Flow) */}
        <div
          aria-hidden="true"
          className="flex shrink-0 gap-[2px] animate-continuous-slide ml-[2px]"
        >
          {images.map((item, index) => (
            <div
              key={`track2-${item.image}-${index}`}
              className="relative w-[100vw] sm:w-[320px] md:w-[360px] lg:w-[400px] h-[250px] sm:h-[280px] md:h-[320px] lg:h-[340px] xl:h-[360px] shrink-0 overflow-hidden group cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.alt || "Manratan Resort Dining"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 360px, 400px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
