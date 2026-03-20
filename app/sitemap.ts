import type { MetadataRoute } from 'next';
import { getAllCitySlugs, getAllCityEventCombinations } from '@/lib/locations';
import { getAllIntentSlugs } from '@/lib/intent-pages';
import { getAllBlogSlugs } from '@/lib/blog';
import { getVenues } from '@/lib/venues-server';

const BASE_URL = 'https://venuevibe.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // ── Static pages ──
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/venues`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/list-venue`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  // ── City pages ──
  const citySlugs = getAllCitySlugs();
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE_URL}/venues/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ── City × Event Type pages ──
  const combos = getAllCityEventCombinations();
  const comboPages: MetadataRoute.Sitemap = combos.map((c) => ({
    url: `${BASE_URL}/venues/${c.city}/${c.eventType}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // ── Intent pages ──
  const intentSlugs = getAllIntentSlugs();
  const intentPages: MetadataRoute.Sitemap = intentSlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ── Blog posts ──
  const blogSlugs = getAllBlogSlugs();
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // ── Individual venue pages (from Firestore — picks up new listings) ──
  const venues = await getVenues();
  const venuePages: MetadataRoute.Sitemap = venues.map((v) => ({
    url: `${BASE_URL}/venue/${v.id}`,
    lastModified: v.createdAt || now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...cityPages,
    ...comboPages,
    ...intentPages,
    ...blogPages,
    ...venuePages,
  ];
}
