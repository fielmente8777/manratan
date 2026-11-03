"use client";

import type { ReactNode } from "react";
import { useWebContext } from "@/context-api/WebContext";

/** Opens the existing enquiry form (the same lead flow the site already uses). */
export default function BookButton({
  children = "Book your stay",
  tone = "dark",
  className = "",
}: {
  children?: ReactNode;
  tone?: "dark" | "light" | "outline";
  className?: string;
}) {
  const { setIsOpenPopUpForm } = useWebContext();
  const t = {
    dark: "bg-ink text-stone hover:bg-ink-soft",
    light: "bg-stone text-ink hover:bg-white",
    outline: "border border-ink/40 text-ink hover:bg-ink hover:text-stone",
  }[tone];
  return (
    <button
      type="button"
      onClick={() => setIsOpenPopUpForm(true)}
      className={`t-label inline-flex items-center justify-center px-8 py-4 transition-colors duration-500 ${t} ${className}`}
    >
      {children}
    </button>
  );
}
