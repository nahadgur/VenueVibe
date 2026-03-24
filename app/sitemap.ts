import type { MetadataRoute } from 'next';
import { getAllCitySlugs, getAllCityEventCombinations, EVENT_TYPES } from '@/lib/locations';
import { VENUE_TYPES } from '@/lib/types';
import { getAllIntentSlugs } from '@/lib/intent-pages';
import { getAllBlogSlugs } from '@/lib/blog';
import { getVenues } from '@/lib/venues-server';

const BASE_URL = 'https://venuevibe.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/venues`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/list-venue`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/help`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // City pages
  const cityPages: MetadataRoute.Sitemap = getAllCitySlugs().map((slug) => ({
    url: `${BASE_URL}/venues/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // City × Event Type pages
  const comboPages: MetadataRoute.Sitemap = getAllCityEventCombinations().map((c) => ({
    url: `${BASE_URL}/venues/${c.city}/${c.eventType}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Collection pages
  const collectionPages: MetadataRoute.Sitemap = EVENT_TYPES.map((et) => ({
    url: `${BASE_URL}/collections/${et.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Intent pages
  const intentPages: MetadataRoute.Sitemap = getAllIntentSlugs().map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Venue type pages
  const venueTypePages: MetadataRoute.Sitemap = VENUE_TYPES.map((vt) => ({
    url: `${BASE_URL}/venue-types/${vt.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Individual venue pages
  const venues = await getVenues();
  const venuePages: MetadataRoute.Sitemap = venues.map((v) => ({
    url: `${BASE_URL}/venue/${v.id}`,
    lastModified: v.updatedAt || v.createdAt || now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...cityPages,
    ...comboPages,
    ...collectionPages,
    ...venueTypePages,
    ...intentPages,
    ...blogPages,
    ...venuePages,
  ];
}
