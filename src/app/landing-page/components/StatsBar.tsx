import React from "react";
import { SectionWithContainer } from "@/components/sectionComponants";

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
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="bg-white border-y-[0.5px] border-[#C8A96A]"
      containerClassName="!p-0"
    >
      <div className="w-full grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center justify-center min-h-[96px] sm:min-h-[110px] lg:min-h-[133px] py-3.5 sm:py-4 lg:py-0 px-2 sm:px-4 ${index % 2 === 0
                ? "border-r-[0.5px] border-[#C8A96A]"
                : ""
              } ${index < 2
                ? "border-b-[0.5px] lg:border-b-0 border-[#C8A96A]"
                : ""
              } ${index === 0 || index === 1 || index === 2
                ? "lg:border-r-[0.5px] lg:border-[#C8A96A]"
                : ""
              }`}
          >
            <div className="w-full max-w-[240px] flex flex-col items-center justify-center gap-1.5 sm:gap-[12px] text-center">
              <h3 className="font-ivy text-[22px] sm:text-[28px] lg:text-[32px] font-normal not-italic leading-[28px] sm:leading-[36px] lg:leading-[40px] tracking-[0.05em] sm:tracking-[0.07em] text-[#221811]">
                {stat.value}
              </h3>
              <p className="font-montserrat text-[11px] sm:text-[13px] lg:text-[14px] font-normal not-italic leading-tight sm:leading-none tracking-[0.02em] sm:tracking-[0.03em] text-[#5E534A]">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWithContainer>
  );
};

export default StatsBar;
