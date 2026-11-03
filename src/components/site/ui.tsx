import Link from "next/link";
import type { ComponentProps, ElementType, ReactNode } from "react";

/** The diamond from the Manratan monogram, used as the site's only ornament. */
export function Diamond({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2.5 8.2 6.6 3h10.8l4.1 5.2L12 21.5 2.5 8.2Z M2.5 8.2h19 M9.4 3 7.6 8.2 12 21.5 M14.6 3l1.8 5.2L12 21.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A hairline with the diamond in the middle. */
export function GemRule({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const c = tone === "dark" ? "text-ink/40" : "text-stone/40";
  return (
    <div className={`flex items-center gap-4 ${c} ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current" />
      <Diamond className="w-3.5 h-3.5 text-brass" />
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}

type TitleProps = {
  main: string;
  script?: string;
  as?: ElementType;
  align?: "left" | "center";
  tone?: "dark" | "light";
  size?: "md" | "lg" | "xl";
  className?: string;
};

/** Approved heading pattern: IvyOra uppercase with a script line set under it. */
export function Title({ main, script, as: Tag = "h2", align = "left", tone = "dark", size = "lg", className = "" }: TitleProps) {
  const sizes = {
    md: "text-[clamp(1.75rem,2.6vw,2.6rem)]",
    lg: "text-[clamp(2.25rem,4.2vw,4rem)]",
    xl: "text-[clamp(2.75rem,6.2vw,6rem)]",
  };
  const scriptSizes = { md: "text-[clamp(1.35rem,2vw,1.9rem)]", lg: "text-[clamp(1.6rem,2.6vw,2.5rem)]", xl: "text-[clamp(1.9rem,3.2vw,3.2rem)]" };
  const color = tone === "dark" ? "text-ink" : "text-stone";
  return (
    <Tag className={`${color} ${align === "center" ? "text-center" : ""} ${className}`}>
      <span className={`t-display block ${sizes[size]}`}>{main}</span>
      {script && (
        <span className={`t-script block ${scriptSizes[size]} -mt-[0.1em] ${align === "center" ? "" : "pl-[22%] sm:pl-[18%]"}`}>
          <span className={align === "center" ? "inline-block translate-x-[18%]" : ""}>{script}</span>
        </span>
      )}
    </Tag>
  );
}

type LinkProps = ComponentProps<typeof Link> & { children: ReactNode; tone?: "dark" | "light" };

/** Quiet text link with a hairline (the approved "KNOW MORE" treatment). */
export function LineLink({ children, tone = "dark", className = "", ...rest }: LinkProps) {
  return (
    <Link {...rest} className={`link-line t-label ${tone === "dark" ? "text-ink" : "text-stone"} ${className}`}>
      {children}
    </Link>
  );
}

/** Solid button-link. */
export function ButtonLink({ children, tone = "dark", className = "", ...rest }: LinkProps) {
  const t =
    tone === "dark"
      ? "bg-ink text-stone hover:bg-ink-soft"
      : "bg-stone text-ink hover:bg-white";
  return (
    <Link
      {...rest}
      className={`t-label inline-flex items-center justify-center px-8 py-4 transition-colors duration-500 ${t} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function PlayIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" />
    </svg>
  );
}
