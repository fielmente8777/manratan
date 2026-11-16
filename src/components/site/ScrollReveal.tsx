"use client";

import { useEffect } from "react";

/** Midori's one-time fade-up, with content visible before JavaScript runs. */
export default function ScrollReveal() {
  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const main = document.querySelector("main");
    if (!main) return;

    const hero = main.querySelector("section");
    const candidates = Array.from(main.querySelectorAll<HTMLElement>(
      "section h2, section h3, section p, section figure, section .swiper, section img"
    )).map((element) => element.tagName === "IMG" ? element.parentElement : element)
      .filter((element): element is HTMLElement => !!element &&
        !hero?.contains(element) &&
        !element.closest(".swiper-wrapper, figcaption, .reveal, .animate") &&
        getComputedStyle(element).position !== "absolute" &&
        element.getBoundingClientRect().width > 0
      );
    const unique = [...new Set(candidates)];
    const blocks = unique.filter((element) =>
      !unique.some((parent) => parent !== element && parent.contains(element)) &&
      element.getBoundingClientRect().top >= window.innerHeight * 0.9
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("fx-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });

    blocks.forEach((block) => {
      const index = Array.from(block.parentElement?.children ?? []).indexOf(block);
      block.style.setProperty("--fx-i", String(Math.min(index, 4)));
      block.classList.add("fx-ready");
      observer.observe(block);
    });

    return () => {
      observer.disconnect();
      blocks.forEach((block) => {
        block.classList.remove("fx-ready", "fx-in");
        block.style.removeProperty("--fx-i");
      });
    };
  }, []);

  return null;
}
