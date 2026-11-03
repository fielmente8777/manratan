import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/site/PageHero";
import BookButton from "@/components/site/BookButton";
import { Container, Diamond, Title } from "@/components/site/ui";
import { photo, site, venues } from "@/data/site";

export const metadata: Metadata = {
  title: "Weddings & Events in Narsinghgarh",
  description:
    "Wedding and banquet venues at Manratan Resort, Narsinghgarh: the Blue Sapphire and Golden Sapphire halls, Sky Lawn, poolside and the Red Coral Lawn for up to 4,000 guests, with pure vegetarian catering.",
  alternates: { canonical: "/events" },
};

const occasions = [
  { name: "Destination weddings", note: "Rooms for the family, halls and lawns for every ceremony, all in one place." },
  { name: "Haldi, mehendi & sangeet", note: "Marigold mornings by the pool and music nights in the Blue Sapphire hall." },
  { name: "Receptions", note: "The Red Coral Lawn takes up to 4,000 guests under the open sky." },
  { name: "Birthdays & anniversaries", note: "Sky Lawn sundowners or a long family dinner at Swadika." },
  { name: "Corporate events", note: "Conference set-ups with stage, screen and podium, plus rooms for the team." },
  { name: "Gala dinners", note: "Bespoke pure vegetarian menus, served the way you want them." },
];

export default function EventsPage() {
  return (
    <main className="bg-stone">
      <PageHero image={photo("blue-sapphire-stage", "Blue Sapphire banquet hall dressed for a wedding reception")} title="Celebrations" script="At Manratan" />

      <section className="py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Title main="Events & celebrations" script="Crafted to be remembered" size="md" />
            <p className="t-body mt-8 max-w-[56ch]">
              From royal destination weddings and intimate family gatherings to poolside soirées, pre-wedding shoots and corporate
              retreats, every celebration at Manratan comes with elegant spaces, gracious hospitality and food people remember. Set
              in the scenic hills of Narsinghgarh, it brings together the art of celebration and the warmth of belonging.
            </p>
            <div className="mt-10 grid max-w-md grid-cols-3 border-y border-ink/15 py-6 text-center">
              <div><p className="t-display text-3xl">4,000</p><p className="mt-1 text-xs text-taupe">guests on the Red Coral Lawn</p></div>
              <div className="border-x border-ink/15"><p className="t-display text-3xl">65</p><p className="mt-1 text-xs text-taupe">rooms for your guests</p></div>
              <div><p className="t-display text-3xl">100%</p><p className="mt-1 text-xs text-taupe">pure vegetarian catering</p></div>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/media/golden-sapphire.webp" alt="Golden Sapphire hall set in black and gold for a celebration" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24 text-stone md:py-32" aria-labelledby="venues-title">
        <Container>
          <div id="venues-title">
            <Title main="The venues" script="A collection of gems" tone="light" align="center" />
          </div>
          <p className="t-body-light mx-auto mt-8 max-w-[60ch] text-center">
            Our halls are named for jewels: sapphire, diamond, coral. Each suits a different part of the celebration.
          </p>
          <div className="mt-16 space-y-20">
            {venues.map((v, i) => (
              <article key={v.name} className={`grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2 lg:grid-cols-[1fr_1.4fr]" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={v.image.src} alt={v.image.alt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
                </div>
                <div>
                  <p className="t-label text-stone/60">{v.kind}</p>
                  <h3 className="t-display mt-3 flex items-center gap-3 text-[clamp(2rem,3.4vw,3.2rem)]">
                    <Diamond className="h-5 w-5 text-brass-light" />
                    {v.name}
                  </h3>
                  <p className="t-body-light mt-4 max-w-[40ch]">{v.detail}.</p>
                </div>
              </article>
            ))}
            <article className="border-t border-stone/15 pt-12 text-center">
              <p className="t-label text-stone/60">Open-air lawn</p>
              <h3 className="t-display mt-3 inline-flex items-center gap-3 text-[clamp(2rem,3.4vw,3.2rem)]">
                <Diamond className="h-5 w-5 text-brass-light" />
                Red Coral Lawn
              </h3>
              <p className="t-body-light mx-auto mt-4 max-w-[48ch]">Our largest venue: receptions and baraats for up to 4,000 guests under the open sky.</p>
            </article>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32" aria-labelledby="occasions-title">
        <Container>
          <div id="occasions-title">
            <Title main="Host your event" script="With us" />
          </div>
          <ul className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((o) => (
              <li key={o.name} className="border-t border-ink/15 py-7">
                <p className="t-display text-[1.35rem]">{o.name}</p>
                <p className="t-body mt-2 text-[0.92rem]">{o.note}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              photo("blue-sapphire-tables", "Blue Sapphire tables dressed in white with pink bows"),
              photo("skylawn-above", "Sky Lawn seating set out for an evening, from above"),
              photo("conference-podium", "Hall set for a conference with podium and screen"),
            ].map((p) => (
              <div key={p.src} className="relative aspect-[4/3] overflow-hidden">
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-stone-deep py-24 md:py-28">
        <Container className="text-center">
          <h2 className="t-display mx-auto max-w-[22ch] text-[clamp(1.9rem,3.4vw,3.2rem)]">Plan a celebration people will talk about</h2>
          <p className="t-body mx-auto mt-6 max-w-[56ch]">
            Tell us the date, the guest count and the moments you have in mind. Our events team will come back with venues, menus
            and rooms.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <BookButton>Send an enquiry</BookButton>
            <a href={site.contact.WhatsappCta} target="_blank" rel="noreferrer" className="link-line t-label text-ink">WhatsApp the events team</a>
          </div>
        </Container>
      </section>
    </main>
  );
}
