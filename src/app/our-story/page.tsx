import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import BookButton from "@/components/site/BookButton";
import { Container, Title } from "@/components/site/ui";
import { photo } from "@/data/site";
import { EscapeCTA } from "../(home)/sections";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Manratan is a family's tribute to two cherished women, and a resort in the hills of Narsinghgarh built around warmth, celebration and togetherness.",
  alternates: { canonical: "/our-story" },
};

const story = [
  "Some stories begin with a dream. Ours began with love, family and a name that holds a special place in our hearts.",
  "Manratan is more than a destination. It is a heartfelt tribute to two cherished women whose legacy continues to inspire us. What began as a family sentiment has grown into a place where people come together, celebrate life's milestones and make memories that last.",
  "Rooted in the warmth of family and guided by a love of hospitality, Manratan brings together timeless elegance, thoughtful experiences and the joy of being together. Every celebration, every gathering and every stay carries forward the spirit behind our name.",
];

export default function OurStoryPage() {
  return (
    <main className="bg-stone">
      <PageHero
        image={{
          src: "/about-banner.jpg",
          width: 2400,
          height: 1800,
          alt: "Manratan Resort aerial view",
        }}
        title="Our story"
        script="Manratan Resort"
      />

      <section className="py-20 md:py-28 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="flex flex-col items-center text-center">
              {/* Ornament: hairline · rhombus · hairline */}
              <div className="flex items-center justify-center gap-5 text-brass" aria-hidden="true">
                <span className="h-px w-14 bg-current/70 sm:w-16" />
                <span className="block h-3 w-3 rotate-45 border border-current" />
                <span className="h-px w-14 bg-current/70 sm:w-16" />
              </div>

              <div className="mt-8 flex flex-col items-center">
                <div className="relative inline-block text-ink text-left">
                  <h2 className="sr-only">A TIMELESS ESCAPE in the Mini Kashmir of Malwa</h2>
                  <div aria-hidden="true">
                    <span className="t-display block text-[clamp(1.9rem,3.1vw,3rem)] tracking-[0.05em]">
                      A T<span className="relative">I<span className="t-script absolute left-0 top-full -mt-0.5 sm:-mt-1 whitespace-nowrap text-[clamp(1.65rem,2.6vw,2.55rem)] normal-case tracking-normal">in the Mini Kashmir of Malwa</span></span>MELESS ESCAPE
                    </span>
                    <span className="t-script block invisible text-[clamp(1.65rem,2.6vw,2.55rem)] -mt-0.5 sm:-mt-1 select-none pointer-events-none" aria-hidden="true">
                      in the Mini Kashmir of Malwa
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="font-ivy mt-8 text-[clamp(1.15rem,1.55vw,1.5rem)] font-normal leading-snug text-ink xl:whitespace-nowrap text-center">
                We believe a stay should be more than a place to spend the night.
              </h3>

              {/* Mobile view image: right after "spend the night" */}
              <div className="group relative mt-7 aspect-[4/3] w-full overflow-hidden lg:hidden">
                <Image
                  src="/reception1_11zon.webp"
                  alt="The Manratan lobby reception and seating lounge"
                  fill
                  quality={90}
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <p className="t-body mt-6 mx-auto max-w-[740px] text-[0.93rem] sm:text-[0.97rem] leading-[1.85] text-taupe text-center">
                In the scenic surroundings of Narsinghgarh, Manratan brings together modern<br className="hidden lg:inline" /> comfort, warm hospitality and thoughtfully designed spaces &ndash; well-appointed<br className="hidden lg:inline" /> rooms, poolside mornings, good food and wide views. Whether you are<br className="hidden lg:inline" /> travelling with family, taking a quiet break or celebrating something special, it is<br className="hidden lg:inline" /> a place to relax, reconnect and make memories.
              </p>
            </div>

            {/* Desktop view image */}
            <div className="hidden lg:block group relative aspect-[4/3] w-full overflow-hidden lg:-translate-x-3 xl:-translate-x-5">
              <Image
                src="/reception1_11zon.webp"
                alt="The Manratan lobby reception and seating lounge"
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-14 sm:py-20 md:py-36 text-stone overflow-hidden" aria-labelledby="name-title">
        <Container>
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:translate-x-8 xl:translate-x-[54px]">
            {/* Desktop view image */}
            <div className="hidden lg:block group relative min-h-[380px] overflow-hidden lg:min-h-0">
              <Image src="/media/reception-welcome.webp" alt="Reception team greeting guests with a namaste" fill quality={85} sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            </div>

            <div>
              <div id="name-title">
                <Title main="Manratan" script="A name with a story" tone="light" />
              </div>

              {/* Mobile view image: after heading, before description */}
              <div className="group relative mt-4 mb-4 sm:mt-6 sm:mb-6 aspect-[4/3] w-full overflow-hidden lg:hidden">
                <Image
                  src="/media/reception-welcome.webp"
                  alt="Reception team greeting guests with a namaste"
                  fill
                  quality={85}
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mt-5 sm:mt-8 lg:mt-10 space-y-5 sm:space-y-6">
                {story.map((p) => (
                  <p key={p.slice(0, 20)} className="t-body-light max-w-[58ch]">{p}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 sm:mt-20 md:mt-28 flex flex-col items-center text-center">
            {/* Ornament: hairline · rhombus · hairline */}
            <div className="flex items-center justify-center gap-5 text-brass" aria-hidden="true">
              <span className="h-px w-14 bg-current/70 sm:w-16" />
              <span className="block h-3 w-3 rotate-45 border border-current" />
              <span className="h-px w-14 bg-current/70 sm:w-16" />
            </div>

            <blockquote className="t-display mt-6 sm:mt-9 max-w-[32ch] text-[clamp(1.12rem,3.6vw,2.85rem)] !leading-[1.38] tracking-[0.04em] text-stone text-center">
              SOME LEGACIES ARE NOT<br className="hidden sm:inline" /> SIMPLY REMEMBERED. THEY ARE<br className="hidden sm:inline" /> LIVED, SHARED AND PASSED ON.
            </blockquote>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="flex flex-col items-center text-center">
            <p className="text-[0.72rem] sm:text-[0.76rem] font-medium tracking-[0.28em] text-brass uppercase">
              AT MANRATAN
            </p>
            <div className="mt-4 flex flex-col items-center">
              <div className="relative inline-block text-ink text-left">
                <h2 className="sr-only">THE RESORT made for slow days</h2>
                <div aria-hidden="true">
                  <span className="t-display block text-[clamp(2.4rem,4.4vw,4rem)] tracking-[0.05em]">
                    TH<span className="relative">E<span className="t-script absolute left-0 top-full -mt-2 sm:-mt-2.5 whitespace-nowrap text-[clamp(1.95rem,3.4vw,3.25rem)] normal-case tracking-normal text-ink">made for slow days</span></span> RESORT
                  </span>
                  <span className="t-script block invisible text-[clamp(1.95rem,3.4vw,3.25rem)] -mt-2 sm:-mt-2.5 select-none pointer-events-none" aria-hidden="true">
                    made for slow days
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 md:mt-16 grid gap-10 sm:gap-8 lg:gap-10 md:grid-cols-3">
            {[
              {
                img: photo("swadika-room", "Swadika restaurant set for lunch"),
                tag: "PURE VEGETARIAN · 80–100 GUESTS",
                t: "SWADIKA",
                d: "Indian and global multi-cuisine dining under a signature chandelier.",
              },
              {
                img: {
                  src: "/homopage/dining2_11zon.webp",
                  alt: "Blue Diamond Pool at Manratan Resort",
                },
                tag: "OPEN-AIR POOL",
                t: "BLUE DIAMOND POOL",
                d: "Slow afternoons, floating breakfasts and candlelit dinners by the water.",
              },
              {
                img: photo("skylawn-sunset", "Sky Lawn lounge at sunset"),
                tag: "UP TO 20 GUESTS",
                t: "SKY LAWN",
                d: "An intimate open-air terrace for sundowners and private celebrations.",
              },
            ].map((c) => (
              <article key={c.t} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-ink/10">
                  <Image src={c.img.src} alt={c.img.alt} fill quality={85} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                </div>
                <p className="mt-6 text-[0.56rem] sm:text-[0.59rem] tracking-[0.22em] text-brass uppercase font-medium">{c.tag}</p>
                <h3 className="t-display mt-2 text-[1.45rem] sm:text-[1.6rem] tracking-[0.03em] text-ink">{c.t}</h3>
                <p className="t-body mt-2.5 max-w-[44ch] text-[0.74rem] sm:text-[0.78rem] leading-[1.6] text-taupe">{c.d}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <Link
              href="/accommodation"
              className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[0.72rem] font-medium tracking-[0.2em] text-stone uppercase transition-transform hover:scale-[1.02]"
            >
              See the rooms
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center text-[0.72rem] font-medium tracking-[0.2em] text-ink uppercase pb-1 border-b border-ink/80 transition-opacity hover:opacity-70"
            >
              Weddings &amp; Events
            </Link>
          </div>
        </Container>
      </section>

      <EscapeCTA
        align="left"
        bg="bg-[#EAE5DC]"
        image={{ src: "/media/mrw-narsinghghar-a.webp", alt: "Narsinghgarh Fort on green hills" }}
        kicker="ESCAPE TO THE KASHMIR OF MALWA"
        main="ROYAL CHARM"
        script="of Narsinghgarh"
        scriptClassName="pl-[14%] sm:pl-[12%] text-brass-light"
        desc={
          <>
            <span className="sm:whitespace-nowrap">Forts, lakes and temples &ndash; loveliest at first light</span>
            <br className="hidden sm:inline" /> or at sunset.
          </>
        }
        primaryButton={
          <Link
            href="/#nearby"
            className="inline-flex h-[44px] sm:h-[46px] w-[170px] sm:w-[185px] items-center justify-center rounded-full border border-transparent bg-[#f3eee7] text-[0.7rem] font-medium tracking-[0.18em] text-[#221811] uppercase shadow-sm transition-transform hover:scale-[1.02]"
          >
            PLACES NEARBY
          </Link>
        }
        secondaryButton={
          <BookButton
            tone="outline-light"
            className="!inline-flex !h-[44px] sm:!h-[46px] !w-[170px] sm:!w-[185px] !items-center !justify-center !rounded-full !px-0 !py-0 !text-[0.7rem] !font-medium !tracking-[0.18em] !uppercase transition-all"
          >
            BOOK YOUR STAY
          </BookButton>
        }
      />
    </main>
  );
}
