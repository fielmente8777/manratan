import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, LineLink } from "@/components/site/ui";
import { site } from "@/data/site";
import { blogsData } from "../components/blogsData";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogsData.find((b) => b.slug === slug);
  if (!post) return { title: "Story not found" };
  return {
    title: { absolute: post.meta.title },
    description: post.meta.description,
    keywords: post.meta.keyWords,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: { type: "article", title: post.meta.title, description: post.meta.description, images: [{ url: post.coverImage, alt: post.alt }] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogsData.find((b) => b.slug === slug);
  if (!post) notFound();
  const more = blogsData.filter((b) => b.slug !== post.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${site.url}${post.coverImage}`,
    publisher: { "@type": "Organization", name: "Manratan Resort" },
    mainEntityOfPage: `${site.url}/blogs/${post.slug}`,
  };

  return (
    <main className="bg-stone">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-ink text-stone">
        <Image src={post.coverImage} alt={post.alt} fill preload sizes="100vw" quality={85} className="-z-10 object-cover hero-fade" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
        <Container className="pb-16 sm:pb-20">
          <p className="hero-rise text-xs tracking-[0.2em] uppercase text-stone/80">{post.date}</p>
          <h1 className="hero-rise delay-1 t-display mt-4 max-w-[22ch] text-[clamp(2.2rem,5vw,4.6rem)]">{post.title}</h1>
        </Container>
      </section>

      <article className="py-20 md:py-28">
        <Container className="max-w-[760px]">
          <Link href="/blogs" className="link-line t-label text-ink">All stories</Link>
          <p className="t-display mt-12 text-[clamp(1.25rem,2vw,1.6rem)] normal-case tracking-normal leading-snug">{post.description}</p>
          <div
            className="mt-10 space-y-5 text-[1.02rem] leading-[1.9] text-taupe [&_h2]:font-display [&_h2]:font-normal [&_h2]:pt-8 [&_h2]:text-[1.6rem] [&_h2]:leading-tight [&_h2]:text-ink [&_h2]:uppercase [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink"
            dangerouslySetInnerHTML={{ __html: post.data }}
          />
        </Container>
      </article>

      <section className="bg-stone-deep py-20 md:py-28" aria-labelledby="more-stories">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 id="more-stories" className="t-display text-[clamp(1.6rem,2.6vw,2.4rem)]">More stories</h2>
            <LineLink href="/blogs">The journal</LineLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/blogs/${m.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink/10">
                  <Image src={m.coverImage} alt={m.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="img-drift object-cover" />
                </div>
                <h3 className="t-display mt-4 text-[1.2rem] leading-snug">{m.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
