"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/site/ui";
import { SectionWithContainer } from "@/components/sectionComponants";
import styles from "./Walkthrough.module.css";

const stops = [
  { title: "Reception", poster: "/media/walk-reception.jpg", alt: "A guest walking past the lattice screen at reception", start: 0, end: 3, still: 1.6 },
  { title: "Guest room", poster: "/media/walk-room.jpg", alt: "A guest walking through a guest room", start: 3.04, end: 5.52, still: 4.3 },
  { title: "Swadika", poster: "/media/walk-swadika.jpg", alt: "A guest walking through the Swadika restaurant", start: 5.56, end: 8.88, still: 7 },
  { title: "Blue Diamond pool", poster: "/media/walk-pool.jpg", alt: "A guest walking beside the Blue Diamond pool", start: 8.92, end: 11.25, still: 9.9 },
];
const source = "/media/walk-reference.mp4";
const number = (index: number) => String(index + 1).padStart(2, "0");

export default function Walkthrough() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const mediaRetries = useRef(stops.map(() => 0));
  const swipe = useRef({ x: 0, y: 0, suppressTap: false });
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState(() => stops.map(() => false));
  const previousRects = useRef<{ element: HTMLElement; rect: DOMRect }[] | null>(null);
  const shouldPlay = playing && visible && pageVisible;

  const goTo = useCallback((index: number) => {
    // Animate the existing phone card positions, without changing the layout.
    if (window.matchMedia("(max-width: 900px)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const panels = stageRef.current?.querySelectorAll<HTMLElement>("[data-walk-panel]");
      previousRects.current = panels ? Array.from(panels, (element) => ({
        element, rect: element.getBoundingClientRect(),
      })) : null;
    }
    setActive((index + stops.length) % stops.length);
  }, []);

  useLayoutEffect(() => {
    const previous = previousRects.current;
    previousRects.current = null;
    if (!previous) return;
    const animations = previous.map(({ element, rect }) => {
      const next = element.getBoundingClientRect();
      return element.animate([
        { transform: `translate(${rect.left - next.left}px, ${rect.top - next.top}px) scale(${rect.width / next.width}, ${rect.height / next.height})` },
        { transform: "none" },
      ], { duration: 700, easing: "cubic-bezier(.22,.61,.36,1)" });
    });
    return () => animations.forEach((animation) => animation.cancel());
  }, [active]);

  useEffect(() => {
    if (!shouldPlay || !load) return;
    let frame = 0;
    const advance = () => {
      const element = videos.current[active];
      if (element && element.currentTime >= stops[active].end) {
        goTo(active + 1);
        return;
      }
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [active, shouldPlay, load, goTo]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const nearby = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setLoad(true);
        nearby.disconnect();
      }
    }, { rootMargin: "300px 0px" });
    const onscreen = new IntersectionObserver((entries) => {
      setVisible(entries.some((entry) => entry.isIntersecting));
    }, { threshold: 0.2 });
    nearby.observe(stage);
    onscreen.observe(stage);
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      nearby.disconnect();
      onscreen.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Pre-seek inactive clips to their next start so chapter changes do not buffer on a fresh seek.
  useEffect(() => {
    const resets: number[] = [];
    videos.current.forEach((element, index) => {
      if (!element || element.readyState < 1) return;
      if (index !== active) {
        element.pause();
        if (Math.abs(element.currentTime - stops[index].start) > 0.05) {
          // Keep the outgoing frame intact until its fade and card movement finish.
          resets.push(window.setTimeout(() => {
            element.currentTime = stops[index].start;
          }, 1150));
        }
      } else if (element.currentTime < stops[index].start || element.currentTime >= stops[index].end) {
        element.currentTime = stops[index].start;
      }
    });
    return () => resets.forEach(window.clearTimeout);
  }, [active, load]);

  useEffect(() => {
    let cancelled = false;
    const listeners: { element: HTMLVideoElement; play: () => void }[] = [];
    videos.current.forEach((element, index) => {
      if (!element) return;
      element.muted = index === active ? muted : true;
      if (index === active && shouldPlay && load) {
        const play = () => {
          if (cancelled || element.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
          void element.play().catch((error: unknown) => {
            // Seeking may abort a pending play; canplay retries after the frame is ready.
            if (!cancelled && !(error instanceof DOMException && error.name === "AbortError")) setPlaying(false);
          });
        };
        element.addEventListener("canplay", play);
        listeners.push({ element, play });
        play();
      } else {
        element.pause();
      }
    });
    return () => {
      cancelled = true;
      listeners.forEach(({ element, play }) => element.removeEventListener("canplay", play));
    };
  }, [active, shouldPlay, muted, load]);

  const pick = (index: number) => {
    setLoad(true);
    goTo(index);
    setPlaying(true);
  };
  const navigate = (direction: 1 | -1) => {
    if (swipe.current.suppressTap) {
      swipe.current.suppressTap = false;
      return;
    }
    pick(active + direction);
  };
  const togglePlay = () => {
    setLoad(true);
    setPlaying((value) => !value);
  };
  const controls = (mobile = false) => (
    <div className={mobile ? styles.mobileControls : styles.buttons}>
      <button type="button" className={styles.control} onClick={togglePlay} aria-label={playing ? "Pause the walk" : "Play the walk"}>
        {playing ? (
          <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
            <rect x="2" y="1" width="3" height="14" rx="1" fill="currentColor" />
            <rect x="9" y="1" width="3" height="14" rx="1" fill="currentColor" />
          </svg>
        ) : <PlayIcon className="h-4 w-4" />}
      </button>
      <button type="button" className={styles.control} onClick={() => setMuted((value) => !value)} aria-label={muted ? "Turn sound on" : "Turn sound off"} aria-pressed={!muted}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 8v4h3l4 3V5L6 8z" />
          {muted ? <path d="m14 8 4 4m0-4-4 4" /> : <path d="M13.5 7.5a3.5 3.5 0 0 1 0 5m2-7a6.5 6.5 0 0 1 0 9" />}
        </svg>
      </button>
    </div>
  );
  const filmButton = (
    <p className={styles.filmLink}>Watch the full film here</p>
  );

  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionId="walkthrough"
      sectionClassName={styles.walk}
      containerClassName={styles.container}
      sectionProps={{ "aria-labelledby": "walk-title" }}
    >
        <div className={styles.layout} data-no-reveal>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>Filmed at the resort</p>
            <h2 id="walk-title" className={styles.title}>
              The Manratan Walk<span className={styles.script}>step inside</span>
            </h2>
            <p className={styles.count}><b>{number(active)}</b><span>/ 04</span></p>
            <div className={styles.desktopControls}>{controls()}{filmButton}</div>
          </div>

          <div
            ref={stageRef}
            id="manratan-walk"
            className={styles.stage}
            role="group"
            aria-label="Stops on the walk"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                pick(active + (event.key === "ArrowRight" ? 1 : -1));
              }
            }}
          >
            {stops.map((stop, index) => (
              <button
                key={stop.title}
                data-walk-panel
                type="button"
                className={`${styles.panel} ${active === index ? styles.active : ""}`}
                aria-pressed={active === index}
                onClick={() => { if (active !== index || !playing) pick(index); }}
              >
                <Image src={stop.poster} alt={stop.alt} fill quality={85} sizes="(max-width: 900px) 480px, 380px" className={styles.media} data-no-hover />
                <video
                  ref={(element) => { videos.current[index] = element; }}
                  src={load ? source : undefined}
                  poster={stop.poster}
                  muted={muted || active !== index}
                  playsInline
                  preload={load ? "auto" : "none"}
                  aria-hidden="true"
                  tabIndex={-1}
                  className={`${styles.media} ${ready[index] ? styles.videoReady : ""}`}
                  onCanPlay={() => setReady((values) => values[index] ? values : values.map((value, i) => i === index ? true : value))}
                  onError={(event) => {
                    // Recover a failed initial media load once; retain the poster if it still fails.
                    if (load && mediaRetries.current[index] === 0) {
                      mediaRetries.current[index] += 1;
                      event.currentTarget.load();
                    }
                  }}
                  onLoadedMetadata={(event) => {
                    event.currentTarget.currentTime = stop.start;
                  }}
                  onEnded={() => { if (active === index && shouldPlay) goTo(index + 1); }}
                />
                <span className={styles.shade} aria-hidden="true" />
                <span className={styles.label} aria-hidden={active === index}><span className={styles.labelNumber}>{number(index)}</span><span className={styles.labelTitle}>{stop.title}</span></span>
                <span className={styles.labelExpanded} aria-hidden={active !== index}><span className={styles.labelNumber}>{number(index)}</span><span className={styles.labelTitle}>{stop.title}</span></span>
              </button>
            ))}

            <div className={styles.mobileUi}>
              <div
                className={styles.tapZones}
                onTouchStart={(event) => {
                  swipe.current = { x: event.touches[0].clientX, y: event.touches[0].clientY, suppressTap: false };
                }}
                onTouchEnd={(event) => {
                  const dx = event.changedTouches[0].clientX - swipe.current.x;
                  const dy = event.changedTouches[0].clientY - swipe.current.y;
                  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                    swipe.current.suppressTap = true;
                    pick(active + (dx < 0 ? 1 : -1));
                  }
                }}
              >
                <button type="button" onClick={() => navigate(-1)} aria-label="Previous stop" />
                <button type="button" onClick={() => navigate(1)} aria-label="Next stop" />
              </div>
              {controls(true)}
            </div>
          </div>

          {/* <div className={styles.mobileFooter}><p>Tap a stop to jump</p></div> */}
        </div>
    </SectionWithContainer>
  );
}
