import { Metadata } from "next";
import { roomDetailsData } from "./components/roomDetailsData";
import { notFound } from "next/navigation";
import AccommodationDetailHero from "./components/AccommodationDetailHero";
import AccommodationDetailIntro from "./components/AccommodationDetailIntro";
import AmenitiesTicker from "./components/AmenitiesTicker";
import RoomGallerySlider from "./components/RoomGallerySlider";

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const rooms = await roomDetailsData;

  return rooms.map((room) => ({
    id: room.id,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const path = await params;
  const post = roomDetailsData.find((item) => item.id === path.id);

  if (!post) {
    return {
      title: "Page not found",
    };
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
    keywords: post.meta.keyWords,
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

export default async function RoomsPage({ params }: Params) {
  const path = await params;
  const pageData = roomDetailsData.find((item) => item.id === path.id);

  if (!pageData) return notFound();

  return (
    <main className="bg-[#f6f4f0] min-h-screen">
      {/* Hero Header with Navbar */}
      <AccommodationDetailHero
        bgImage={pageData.heroImage}
        alt={pageData.title}
      />

      {/* Intro Description */}
      <AccommodationDetailIntro text={pageData.introParagraph} />

      {/* Room Gallery Carousel Slider */}
      <RoomGallerySlider specs={pageData.specs} images={pageData.galleryImages} />

      {/* Amenities Infinite Ticker */}
      <AmenitiesTicker items={pageData.amenities} />
    </main>
  );
}


