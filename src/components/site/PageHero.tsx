import Image from "next/image";
import type { Photo } from "@/data/site";

type Props = {
  image: Photo;
  title: string;
  script?: string;
  intro?: string;
  height?: "full" | "tall";
  focus?: string;
};

/** Full-bleed opening image with the approved centred title and a scroll cue. */
export default function PageHero({ image, title, script, intro, height = "tall", focus = "center" }: Props) {
  return (
    <section className={`relative isolate flex w-full items-end overflow-hidden bg-ink text-stone ${height === "full" ? "min-h-[100svh]" : "min-h-[78svh]"}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        quality={90}
        className="-z-10 object-cover hero-fade"
        style={{ objectPosition: focus }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/10 to-black/60" />
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10 pb-16 sm:pb-20 text-center">
        <h1 className="hero-rise">
          <span className="t-display block text-[clamp(2.6rem,7vw,6.4rem)] drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)]">{title}</span>
          {script && <span className="t-script block text-[clamp(1.8rem,3.4vw,3.2rem)] -mt-1"><span className="inline-block translate-x-[14%]">{script}</span></span>}
        </h1>
        {intro && <p className="hero-rise delay-1 mx-auto mt-6 max-w-xl text-[0.98rem] leading-relaxed text-stone/85">{intro}</p>}
        <span className="hero-fade delay-2 mx-auto mt-10 block h-12 w-px bg-stone/60" aria-hidden="true" />
      </div>
    </section>
  );
}
