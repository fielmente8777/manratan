"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BookingForm from "@/components/BookingForm";
import FilmPlayer from "@/components/site/FilmPlayer";
import { PlayIcon } from "@/components/site/ui";
import { photo, video } from "@/data/site";

const poster = photo("facade-dusk", "Manratan Resort at dusk, seen from the forecourt");

export default function HomeHero() {
  const [loop, setLoop] = useState(false);
  const [ready, setReady] = useState(false);
  const [film, setFilm] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Play the background loop only where it is welcome: wide screens, motion allowed, not on data saver.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setLoop(!reduce && wide && !saver);
  }, []);

  useEffect(() => {
    if (!film) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFilm(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [film]);

  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink text-stone" aria-label="Welcome to Manratan Resort">
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        preload
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        className="-z-20 object-cover object-[50%_40%]"
      />
      {loop && (
        <video
          src={video.heroLoop}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-[1600ms] ${ready ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/20 to-black/70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_44%_34%_at_50%_46%,rgba(20,13,9,0.55),transparent_75%)]" />

      <div className="flex flex-1 flex-col items-center justify-center px-5 pt-28 pb-10 text-center">
        <h1 className="hero-rise">
          <span className="sr-only">Manratan Resort, Narsinghgarh</span>
          <Image
            src="/images/nav.png"
            alt=""
            width={479}
            height={203}
            preload
            className="mx-auto h-auto w-[min(70vw,360px)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
          />
        </h1>
        <p className="hero-rise delay-1 t-script mt-5 text-[clamp(1.7rem,3vw,2.6rem)] text-stone/95">The Kashmir of Malwa</p>
      </div>

      <div className="hero-rise delay-2 relative w-full px-5 sm:px-8 lg:px-10 pb-8 sm:pb-10">
        <div className="mx-auto flex max-w-[1320px] flex-col-reverse items-stretch gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="mr-booking w-full lg:max-w-[880px]">
            <BookingForm className="!mx-0 !max-w-none" />
          </div>
          <button
            type="button"
            onClick={() => setFilm(true)}
            className="group inline-flex items-center gap-4 self-end text-stone"
          >
            <span className="t-label hidden sm:block text-right leading-relaxed">
              Watch the film
              <span className="block normal-case tracking-normal text-[0.8rem] text-stone/70">A walk through Manratan</span>
            </span>
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-stone/70 backdrop-blur-sm transition-colors duration-500 group-hover:bg-stone group-hover:text-ink">
              <PlayIcon className="w-5 h-5 translate-x-0.5" />
            </span>
          </button>
        </div>
      </div>

      {film && (
        <div role="dialog" aria-modal="true" aria-label="Walkthrough film" className="fixed inset-0 z-[60] overflow-y-auto bg-ink/95 backdrop-blur-sm">
          <div className="mx-auto flex min-h-full max-w-[1400px] flex-col justify-center px-5 py-20 sm:px-8">
            <div className="mb-6 flex items-center justify-between">
              <p className="t-display text-xl">A walk through Manratan</p>
              <button ref={closeRef} type="button" onClick={() => setFilm(false)} className="t-label link-line text-stone">
                Close
              </button>
            </div>
            <FilmPlayer autoPlay />
          </div>
        </div>
      )}
    </section>
  );
}
