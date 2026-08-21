import { Metadata } from "next";
import BlogHero from "./components/BlogHero";
import BlogCard from "./components/BlogCard";
import { blogsData } from "./components/blogsData";
import { SectionWithContainer } from "@/components/sectionComponants";

export const metadata: Metadata = {
  title: "Blogs | Manratan Resort",
  description: "Blogs | Manratan Resort - Discover local heritage, wedding guides, wellness retreats, and culinary stories.",
  alternates: {
    canonical: "https://manratanresort.com/blogs",
  },
};

export default function BlogsPage() {
  return (
    <main className="w-full bg-tertiary min-h-screen">
      {/* Header Banner: MANRATAN Blogs */}
      <BlogHero title="MANRATAN" subTitle="Blogs" />

      {/* Main Blog Cards Grid Section - Reusing team's SectionWithContainer component pattern */}
      <SectionWithContainer sectionClassName="bg-tertiary">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogsData.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </SectionWithContainer>
    </main>
  );
}
