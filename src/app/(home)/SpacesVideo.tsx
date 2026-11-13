"use client";

import { useEffect, useRef, useState } from "react";
import { video } from "@/data/site";

const clips = [video.walk, video.poolDinner, video.walkthrough];

const labels = ["The walk through", "Poolside evenings", "Manratan Resort"];

export default function SpacesVideo() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const p = v.play();
    if (p) p.catch(() => {});
  }, [idx]);

  const advance = () => setIdx((i) => (i + 1) % clips.length);

  return (
    <div className="relative mt-12 aspect-video w-full overflow-hidden bg-ink">
      <video
        ref={ref}
        key={clips[idx]}
        src={clips[idx]}
        muted
        playsInline
        onEnded={advance}
        className="absolute inset-0 h-full w-full object-cover"
        aria-label={labels[idx]}
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* clip indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        {clips.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Play clip ${i + 1}: ${labels[i]}`}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === idx ? "w-8 bg-stone" : "w-2 bg-stone/40 hover:bg-stone/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
