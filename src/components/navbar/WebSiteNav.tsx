"use client";

import Image from "next/image";
import Link from "next/link";
import MenuButton from "./MenuButton";
import { navData } from "./navData";
import { LocationIcon } from "@/utils/icons";

const Navbar = () => {
  return (
    <header className="absolute top-8 left-0 w-full z-50">
      <div className="max_width">
        <div className=" h-16 px-10 flex items-center justify-between">
          {/* Left */}

          <Link
            href={navData.location.href}
            className="flex items-center gap-2 text-white text-xs tracking-[0.2em]"
          >
            <LocationIcon />
            {navData.location.label}
          </Link>

          {/* Center */}

          <Link href="/">
            {/* <Image src={navData.logo} alt="Logo" width={180} height={55} /> */}
          </Link>

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
  );
};

export default Navbar;
