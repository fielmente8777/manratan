"use client";

import Image from "next/image";
import Link from "next/link";
import MenuButton from "./MenuButton";
import NavMenu from "./NavMenu";
import { navData } from "./navData";
import { LocationIcon } from "@/utils/icons";

const Navbar = () => {
  return (
    <>
      <header className="absolute top-8 left-0 w-full z-50">
        <div className="max_width">
          <div className="h-16 px-10 flex items-center justify-between">
            {/* Left: Logo & Location */}
            <div className="flex items-center gap-6 sm:gap-8">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.jpg"
                  alt="Manratan Resort Logo"
                  width={130}
                  height={42}
                  className="object-contain filter brightness-110 drop-shadow-md"
                />
              </Link>

              <Link
                href={navData.location.href}
                className="flex items-center gap-2 text-white text-xs tracking-[0.2em] hover:text-white/80 transition"
              >
                <LocationIcon />
                {navData.location.label}
              </Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <span className="text-white text-xs tracking-[0.2em] uppercase">
                Menu
              </span>

              <MenuButton />
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation Drawer Menu */}
      <NavMenu />
    </>
  );
};

export default Navbar;
