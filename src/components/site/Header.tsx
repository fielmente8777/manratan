"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useWebContext } from "@/context-api/WebContext";
import { navLinks, site } from "@/data/site";
import { Diamond } from "./ui";

/** Routes that open on a full-bleed image, so the header can sit transparent over it. */
const overHero = (path: string) =>
  path === "/" ||
  path.startsWith("/accommodation") ||
  path.startsWith("/about") ||
  path.startsWith("/events") ||
  path.startsWith("/blogs");

export default function Header() {
  const pathname = usePathname() || "/";
  const { isOpenNavBar: open, setIsOpenNavBar: setOpen, setIsOpenPopUpForm } = useWebContext();
  const transparentRoute = overHero(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    setOpen(false);
    setHidden(false);
    setScrolled(window.scrollY > 40);
  }, [pathname, setOpen]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        setHidden(y > lastY.current && y > 160);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparentRoute || scrolled || open;
  const showLogo = solid || pathname !== "/";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-700 ease-[var(--ease-lux)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "bg-ink/95 backdrop-blur-md" : "bg-gradient-to-b from-black/45 to-transparent"}`}
      >
        <div className="relative mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10 text-stone">
          {/* Left: location (approved design) */}
          <a
            href={site.contact.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="t-label hidden md:inline-flex items-center gap-2 text-stone/90 hover:text-white transition-colors"
          >
            <PinIcon />
            {site.short}
          </a>

          {/* Centre: monogram */}
          <Link
            href="/"
            aria-label="Manratan Resort home"
            className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-700 ${
              showLogo ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image src="/images/nav.png" alt="Manratan Resort" width={118} height={50} className="h-[46px] w-auto" preload />
          </Link>

          <span className="md:hidden" />

          {/* Right: book + menu */}
          <div className="flex items-center gap-5 sm:gap-7">
            <button
              type="button"
              onClick={() => setIsOpenPopUpForm(true)}
              className="t-label hidden sm:inline-flex border border-stone/50 px-5 py-2.5 hover:bg-stone hover:text-ink transition-colors duration-500"
            >
              Book your stay
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="t-label inline-flex items-center gap-3 py-2"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span className={`absolute left-0 h-px w-7 bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px bg-current transition-all duration-500 ${open ? "top-1.5 w-7 -rotate-45" : "top-3 w-5"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} onBook={() => { setOpen(false); setIsOpenPopUpForm(true); }} />

      {!transparentRoute && <div className="h-[76px] bg-ink" aria-hidden="true" />}
    </>
  );
}

function MenuOverlay({ open, onClose, onBook }: { open: boolean; onClose: () => void; onBook: () => void }) {
  const [active, setActive] = useState(0);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className={`fixed inset-0 z-40 bg-ink text-stone transition-[opacity,visibility] duration-700 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="mx-auto grid h-full max-w-[1600px] grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 px-5 sm:px-8 lg:px-10 pt-[110px] pb-10 overflow-y-auto">
        <nav aria-label="Main" className="flex flex-col justify-center">
          <ul className="space-y-1 sm:space-y-2">
            {navLinks.map((l, i) => (
              <li
                key={l.href}
                className={`transition-all duration-700 ease-[var(--ease-lux)] ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
              >
                <Link
                  ref={i === 0 ? firstLink : undefined}
                  href={l.href}
                  onClick={onClose}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group inline-flex items-center gap-4 t-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.15] transition-colors duration-500 ${
                    active === i ? "text-stone" : "text-stone/45 hover:text-stone"
                  }`}
                >
                  <Diamond className={`w-4 h-4 text-brass transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`} />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 border-t border-stone/15 pt-8 text-sm text-stone/70">
            <div>
              <p className="t-label text-stone/50 mb-2">Reservations</p>
              <a href={`tel:${site.contact.phone[0].replace(/\s/g, "")}`} className="block hover:text-stone">{site.contact.phone[0]}</a>
              <a href={`mailto:${site.contact.email}`} className="block hover:text-stone">{site.contact.email}</a>
            </div>
            <div className="sm:col-span-2">
              <p className="t-label text-stone/50 mb-2">Find us</p>
              <p className="max-w-sm leading-relaxed">{site.contact.address}</p>
            </div>
            <button type="button" onClick={onBook} className="sm:hidden t-label border border-stone/50 px-5 py-3 text-stone">
              Book your stay
            </button>
          </div>
        </nav>

        <div className="relative hidden lg:block overflow-hidden" aria-hidden="true">
          {navLinks.map((l, i) => (
            <Image
              key={l.href}
              src={l.image.src}
              alt=""
              fill
              sizes="45vw"
              className={`object-cover transition-opacity duration-1000 ${active === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
      <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}
