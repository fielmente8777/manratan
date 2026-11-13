import type { AmenityIcon as Name } from "@/data/site";

/** Line icons for the amenities list, drawn to match the site's 1px diamond ornament. */
export default function AmenityIcon({ name, className = "h-8 w-8" }: { name: Name; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.1, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<Name, React.ReactNode> = {
    // Diya (oil lamp) with flame
    pooja: (
      <>
        <path d="M6 20c2.5 3.2 6 4.6 10 4.6s7.5-1.4 10-4.6H6Z" {...common} />
        <path d="M16 24.6v2.4M12 27h8" {...common} />
        <path d="M16 18.5c-1.8-1.4-2.2-3.3-1.2-5.4.6-1.3 1.2-2.4 1.2-4.1 1.6 1.5 3.3 3.7 2.6 6.4-.4 1.5-1.2 2.4-2.6 3.1Z" {...common} />
      </>
    ),
    // Vanity mirror
    parlour: (
      <>
        <ellipse cx="16" cy="12.5" rx="7" ry="8.5" {...common} />
        <ellipse cx="16" cy="12.5" rx="4.6" ry="6" {...common} opacity="0.6" />
        <path d="M16 21v5M10.5 27h11" {...common} />
      </>
    ),
    pool: (
      <>
        <path d="M5 21c2 0 2-1.4 4-1.4s2 1.4 4 1.4 2-1.4 4-1.4 2 1.4 4 1.4 2-1.4 4-1.4 2 1.4 4 1.4" {...common} />
        <path d="M5 25.5c2 0 2-1.4 4-1.4s2 1.4 4 1.4 2-1.4 4-1.4 2 1.4 4 1.4 2-1.4 4-1.4 2 1.4 4 1.4" {...common} />
        <path d="M11 18V8.5a2.5 2.5 0 0 1 5 0M19 18V8.5a2.5 2.5 0 0 1 5 0M11 12h8M11 15.5h8" {...common} />
      </>
    ),
    candle: (
      <>
        <rect x="12.5" y="14" width="7" height="12" rx="1" {...common} />
        <path d="M16 14v-2" {...common} />
        <path d="M16 11.5c-1.3-.9-1.6-2.2-.9-3.6.4-.8.9-1.6.9-2.9 1.1 1 2.3 2.6 1.8 4.4-.3 1-.8 1.6-1.8 2.1Z" {...common} />
        <path d="M8 27h16" {...common} />
      </>
    ),
    dining: (
      <>
        <path d="M3 5v6a2 2 0 0 0 4 0V5M5 5v22M27 27V5c2 2 2.5 5 2.5 8H27" {...common} />
        <circle cx="16" cy="17" r="7" {...common} />
        <circle cx="16" cy="17" r="5" {...common} />
        <path d="M13.5 19.5c-1.5-4 1.5-6 5-5-1 4-3 5.5-5 5ZM13.5 19.5l4-4" {...common} />
      </>
    ),
    hall: (
      <>
        <path d="M16 3v4M10 6v2c0 5 12 5 12 0V6M13 11v2M19 11v2" {...common} />
        <circle cx="16" cy="14" r="1" {...common} />
        <path d="M7 20h18M8 20v5c3 2 5 2 8 0 3 2 5 2 8 0v-5M8 25v4M24 25v4M3.5 16v13M3.5 25H6v4M28.5 16v13M28.5 25H26v4" {...common} />
      </>
    ),
    lawn: (
      <>
        <path d="M4 26h24" {...common} />
        <path d="M7 26c0-3 1-5 2.5-6.5M11 26c0-4 .8-6.8 2.2-8.8M16 26V15M21 26c0-4-.8-6.8-2.2-8.8M25 26c0-3-1-5-2.5-6.5" {...common} />
        <circle cx="23" cy="8" r="2.6" {...common} />
      </>
    ),
    terrace: (
      <>
        <path d="M5 13h22M7 13v13M25 13v13M5 26h22" {...common} />
        <path d="M10 13v-2.5c0-1 .8-1.8 1.8-1.8h8.4c1 0 1.8.8 1.8 1.8V13" {...common} />
        <path d="M11 19h10M11 19v4M21 19v4" {...common} />
      </>
    ),
    bed: (
      <>
        <path d="M4 24V9M4 18h24v6M28 24v-4" {...common} />
        <path d="M4 18v-3.5c0-1 .8-1.8 1.8-1.8h5.4c1 0 1.8.8 1.8 1.8V18M13 18v-2.5c0-1 .8-1.8 1.8-1.8h9.4c1.5 0 2.8 1.3 2.8 2.8V18" {...common} />
      </>
    ),
    parking: (
      <>
        <rect x="8" y="3" width="16" height="18" rx="3" {...common} />
        <path d="M13.5 17V7h3.8a3.2 3.2 0 0 1 0 6.4h-3.8M16 21v8M12 30h8" {...common} />
      </>
    ),
    "front-desk": (
      <>
        <circle cx="25" cy="8" r="4.5" {...common} />
        <path d="M25 5.5V8l2 1.3M3 19h21M4 19v9h19v-9M4 24h19M10 18a4 4 0 0 1 8 0M14 14v-1M12.5 13h3" {...common} />
      </>
    ),
    "room-service": (
      <>
        <circle cx="16" cy="5" r="1.5" {...common} />
        <path d="M16 6.5V9M5 24a11 11 0 0 1 22 0M3 24h26M5 27h22M9 19c.8-2.3 2.3-3.8 4.2-4.6" {...common} />
      </>
    ),
    garden: (
      <>
        <path d="M3 17h26M5 17a11 11 0 0 1 22 0M16 6V3M7 17v10M12 17v10M20 17v10M25 17v10M2 27h28M3 27l1-3 1 3M27 27l1-3 1 3" {...common} />
      </>
    ),
    wifi: (
      <>
        <path d="M5 13c6.2-5.6 15.8-5.6 22 0M8.6 16.8c4.2-3.7 10.6-3.7 14.8 0M12.3 20.6c2.1-1.8 5.3-1.8 7.4 0" {...common} />
        <circle cx="16" cy="24.2" r="1.2" fill="currentColor" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
