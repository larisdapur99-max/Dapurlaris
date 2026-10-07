import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "http://localhost:3011", lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
