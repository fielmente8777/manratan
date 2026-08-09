"use client";

import Link from "next/link";
import { useWebContext } from "@/context-api/WebContext";
import { navData } from "./navData";

const NavMenu = () => {
  const { isOpenNavBar, setIsOpenNavBar } = useWebContext();

  return (
    <div
      className={`fixed inset-0 bg-primary z-40 transition-all duration-700
      ${
        isOpenNavBar
          ? "opacity-100 visible"
          : "opacity-0 invisible"
      }`}
    >
      <div className="h-full flex items-center justify-center">
        <ul className="space-y-10 text-center">
          {navData.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setIsOpenNavBar(false)}
                className="text-5xl font-primary text-white hover:text-secondary transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;