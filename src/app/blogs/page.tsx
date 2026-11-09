import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import { Container } from "@/components/site/ui";
import { photo } from "@/data/site";
import { blogsData } from "./components/blogsData";

export const metadata: Metadata = {
  title: "Journal: Narsinghgarh, Weddings & Malwa Food",
  description:
    "Stories from Manratan Resort: discovering Narsinghgarh, destination weddings, slow weekends from Bhopal and Indore, and the flavours of Malwa.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  const [lead, ...rest] = blogsData;
  return (
    <main className="bg-stone">
      <PageHero image={photo("ngh-lake-town", "Narsinghgarh town and its lake from above")} title="Journal" script="Stories from Malwa" />

      <section className="py-24 md:py-32">
        <Container>
          <Link href={`/blogs/${lead.slug}`} className="group grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink/10">
              <Image src={lead.coverImage} alt={lead.alt} fill quality={85} sizes="(max-width: 1024px) 100vw, 58vw" className="img-drift object-cover" />
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-taupe">{lead.date}</p>
              <h2 className="t-display mt-3 text-[clamp(1.8rem,3vw,2.8rem)]">{lead.title}</h2>
              <p className="t-body mt-4 max-w-[50ch]">{lead.description}</p>
              <span className="link-line t-label mt-8 text-ink">Read the story</span>
            </div>
          </Link>

          <div className="mt-24 grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink/10">
                  <Image src={post.coverImage} alt={post.alt} fill quality={85} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="img-drift object-cover" />
                </div>
                <p className="mt-5 text-xs tracking-[0.18em] uppercase text-taupe">{post.date}</p>
                <h2 className="t-display mt-2 text-[1.35rem] leading-snug">{post.title}</h2>
                <p className="t-body mt-3 text-[0.92rem]">{post.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
