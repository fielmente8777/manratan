"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import BookingForm from "@/components/BookingForm";
import FilmModal from "@/components/site/FilmModal";
import { FilmPlayIcon, PlayIcon } from "@/components/site/ui";
import { Section } from "@/components/sectionComponants";
import { site, video } from "@/data/site";
import styles from "./HomeHero.module.css";

type LoopState = "idle" | "playing" | "paused" | "blocked";

export default function HomeHero() {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [state, setState] = useState<LoopState>("idle");
  const [filmOpen, setFilmOpen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const saver = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (reduce || saver) return;
    let idle = 0;
    const begin = () => {
      setSrc(video.walkthrough);
    };
    if (document.readyState === "complete" || document.readyState === "interactive") {
      idle = window.setTimeout(begin, 200);
    } else {
      window.addEventListener("load", begin, { once: true });
      idle = window.setTimeout(begin, 1000);
    }
    return () => {
      window.removeEventListener("load", begin);
      window.clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    const v = vidRef.current;
    if (!v || !src) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    const attemptPlay = () => {
      v.muted = true;
      v.play()
        .then(() => setState("playing"))
        .catch(() => {
          setState("paused");
        });
    };
    attemptPlay();
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
    <Section
      defaultPadding={false}
      className={`${styles.hero} relative isolate flex min-h-[78svh] w-full flex-col overflow-hidden bg-ink text-stone md:min-h-[min(100svh,1000px)]`}
      aria-label="Welcome to Manratan Resort"
    >
      <div className={styles.visual}>
        <Image
          src="/final-view/first-light1.webp"
          alt="Manratan Resort, from the current resort film"
          fill
          preload
          fetchPriority="high"
          unoptimized
          sizes="100vw"
          className="-z-20 object-cover object-[50%_40%]"
        />
        {src && (
          <video
            ref={vidRef}
            key={src}
            src={src}
            poster="/final-view/first-light1.webp"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onLoadedData={() => {
              const v = vidRef.current;
              if (v && v.paused) {
                v.muted = true;
                v.play().then(() => setState("playing")).catch(() => {});
              }
            }}
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
      </div>

            {src && (
              <button
                type="button"
                onClick={toggle}
                className={`${styles.pauseButton} t-label inline-flex items-center gap-2 text-[0.62rem] text-stone/80 hover:text-stone`}
                aria-label={state === "playing" ? "Pause background video" : "Play background video"}
              >
                {state === "playing" ? (
                  <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
                    <path d="M4 2h3v12H4zM9 2h3v12H9z" fill="currentColor" />
                  </svg>
                ) : (
                  <PlayIcon className="h-3 w-3" />
                )}
                <span>{state === "playing" ? "Pause" : "Play"}</span>
              </button>
            )}

      <div className={`${styles.heading} flex flex-1 flex-col items-center justify-center px-5 pb-6 pt-24 text-center md:pb-8 md:pt-28`}>
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
            className="mx-auto h-auto w-[min(56vw,240px)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)] sm:w-[min(66vw,340px)]"
          />
        </h1>
        <p
          className="hero-rise delay-1 t-script mt-3 text-[clamp(1.5rem,3.2vw,2.8rem)] leading-tight text-stone drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:mt-3 sm:text-[clamp(1.75rem,3.2vw,2.8rem)]"
          aria-hidden="true"
        >
          {site.tagline}
        </p>
        <p className="hero-rise delay-2 t-label mt-3 flex items-center gap-3 text-[0.6rem] tracking-[0.16em] text-stone/90 sm:mt-5 sm:text-[0.68rem] sm:tracking-[0.22em]">
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

      <div className={`${styles.bookingLayout} hero-rise delay-2 relative w-full px-4 pb-4 sm:px-8 sm:pb-6 lg:px-10`}>
        <div className={`${styles.bookingRow} mx-auto flex max-w-[1500px] flex-col-reverse items-stretch gap-4 lg:grid lg:grid-cols-[minmax(72px,1fr)_minmax(0,860px)_minmax(72px,1fr)] lg:items-center lg:gap-6`}>
          <div className={`${styles.formPanel} w-full lg:col-start-2 lg:row-start-1`}>
            <BookingForm />
          </div>
          <div className={`${styles.controls} flex items-center justify-between gap-4 lg:contents`}>
            <span />
            <button
              type="button"
              onClick={() => setFilmOpen(true)}
              aria-haspopup="dialog"
              aria-label="Watch the Manratan film"
              className={`${styles.watchButton} group inline-flex items-center gap-4 text-stone lg:col-start-3 lg:row-start-1 lg:justify-self-end`}
            >
              <span className="t-label text-right leading-relaxed">
                Watch the film
                <span className="block normal-case tracking-normal text-[0.8rem] text-stone/75">A walk through Manratan</span>
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-stone/70 backdrop-blur-sm transition-colors duration-500 group-hover:bg-stone group-hover:text-ink sm:h-16 sm:w-16">
                <FilmPlayIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      {filmOpen && <FilmModal onClose={() => setFilmOpen(false)} bgVideo={vidRef} resumeBg={state === "playing"} />}


    </Section>
  );
}
