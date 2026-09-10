"use client";

interface AmenitiesTickerProps {
  items: string[];
}

const DiamondSeparator = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-[#1c1613] shrink-0 mx-8 sm:mx-10 md:mx-12"
  >
    <path d="M12 0L15.5 8.5L24 12L15.5 15.5L12 24L8.5 15.5L0 12L8.5 8.5L12 0Z" />
  </svg>
);

const AmenitiesTicker = ({ items }: AmenitiesTickerProps) => {
  if (!items || items.length === 0) return null;

  // Duplicate items array to ensure seamless continuous infinite scroll loop
  const marqueeList = [...items, ...items, ...items, ...items];

  return (
    <section className="w-full max_screen_width mx-auto bg-[#f6f4f0] border-y border-[#1c1613] py-6 sm:py-7 md:py-8 overflow-hidden">
      <div className="flex w-full overflow-hidden select-none">
        <div className="flex shrink-0 animate-marquee items-center justify-around whitespace-nowrap min-w-full">
          {marqueeList.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-[#1c1613] text-xl md:text-[56px] font-[serif] uppercase">
                {item}
              </span>
              <DiamondSeparator />
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex shrink-0 animate-marquee items-center justify-around whitespace-nowrap min-w-full"
        >
          {marqueeList.map((item, index) => (
            <div key={`dup-${index}`} className="flex items-center">
              <span className="text-[#1c1613] text-xl md:text-[56px] font-[serif] font-normal uppercase">
                {item}
              </span>
              <DiamondSeparator />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default AmenitiesTicker;
