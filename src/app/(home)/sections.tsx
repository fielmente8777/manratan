import Image from "next/image";
import Link from "next/link";
import AmenityIcon from "@/components/site/AmenityIcon";
import NightGallery from "./NightGallery";
import BookButton from "@/components/site/BookButton";
import WalkthroughSection from "./Walkthrough";
import SpacesGrid from "./SpacesGrid";
import SpacesGallery from "./SpacesGallery";
import SwadikaSlider from "./SwadikaSlider";
import EventsGrid from "./EventsGrid";
import Narsinghgarh from "./Narsinghgarh";
import { Diamond, LineLink, Title } from "@/components/site/ui";
import { Container, Section, SectionWithContainer } from "@/components/sectionComponants";
import { WhatsAppIcon } from "@/utils/icons";
import {
  amenities,
  fort,
  nearby,
  photo,
  site,
  type Photo,
  type Place,
} from "@/data/site";

function Figure({
  img,
  caption,
  className = "",
  sizes = "50vw",
  focus,
}: {
  img: Photo;
  caption?: string;
  className?: string;
  sizes?: string;
  focus?: string;
}) {
  return (
    <figure>
      <div className={`relative w-full overflow-hidden bg-ink/10 ${className}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          quality={85}
          sizes={sizes}
          className="object-cover"
          style={focus ? { objectPosition: focus } : undefined}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[0.78rem] tracking-wide text-taupe">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */

export function About() {
  return (
    <SectionWithContainer defaultPadding={false} sectionClassName="bg-stone py-20 md:py-28" sectionProps={{ "aria-labelledby": "about-title" }}>
        <div className="mx-auto flex max-w-[1040px] flex-col items-center text-center">
          {/* Ornament: hairline · rhombus · hairline */}
          <div className="flex items-center gap-5 text-brass" aria-hidden="true">
            <span className="h-px w-16 bg-current/70 sm:w-20" />
            <span className="block h-3 w-3 rotate-45 border border-current" />
            <span className="h-px w-16 bg-current/70 sm:w-20" />
          </div>

          <p className="t-label mt-10 text-taupe">Welcome to Manratan</p>

          <div className="mt-6 w-full">
            <div id="about-title">
              <Title main="Our Story" script="a legacy of love" align="center" size="xl" />
            </div>

            <p className="font-ivy mt-12 w-full text-[clamp(1.45rem,2.5vw,2.2rem)] leading-[1.4] text-ink">
              It was their name that became our new beginning &ndash; named in
              honour of a beloved grandmother and mother.
            </p>

            <p className="t-body mt-8 w-full text-[1.02rem]">
              Set amid the green hills of Narsinghgarh, Manratan Resort brings
              together contemporary comfort and warm, family-run hospitality: 65
              rooms and suites, pure-vegetarian dining at Swadika, the Blue
              Diamond pool, and lawns made for life&rsquo;s grandest celebrations.
            </p>

            <p className="t-body mt-8 w-full text-[1.02rem]">
              From grand weddings, dreamy proposals, sangeet nights and milestone
              celebrations to corporate retreats, birthday bashes and family
              get-togethers, Manratan has a place for every occasion. Celebrating
              love, success, a new beginning or recovering from a breakup? We&apos;ve
              got you covered! With warm hospitality, personalised service and
              beautiful spaces, we make every gathering special, even when the
              reason is complicated.
            </p>
          </div>

          <LineLink href="/our-story" className="mt-12">
            Discover our legacy
            <ArrowIcon />
          </LineLink>
        </div>
    </SectionWithContainer>
  );
}

function ArrowIcon({ className = "h-3 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 12" fill="none" aria-hidden="true" className={className}>
      <path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

export function RoyalCharm() {
  const img = photo(
    "ngh-lake-temple",
    "Jal Mandir temple on Paras Ram Sagar lake, Narsinghgarh, at sunset"
  );
  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="bg-[#E6E2DB] py-20 md:py-28"
      sectionProps={{ "aria-labelledby": "charm-title" }}
    >
        <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-center lg:gap-14">
          <div className="relative h-[380px] overflow-hidden lg:h-[560px]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              quality={85}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div id="charm-title">
              <Title main="Royal Charm" script="of Narsinghgarh" />
            </div>
            <div className="mt-8 space-y-5">
              <p className="t-body">
                Surrounded by misty green hills, heritage forts, and the
                tranquil Chidi Kho wildlife sanctuary, Narsinghgarh has long
                been celebrated as the picturesque 'Mini Kashmir of Malwa'.
                Steeped in rich history and royal traditions, it offers an
                idyllic escape from the bustling city rhythm.
              </p>
              <p className="t-body">
                Manratan Resort embraces this timeless legacy, offering guests a
                regal haven where natural serenity, refined architecture, and
                heartfelt service blend effortlessly. Whether you are exploring
                historic battlements or unwinding amidst pristine landscapes,
                every moment here connects you to the true spirit of Malwa.
              </p>
            </div>
            <p className="mt-8 text-sm font-semibold text-ink">
              Live the Legacy of Narsinghgarh
            </p>
          </div>
        </div>
    </SectionWithContainer>
  );
}

/* ------------------------------------------------------------------ */

export function Walkthrough() {
  return <WalkthroughSection />;
}

/* ------------------------------------------------------------------ */

// export function Spaces() {
//   return (
//     <section className="bg-stone py-24 md:py-32" aria-labelledby="spaces-title">
//       <Container>
//         <div className="text-center" id="spaces-title">
//           <Title main="Manratan" script="Resort" align="center" />
//           <p className="t-body mx-auto mt-6 max-w-[56ch]">Spaces made for slow mornings, long lunches and the biggest celebrations of your year.</p>
//         </div>

//         <SpacesGrid />

//         <p className="t-body mx-auto mt-10 max-w-[66ch] text-center">
//           From the grand reception and 65 rooms to the chandelier-lit Swadika restaurant and the Blue Diamond pool —
//           every space at Manratan is designed to make your stay feel effortless.
//         </p>
//       </Container>
//     </section>
//   );
// }
const spaces = [
  {
    label: "Reception",
    focus: "31% 55%",
    href: "/gallery?category=lobby",
    line: "A namaste at the door, under crystal chandeliers",
    img: {
      src: "/final-view/reception.webp",
      width: 2400,
      height: 1600,
      alt: "Reception team greeting guests with a namaste",
    },
  },
  {
    label: "Swadika",
    focus: "50% 50%",
    href: "/gallery?category=dining",
    line: "Pure vegetarian dining in a chandelier-lit hall",
    img: {
      src: "/final-view/swadika.webp",
      width: 2400,
      height: 1600,
      alt: "Swadika restaurant with teal velvet chairs, gold chandeliers and tall windows",
    },
  },
  {
    label: "Banquet",
    focus: "50% 50%",
    href: "/weddings-&-events",
    line: "The Blue Sapphire and Golden Sapphire halls",
    img: {
      src: "/final-view/banquet.webp",
      width: 2400,
      height: 1600,
      alt: "Banquet hall with crystal chandeliers, round tables and a floral stage",
    },
  },
  {
    label: "Sky Lawn",
    focus: "42% 60%",
    href: "/weddings-&-events",
    line: "Open-air evenings as the sun sets over the hills",
    img: {
      src: "/final-view/skylawn.webp",
      width: 2400,
      height: 1600,
      alt: "Sky Lawn lounge seating beside the resort at sunset, hills beyond",
    },
  },
  {
    label: "Pool",
    focus: "50% 50%",
    href: "/gallery?category=swimming-pool",
    line: "The Blue Diamond pool, by day and after dark",
    img: {
      src: "/final-view/pool.jpeg",
      width: 2400,
      height: 1600,
      alt: "Guest floating in the Blue Diamond pool beside a floating breakfast",
    },
  },
];
export function Spaces() {
  return (
    <SectionWithContainer defaultPadding={false} sectionClassName="bg-stone py-24 md:py-32" sectionProps={{ "aria-labelledby": "spaces-title" }}>
        <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12" data-no-reveal>
          <div id="spaces-title">
            <Title main="EXPERIENCE MANRATAN" script="Relax, Dine & Reconnect" />
          </div>
          <p className="t-body max-w-[52ch] lg:justify-self-end">
            <span className="lg:block">Spaces made for slow mornings, long lunches</span>{" "}
            <span className="lg:block">and the biggest celebrations of your year.</span>
          </p>
        </div>

        <SpacesGallery spaces={spaces} />

        <p className="t-body mt-12">
          From the grand reception to Swadika, the Sky Lawn and the Blue Diamond pool, every space is made to feel effortless.
        </p>
    </SectionWithContainer>
  );
}

/* ------------------------------------------------------------------ */

export function Amenities() {
  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionId="amenities"
      sectionClassName="scroll-mt-20 bg-ink pb-16 pt-10 text-stone md:pb-20"
      sectionProps={{ "aria-labelledby": "amenities-title" }}
    >
        <div className="flex flex-col items-center">
          <div className="mb-7 flex items-center gap-4 text-brass-light" aria-hidden="true">
            <span className="h-px w-16 bg-current/70" />
            <svg viewBox="0 0 14 20" fill="none" className="h-5 w-3.5">
              <path d="m7 2 5 8-5 8-5-8 5-8Z" stroke="currentColor" />
            </svg>
            <span className="h-px w-16 bg-current/70" />
          </div>
          <h2 id="amenities-title" className="text-center">
            <span className="t-display block text-[clamp(2.5rem,4.6vw,4rem)] leading-[1.2]!">Amenities</span>
            <span className="t-script mt-3 block text-[clamp(1.8rem,3vw,2.75rem)] leading-[1.25]! text-brass-light sm:translate-x-8">
              at your convenience
            </span>
          </h2>
        </div>
        <ul className="mx-auto mt-12 grid max-w-[1120px] grid-cols-2 gap-3 md:mt-20 md:gap-4 lg:grid-cols-4">
          {amenities.map((a) => {
            const body = (
              <>
                <AmenityIcon name={a.icon} className="h-12 w-12 shrink-0 text-brass-light md:h-14 md:w-14" />
                <div className="mt-4 flex flex-col items-center justify-center">
                  <h3 className="t-display max-w-[22ch] text-[0.95rem] leading-[1.45]! sm:text-[1.125rem] md:text-[1.25rem]">
                    {a.name}
                  </h3>
                  {a.icon === "dining" && (
                    <p className="mt-2 text-[0.6rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-brass-light">
                      Pure vegetarian
                    </p>
                  )}
                </div>
              </>
            );
            return (
              <li key={a.name} className="overflow-hidden rounded-[14px] border border-brass-light/30 bg-white/[0.02]">
                {a.href ? (
                  <Link
                    href={a.href}
                    className="flex h-full min-h-[176px] flex-col items-center justify-start px-4 py-6 text-center transition-colors duration-300 hover:bg-brass-light/[0.06] focus-visible:bg-brass-light/[0.06] md:min-h-[196px] md:px-5"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="flex h-full min-h-[176px] flex-col items-center justify-start px-4 py-6 text-center md:min-h-[196px] md:px-5">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
    </SectionWithContainer>
  );
}

/* ------------------------------------------------------------------ */

export function Celebrations() {
  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="bg-ink py-24 text-stone md:py-32"
      sectionProps={{ "aria-labelledby": "events-title" }}
    >
        <div id="events-title">
          <Title
            main="Events"
            script="At Manratan Resort"
            align="center"
            tone="light"
          />
        </div>
        <p className="t-body-light mx-auto mt-8 max-w-[66ch] text-center">
          Destination weddings and pre-wedding soirées, sangeet nights in the
          Blue Sapphire hall, candlelight dinners by the pool and receptions for
          up to 4,000 guests on the Red Coral Lawn, with pure vegetarian
          catering throughout.
        </p>

        <EventsGrid />

        <div className="mt-12 text-center">
          <LineLink href="/weddings-&-events" tone="light">
            Explore celebrations
          </LineLink>
        </div>
    </SectionWithContainer>
  );
}

/* ------------------------------------------------------------------ */

export function EvolvesWithLight() {
  const frames = [
    {
      img: photo(
        "skylawn-sunset-tall",
        "Sky Lawn seating as the sun sets over the hills"
      ),
      when: "Late afternoon",
      where: "Sky Lawn",
      cls: "mt-16",
    },
    {
      img: photo(
        "pool-dusk",
        "Blue Diamond pool from above at dusk, lights on"
      ),
      when: "Dusk",
      where: "Blue Diamond pool",
      cls: "",
    },
  ];
  return (
    <section
      className="overflow-hidden bg-stone py-24 md:py-36"
      aria-labelledby="light-title"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.4fr]">
          <div id="light-title">
            <Title
              main="The experience evolves with the light"
              script="A softer, deeper atmosphere"
              size="md"
            />
            <p className="t-body mt-8 max-w-[48ch]">
              Afternoons on the Sky Lawn turn gold as the sun drops behind the
              hills. At dusk the pool lights come on, and by night the whole
              facade glows warm against the dark Malwa sky.
            </p>
            <LineLink href="/gallery?category=exteriors" className="mt-8">
              See the resort after dark
            </LineLink>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {frames.map((f) => (
              <figure key={f.when} className={f.cls}>
                <div className="relative aspect-[3/4] overflow-hidden bg-ink/10">
                  <Image
                    src={f.img.src}
                    alt={f.img.alt}
                    fill
                    quality={85}
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-taupe">
                  {f.when}
                  <span className="block normal-case tracking-normal text-[0.8rem] text-ink/70">
                    {f.where}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>

    </section>
  );
}

/* ------------------------------------------------------------------ */

export function ManratanByNight() {
  return (
    <Section defaultPadding={false} className="bg-stone" aria-label="Manratan by night">
      <figure className="relative" aria-labelledby="night-title" data-no-reveal>
        <NightGallery />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <Container className="pb-10 text-center text-stone sm:pb-14 md:pb-20">
            <div id="night-title" className="mx-auto w-fit">
              <Title
                main="Manratan"
                script="by night"
                align="center"
                tone="light"
                className="max-sm:gap-1.5 sm:gap-3 [&>.t-script>span]:translate-x-0"
              />
            </div>
            {/* <p className="mx-auto mt-3 max-w-[46ch] text-sm text-stone/85">
              The facade lit from end to end, as guests arrive for an evening
              celebration.
            </p> */}
          </Container>
        </figcaption>
      </figure>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function Swadika() {
  const tags = ["Pure vegetarian", "Indian & global", "80–100 guests"];
  return (
    <Section
      id="swadika"
      defaultPadding={false}
      className="scroll-mt-24 overflow-hidden bg-stone py-24 md:py-32"
      aria-labelledby="swadika-title"
    >
      <Container>
        <div className="relative mx-auto flex max-w-[760px] flex-col items-center text-center">
          {/* Script watermark behind the heading */}
          <span
            className="t-script pointer-events-none absolute -top-10 left-[62%] -translate-x-1/2 select-none whitespace-nowrap text-[clamp(4.8rem,20vw,6.5rem)] text-ink/[0.05] sm:-top-20 sm:left-[38%] sm:translate-x-0 sm:text-[clamp(6rem,13vw,12rem)]"
            aria-hidden="true"
          >
            Swadika
          </span>

          <p className="t-label relative text-[0.62rem] text-taupe">
            Swadika · Pure-vegetarian restaurant
          </p>
          <div id="swadika-title" className="relative mt-6 max-w-[700px]">
            <Title
              main="THE ART OF EXCEPTIONAL DINING"
              script="authentic flavours, thoughtfully served"
              align="center"
              size="md"
              className="flex flex-col gap-3 [&>.t-script]:mt-0 [&>.t-script>span]:translate-x-0"
            />
          </div>
          <p className="t-body relative mt-8 max-w-[52ch] text-[0.92rem]">
            Swadika, our multi-cuisine restaurant, serves authentic Indian and
            global flavours in an elegant, contemporary hall lit by a signature
            chandelier &ndash; seating 80 to 100 guests for long family lunches
            and festive dinners alike.
          </p>
          <ul className="relative mt-7 flex flex-wrap justify-center gap-2.5">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-ink/25 px-4 py-2 text-[0.6rem] uppercase tracking-[0.2em] text-ink/80"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <SwadikaSlider />
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function PlaceCard({ p, sizes }: { p: Place; sizes: string }) {
  return (
    <article className="flex h-full flex-col">
      {p.image && (
        <div className="relative aspect-[4/3] overflow-hidden bg-ink/10">
          <Image
            src={p.image.src}
            alt={p.image.alt}
            fill
            quality={85}
            sizes={sizes}
            className="object-cover"
          />
        </div>
      )}
      <h3 className="t-display mt-5 text-[1.35rem]">{p.name}</h3>
      <p className="mt-1 text-[0.72rem] uppercase tracking-[0.2em] text-brass">
        {p.where}
      </p>
      <p className="t-body mt-2 max-w-[52ch] text-[0.92rem]">{p.note}</p>
    </article>
  );
}

/** Narsinghgarh Fort leads: photograph and text when a photo is supplied, a text-led panel until then. */
function FortFeature() {
  const facts = fort.facts && (
    <ul
      className="mt-8 grid grid-cols-2 gap-px bg-stone/15 sm:grid-cols-4"
      aria-label="The fort in numbers"
    >
      {fort.facts.map((f) => {
        const [n, ...rest] = f.split(" ");
        return (
          <li key={f} className="bg-ink px-3 py-4 text-center">
            <span className="t-display block text-2xl">{n}</span>
            <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.16em] text-stone/70">
              {rest.join(" ")}
            </span>
          </li>
        );
      })}
    </ul>
  );
  const heading = (
    <>
      <p className="t-label text-brass-light">The heart of Narsinghgarh</p>
      <h3
        id="fort-title"
        className="t-display mt-4 text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.02]"
      >
        {fort.name}
      </h3>
      <p className="mt-3 text-[0.75rem] uppercase tracking-[0.2em] text-stone/70">
        {fort.where}
      </p>
    </>
  );

  if (fort.image) {
    return (
      <article
        className="grid overflow-hidden bg-ink text-stone lg:grid-cols-[1.25fr_1fr]"
        aria-labelledby="fort-title"
      >
        <div className="relative min-h-[320px] lg:min-h-[520px]">
          <Image
            src={fort.image.src}
            alt={fort.image.alt}
            fill
            quality={85}
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:py-16">
          {heading}
          <p className="t-body-light mt-6 max-w-[48ch]">{fort.note}</p>
          {facts}
        </div>
      </article>
    );
  }

  return (
    <article
      className="relative overflow-hidden bg-ink bg-[radial-gradient(ellipse_at_12%_0%,#3a2a1d,transparent_55%)] px-8 py-14 text-stone sm:px-12 lg:px-16 lg:py-20"
      aria-labelledby="fort-title"
    >
      <Diamond className="absolute right-8 top-8 h-6 w-6 text-brass-light/60 lg:right-12 lg:top-12" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
        <div>{heading}</div>
        <div>
          <p className="t-body-light max-w-[52ch]">{fort.note}</p>
          {facts}
        </div>
      </div>
    </article>
  );
}

export function PlacesNearby() {
  return <Narsinghgarh />;
}

/* ------------------------------------------------------------------ */

export interface EscapeCTAProps {
  image?: { src: string; alt: string };
  kicker?: string;
  main?: string;
  script?: string;
  desc?: React.ReactNode;
  align?: "center" | "left";
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  className?: string;
  bg?: string;
  scriptClassName?: string;
}

export function EscapeCTA({
  image,
  kicker = "Relax · Reconnect · Rejuvenate",
  main = "A perfect escape",
  script = "for memorable stays & celebrations",
  desc = "Where timeless luxury meets impeccable hospitality.",
  align = "center",
  primaryButton,
  secondaryButton,
  className = "",
  bg,
  scriptClassName,
}: EscapeCTAProps = {}) {
  const defaultImg = photo("suite-1", "Executive Suite with a wide window over the green hills");
  const img = image || defaultImg;
  const isLeft = align === "left";

  return (
    <Section defaultPadding={false} className={`${bg || "bg-stone"} py-16 md:py-24 ${className}`} aria-labelledby="escape-title">
      <div className={`mx-auto w-full ${isLeft ? "max-w-[1360px]" : "max-w-[1600px]"} px-4 sm:px-8 lg:px-10`}>
        <div className={`group relative isolate flex ${isLeft ? "min-h-[500px] sm:min-h-[540px] lg:min-h-[560px] items-center justify-start" : "min-h-[520px] sm:min-h-[620px] lg:min-h-[640px] items-center justify-center"} overflow-hidden rounded-[24px] bg-ink text-stone sm:rounded-[32px]`}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            quality={90}
            sizes="(max-width: 1024px) 100vw, 75vw"
            className={`-z-20 object-cover ${isLeft ? "object-[center_35%]" : "object-[30%_50%]"} transition-transform duration-700 ease-out group-hover:scale-105`}
          />
          {/* Overlay */}
          <div className={`absolute inset-0 -z-10 ${isLeft ? "bg-gradient-to-r from-ink/85 via-ink/45 to-transparent sm:w-[75%] lg:w-[68%]" : "bg-[#1e140d]/65"}`} />

          <div className={`w-full min-w-0 max-w-full ${isLeft ? "max-w-[780px] px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20 text-left" : "max-w-[900px] px-4 py-12 text-center sm:px-12 sm:py-16 lg:py-20"}`}>
            {kicker && (
              <p className={`text-[0.62rem] sm:text-[0.72rem] font-medium tracking-[0.16em] sm:tracking-[0.25em] uppercase text-brass-light break-words`}>
                {kicker}
              </p>
            )}
            <div id="escape-title" className="mt-4 sm:mt-5 max-w-full">
              {isLeft && main === "ROYAL CHARM" ? (
                <div className="relative inline-block text-left text-stone">
                  <h2 className="sr-only">{main} {script}</h2>
                  <div aria-hidden="true">
                    <span className="t-display block text-[clamp(2.25rem,4.2vw,4rem)] tracking-[0.03em] text-stone">
                      ROY<span className="relative">A<span className="t-script absolute left-0 top-full -mt-2 sm:-mt-2.5 whitespace-nowrap text-[clamp(2rem,3.45vw,3.2rem)] normal-case tracking-normal text-brass-light">of Narsinghgarh</span></span>L CHARM
                    </span>
                    <span className="t-script block invisible text-[clamp(2rem,3.45vw,3.2rem)] -mt-2 sm:-mt-2.5 select-none pointer-events-none" aria-hidden="true">
                      of Narsinghgarh
                    </span>
                  </div>
                </div>
              ) : (
                <Title
                  main={main}
                  script={script}
                  align={align}
                  tone="light"
                  size="lg"
                  className="max-sm:[&>.t-display]:text-[1.85rem] max-sm:[&>.t-display]:leading-[1.15] max-sm:[&>.t-script]:text-[1.35rem] max-sm:[&>.t-script]:mt-1 max-sm:[&>.t-script>span]:translate-x-0"
                  scriptClassName={scriptClassName || (isLeft ? "pl-[14%] sm:pl-[12%] text-brass-light" : "text-brass-light")}
                />
              )}
            </div>
            {desc && (
              typeof desc === "string" ? (
                <p className={`font-ivy mt-5 sm:mt-6 text-[1.15rem] sm:text-[clamp(1.35rem,2.1vw,1.85rem)] font-normal leading-[1.35] text-stone ${isLeft ? "max-w-[55ch]" : "mx-auto max-w-[26ch] sm:max-w-[22ch] text-center"}`}>
                  {desc}
                </p>
              ) : (
                <div className={`font-ivy mt-5 sm:mt-6 text-[1.15rem] sm:text-[clamp(1.35rem,2.1vw,1.85rem)] font-normal leading-[1.35] text-stone ${isLeft ? "max-w-[55ch]" : "text-center"}`}>
                  {desc}
                </div>
              )
            )}
            <div className={`mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 ${isLeft ? "sm:justify-start" : "sm:justify-center"}`}>
              {primaryButton ? primaryButton : (
                <BookButton tone="light" className="w-full sm:w-auto rounded-full px-7 py-3.5 sm:px-10 sm:py-4 text-center justify-center">
                  Book your stay
                </BookButton>
              )}
              {secondaryButton ? secondaryButton : (
                <a
                  href={site.contact.WhatsappCta}
                  target="_blank"
                  rel="noreferrer"
                  className="t-label w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-stone/40 px-7 py-3.5 text-stone transition-colors duration-500 hover:border-stone hover:bg-stone hover:text-ink sm:px-10 sm:py-4"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  WhatsApp us
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
