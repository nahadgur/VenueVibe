// ============================================================
// JSON-LD Schema Generators for SEO
// ============================================================
// Generates structured data that Google uses for rich results:
//   - EventVenue: individual venue pages / cards
//   - LocalBusiness: venue providers
//   - AggregateRating: star ratings in SERPs
//   - ItemList: listing pages (city hubs, search results)
//   - WebSite: site-level search action
// ============================================================

import type { Venue } from '@/lib/types';

const SITE_URL = 'https://venuevibe.com';

// --------------- Single Venue Schema ---------------

export function generateVenueSchema(venue: Venue, citySlug?: string) {
  const url = citySlug
    ? `${SITE_URL}/venues/${citySlug}#venue-${venue.id}`
    : `${SITE_URL}/venues#venue-${venue.id}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['EventVenue', 'LocalBusiness'],
    '@id': url,
    name: venue.title,
    description: venue.description || `${venue.title} — a curated venue space in ${venue.location}.`,
    url,
    image: venue.imageUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: venue.location,
      addressCountry: 'GB',
    },
    maximumAttendeeCapacity: venue.capacity,
    priceRange: `£${venue.price}/hr`,
    currenciesAccepted: 'GBP',
  };

  // AggregateRating — only if we have ratings
  if (venue.rating && venue.reviews && venue.reviews > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: venue.rating,
      reviewCount: venue.reviews,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

// --------------- Venue List Schema (ItemList) ---------------

export function generateVenueListSchema(
  venues: Venue[],
  pageTitle: string,
  pageUrl: string,
  citySlug?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    url: `${SITE_URL}${pageUrl}`,
    numberOfItems: venues.length,
    itemListElement: venues.slice(0, 20).map((venue, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: generateVenueSchema(venue, citySlug),
    })),
  };
}

// --------------- City Hub Schema (LocalBusiness collection) ---------------

export function generateCityHubSchema(
  cityName: string,
  citySlug: string,
  region: string,
  description: string,
  venueCount: number
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Venues in ${cityName}`,
    description,
    url: `${SITE_URL}/venues/${citySlug}`,
    about: {
      '@type': 'Place',
      name: cityName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: cityName,
        addressRegion: region,
        addressCountry: 'GB',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: venueCount,
    },
  };
}

// --------------- Website-level Schema ---------------

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VenueVibe',
    url: SITE_URL,
    description: 'Curated venues for elevated occasions across the UK.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/venues?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// --------------- FAQ Schema (for content-rich pages) ---------------

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
