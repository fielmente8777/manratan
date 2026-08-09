"use client";

import { useWebContext } from "@/context-api/WebContext";


export default function MenuButton({
  color = "#fff",
}: {
  color?: string;
}) {
  const { isOpenNavBar, setIsOpenNavBar } = useWebContext();

  return (
    <button
      onClick={() => setIsOpenNavBar(!isOpenNavBar)}
      className="relative w-8 h-8"
      aria-label="Menu"
    >
      <span
        style={{ backgroundColor: color }}
        className={`absolute left-0 top-2 h-[2px] w-full transition-all duration-500
        ${isOpenNavBar ? "translate-y-[6px] rotate-45" : ""}`}
      />

      <span
        style={{ backgroundColor: color }}
        className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 transition-all duration-300
        ${isOpenNavBar ? "opacity-0" : ""}`}
      />

      <span
        style={{ backgroundColor: color }}
        className={`absolute left-0 bottom-2 h-[2px] w-full transition-all duration-500
        ${isOpenNavBar ? "-translate-y-[6px] -rotate-45" : ""}`}
      />
    </button>
  );
}