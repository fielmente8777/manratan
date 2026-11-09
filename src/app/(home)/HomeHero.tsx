"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import BookingForm from "@/components/BookingForm";
import FilmPlayer from "@/components/site/FilmPlayer";
import { PlayIcon } from "@/components/site/ui";
import { photo, site, video } from "@/data/site";

const poster = photo("facade-dusk", "Manratan Resort at dusk, seen from the forecourt");

type LoopState = "idle" | "playing" | "paused" | "blocked";

export default function HomeHero() {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [state, setState] = useState<LoopState>("idle");
  const [film, setFilm] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Pick the loop for this screen: a portrait cut on phones, landscape elsewhere.
  // Skipped only when the visitor asks for reduced motion or has data saver on.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saver) return;
    const portrait = window.matchMedia("(max-width: 767px) and (orientation: portrait), (max-aspect-ratio: 4/5)").matches;
    // Start the loop only once the page has loaded and gone idle, so the poster, fonts and headline paint
    // first and the video never competes with them for bandwidth on a phone connection.
    let idle = 0;
    const begin = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      idle = ric ? ric(() => setSrc(portrait ? video.heroLoopMobile : video.heroLoop), { timeout: 2000 }) : window.setTimeout(() => setSrc(portrait ? video.heroLoopMobile : video.heroLoop), 300);
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    return () => {
      window.removeEventListener("load", begin);
      const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (cic) cic(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  // iOS and Android only autoplay when the element is muted *as a property* and inline.
  useEffect(() => {
    const v = vidRef.current;
    if (!v || !src) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    const p = v.play();
    if (p) p.catch(() => setState("blocked")); // e.g. Low Power Mode: show a play button over the poster
  }, [src]);

  const toggle = useCallback(() => {
    const v = vidRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = true;
      void v.play().then(() => setState("playing")).catch(() => setState("blocked"));
    } else {
      v.pause();
      setState("paused");
    }
  }, []);

  useEffect(() => {
    if (!film) return;
    vidRef.current?.pause();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFilm(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      if (state === "playing") void vidRef.current?.play().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [film]);

  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink text-stone" aria-label="Welcome to Manratan Resort">
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        preload
        fetchPriority="high"
        quality={90}
        sizes="100vw"
        className="-z-20 object-cover object-[50%_40%]"
      />
      {src && (
        <video
          ref={vidRef}
          key={src}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onPlaying={() => setState("playing")}
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-[1400ms] ${
            state === "playing" || state === "paused" ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/20 to-black/75" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_48%_36%_at_50%_44%,rgba(20,13,9,0.55),transparent_75%)]" />

      <div className="flex flex-1 flex-col items-center justify-center px-5 pt-28 pb-8 text-center">
        <h1 className="hero-rise">
          <span className="sr-only">Manratan Resort, Narsinghgarh. {site.tagline}</span>
          <Image
            src="/images/nav.png"
            alt=""
            width={479}
            height={203}
            preload
            fetchPriority="high"
            unoptimized
            className="mx-auto h-auto w-[min(66vw,340px)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
          />
        </h1>
        <p className="hero-rise delay-1 t-script mt-4 text-[clamp(1.75rem,3.2vw,2.8rem)] leading-tight text-stone drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]" aria-hidden="true">
          {site.tagline}
        </p>
        <p className="hero-rise delay-2 t-label mt-5 flex items-center gap-3 text-[0.6rem] tracking-[0.16em] text-stone/90 sm:text-[0.68rem] sm:tracking-[0.22em]">
          <span className="hidden h-px w-8 bg-stone/50 sm:block" aria-hidden="true" />
          {site.destination}
          <span className="hidden h-px w-8 bg-stone/50 sm:block" aria-hidden="true" />
        </p>
      </div>

      <div className="hero-rise delay-2 relative w-full px-4 pb-6 sm:px-8 sm:pb-10 lg:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col-reverse items-stretch gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:max-w-[900px]">
            <BookingForm />
          </div>
          <div className="flex items-center justify-between gap-4 lg:mb-7 lg:justify-end">
            {src && (
              <button
                type="button"
                onClick={toggle}
                className="t-label inline-flex items-center gap-2 text-[0.62rem] text-stone/80 hover:text-stone"
                aria-label={state === "playing" ? "Pause background video" : "Play background video"}
              >
                {state === "playing" ? (
                  <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true"><path d="M4 2h3v12H4zM9 2h3v12H9z" fill="currentColor" /></svg>
                ) : (
                  <PlayIcon className="h-3 w-3" />
                )}
                <span>{state === "playing" ? "Pause" : "Play"}</span>
              </button>
            )}
            <button type="button" onClick={() => setFilm(true)} className="group inline-flex items-center gap-4 text-stone">
              <span className="t-label text-right leading-relaxed">
                Watch the film
                <span className="block normal-case tracking-normal text-[0.8rem] text-stone/75">A walk through Manratan</span>
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-stone/70 backdrop-blur-sm transition-colors duration-500 group-hover:bg-stone group-hover:text-ink sm:h-16 sm:w-16">
                <PlayIcon className="h-5 w-5 translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {state === "blocked" && (
        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-24 z-10 inline-flex items-center gap-2 rounded-full border border-stone/50 bg-black/30 px-4 py-2 text-xs text-stone backdrop-blur-sm"
        >
          <PlayIcon className="h-3 w-3" /> Play video
        </button>
      )}

      {film && (
        <div role="dialog" aria-modal="true" aria-label="Walkthrough film" className="fixed inset-0 z-[60] overflow-y-auto bg-ink/95 backdrop-blur-sm">
          <div className="mx-auto flex min-h-full max-w-[1400px] flex-col justify-center px-4 py-16 sm:px-8 sm:py-20">
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
