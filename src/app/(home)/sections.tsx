import Image from "next/image";
import Link from "next/link";
import FilmPlayer from "@/components/site/FilmPlayer";
import { Container, Diamond, LineLink, Title } from "@/components/site/ui";
import { nearby, photo, venues, type Photo } from "@/data/site";

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
              Set in the green hills of Narsinghgarh, the town they call the Kashmir of Malwa, Manratan Resort pairs
              contemporary comfort with the warmth of a family that loves to host. Stay in one of 65 rooms and suites, dine on
              pure vegetarian food at Swadika, spend the afternoon by the Blue Diamond pool and celebrate on lawns made for the
              biggest occasions.
            </p>
            <LineLink href="/about" className="mt-8">Our legacy</LineLink>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-[1fr_2.1fr]">
          <Figure
            img={photo("pool-breakfast", "Two guests sharing a floating breakfast in the Blue Diamond pool")}
            caption="Floating breakfast in the Blue Diamond pool"
            className="h-[560px] md:h-[640px]"
            sizes="(max-width: 768px) 100vw, 33vw"
            focus="50% 60%"
          />
          <Figure
            img={photo("ngh-lake-temple", "Jal Mandir on Paras Ram Sagar at sunset, with Narsinghgarh Fort above")}
            caption="Jal Mandir and the fort, a short drive into Narsinghgarh"
            className="h-[380px] md:h-[640px]"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Walkthrough() {
  return (
    <section id="walkthrough" className="scroll-mt-20 bg-ink py-24 text-stone md:py-32" aria-labelledby="walk-title">
      <Container>
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div id="walk-title">
            <Title main="A walk through" script="Manratan" tone="light" />
          </div>
          <p className="t-body-light max-w-[54ch]">
            Seventy seconds, from first light over the fields to the facade glowing at night. Pick a chapter to jump straight to
            the rooms, Swadika, the pool, the banquet halls or Narsinghgarh itself.
          </p>
        </div>
        <FilmPlayer />
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const spaces = [
  { label: "Reception", focus: "31% 55%", href: "/about", line: "A namaste at the door, and the lobby's crystal chandeliers", img: photo("reception-welcome", "Reception team greeting guests with a namaste") },
  { label: "Rooms", focus: "60% 50%", href: "/accommodation", line: "Five styles of room, from Deluxe to the Suite", img: photo("suite-bed", "Suite bed dressed in Manratan linen with towel art") },
  { label: "Banquet", focus: "55% 50%", href: "/events", line: "Blue Sapphire and Golden Sapphire halls", img: photo("blue-sapphire-stage", "Blue Sapphire banquet hall with stage") },
  { label: "Pool", focus: "50% 50%", href: "/gallery", line: "The Blue Diamond pool, by day and after dark", img: photo("pool-splash", "Guest splashing water at the Blue Diamond pool") },
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
          From the grand reception and 65 guest rooms to the chandelier-lit Swadika restaurant and the open-air Blue Diamond
          pool, every space at Manratan is designed to make a stay feel effortless, with modern comforts and warm, personal care
          throughout.
        </p>
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
          Destination weddings and pre-wedding soirées, sangeet nights in the Blue Sapphire hall, sundowners on the Sky Lawn and
          receptions for up to 4,000 guests on the Red Coral Lawn, with pure vegetarian catering and a team that has done it many
          times before.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:gap-6">
          {venues.map((v) => (
            <Link key={v.name} href="/events" className="group relative block aspect-[16/11] overflow-hidden">
              <Image src={v.image.src} alt={v.image.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="img-drift object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="t-label text-stone/70">{v.kind}</span>
                <span className="t-display mt-2 flex items-center gap-3 text-[clamp(1.6rem,2.6vw,2.4rem)]">
                  <Diamond className="h-4 w-4 text-brass-light" />
                  {v.name}
                </span>
                <span className="mt-2 block max-w-[44ch] text-sm text-stone/80">{v.detail}</span>
              </span>
            </Link>
          ))}
        </div>

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
    { img: photo("facade-night", "Manratan Resort facade lit up at night"), when: "Night", where: "The facade", cls: "mt-28" },
  ];
  return (
    <section className="overflow-hidden bg-stone py-24 md:py-36">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.4fr]">
          <div>
            <Title main="The experience evolves with the light" script="A softer, deeper atmosphere" size="md" />
            <p className="t-body mt-8 max-w-[48ch]">
              Afternoons on the Sky Lawn turn gold as the sun drops behind the hills. At dusk the pool lights come on, and by night
              the whole facade glows warm against the dark Malwa sky.
            </p>
            <LineLink href="/gallery" className="mt-8">Explore the gallery</LineLink>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {frames.map((f) => (
              <figure key={f.when} className={f.cls}>
                <div className="relative aspect-[3/5] overflow-hidden bg-ink/10">
                  <Image src={f.img.src} alt={f.img.alt} fill sizes="(max-width: 1024px) 33vw, 22vw" className="object-cover" />
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
          <div className="lg:pt-0 sm:pt-12">
            <div id="swadika-title">
              <Title main="Swadika" script="Pure vegetarian dining" />
            </div>
            <p className="t-body mt-8 max-w-[46ch]">
              North Indian favourites, regional Malwa recipes and global vegetarian dishes, cooked with fresh ingredients and served
              under Swadika&apos;s chandeliers. The hall seats up to 100, so family lunches and festive dinners never feel crowded.
            </p>
            <LineLink href="/blogs/culinary-journey-authentic-malwa-flavors" className="mt-8">The flavours of Malwa</LineLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function PlacesNearby() {
  const [jal, fort, town, hill, chhatri] = nearby.featured;
  const Card = ({ p, tall = false, sizes }: { p: (typeof nearby.featured)[number]; tall?: boolean; sizes: string }) => (
    <article className="flex h-full flex-col">
      <div className={`relative overflow-hidden bg-ink/10 ${tall ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]"}`}>
        <Image src={p.image.src} alt={p.image.alt} fill sizes={sizes} className="object-cover" />
      </div>
      <h3 className="t-display mt-5 text-[1.35rem]">{p.name}</h3>
      <p className="mt-1 text-[0.72rem] uppercase tracking-[0.2em] text-brass">{p.where}</p>
      <p className="t-body mt-2 max-w-[52ch] text-[0.92rem]">{p.note}</p>
    </article>
  );
  return (
    <section id="nearby" className="scroll-mt-20 bg-stone py-24 md:py-32" aria-labelledby="nearby-title">
      <Container>
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.4fr] md:items-end md:gap-16">
          <div id="nearby-title">
            <Title main="Places" script="Nearby" />
          </div>
          <p className="t-body max-w-[60ch]">
            Narsinghgarh keeps a fort on its ridge, a temple out on its lake and forest on every side. A few places worth building
            into your stay:
          </p>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:row-span-2"><Card p={jal} tall sizes="(max-width: 1024px) 100vw, 66vw" /></div>
          <Card p={fort} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <Card p={town} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <Card p={hill} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <Card p={chhatri} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="md:col-span-2 lg:col-span-1 border-t border-ink/15 pt-6">
            <p className="t-display text-[1.35rem]">Also worth the trip</p>
            <ul className="mt-4 divide-y divide-ink/10">
              {nearby.more.map((m) => (
                <li key={m.name} className="py-4">
                  <p className="font-medium text-ink text-[0.95rem]">{m.name}</p>
                  <p className="t-body mt-1 text-[0.88rem] leading-relaxed">{m.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
