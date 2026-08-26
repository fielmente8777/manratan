interface EventsTickerProps {
  items: string[];
}

export default function EventsTicker({ items }: EventsTickerProps) {
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-tertiary text- border-y border-secondary/20 overflow-hidden py-4 sm:py-5 select-none">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10 mx-3 sm:mx-5">
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-[serif] tracking-[0.15em] uppercase font-normal text-tertiary/90">
              {item}
            </span>
            <span className="text-xs sm:text-sm text-tertiary/60">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
