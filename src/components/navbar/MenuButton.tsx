"use client";

import Image from "next/image";
import { useWebContext } from "@/context-api/WebContext";
import { MenuIcon } from "@/utils/icons";

export default function MenuButton({ color = "#fff" }: { color?: string }) {
  const { isOpenNavBar, setIsOpenNavBar } = useWebContext();

  return (
    <button
      type="button"
      onClick={() => setIsOpenNavBar(!isOpenNavBar)}
      className="flex items-center gap-4"
      aria-label="Menu"
    >
      <MenuIcon />
    </button>
  );
}
