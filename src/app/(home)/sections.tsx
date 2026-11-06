import Image from "next/image";
import Link from "next/link";
import FilmPlayer from "@/components/site/FilmPlayer";
import AmenityIcon from "@/components/site/AmenityIcon";
import AmbientVideo from "@/components/site/AmbientVideo";
import BookButton from "@/components/site/BookButton";
import { Container, Diamond, LineLink, Title } from "@/components/site/ui";
import { amenities, fort, nearby, photo, redCoral, venues, video, walkthrough, type Photo, type Place } from "@/data/site";

function Figure({ img, caption, className = "", sizes = "50vw", focus }: { img: Photo; caption?: string; className?: string; sizes?: string; focus?: string }) {
  return (
    <figure>
      <div className={`relative w-full overflow-hidden bg-ink/10 ${className}`}>
        <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover" style={focus ? { objectPosition: focus } : undefined} />
      </div>
      {caption && <figcaption className="mt-3 text-[0.78rem] tracking-wide text-taupe">{caption}</figcaption>}
    </figure>
  );
}

/* ------------------------------------------------------------------ */

export function About() {
  return (
    <section className="bg-stone py-24 md:py-32" aria-labelledby="about-title">
      <Container>
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.4fr] md:gap-16">
          <Title main="About" script="The Resort" />
          <div id="about-title">
            <p className="t-body max-w-[64ch]">
              In the green hills of Narsinghgarh, the Mini Kashmir of Malwa, Manratan Resort pairs contemporary comfort with the
              warmth of a family that loves to host. Stay in one of 65 rooms and suites, dine on pure vegetarian food at Swadika,
              spend the afternoon by the Blue Diamond pool and celebrate on lawns made for the biggest occasions.
            </p>
            <p className="t-body mt-5 max-w-[64ch]">
              The name is a tribute: Manratan was named in honour of a beloved grandmother and mother, and that sense of family runs
              through every stay.
            </p>
            <LineLink href="/about" className="mt-8">Our legacy</LineLink>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-[1fr_2.1fr]">
          <Figure
            img={photo("pool-breakfast", "Two guests sharing a floating breakfast in the Blue Diamond pool")}
            caption="Floating breakfast in the Blue Diamond pool"
            className="h-[480px] md:h-[640px]"
            sizes="(max-width: 768px) 100vw, 33vw"
            focus="50% 60%"
          />
          <Figure
            img={photo("facade-bluehour", "Manratan Resort facade and forecourt at blue hour")}
            caption="The forecourt at blue hour"
            className="h-[300px] md:h-[640px]"
            sizes="(max-width: 768px) 100vw, 66vw"
            focus="55% 50%"
          />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Walkthrough() {
  const mins = Math.round(walkthrough.duration);
  return (
    <section id="walkthrough" className="scroll-mt-20 bg-ink py-24 text-stone md:py-32" aria-labelledby="walk-title">
      <Container>
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div id="walk-title">
            <Title main="A walk through" script="Manratan" tone="light" />
          </div>
          <p className="t-body-light max-w-[54ch]">
            About {mins} seconds, from first light over the fields to the facade lit up at night. Pick a chapter to jump straight to
            the suites, Swadika, the pool, the banquet halls or Narsinghgarh itself.
          </p>
        </div>
        <FilmPlayer />
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const spaces = [
  { label: "Reception", focus: "31% 55%", href: "/gallery?category=lobby", line: "A namaste at the door, and the lobby's crystal chandeliers", img: photo("reception-welcome", "Reception team greeting guests with a namaste") },
  { label: "Rooms", focus: "60% 50%", href: "/accommodation", line: "Five styles of room, from the Executive Suite to Deluxe", img: photo("suite-bed", "Executive Suite bed dressed in Manratan linen with towel art") },
  { label: "Banquet", focus: "50% 50%", href: "/events", line: "Blue Sapphire and Golden Sapphire halls", img: photo("blue-sapphire-full", "Blue Sapphire banquet hall fully set for a celebration") },
  { label: "Pool", focus: "50% 50%", href: "/gallery?category=swimming-pool", line: "The Blue Diamond pool, by day and after dark", img: photo("pool-splash", "Guest splashing water at the Blue Diamond pool") },
];

export function Spaces() {
  return (
    <section className="bg-stone py-24 md:py-32" aria-labelledby="spaces-title">
      <Container>
        <div id="spaces-title">
          <Title main="Manratan" script="Resort" />
        </div>
        <p className="t-body mt-6 max-w-[56ch]">Spaces made for slow mornings, long lunches and the biggest celebrations of your year.</p>

        <div className="no-scrollbar mt-12 flex h-[520px] snap-x snap-mandatory gap-3 overflow-x-auto md:h-[620px] md:overflow-visible">
          {spaces.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group relative min-w-[74vw] flex-1 snap-start overflow-hidden transition-[flex-grow] duration-[900ms] ease-[var(--ease-lux)] sm:min-w-[46vw] md:min-w-0 md:hover:grow-[2.3] md:focus-visible:grow-[2.3]"
            >
              <Image src={s.img.src} alt={s.img.alt} fill sizes="(max-width: 768px) 74vw, 40vw" className="img-drift object-cover" style={{ objectPosition: s.focus }} />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-6 text-stone">
                <span className="t-script block text-right text-[2.4rem] leading-none">{s.label}</span>
                <span className="mt-3 block max-h-0 overflow-hidden text-right text-sm text-stone/85 opacity-0 transition-all duration-700 group-hover:max-h-16 group-hover:opacity-100 group-focus-visible:max-h-16 group-focus-visible:opacity-100 max-md:max-h-16 max-md:opacity-100">
                  {s.line}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <p className="t-body mt-12 max-w-[72ch]">
          From the grand reception and 65 guest rooms to the chandelier-lit Swadika restaurant and the open-air Blue Diamond pool,
          every space at Manratan is designed to make a stay feel effortless, with modern comforts and warm, personal care
          throughout.
        </p>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Amenities() {
  return (
    <section id="amenities" className="scroll-mt-20 bg-stone-deep py-16 md:py-20" aria-labelledby="amenities-title">
      <Container>
        <div className="grid gap-5 md:grid-cols-[0.85fr_1.4fr] md:items-end md:gap-12">
          <div id="amenities-title">
            <Title main="Amenities" script="At your convenience" />
          </div>
          <p className="t-body max-w-[60ch]">
            Enjoy thoughtful conveniences during your stay, from leisure and dining to useful spaces for family gatherings and celebrations.
          </p>
        </div>
        <ul className="mt-10 grid gap-px overflow-hidden bg-ink/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {amenities.map((a) => {
            const body = (
              <>
                <AmenityIcon name={a.icon} className="h-7 w-7 text-brass" />
                <p className="t-display mt-3 text-[1.12rem]">{a.name}</p>
                <p className="t-body mt-2 text-[0.85rem] leading-relaxed">{a.note}</p>
              </>
            );
            return (
              <li key={a.name} className="bg-stone">
                {a.href ? (
                  <Link href={a.href} className="block h-full p-5 transition-colors hover:bg-white md:p-6">
                    {body}
                  </Link>
                ) : (
                  <div className="h-full p-5 md:p-6">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Celebrations() {
  return (
    <section className="bg-ink py-24 text-stone md:py-32" aria-labelledby="events-title">
      <Container>
        <div id="events-title">
          <Title main="Events" script="At Manratan Resort" align="center" tone="light" />
        </div>
        <p className="t-body-light mx-auto mt-8 max-w-[66ch] text-center">
          Destination weddings and pre-wedding soirées, sangeet nights in the Blue Sapphire hall, candlelight dinners by the pool
          and receptions for up to 4,000 guests on the Red Coral Lawn, with pure vegetarian catering throughout.
        </p>

        {/* Phones: the film, then the words under it, so nothing covers the couple. Larger screens: words over the
            darker lower-left corner of the frame. */}
        <div id="poolside" className="relative mt-14 scroll-mt-24">
          <AmbientVideo
            src={video.poolDinner}
            poster={video.poolDinnerPoster}
            alt="A couple at a candlelit table by the Blue Diamond pool at night, the camera rising to show the whole lit pool"
            className="aspect-[4/5] w-full sm:aspect-video"
            sizes="(max-width: 1400px) 100vw, 1320px"
          />
          <span className="pointer-events-none absolute inset-0 hidden bg-gradient-to-tr from-black/80 via-black/25 to-transparent sm:block" />
          <div className="pt-7 sm:pointer-events-none sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-10 lg:p-14">
            <div className="sm:pointer-events-auto sm:max-w-[30rem]">
              <p className="t-label text-stone/75">Blue Diamond · poolside</p>
              <h3 className="t-display mt-3 text-[clamp(1.9rem,3.2vw,2.9rem)] leading-[1.08]">Candlelight dinners and proposals</h3>
              <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-stone/85 sm:text-base">
                A table for two by the water, dressed with rose petals and fairy lights. Tell us the date when you enquire.
              </p>
              <BookButton tone="light" className="mt-6 px-6 py-3">Plan a poolside dinner</BookButton>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-6 sm:grid-cols-2 md:gap-6">
          {venues.map((v) => (
            <Link key={v.name} href="/events" className="group relative block aspect-[16/11] overflow-hidden">
              <Image src={v.image.src} alt={v.image.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="img-drift object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="t-label text-stone/75">{v.kind}</span>
                <span className="t-display mt-2 flex items-center gap-3 text-[clamp(1.6rem,2.6vw,2.4rem)]">
                  <Diamond className="h-4 w-4 text-brass-light" />
                  {v.name}
                </span>
                <span className="mt-2 block max-w-[46ch] text-sm text-stone/85">{v.detail}</span>
              </span>
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-[60ch] text-center text-sm text-stone/75">
          <span className="t-label text-stone">{redCoral.name}</span> · {redCoral.kind.split(" · ")[1]} · {redCoral.detail.toLowerCase()}.
        </p>

        <div className="mt-12 text-center">
          <LineLink href="/events" tone="light">Explore celebrations</LineLink>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function EvolvesWithLight() {
  const frames = [
    { img: photo("skylawn-sunset-tall", "Sky Lawn seating as the sun sets over the hills"), when: "Late afternoon", where: "Sky Lawn", cls: "mt-16" },
    { img: photo("pool-dusk", "Blue Diamond pool from above at dusk, lights on"), when: "Dusk", where: "Blue Diamond pool", cls: "" },
  ];
  const night = photo("facade-night-full", "Manratan Resort's full facade lit up at night, seen from the forecourt");
  return (
    <section className="overflow-hidden bg-stone py-24 md:py-36" aria-labelledby="light-title">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.4fr]">
          <div id="light-title">
            <Title main="The experience evolves with the light" script="A softer, deeper atmosphere" size="md" />
            <p className="t-body mt-8 max-w-[48ch]">
              Afternoons on the Sky Lawn turn gold as the sun drops behind the hills. At dusk the pool lights come on, and by night
              the whole facade glows warm against the dark Malwa sky.
            </p>
            <LineLink href="/gallery?category=exteriors" className="mt-8">See the resort after dark</LineLink>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {frames.map((f) => (
              <figure key={f.when} className={f.cls}>
                <div className="relative aspect-[3/4] overflow-hidden bg-ink/10">
                  <Image src={f.img.src} alt={f.img.alt} fill sizes="(max-width: 1024px) 50vw, 30vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-taupe">
                  {f.when}
                  <span className="block normal-case tracking-normal text-[0.8rem] text-ink/70">{f.where}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>

      <figure className="relative mt-20 md:mt-28" aria-labelledby="night-title">
        <div className="relative h-[70svh] min-h-[420px] w-full overflow-hidden bg-ink md:h-[86svh]">
          <Image src={night.src} alt={night.alt} fill sizes="100vw" className="object-cover object-[58%_50%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <figcaption className="absolute inset-x-0 bottom-0">
            <Container className="pb-10 text-stone md:pb-14">
              <p id="night-title" className="t-display text-[clamp(2.2rem,5vw,4.4rem)] leading-none">Manratan by night</p>
              <p className="mt-3 max-w-[46ch] text-sm text-stone/85">The facade lit from end to end, as guests arrive for an evening celebration.</p>
            </Container>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Swadika() {
  return (
    <section className="bg-stone-deep py-24 md:py-36" aria-labelledby="swadika-title">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/media/swadika-hall.webp" alt="Swadika restaurant with teal velvet chairs and chandeliers" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            </div>
            <div className="relative mt-4 aspect-[4/3] w-[62%] overflow-hidden border-[10px] border-stone-deep sm:absolute sm:-bottom-14 sm:-right-[8%] sm:mt-0 sm:w-[46%]">
              <Image src="/media/swadika-guests.webp" alt="Families enjoying lunch at Swadika" fill sizes="(max-width: 640px) 62vw, 26vw" className="object-cover" />
            </div>
          </div>
          <div className="sm:pt-12 lg:pt-0">
            <div id="swadika-title">
              <Title main="Swadika" script="Pure vegetarian dining" />
            </div>
            <p className="t-body mt-8 max-w-[46ch]">
              Authentic Indian and global flavours, all pure vegetarian, served in a contemporary hall lit by a signature chandelier.
              Swadika seats 80 to 100, so family lunches and festive dinners never feel crowded.
            </p>
            <LineLink href="/gallery?category=dining" className="mt-8">See Swadika</LineLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function PlaceCard({ p, sizes }: { p: Place; sizes: string }) {
  return (
    <article className="flex h-full flex-col">
      {p.image && (
        <div className="relative aspect-[4/3] overflow-hidden bg-ink/10">
          <Image src={p.image.src} alt={p.image.alt} fill sizes={sizes} className="object-cover" />
        </div>
      )}
      <h3 className="t-display mt-5 text-[1.35rem]">{p.name}</h3>
      <p className="mt-1 text-[0.72rem] uppercase tracking-[0.2em] text-brass">{p.where}</p>
      <p className="t-body mt-2 max-w-[52ch] text-[0.92rem]">{p.note}</p>
    </article>
  );
}

/** Narsinghgarh Fort leads: photograph and text when a photo is supplied, a text-led panel until then. */
function FortFeature() {
  const facts = fort.facts && (
    <ul className="mt-8 grid grid-cols-2 gap-px bg-stone/15 sm:grid-cols-4" aria-label="The fort in numbers">
      {fort.facts.map((f) => {
        const [n, ...rest] = f.split(" ");
        return (
          <li key={f} className="bg-ink px-3 py-4 text-center">
            <span className="t-display block text-2xl">{n}</span>
            <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.16em] text-stone/70">{rest.join(" ")}</span>
          </li>
        );
      })}
    </ul>
  );
  const heading = (
    <>
      <p className="t-label text-brass-light">The heart of Narsinghgarh</p>
      <h3 id="fort-title" className="t-display mt-4 text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.02]">{fort.name}</h3>
      <p className="mt-3 text-[0.75rem] uppercase tracking-[0.2em] text-stone/70">{fort.where}</p>
    </>
  );

  if (fort.image) {
    return (
      <article className="grid overflow-hidden bg-ink text-stone lg:grid-cols-[1.25fr_1fr]" aria-labelledby="fort-title">
        <div className="relative min-h-[320px] lg:min-h-[520px]">
          <Image src={fort.image.src} alt={fort.image.alt} fill sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover" />
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
  return (
    <section id="nearby" className="scroll-mt-20 bg-stone py-24 md:py-32" aria-labelledby="nearby-title">
      <Container>
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.4fr] md:items-end md:gap-16">
          <div id="nearby-title">
            <Title main="Narsinghgarh" script="The Mini Kashmir of Malwa" />
          </div>
          <p className="t-body max-w-[60ch]">
            A fort-palace on the hill, a temple out on the lake and forest on every side. Build a morning or an evening of your stay
            around these:
          </p>
        </div>

        <div className="mt-14">
          <FortFeature />
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {nearby.featured.map((p) => (
            <PlaceCard key={p.name} p={p} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          ))}
        </div>

        <div className="mt-16 border-t border-ink/15 pt-8">
          <p className="t-display text-[1.35rem]">Also worth the trip</p>
          <ul className="mt-4 grid gap-x-12 sm:grid-cols-2">
            {nearby.more.map((m) => (
              <li key={m.name} className="border-b border-ink/10 py-5">
                <p className="text-[0.95rem] font-medium text-ink">{m.name}</p>
                <p className="t-body mt-1 text-[0.88rem] leading-relaxed">{m.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
