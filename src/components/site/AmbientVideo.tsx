"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { PlayIcon } from "./ui";

type Props = {
  src: string;
  poster: string;
  /** Describes what the clip shows; read out from the poster image. */
  alt: string;
  /** Sizing for the frame, e.g. "aspect-[9/16] w-full". */
  className?: string;
  sizes?: string;
  objectPosition?: string;
  /** Pass a ref to drive the clip from outside (seek to a chapter, read the time). */
  videoRef?: RefObject<HTMLVideoElement | null>;
  onTime?: (seconds: number) => void;
  /** Overlay content (captions, buttons), drawn above the video. */
  children?: ReactNode;
  controlTone?: "light" | "dark";
  /** Corner for the Pause/Play control; keep it clear of captions and burned-in logos. */
  controlAt?: "top-right" | "top-left" | "bottom-right";
};

type State = "idle" | "playing" | "paused";

const corner = { "top-right": "right-3 top-3", "top-left": "left-3 top-3", "bottom-right": "bottom-3 right-3" } as const;

/**
 * A muted, looping clip that costs nothing until it is near the screen: the poster and the video source are only
 * attached when the frame comes within 300 px of the viewport, and playback pauses when it scrolls away. Visitors who ask for reduced motion or have data saver on get the poster and a Play button instead of
 * autoplay. A Pause/Play control is always shown once the clip can play (WCAG 2.2.2).
 */
export default function AmbientVideo({
  src,
  poster,
  alt,
  className = "",
  sizes = "100vw",
  objectPosition,
  videoRef,
  onTime,
  children,
  controlTone = "light",
  controlAt = "top-right",
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const own = useRef<HTMLVideoElement | null>(null);
  const ref = videoRef ?? own;
  const [load, setLoad] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [auto, setAuto] = useState(true);
  const userPaused = useRef(false);
  const visible = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saver) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of a browser preference after mount
      setAuto(false);
      return;
    }
    const el = box.current;
    if (!el) return;
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          near.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    const seen = new IntersectionObserver(
      (entries) => {
        const v = ref.current;
        visible.current = entries.some((e) => e.isIntersecting);
        if (!v) return;
        if (visible.current && !userPaused.current) void v.play().catch(() => {});
        else if (!visible.current && !v.paused) v.pause();
      },
      { threshold: 0.25 },
    );
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [ref]);

  // Once the source is attached, start it if the frame is on screen. Muted must be set as a property for iOS.
  useEffect(() => {
    const v = ref.current;
    if (!v || !load) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    if (visible.current && !userPaused.current) void v.play().catch(() => {});
  }, [load, ref]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (!load) setLoad(true);
    if (v.paused) {
      userPaused.current = false;
      v.muted = true;
      // The source may only just have been attached; play once it can.
      const go = () => void v.play().catch(() => {});
      if (v.readyState >= 2 || v.src) go();
      else v.addEventListener("loadeddata", go, { once: true });
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const showing = state === "playing" || state === "paused";
  const light = controlTone === "light";

  return (
    <div ref={box} className={`relative isolate overflow-hidden bg-ink ${className}`}>
      {/* The poster waits for the frame to come near too, so it never competes with the hero on a phone connection. */}
      {load || !auto ? (
        <Image src={poster} alt={alt} fill sizes={sizes} className="-z-20 object-cover" style={objectPosition ? { objectPosition } : undefined} />
      ) : (
        <span className="sr-only">{alt}</span>
      )}
      <video
        ref={ref}
        src={load || !auto ? src : undefined}
        muted
        loop
        playsInline
        preload={load ? "auto" : "none"}
        onPlaying={() => setState("playing")}
        onPause={() => setState((s) => (s === "idle" ? s : "paused"))}
        onTimeUpdate={onTime ? (e) => onTime(e.currentTarget.currentTime) : undefined}
        className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-700 ${showing ? "opacity-100" : "opacity-0"}`}
        style={objectPosition ? { objectPosition } : undefined}
        aria-hidden="true"
        tabIndex={-1}
        data-ambient=""
      />
      {children}
      <button
        type="button"
        onClick={toggle}
        className={`absolute z-10 ${corner[controlAt]} inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] backdrop-blur-sm transition-colors ${
          light ? "bg-black/35 text-stone hover:bg-black/55" : "bg-stone/70 text-ink hover:bg-stone"
        }`}
        aria-label={state === "playing" ? "Pause video" : "Play video"}
      >
        {state === "playing" ? (
          <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" aria-hidden="true"><path d="M4 2h3v12H4zM9 2h3v12H9z" fill="currentColor" /></svg>
        ) : (
          <PlayIcon className="h-2.5 w-2.5" />
        )}
        <span>{state === "playing" ? "Pause" : "Play"}</span>
      </button>
    </div>
  );
}
