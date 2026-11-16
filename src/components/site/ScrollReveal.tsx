"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Shared one-time fade-up; content stays visible without JavaScript. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const main = document.querySelector("main");
    if (!main) return;

    // Some pages use a header for their hero, others use a section.
    const hero = main.querySelector(":scope > header, :scope > section");
    const blocks = new Set<HTMLElement>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("fx-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });

    const register = () => {
      const candidates = Array.from(main.querySelectorAll<HTMLElement>(
        "h2, h3, p, figure, .swiper, img"
      )).map((element) => {
        const parent = element.parentElement;
        return element.tagName === "IMG" && parent?.matches("div, span, a, picture, figure")
          ? parent : element;
      }).filter((element) =>
        !hero?.contains(element) && !blocks.has(element) &&
        !element.closest(".swiper-wrapper, figcaption, .reveal, .animate, .fx-ready, form, dialog, [role='dialog'], [data-no-reveal]") &&
        getComputedStyle(element).position !== "absolute" &&
        element.getBoundingClientRect().width > 0
      );
      const unique = [...new Set(candidates)];
      unique.filter((element) =>
        !unique.some((parent) => parent !== element && parent.contains(element)) &&
        element.getBoundingClientRect().top >= window.innerHeight * 0.9
      ).forEach((block) => {
        const index = Array.from(block.parentElement?.children ?? []).indexOf(block);
        block.style.setProperty("--fx-i", String(Math.min(index, 4)));
        block.classList.add("fx-ready");
        blocks.add(block);
        observer.observe(block);
      });
    };

    register();
    let frame = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(register);
    });
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
      blocks.forEach((block) => {
        block.classList.remove("fx-ready", "fx-in");
        block.style.removeProperty("--fx-i");
      });
    };
  }, [pathname]);

  return null;
}
