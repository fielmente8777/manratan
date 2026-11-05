"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { video, walkthrough } from "@/data/site";
import { PlayIcon } from "./ui";

type Props = {
  /** Start playing as soon as the player mounts (used in the hero modal). */
  autoPlay?: boolean;
  /** Show the chapter list beside (lg) or under the film. */
  chapters?: boolean;
  tone?: "dark" | "light";
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * The Manratan walkthrough: one film in chapters, from first light to night.
 * Native controls once playing; chapter buttons seek to each part.
 */
export default function FilmPlayer({ autoPlay = false, chapters = true, tone = "dark" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);

  const start = (at?: number) => {
    const v = ref.current;
    if (!v) return;
    if (typeof at === "number") v.currentTime = at;
    setStarted(true);
    void v.play().catch(() => {});
  };

  useEffect(() => {
    if (autoPlay) start(0);
  }, [autoPlay]);

  const onTime = () => {
    const t = ref.current?.currentTime ?? 0;
    let idx = 0;
    walkthrough.chapters.forEach((c, i) => {
      if (t >= c.start - 0.05) idx = i;
    });
    setCurrent(idx);
  };

  const light = tone === "light";

  return (
    <div className={`grid gap-8 ${chapters ? "lg:grid-cols-[1fr_300px] lg:gap-12" : ""}`}>
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <video
          ref={ref}
          src={video.walkthrough}
          preload="none"
          poster={video.poster}
          playsInline
          controls={started}
          onTimeUpdate={onTime}
          className="h-full w-full object-cover"
          aria-label="Walkthrough film of Manratan Resort"
        />
        {!started && (
          <button
            type="button"
            onClick={() => start(0)}
            className="group absolute inset-0 isolate flex flex-col items-center justify-center gap-5 text-stone"
          >
            <Image src={video.poster} alt="" fill sizes="(max-width: 1024px) 100vw, 900px" className="-z-10 object-cover" />
            <span className="absolute inset-0 -z-10 bg-black/30 transition-colors group-hover:bg-black/20" />
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-stone/70 backdrop-blur-sm transition-transform duration-700 group-hover:scale-105">
              <PlayIcon className="w-6 h-6 translate-x-0.5" />
            </span>
            <span className="t-label">Play the walkthrough, {fmt(walkthrough.duration)}</span>
          </button>
        )}
      </div>

      {chapters && (
        <ol className={`self-center divide-y ${light ? "divide-ink/10" : "divide-stone/10"}`} aria-label="Chapters">
          {walkthrough.chapters.map((c, i) => {
            const on = started && current === i;
            return (
              <li key={c.title}>
                <button
                  type="button"
                  onClick={() => start(c.start)}
                  aria-current={on ? "true" : undefined}
                  className={`flex w-full items-baseline gap-4 py-3 text-left transition-colors ${
                    on ? (light ? "text-ink" : "text-stone") : light ? "text-ink/55 hover:text-ink" : "text-stone/55 hover:text-stone"
                  }`}
                >
                  <span className="w-6 shrink-0 text-xs tabular-nums tracking-widest text-brass">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t-display flex-1 text-[1.05rem]">{c.title}</span>
                  <span className="text-xs tabular-nums opacity-70">{fmt(c.start)}</span>
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
