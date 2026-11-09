import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/site/PageHero";
import { Container, GemRule, LineLink, Title } from "@/components/site/ui";
import { photo } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Manratan is a family's tribute to two cherished women, and a resort in the hills of Narsinghgarh built around warmth, celebration and togetherness.",
  alternates: { canonical: "/about" },
};

const story = [
  "Some stories begin with a dream. Ours began with love, family and a name that holds a special place in our hearts.",
  "Manratan is more than a destination. It is a heartfelt tribute to two cherished women whose legacy continues to inspire us. What began as a family sentiment has grown into a place where people come together, celebrate life's milestones and make memories that last.",
  "Rooted in the warmth of family and guided by a love of hospitality, Manratan brings together timeless elegance, thoughtful experiences and the joy of being together. Every celebration, every gathering and every stay carries forward the spirit behind our name.",
];

export default function AboutPage() {
  return (
    <main className="bg-stone">
      <PageHero image={photo("aerial-greenery", "Manratan Resort among green fields at sunrise, seen from the air")} title="Our story" script="Manratan Resort" />

      <section className="py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Title main="A timeless escape" script="In the Mini Kashmir of Malwa" size="md" />
            <p className="t-body mt-8 max-w-[58ch]">
              We believe a stay should be more than a place to spend the night. In the scenic surroundings of Narsinghgarh, Manratan
              brings together modern comfort, warm hospitality and thoughtfully designed spaces: well-appointed rooms, poolside
              mornings, good food and wide views. Whether you are travelling with family, taking a quiet break or celebrating
              something special, it is a place to relax, reconnect and make memories.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src="/media/lobby-monogram.webp" alt="The Manratan lobby with the monogram wall and red velvet sofas" fill quality={85} sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24 text-stone md:py-36" aria-labelledby="name-title">
        <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[460px] overflow-hidden lg:min-h-0">
            <Image src="/media/reception-welcome.webp" alt="Reception team greeting guests with a namaste" fill quality={85} sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          </div>
          <div>
            <div id="name-title">
              <Title main="Manratan" script="A name with a story" tone="light" />
            </div>
            <div className="mt-10 space-y-6">
              {story.map((p) => (
                <p key={p.slice(0, 20)} className="t-body-light max-w-[58ch]">{p}</p>
              ))}
            </div>
            <GemRule tone="light" className="my-12 max-w-[200px]" />
            <blockquote className="t-display max-w-[24ch] text-[clamp(1.5rem,2.4vw,2.2rem)] leading-snug normal-case tracking-normal">
              Some legacies are not simply remembered. They are lived, shared and passed on.
            </blockquote>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Title main="At Manratan" script="Resort" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { img: photo("swadika-room", "Swadika restaurant set for lunch"), t: "Swadika", d: "Pure vegetarian, multi-cuisine dining, Indian and global, under a signature chandelier, for 80 to 100 guests." },
              { img: photo("pool-friends", "Two friends laughing at the edge of the Blue Diamond pool"), t: "Blue Diamond pool", d: "An open-air pool for slow afternoons and floating breakfasts, with candlelight dinners and proposals by the water." },
              { img: photo("skylawn-sunset", "Sky Lawn lounge at sunset"), t: "Sky Lawn", d: "An intimate open-air terrace for up to 20 guests, made for sundowners and private celebrations." },
            ].map((c) => (
              <article key={c.t}>
                <div className="relative aspect-[4/5] overflow-hidden bg-ink/10">
                  <Image src={c.img.src} alt={c.img.alt} fill quality={85} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <h3 className="t-display mt-5 text-[1.4rem]">{c.t}</h3>
                <p className="t-body mt-2 max-w-[40ch] text-[0.92rem]">{c.d}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
            <LineLink href="/accommodation">See the rooms</LineLink>
            <LineLink href="/#nearby">Places nearby</LineLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
