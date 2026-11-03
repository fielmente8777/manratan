import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/site/PageHero";
import BookButton from "@/components/site/BookButton";
import { Container, Diamond, LineLink } from "@/components/site/ui";
import { getRoom, rooms, site } from "@/data/site";
import RoomGallery from "./RoomGallery";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return rooms.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const room = getRoom(id);
  if (!room) return { title: "Room not found" };
  return {
    title: { absolute: room.meta.title },
    description: room.meta.description,
    keywords: room.meta.keywords,
    alternates: { canonical: `/accommodation/${room.id}` },
    openGraph: { title: room.meta.title, description: room.meta.description, images: [{ url: room.hero.src, alt: room.hero.alt }] },
  };
}

export default async function RoomPage({ params }: Params) {
  const { id } = await params;
  const room = getRoom(id);
  if (!room) notFound();

  const others = rooms.filter((r) => r.id !== room.id);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Rooms & suites", item: `${site.url}/accommodation` },
      { "@type": "ListItem", position: 3, name: room.name, item: `${site.url}/accommodation/${room.id}` },
    ],
  };
  const marquee = [...room.amenities, ...room.amenities];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageHero image={room.hero} title={room.name} />

      <section className="bg-stone pt-20 pb-14 md:pt-28">
        <Container className="max-w-[900px] text-center">
          <p className="t-body mx-auto max-w-[66ch] text-[1.02rem]">{room.intro}</p>
          <p className="t-display mt-14 text-[clamp(1.2rem,2.2vw,2rem)] tracking-[0.06em]">{room.specs.join("  •  ")}</p>
        </Container>
      </section>

      <section className="overflow-hidden bg-stone pb-20 md:pb-28" aria-label={`${room.name} photos`}>
        <RoomGallery images={room.gallery} roomName={room.name} />
      </section>

      {/* Approved amenities ticker */}
      <section className="overflow-hidden border-y border-ink/80 bg-stone py-7" aria-label="Amenities">
        <ul className="sr-only">
          {room.amenities.map((a) => <li key={a}>{a}</li>)}
        </ul>
        <div className="gem-marquee flex w-max items-center" aria-hidden="true">
          {[...marquee, ...marquee].map((a, i) => (
            <span key={i} className="flex items-center">
              <span className="t-display whitespace-nowrap text-[clamp(1.6rem,3.6vw,3.4rem)]">{a}</span>
              <Diamond className="mx-8 h-5 w-5 text-brass md:mx-12" />
            </span>
          ))}
        </div>
      </section>

      <section className="bg-stone py-20 md:py-28">
        <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 className="t-display text-[clamp(1.8rem,3vw,2.8rem)]">Stay in the {room.name}</h2>
            <p className="t-body mt-4 max-w-[52ch]">
              Check-in from {site.checkIn}, check-out by {site.checkOut}. Early arrival or a late departure can be arranged when the
              room is free; just ask when you book.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-end">
            <BookButton>Book this room</BookButton>
            <a href={`tel:${site.contact.phone[0].replace(/\s/g, "")}`} className="link-line t-label text-ink">
              Call {site.contact.phone[0]}
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-stone-deep py-20 md:py-28" aria-labelledby="other-rooms">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 id="other-rooms" className="t-display text-[clamp(1.6rem,2.6vw,2.4rem)]">Other rooms</h2>
            <LineLink href="/accommodation">All rooms</LineLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((r) => (
              <Link key={r.id} href={`/accommodation/${r.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink/10">
                  <Image src={r.cover.src} alt={r.cover.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="img-drift object-cover" style={r.focus ? { objectPosition: r.focus } : undefined} />
                </div>
                <h3 className="t-display mt-4 text-[1.2rem]">{r.name}</h3>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-taupe">{r.specs.join("  •  ")}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
