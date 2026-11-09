import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import BookButton from "@/components/site/BookButton";
import { Container, LineLink, Title } from "@/components/site/ui";
import { photo, roomsPremiumFirst } from "@/data/site";

export const metadata: Metadata = {
  title: "Rooms & Suites in Narsinghgarh",
  description:
    "65 rooms in five styles at Manratan Resort, Narsinghgarh: Deluxe, Deluxe Interconnected, Executive Family, Premium with sofa-cum-bed, and two Executive Suites. Garden, pool and hill views with Wi-Fi, AC and in-room dining.",
  alternates: { canonical: "/accommodation" },
};

export default function AccommodationPage() {
  return (
    <main>
      <PageHero image={photo("suite-1", "Executive Suite bedroom with a panoramic window over the hills")} title="Accommodation" focus="50% 55%" />

      <section className="bg-stone py-24 md:py-32">
        <Container className="max-w-[920px]">
          <Title main="Elegant" script="Accommodation" align="center" />
          <div className="mx-auto mt-10 max-w-[70ch] space-y-5 text-center">
            <p className="t-body">
              Sixty-five rooms and suites with stylish interiors, plush bedding and generous layouts, made for families, couples and
              friends travelling together.
            </p>
            <p className="t-body">
              Wake up to garden, pool or hill views, with air conditioning, complimentary Wi-Fi, tea and coffee and premium bath
              amenities in every room. Whether you are here for a weekend or a family wedding, it should feel like home from the
              first night.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-stone pb-28 md:pb-36">
        <Container>
          <div className="grid gap-x-6 gap-y-20 md:grid-cols-2">
            {roomsPremiumFirst.map((r, i) => {
              const wide = i === 0;
              return (
                <article key={r.id} className={wide ? "md:col-span-2" : ""}>
                  <Link href={`/accommodation/${r.id}`} className="group block" aria-label={`View the ${r.name}`}>
                    <div className={`relative overflow-hidden bg-ink/10 ${wide ? "aspect-[4/5] md:aspect-[16/7]" : "aspect-[4/5]"}`}>
                      <Image src={r.cover.src} alt={r.cover.alt} fill quality={85} sizes={wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"} className="img-drift object-cover" style={r.focus ? { objectPosition: r.focus } : undefined} />
                    </div>
                  </Link>
                  <div className={`mt-6 ${wide ? "md:grid md:grid-cols-[1fr_auto] md:items-end md:gap-10" : ""}`}>
                    <div>
                      <h2 className="t-display text-[clamp(1.6rem,2.4vw,2.2rem)]">{r.name}</h2>
                      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-taupe">{[...r.specs, `${r.count} ${r.count === 1 ? "room" : "rooms"}`].join("  •  ")}</p>
                      <p className="t-body mt-3 max-w-[50ch]">{r.summary}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-6">
                      <LineLink href={`/accommodation/${r.id}`}>View room</LineLink>
                      <BookButton tone="outline" className="!px-6 !py-3">Book</BookButton>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
