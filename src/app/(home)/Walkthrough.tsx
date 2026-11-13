"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const swipe = useRef({ x: 0, y: 0, suppressTap: false });
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [progress, setProgress] = useState({ index: 0, value: 0 });
  const shouldPlay = playing && visible && pageVisible;
  const currentProgress = progress.index === active ? progress.value : 0;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initialize from browser playback preferences
    if (reduceMotion || saveData) setPlaying(false);

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
    videos.current.forEach((element, index) => {
      if (!element) return;
      if (index !== active) {
        element.pause();
        if (Math.abs(element.currentTime - stops[index].start) > 0.05) element.currentTime = stops[index].start;
      } else if (element.currentTime < stops[index].start || element.currentTime >= stops[index].end) {
        element.currentTime = stops[index].start;
      }
    });
  }, [active, load]);

  useEffect(() => {
    let cancelled = false;
    videos.current.forEach((element, index) => {
      if (!element) return;
      element.muted = index === active ? muted : true;
      if (index === active && shouldPlay && load) {
        void element.play().catch(() => {
          if (!cancelled) setPlaying(false);
        });
      } else {
        element.pause();
      }
    });
    return () => { cancelled = true; };
  }, [active, shouldPlay, muted, load]);

  const pick = (index: number) => {
    setLoad(true);
    setActive((index + stops.length) % stops.length);
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
        <div className={styles.layout}>
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
                type="button"
                className={`${styles.panel} ${active === index ? styles.active : ""}`}
                aria-pressed={active === index}
                onClick={() => { if (active !== index || !playing) pick(index); }}
              >
                <Image src={stop.poster} alt={stop.alt} fill quality={85} sizes="(max-width: 900px) 480px, 380px" className={styles.media} />
                <video
                  ref={(element) => { videos.current[index] = element; }}
                  src={load ? source : undefined}
                  poster={stop.poster}
                  muted={muted || active !== index}
                  playsInline
                  preload={load ? "auto" : "none"}
                  aria-hidden="true"
                  tabIndex={-1}
                  className={styles.media}
                  onLoadedMetadata={(event) => {
                    event.currentTarget.currentTime = stop.start;
                  }}
                  onTimeUpdate={(event) => {
                    if (active !== index) return;
                    const time = event.currentTarget.currentTime;
                    setProgress({ index, value: Math.max(0, Math.min(1, (time - stop.start) / (stop.end - stop.start))) });
                    if (shouldPlay && time >= stop.end) setActive((index + 1) % stops.length);
                  }}
                  onEnded={() => { if (active === index && shouldPlay) setActive((index + 1) % stops.length); }}
                />
                <span className={styles.shade} aria-hidden="true" />
                {active === index && <span className={styles.desktopProgress} aria-hidden="true"><i style={{ transform: `scaleX(${currentProgress})` }} /></span>}
                <span className={styles.label}><span className={styles.labelNumber}>{number(index)}</span><span className={styles.labelTitle}>{stop.title}</span></span>
              </button>
            ))}

            <div className={styles.mobileUi}>
              <div className={styles.segments} aria-hidden="true">
                {stops.map((stop, index) => (
                  <span key={stop.title}><i style={{ transform: `scaleX(${index < active ? 1 : index === active ? currentProgress : 0})` }} /></span>
                ))}
              </div>
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

          <div className={styles.mobileFooter}><p>Tap a stop to jump</p></div>
        </div>
    </SectionWithContainer>
  );
}
