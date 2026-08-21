"use client";

import Link from "next/link";
import { useWebContext } from "@/context-api/WebContext";
import { navData } from "./navData";

const NavMenu = () => {
  const { isOpenNavBar, setIsOpenNavBar } = useWebContext();

  return (
    <div
      className={`absolute top-full left-0 w-full z-40
        bg-primary text-white
        transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
        overflow-hidden ${
          isOpenNavBar ? "max-h-dvh h-dvh opacity-100" : "max-h-0 opacity-0"
        }`}
    >
      <nav className="max_width py-12 md:py-16">
        <ul className="flex flex-col items-center gap-6 md:gap-8">
          {navData.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setIsOpenNavBar(false)}
                className="
                  text-xl md:text-4xl
                  font-primary
                  uppercase tracking-[0.12em]
                  text-white/90
                  transition-colors duration-300
                  hover:text-white
                "
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* <div className="flex h-full flex-col items-center justify-center gap-8">
        {navData.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpenNavBar(false)}
            className="font-primary text-5xl text-white transition hover:text-secondary"
          >
            {link.label}
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default NavMenu;
