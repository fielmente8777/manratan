"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import BookingForm from "@/components/BookingForm";
import { PlayIcon } from "@/components/site/ui";
import { photo, site, video } from "@/data/site";

const poster = photo(
  "facade-dusk",
  "Manratan Resort at dusk, seen from the forecourt"
);

type LoopState = "idle" | "playing" | "paused" | "blocked";

export default function HomeHero() {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [state, setState] = useState<LoopState>("idle");

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const saver = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (reduce || saver) return;
    const portrait = window.matchMedia(
      "(max-width: 767px) and (orientation: portrait), (max-aspect-ratio: 4/5)"
    ).matches;
    let idle = 0;
    const begin = () => {
      const ric = (
        window as Window & {
          requestIdleCallback?: (
            cb: () => void,
            o?: { timeout: number }
          ) => number;
        }
      ).requestIdleCallback;
      idle = ric
        ? ric(() => setSrc(portrait ? video.heroLoopMobile : video.heroLoop), {
            timeout: 2000,
          })
        : window.setTimeout(
            () => setSrc(portrait ? video.heroLoopMobile : video.heroLoop),
            300
          );
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    return () => {
      window.removeEventListener("load", begin);
      const cic = (
        window as Window & { cancelIdleCallback?: (id: number) => void }
      ).cancelIdleCallback;
      if (cic) cic(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    const v = vidRef.current;
    if (!v || !src) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    const p = v.play();
    if (p) p.catch(() => setState("blocked"));
  }, [src]);

  const toggle = useCallback(() => {
    const v = vidRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = true;
      void v
        .play()
        .then(() => setState("playing"))
        .catch(() => setState("blocked"));
    } else {
      v.pause();
      setState("paused");
    }
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink text-stone"
      aria-label="Welcome to Manratan Resort"
    >
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
            state === "playing" || state === "paused"
              ? "opacity-100"
              : "opacity-0"
          }`}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/5 to-black/55" />

      <div className="flex flex-1 flex-col items-center justify-center px-5 pt-28 pb-8 text-center">
        <h1 className="hero-rise">
          <span className="sr-only">
            Manratan Resort, Narsinghgarh. {site.tagline}
          </span>
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
        <p
          className="hero-rise delay-1 t-script mt-4 text-[clamp(1.75rem,3.2vw,2.8rem)] leading-tight text-stone drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]"
          aria-hidden="true"
        >
          {site.tagline}
        </p>
        <p className="hero-rise delay-2 t-label mt-5 flex items-center gap-3 text-[0.6rem] tracking-[0.16em] text-stone/90 sm:text-[0.68rem] sm:tracking-[0.22em]">
          <span
            className="hidden h-px w-8 bg-stone/50 sm:block"
            aria-hidden="true"
          />
          {site.destination}
          <span
            className="hidden h-px w-8 bg-stone/50 sm:block"
            aria-hidden="true"
          />
        </p>
      </div>

      <div className="hero-rise delay-2 relative w-full px-4 pb-6 sm:px-8 sm:pb-10 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <BookingForm />
          {src && (
            <div className="mt-3 flex justify-start">
              <button
                type="button"
                onClick={toggle}
                className="t-label inline-flex items-center gap-2 text-[0.62rem] text-stone/70 hover:text-stone"
                aria-label={
                  state === "playing"
                    ? "Pause background video"
                    : "Play background video"
                }
              >
                {state === "playing" ? (
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3 w-3"
                    aria-hidden="true"
                  >
                    <path d="M4 2h3v12H4zM9 2h3v12H9z" fill="currentColor" />
                  </svg>
                ) : (
                  <PlayIcon className="h-3 w-3" />
                )}
                <span>{state === "playing" ? "Pause" : "Play"} video</span>
              </button>
            </div>
          )}
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
    </section>
  );
}
