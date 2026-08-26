"use client";

import Image from "next/image";
import Link from "next/link";
import MenuButton from "./MenuButton";
import NavMenu from "./NavMenu";
import { navData } from "./navData";
import { LocationIcon } from "@/utils/icons";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SectionWithContainer } from "../sectionComponants";

const Navbar = () => {
  const pathname = usePathname();

  const paths = ["/", "/rooms/"];
  const isTransparent = paths.includes(pathname);

  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setVisible(true);

    lastScrollY.current = window.scrollY;

    setScrolled(window.scrollY > 50);
  }, [pathname]);

  useEffect(() => {
    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <SectionWithContainer defaultPadding={false}>
        <header
          className={`
    fixed top-0 left-0 w-full z-50
    transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
        will-change-transform
        ${visible ? "translate-y-0" : "-translate-y-full"}
        ${
          isTransparent
            ? scrolled
              ? "bg-primary backdrop-blur-xl"
              : "bg-transparent"
            : "bg-primary "
        }
      `}
        >
          <nav className="flex h-[80px] w-full items-center justify-between px-6 lg:px-12 xl:px-16">
            <div className="flex items-center gap-6">
              {/* Left */}
              <Link href="/" className="relative h-[55px] w-[125px] shrink-0">
                <Image
                  src={navData.logo}
                  alt="Logo"
                  fill
                  className="object-contain object-left"
                />
              </Link>

              <Link
                href={navData.location.href}
                className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] text-white"
              >
                <LocationIcon />
                {navData.location.label}
              </Link>
            </div>

            {/* Right */}

            <div className="flex items-center gap-4">
              <span
                className={`
                text-xs
                uppercase
                tracking-[0.2em]
                text-white
              `}
              >
                Menu
              </span>

              <MenuButton />
            </div>
          </nav>

          <NavMenu />
        </header>
        {!isTransparent && <div className="h-[80px] w-full" />}
      </SectionWithContainer>
    </>
  );
};

export default Navbar;
