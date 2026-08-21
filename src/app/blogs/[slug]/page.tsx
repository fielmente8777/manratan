import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { blogsData } from "../components/blogsData";
import BlogHero from "../components/BlogHero";
import { SectionWithContainer } from "@/components/sectionComponants";

interface BlogSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogSlugPageProps): Promise<Metadata> {
  const path = await params;
  const post = blogsData.find((b) => b.slug === path.slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
    keywords: post.meta.keyWords,
    alternates: {
      canonical: `https://manratanresort.com/blogs/${post.slug}`,
      languages: {
        "en-US": `https://manratanresort.com/blogs/${post.slug}`,
      },
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        nocache: true,
      },
    },
  };
}

export default async function BlogDetailPage({ params }: BlogSlugPageProps) {
  const path = await params;
  const post = blogsData.find((b) => b.slug === path.slug);

  if (!post) {
    notFound();
  }

  const coverImageUrl = post.url || post.coverImage;

  return (
    <main className="w-full bg-tertiary min-h-screen">
      {/* Top Banner */}
      <BlogHero title="MANRATAN" subTitle="Blogs" />

      {/* Article Detail Content Section */}
      <SectionWithContainer sectionClassName="bg-tertiary">
        <div className="max-w-4xl mx-auto text-left">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-6 hover:underline"
          >
            ← Back to All Blogs
          </Link>

          {/* Date */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-secondary mb-4">
            <span>{post.date}</span>
          </div>

          {/* Article Title */}
          <h1 className="text-primary text-2xl sm:text-3xl md:text-4xl font-[serif] font-normal uppercase leading-tight mb-6">
            {post.title}
          </h1>

          {/* Main Cover Image */}
          {coverImageUrl && (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-gray-100">
              <Image
                src={coverImageUrl}
                alt={post.alt || post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {/* Render HTML Data Content */}
          <div
            className="prose max-w-none text-secondary text-sm sm:text-base leading-relaxed space-y-4 [&_h2]:text-primary [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-[serif] [&_h2]:font-normal [&_h2]:uppercase [&_h2]:pt-4 [&_h2]:pb-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-secondary"
            dangerouslySetInnerHTML={{ __html: post.data }}
          />
        </div>
      </SectionWithContainer>
    </main>
  );
}
