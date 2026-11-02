"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollFadeObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observers: IntersectionObserver[] = [];

    const setupObserver = () => {
      const sections = document.querySelectorAll<HTMLElement>("section:not([data-no-fade])");
      const explicitFadeElements = document.querySelectorAll<HTMLElement>(
        "[data-fade]:not([data-no-fade]), .scroll-reveal"
      );

      const viewportHeight = window.innerHeight;

      // Handle standard sections
      sections.forEach((section) => {
        // Skip navbars, dialogs, hero banners, top-level first elements, or explicitly excluded sections
        const main = section.closest("main");
        const isFirstSection = main ? main.firstElementChild === section : false;

        if (
          isFirstSection ||
          section.hasAttribute("data-no-fade") ||
          section.closest("[data-no-fade]") ||
          section.closest("nav") ||
          section.closest("dialog") ||
          section.querySelector("nav") ||
          section.classList.contains("hero") ||
          /hero|banner/i.test(section.className) ||
          /hero|banner/i.test(section.id)
        ) {
          return;
        }

        // Find inner content targets so section background stays visible
        let targets = Array.from(
          section.querySelectorAll<HTMLElement>(":scope > .max_width")
        );

        if (targets.length === 0) {
          targets = Array.from(
            section.querySelectorAll<HTMLElement>(":scope > div:not(.absolute)")
          );
        }

        if (targets.length === 0) {
          targets = Array.from(section.children).filter(
            (child) => !child.classList.contains("absolute") && child.tagName !== "NAV"
          ) as HTMLElement[];
        }

        if (targets.length === 0) return;

        const rect = section.getBoundingClientRect();
        const isAlreadyInViewport = rect.top < viewportHeight - 40 && rect.bottom > 0;

        targets.forEach((target) => {
          target.classList.add("scroll-fade");
          if (isAlreadyInViewport) {
            target.classList.add("is-revealed");
          }
        });

        if (!isAlreadyInViewport) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  targets.forEach((target) => target.classList.add("is-revealed"));
                  observer.unobserve(entry.target);
                }
              });
            },
            {
              root: null,
              rootMargin: "0px 0px -40px 0px",
              threshold: 0.05,
            }
          );
          observer.observe(section);
          observers.push(observer);
        }
      });

      // Handle explicit [data-fade] elements
      explicitFadeElements.forEach((el) => {
        if (el.classList.contains("scroll-fade")) return;

        const rect = el.getBoundingClientRect();
        const isAlreadyInViewport = rect.top < viewportHeight - 40 && rect.bottom > 0;

        el.classList.add("scroll-fade");
        if (isAlreadyInViewport) {
          el.classList.add("is-revealed");
        } else {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("is-revealed");
                  observer.unobserve(entry.target);
                }
              });
            },
            {
              root: null,
              rootMargin: "0px 0px -40px 0px",
              threshold: 0.05,
            }
          );
          observer.observe(el);
          observers.push(observer);
        }
      });
    };

    const timer = setTimeout(setupObserver, 80);

    return () => {
      clearTimeout(timer);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  return null;
}
