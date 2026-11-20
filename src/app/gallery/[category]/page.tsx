import type { Metadata } from "next";
import { Container, GemRule, Title } from "@/components/site/ui";
import GalleryGrid from "../GalleryGrid";
import { galleryCategories, type GallerySlug } from "@/data/site";
import { redirect } from "next/navigation";

const bySlug = new Map(galleryCategories.map((c) => [c.slug, c]));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = bySlug.get(category as GallerySlug);
  const label = cat ? cat.label : "Gallery";
  return {
    title: `${label} Gallery | Manratan Resort`,
    description: `Photographs of ${label} at Manratan Resort, Narsinghgarh.`,
    alternates: { canonical: `/gallery/${category}` },
  };
}

export default async function GalleryCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (category === "all") {
    redirect("/gallery");
  }

  const validSlug = bySlug.has(category as GallerySlug)
    ? (category as GallerySlug)
    : "all";

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
          <GalleryGrid initialSlug={validSlug} />
        </Container>
      </section>
    </main>
  );
}
