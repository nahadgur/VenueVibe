// ============================================================
// VenueVibe – Location & Event Type Data Layer
// ============================================================
// This powers all programmatic SEO pages:
//   /venues              → master hub (all cities)
//   /venues/[city]       → city hub or spoke page
//   /venues/[city]/[eventType] → city × event-type page
// ============================================================

// --------------- Types ---------------

export interface SpokeLocation {
  name: string;
  slug: string;
}

export interface CityHub {
  name: string;
  slug: string;
  region: string;
  description: string;
  isHub: true;
  spokes: SpokeLocation[];
}

export interface SpokeCity {
  name: string;
  slug: string;
  region: string;
  description: string;
  isHub: false;
  parentHub: string; // slug of the parent hub
}

export type CityEntry = CityHub | SpokeCity;

export interface EventType {
  name: string;
  slug: string;
  description: string;
  icon: string; // lucide icon name
}

// --------------- Event Types ---------------

export const EVENT_TYPES: EventType[] = [
  {
    name: 'Corporate Events',
    slug: 'corporate-events',
    description: 'Boardrooms, conference halls, and executive spaces for impactful corporate gatherings.',
    icon: 'Briefcase',
  },
  {
    name: 'Weddings',
    slug: 'weddings',
    description: 'Romantic and elegant venues to celebrate your special day.',
    icon: 'Heart',
  },
  {
    name: 'Photo Shoots',
    slug: 'photo-shoots',
    description: 'Studios and unique backdrops perfect for editorial and commercial photography.',
    icon: 'Camera',
  },
  {
    name: 'Product Launches',
    slug: 'product-launches',
    description: 'Showstopping spaces designed to make your new product unforgettable.',
    icon: 'Rocket',
  },
  {
    name: 'Exhibitions',
    slug: 'exhibitions',
    description: 'Gallery spaces and open-plan venues for art, design, and interactive displays.',
    icon: 'Frame',
  },
  {
    name: 'Private Dining',
    slug: 'private-dining',
    description: 'Intimate dining rooms and chef\'s tables for exclusive culinary experiences.',
    icon: 'UtensilsCrossed',
  },
  {
    name: 'Workshops',
    slug: 'workshops',
    description: 'Creative and collaborative spaces for hands-on learning and team building.',
    icon: 'Lightbulb',
  },
  {
    name: 'Conferences',
    slug: 'conferences',
    description: 'Large-scale venues with staging, AV, and breakout rooms for industry events.',
    icon: 'Mic',
  },
];

// --------------- Hub Cities ---------------

export const CITIES: CityEntry[] = [
  // ---- HUBS ----
  {
    name: 'London',
    slug: 'london',
    region: 'Greater London',
    description: 'From converted warehouses in Shoreditch to grand halls in Kensington, London offers the UK\'s most diverse collection of venue spaces.',
    isHub: true,
    spokes: [
      { name: 'Harrow', slug: 'harrow' },
      { name: 'Wembley', slug: 'wembley' },
      { name: 'Camden', slug: 'camden' },
      { name: 'Shoreditch', slug: 'shoreditch' },
      { name: 'Kensington', slug: 'kensington' },
      { name: 'Islington', slug: 'islington' },
      { name: 'Hackney', slug: 'hackney' },
      { name: 'Brixton', slug: 'brixton' },
      { name: 'Greenwich', slug: 'greenwich' },
      { name: 'Richmond', slug: 'richmond' },
      { name: 'Notting Hill', slug: 'notting-hill' },
      { name: 'Mayfair', slug: 'mayfair' },
    ],
  },
  {
    name: 'Birmingham',
    slug: 'birmingham',
    region: 'West Midlands',
    description: 'The UK\'s second city brings industrial heritage meets modern creativity, with a thriving venue scene from Digbeth to the Jewellery Quarter.',
    isHub: true,
    spokes: [
      { name: 'Digbeth', slug: 'digbeth' },
      { name: 'Jewellery Quarter', slug: 'jewellery-quarter' },
      { name: 'Edgbaston', slug: 'edgbaston' },
      { name: 'Solihull', slug: 'solihull' },
      { name: 'Sutton Coldfield', slug: 'sutton-coldfield' },
    ],
  },
  {
    name: 'Manchester',
    slug: 'manchester',
    region: 'Greater Manchester',
    description: 'A cultural powerhouse with venues ranging from repurposed cotton mills to sleek Spinningfields penthouses.',
    isHub: true,
    spokes: [
      { name: 'Northern Quarter', slug: 'northern-quarter' },
      { name: 'Ancoats', slug: 'ancoats' },
      { name: 'Deansgate', slug: 'deansgate' },
      { name: 'Salford', slug: 'salford' },
      { name: 'Didsbury', slug: 'didsbury' },
    ],
  },
  {
    name: 'Leeds',
    slug: 'leeds',
    region: 'West Yorkshire',
    description: 'Yorkshire\'s commercial capital combines Victorian grandeur with a modern creative economy.',
    isHub: true,
    spokes: [
      { name: 'Headingley', slug: 'headingley' },
      { name: 'Roundhay', slug: 'roundhay' },
      { name: 'Horsforth', slug: 'horsforth' },
    ],
  },
  {
    name: 'Bristol',
    slug: 'bristol',
    region: 'South West',
    description: 'A creative hub where colourful harbourside warehouses meet Georgian elegance.',
    isHub: true,
    spokes: [
      { name: 'Clifton', slug: 'clifton' },
      { name: 'Stokes Croft', slug: 'stokes-croft' },
      { name: 'Redcliffe', slug: 'redcliffe' },
    ],
  },
  {
    name: 'Edinburgh',
    slug: 'edinburgh',
    region: 'Scotland',
    description: 'Historic castle-adjacent halls and New Town townhouses in one of Europe\'s most dramatic cityscapes.',
    isHub: true,
    spokes: [
      { name: 'Leith', slug: 'leith' },
      { name: 'Stockbridge', slug: 'stockbridge' },
      { name: 'Old Town', slug: 'old-town-edinburgh' },
    ],
  },
  {
    name: 'Glasgow',
    slug: 'glasgow',
    region: 'Scotland',
    description: 'Scotland\'s largest city delivers raw industrial charm alongside Art Nouveau masterpieces.',
    isHub: true,
    spokes: [
      { name: 'Merchant City', slug: 'merchant-city' },
      { name: 'West End', slug: 'west-end-glasgow' },
      { name: 'Finnieston', slug: 'finnieston' },
    ],
  },
  {
    name: 'Liverpool',
    slug: 'liverpool',
    region: 'Merseyside',
    description: 'Iconic waterfront venues and Baltic Triangle creativity in a city built on culture.',
    isHub: true,
    spokes: [
      { name: 'Baltic Triangle', slug: 'baltic-triangle' },
      { name: 'Albert Dock', slug: 'albert-dock' },
      { name: 'Woolton', slug: 'woolton' },
    ],
  },

  // ---- SPOKES (auto-generated from hub data below) ----
];

// --------------- Build spoke entries from hub data ---------------

const spokeEntries: SpokeCity[] = [];
for (const city of CITIES) {
  if (city.isHub) {
    for (const spoke of city.spokes) {
      spokeEntries.push({
        name: spoke.name,
        slug: spoke.slug,
        region: city.name,
        description: `Discover curated venue spaces in ${spoke.name}, ${city.name}. From intimate gatherings to grand celebrations.`,
        isHub: false,
        parentHub: city.slug,
      });
    }
  }
}

// Append spokes to the CITIES array
CITIES.push(...spokeEntries);

// --------------- Lookup helpers ---------------

/** Get a city/spoke by its slug */
export function getCityBySlug(slug: string): CityEntry | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/** Get an event type by its slug */
export function getEventTypeBySlug(slug: string): EventType | undefined {
  return EVENT_TYPES.find((e) => e.slug === slug);
}

/** Get all hub cities only */
export function getHubCities(): CityHub[] {
  return CITIES.filter((c): c is CityHub => c.isHub);
}

/** Get the parent hub for a spoke */
export function getParentHub(spokeSlug: string): CityHub | undefined {
  const spoke = getCityBySlug(spokeSlug);
  if (!spoke || spoke.isHub) return undefined;
  return CITIES.find((c): c is CityHub => c.isHub && c.slug === spoke.parentHub);
}

/** Get all city slugs (hubs + spokes) for static param generation */
export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

/** Get all [city] × [eventType] combinations for static param generation */
export function getAllCityEventCombinations(): { city: string; eventType: string }[] {
  const combos: { city: string; eventType: string }[] = [];
  for (const city of CITIES) {
    for (const event of EVENT_TYPES) {
      combos.push({ city: city.slug, eventType: event.slug });
    }
  }
  return combos;
}

/** Build breadcrumb trail for any route */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function buildBreadcrumbs(citySlug?: string, eventTypeSlug?: string): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Venues', href: '/venues' },
  ];

  if (!citySlug) return crumbs;

  const city = getCityBySlug(citySlug);
  if (!city) return crumbs;

  // If spoke, add parent hub first
  if (!city.isHub) {
    const parent = getParentHub(citySlug);
    if (parent) {
      crumbs.push({ label: parent.name, href: `/venues/${parent.slug}` });
    }
  }

  crumbs.push({ label: city.name, href: `/venues/${city.slug}` });

  if (eventTypeSlug) {
    const eventType = getEventTypeBySlug(eventTypeSlug);
    if (eventType) {
      crumbs.push({ label: eventType.name, href: `/venues/${city.slug}/${eventType.slug}` });
    }
  }

  return crumbs;
}
