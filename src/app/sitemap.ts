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
    page("/accommodation", 0.9),
    ...rooms.map((r) => page(`/accommodation/${r.id}`, 0.8)),
    page("/events", 0.9),
    page("/gallery", 0.7),
    page("/about", 0.6),
    page("/contactus", 0.7),
    page("/blogs", 0.6, "weekly"),
    ...blogsData.map((b) => page(`/blogs/${b.slug}`, 0.5)),
  ];
}
