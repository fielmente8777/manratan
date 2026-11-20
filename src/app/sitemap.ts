import type { MetadataRoute } from "next";
import { rooms, site } from "@/data/site";
import { blogsData } from "./blogs/components/blogsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/rooms-&-suites", 0.9),
    ...rooms.map((r) => page(`/rooms-&-suites/${r.slug}`, 0.8)),
    page("/weddings-&-events", 0.9),
    page("/gallery", 0.7),
    page("/our-story", 0.6),
    page("/contact-us", 0.7),
    page("/journal", 0.6, "weekly"),
    ...blogsData.map((b) => page(`/journal/${b.slug}`, 0.5)),
  ];
}
