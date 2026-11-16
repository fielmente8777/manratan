import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getRoom, rooms, site } from "@/data/site";

import RoomDetailContent from "./RoomDetailContent";
import roomDetails from "./room-details.json";
import "../accommodation-reference.css";
import "./room-detail.css";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return rooms.map((r) => ({ id: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const room = getRoom(id);
  if (!room) return { title: "Room not found" };
  return {
    title: { absolute: room.meta.title },
    description: room.meta.description,
    keywords: room.meta.keywords,
    alternates: { canonical: `/accommodation/${room.slug}` },
    openGraph: {
      title: room.meta.title,
      description: room.meta.description,
      images: [{ url: room.hero.src, alt: room.hero.alt }],
    },
  };
}

export default async function RoomPage({ params }: Params) {
  const { id } = await params;
  const room = getRoom(id);
  if (!room) notFound();

  if (id !== room.slug) permanentRedirect(`/accommodation/${room.slug}`);

  const detail = roomDetails[room.id as keyof typeof roomDetails];
  if (!detail) notFound();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Rooms & suites", item: `${site.url}/accommodation` },
      { "@type": "ListItem", position: 3, name: detail.name, item: `${site.url}/accommodation/${room.slug}` },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <RoomDetailContent key={id} room={detail} />
  </>;
}
