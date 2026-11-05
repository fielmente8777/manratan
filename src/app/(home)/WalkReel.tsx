"use client";

import { useRef, useState } from "react";
import AmbientVideo from "@/components/site/AmbientVideo";
import { video, walkStops } from "@/data/site";

/** The model walk as a vertical reel, with its four stops highlighted as it plays and clickable to jump. */
export default function WalkReel() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [current, setCurrent] = useState(0);

  const onTime = (t: number) => {
    let idx = 0;
    walkStops.forEach((s, i) => {
      if (t >= s.start - 0.05) idx = i;
    });
    setCurrent(idx);
  };

  const jump = (at: number) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = at;
    v.muted = true;
    void v.play().catch(() => {});
    // On phones the stops sit under the reel: bring it back on screen so the jump is seen (and not paused as off-screen).
    const r = v.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      v.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });
    }
  };

  return (
    <div id="manratan-walk" className="mt-20 grid scroll-mt-24 items-center gap-10 border-t border-stone/10 pt-20 md:grid-cols-[minmax(0,380px)_1fr] md:gap-16 lg:grid-cols-[420px_1fr] lg:gap-24">
      <AmbientVideo
        src={video.walk}
        poster={video.walkPoster}
        alt="A guest walking through Manratan: past the lattice screen at reception, through a guest room and Swadika, out to the Blue Diamond pool"
        className="mx-auto aspect-[9/16] w-full max-w-[420px]"
        sizes="(max-width: 768px) 100vw, 420px"
        videoRef={ref}
        onTime={onTime}
        controlAt="top-left"
      />
      <div>
        <p className="t-label text-brass-light">Filmed at the resort</p>
        <h3 className="t-display mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-tight">The Manratan walk</h3>
        <p className="t-body-light mt-5 max-w-[46ch]">
          From the lattice screen at reception, through a guest room and the Swadika restaurant, out to the Blue Diamond
          pool.
        </p>
        <ol className="mt-10 max-w-sm divide-y divide-stone/10 border-y border-stone/10" aria-label="Stops on the walk">
          {walkStops.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => jump(s.start)}
                aria-current={current === i ? "true" : undefined}
                className={`flex w-full items-baseline gap-4 py-3 text-left transition-colors duration-500 ${current === i ? "text-stone" : "text-stone/50 hover:text-stone"}`}
              >
                <span className="w-6 shrink-0 text-xs tabular-nums tracking-widest text-brass">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-display text-[1.1rem]">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
