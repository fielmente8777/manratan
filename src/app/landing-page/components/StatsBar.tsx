import React from "react";

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsBarProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  {
    value: "4.3/5",
    label: "Guest rating, online aggregators",
  },
  {
    value: "[X] Yrs",
    label: "Serving Narsinghgarh",
  },
  {
    value: "[X] Rooms",
    label: "Pool-facing & garden view",
  },
  {
    value: "2000+ Guests",
    label: "Largest wedding lawn capacity",
  },
];

const StatsBar: React.FC<StatsBarProps> = ({ stats = defaultStats }) => {
  return (
    <section className="w-full bg-white border-y-[0.5px] border-[#C8A96A]">
      <div className="mx-auto max-w-[1440px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center justify-center min-h-[110px] lg:min-h-[133px] py-4 lg:py-0 ${
              index !== stats.length - 1
                ? "border-b-[0.5px] sm:border-b-0 sm:border-r-[0.5px] border-[#C8A96A]"
                : ""
            } ${index === 1 ? "sm:border-r-0 lg:border-r-[0.5px]" : ""}`}
          >
            <div className="w-full max-w-[240px] h-[69px] flex flex-col items-center justify-center gap-[12px] text-center">
              <h3 className="font-ivy text-[32px] font-normal not-italic leading-[40px] tracking-[0.07em] text-[#221811]">
                {stat.value}
              </h3>
              <p className="font-montserrat text-[14px] font-normal not-italic leading-none tracking-[0.03em] text-[#5E534A]">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
