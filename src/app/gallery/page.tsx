import type { Metadata } from "next";
import { Container, GemRule, Title } from "@/components/site/ui";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs of Manratan Resort, Narsinghgarh: rooms and suites, the Blue Diamond pool, Swadika restaurant, banquet halls, the Sky Lawn and places nearby.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main className="bg-stone">
      <section className="pt-20 pb-8 md:pt-24">
        <Container className="max-w-[760px] text-center">
          <Title as="h1" main="Gallery" script="A visual journey" align="center" />
          <p className="t-body mx-auto mt-8 max-w-[52ch]">
            The resort, the rooms, the pool and Narsinghgarh beyond, photographed for Manratan. Choose a category or open any photo
            to see it full size.
          </p>
          <GemRule className="mx-auto mt-10 max-w-[180px]" />
        </Container>
      </section>
      <section className="pb-28">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </main>
  );
}
