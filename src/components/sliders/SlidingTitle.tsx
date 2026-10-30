"use client";
import "./sliding.title.scss";

interface SlidingTitleProps {
  titles: string[];
  bgClassName?: string;
  textClassName?: string;
}

export default function SlidingTitle({
  titles,
  bgClassName = "bg-white",
  textClassName = "text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[serif]",
}: SlidingTitleProps) {
  titles = [...titles, ...titles];

  return (
    <div className={`relative overflow-hidden py-4 sm:py-5 border-y border-secondary/20 max_screen_width ${bgClassName}`}>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {titles.map((t, i) => (
            <span
              key={i}
              className={`marquee-item tracking-[0.15em] uppercase ${textClassName}`}
            >
              <span>{t}</span>
              <span className="separator">
                <ICon />
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export const ICon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-primary shrink-0"
  >
    <path d="M12 0L15.5 8.5L24 12L15.5 15.5L12 24L8.5 15.5L0 12L8.5 8.5L12 0Z" />
  </svg>
);
