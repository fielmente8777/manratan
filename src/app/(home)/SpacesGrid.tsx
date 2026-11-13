"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { photo, video } from "@/data/site";

const spaces = [
  { label: "Reception", focus: "31% 55%", href: "/gallery?category=lobby", img: photo("reception-welcome", "Reception team greeting guests with a namaste") },
  { label: "Rooms", focus: "60% 50%", href: "/accommodation", img: photo("suite-bed", "Executive Suite bed dressed in Manratan linen with towel art") },
  { label: "Banquet", focus: "50% 50%", href: "/events", img: photo("blue-sapphire-full", "Blue Sapphire banquet hall fully set for a celebration") },
  { label: "Pool", focus: "50% 50%", href: "/gallery?category=swimming-pool", img: photo("pool-splash", "Guest splashing water at the Blue Diamond pool") },
];

const clips = [video.walk, video.walkthrough, video.poolDinner, video.walk];

export default function SpacesGrid() {
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const p = v.play();
    if (p) p.catch(() => {});
  }, [activeIdx]);

  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {spaces.map((s, i) => (
        <Link key={s.label} href={s.href} className="group relative block aspect-[3/4] overflow-hidden">
          <Image
            src={s.img.src}
            alt={s.img.alt}
            fill
            quality={85}
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover"
            style={{ objectPosition: s.focus }}
          />
          {i === activeIdx && (
            <video
              ref={videoRef}
              key={clips[i]}
              src={clips[i]}
              muted
              playsInline
              onEnded={() => setActiveIdx((prev) => (prev + 1) % spaces.length)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-0 left-0 p-5">
            <span className="t-script text-[1.5rem] leading-none text-stone">{s.label}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
