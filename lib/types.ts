// ============================================================
// VenueVibe — Core Type Definitions
// ============================================================
// Single source of truth for all data structures.
// Every component, hook, and server function imports from here.
// ============================================================

// --------------- Venue Types & Vibes ---------------

export const VENUE_TYPES = [
  { name: 'Restaurant', slug: 'restaurant', icon: 'UtensilsCrossed' },
  { name: 'Bar & Pub', slug: 'bar-pub', icon: 'Beer' },
  { name: 'Hotel', slug: 'hotel', icon: 'Hotel' },
  { name: 'Warehouse', slug: 'warehouse', icon: 'Warehouse' },
  { name: 'Loft', slug: 'loft', icon: 'Building' },
  { name: 'Studio', slug: 'studio', icon: 'Aperture' },
  { name: 'Gallery', slug: 'gallery', icon: 'Frame' },
  { name: 'Garden & Outdoor', slug: 'garden-outdoor', icon: 'TreePine' },
  { name: 'Rooftop', slug: 'rooftop', icon: 'Sun' },
  { name: 'Boat & Yacht', slug: 'boat-yacht', icon: 'Ship' },
  { name: 'Church & Chapel', slug: 'church-chapel', icon: 'Church' },
  { name: 'Library', slug: 'library', icon: 'BookOpen' },
  { name: 'Museum', slug: 'museum', icon: 'Landmark' },
  { name: 'Manor House', slug: 'manor-house', icon: 'Castle' },
  { name: 'Barn', slug: 'barn', icon: 'Home' },
  { name: 'Marquee Site', slug: 'marquee-site', icon: 'Tent' },
  { name: 'Co-working Space', slug: 'coworking', icon: 'Laptop' },
  { name: 'Screening Room', slug: 'screening-room', icon: 'Monitor' },
  { name: 'Sports Venue', slug: 'sports-venue', icon: 'Trophy' },
  { name: 'Brewery & Distillery', slug: 'brewery-distillery', icon: 'Wine' },
  { name: 'Vineyard', slug: 'vineyard', icon: 'Grape' },
  { name: 'Townhouse', slug: 'townhouse', icon: 'DoorOpen' },
  { name: 'Castle', slug: 'castle', icon: 'Castle' },
  { name: 'Community Hall', slug: 'community-hall', icon: 'Users' },
  { name: 'Theatre', slug: 'theatre', icon: 'Drama' },
] as const;

export type VenueTypeSlug = (typeof VENUE_TYPES)[number]['slug'];

export const VIBE_TAGS = [
  'Industrial',
  'Intimate',
  'Grand',
  'Bohemian',
  'Minimalist',
  'Rustic',
  'Contemporary',
  'Heritage',
  'Rooftop',
  'Waterside',
  'Garden',
  'Cosy',
  'Luxurious',
  'Creative',
  'Raw',
  'Elegant',
  'Quirky',
  'Tropical',
] as const;

export type VibeTag = (typeof VIBE_TAGS)[number];

// --------------- Amenities ---------------

export const AMENITIES = [
  'WiFi',
  'Projector',
  'Sound System',
  'Microphone',
  'Screen / TV',
  'Kitchen',
  'Parking',
  'Wheelchair Accessible',
  'Natural Light',
  'Air Conditioning',
  'Outdoor Area',
  'Stage',
  'Dance Floor',
  'Cloakroom',
  'Green Room',
  'Breakout Rooms',
  'Catering Available',
  'BYO Catering Allowed',
  'BYO Alcohol Allowed',
  'Late Licence',
  'Furniture Provided',
  'Dry Hire Available',
  'On-site Coordinator',
  'Changing Rooms',
  'Loading Bay',
  'Blackout Blinds',
  'EV Charging',
] as const;

export type Amenity = (typeof AMENITIES)[number];

// --------------- Pricing Models ---------------

export type PricingModel = 'hourly' | 'half-day' | 'full-day' | 'minimum-spend' | 'per-head' | 'package';

export interface PricingOption {
  model: PricingModel;
  amount: number;          // in GBP
  label?: string;          // e.g. "Weekend rate", "Evening package"
  minHours?: number;       // for hourly — minimum booking duration
  includes?: string;       // e.g. "Includes AV, catering for 50"
}

// --------------- Cancellation ---------------

export type CancellationPolicy = 'flexible' | 'moderate' | 'strict';

export const CANCELLATION_DESCRIPTIONS: Record<CancellationPolicy, string> = {
  flexible: 'Free cancellation up to 48 hours before the event. Full refund.',
  moderate: 'Free cancellation up to 7 days before the event. 50% refund within 7 days.',
  strict: 'Free cancellation up to 14 days before the event. No refund within 14 days.',
};

// --------------- Venue Spaces (multiple rooms/areas per venue) ---------------

export interface VenueSpace {
  name: string;             // e.g. "Main Hall", "Private Dining Room", "Terrace"
  capacity: number;
  standingCapacity?: number;
  floorAreaSqm?: number;
  setupStyles?: string[];   // e.g. ["Theatre", "Boardroom", "Banquet", "Standing"]
  imageUrl?: string;
}

// --------------- Event-type-specific data ---------------

export interface WeddingInfo {
  ceremonyCapacity?: number;
  receptionCapacity?: number;
  confettiAllowed: boolean;
  outsideCateringAllowed: boolean;
  lateLicenceHours?: string;    // e.g. "Until 1am"
  exclusiveUse: boolean;
  brideGroomSuite: boolean;
}

export interface CorporateInfo {
  avEquipment: string[];         // e.g. ["Projector", "Microphone", "Video conferencing"]
  wifiSpeed?: string;            // e.g. "100Mbps"
  breakoutRooms?: number;
  delegateRate?: number;         // per person per day
  cateringPackages?: string[];   // e.g. ["Morning coffee", "Working lunch", "Full day"]
  invoicingAvailable: boolean;
  poAccepted: boolean;
}

export interface ProductionInfo {
  hourlyRate: number;
  powerOutlets?: string;         // description of power availability
  loadingBay: boolean;
  parkingForVans: boolean;
  naturalLightHours?: string;    // e.g. "Best 10am-3pm south-facing"
  blackoutCapable: boolean;
  noiseRestrictions?: string;
}

export interface DiningInfo {
  menuStyles?: string[];         // e.g. ["Set menu", "À la carte", "Sharing platters"]
  dietaryAccommodation: string[];// e.g. ["Vegetarian", "Vegan", "Halal", "Kosher", "GF"]
  drinksPackages?: string[];     // e.g. ["House wine", "Premium", "Cocktail hour"]
  minimumSpend?: number;
  corkageCharge?: number;
}

export interface PartyInfo {
  djAllowed: boolean;
  entertainmentAllowed: boolean;
  noiseCurfew?: string;          // e.g. "11pm weekdays, 1am weekends"
  byoPolicy?: string;
  lateLicence: boolean;
  ageRestriction?: string;       // e.g. "18+", "No restriction"
  decorationsAllowed: boolean;
}

// --------------- The Main Venue Interface ---------------

export interface Venue {
  id: string;
  title: string;
  slug?: string;
  location: string;
  area?: string;                 // neighbourhood/borough — e.g. "Shoreditch"
  city?: string;                 // hub city — e.g. "London"
  postcode?: string;
  lat?: number;
  lng?: number;

  // Media
  imageUrl: string;              // primary image (backwards compat)
  images: string[];              // all images
  videoUrl?: string;             // walkthrough video URL

  // Core details
  description?: string;
  venueType?: VenueTypeSlug;
  vibeTags: VibeTag[];
  capacity: number;
  standingCapacity?: number;
  floorAreaSqm?: number;
  amenities: Amenity[];
  spaces?: VenueSpace[];         // multiple rooms/areas

  // Pricing
  price: number;                 // primary display price (backwards compat)
  pricingModel: PricingModel;
  pricingOptions?: PricingOption[];

  // Policies
  cancellationPolicy: CancellationPolicy;
  minimumBookingHours?: number;
  indoorOutdoor?: 'indoor' | 'outdoor' | 'both';

  // Event-type-specific
  eventTypesSupported: string[]; // slugs from EVENT_TYPES in locations.ts
  weddingInfo?: WeddingInfo;
  corporateInfo?: CorporateInfo;
  productionInfo?: ProductionInfo;
  diningInfo?: DiningInfo;
  partyInfo?: PartyInfo;

  // Host & trust
  hostId?: string;
  hostName?: string;
  hostEmail?: string;
  isSuperhost?: boolean;
  isVerified?: boolean;
  isClaimed?: boolean;           // for seed venues — has the real owner claimed it?

  // Ratings & metrics
  rating?: number;
  reviews?: number;
  avgResponseMinutes?: number;   // tracked from inquiry timestamps
  responseRate?: number;         // percentage of inquiries answered

  // Availability
  availability?: Record<string, 'available' | 'unavailable' | 'hold'>;
  // keyed by date string "YYYY-MM-DD"

  // Meta
  createdAt?: string;
  updatedAt?: string;
}

// --------------- Inquiry ---------------

export interface Inquiry {
  id: string;
  venueId: string;
  venueTitle: string;
  hostId: string;
  hostName?: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhoto?: string;

  eventDate: string;
  eventType?: string;
  guestCount?: number;
  message?: string;
  budgetRange?: string;

  status: 'pending' | 'responded' | 'confirmed' | 'declined' | 'expired';
  hostResponse?: string;
  hostRespondedAt?: string;

  createdAt: string;
  updatedAt?: string;
}

// --------------- Review ---------------

export interface Review {
  id: string;
  venueId: string;
  userId: string;
  userName: string;
  userPhoto?: string;

  rating: number;               // 1-5
  title?: string;
  body: string;
  eventType?: string;
  guestCount?: number;
  wasAsPictured?: boolean;      // "Was the venue as pictured?"
  wouldRecommend?: boolean;
  improvementSuggestion?: string;

  // Event photos from the guest
  eventPhotos?: string[];

  // Host response
  hostResponse?: string;
  hostRespondedAt?: string;

  // Verification
  bookingVerified: boolean;      // was there a confirmed booking?
  createdAt: string;
}

// --------------- Saved Venues / Shortlist ---------------

export interface SavedVenue {
  venueId: string;
  savedAt: string;
  notes?: string;               // personal notes
}

export interface Shortlist {
  id: string;
  userId: string;
  title: string;                // e.g. "Wedding venues shortlist"
  venueIds: string[];
  isPublic: boolean;            // shareable link
  sharedSlug?: string;          // the public URL slug
  createdAt: string;
  updatedAt?: string;
}

// --------------- Helper — default venue values ---------------

export function getDefaultVenue(): Partial<Venue> {
  return {
    images: [],
    vibeTags: [],
    amenities: [],
    eventTypesSupported: [],
    pricingModel: 'hourly',
    cancellationPolicy: 'flexible',
    indoorOutdoor: 'indoor',
    isClaimed: true,
  };
}

// --------------- Helper — format response time ---------------

export function formatResponseTime(minutes?: number): string {
  if (!minutes || minutes <= 0) return 'New listing';
  if (minutes < 60) return `Usually responds within ${minutes} min`;
  if (minutes < 120) return 'Usually responds within 1 hour';
  if (minutes < 1440) return `Usually responds within ${Math.round(minutes / 60)} hours`;
  return `Usually responds within ${Math.round(minutes / 1440)} days`;
}

// --------------- Helper — format pricing ---------------

export function formatPrice(venue: Venue): string {
  const model = venue.pricingModel || 'hourly';
  const amount = venue.price;
  switch (model) {
    case 'hourly': return `£${amount}/hr`;
    case 'half-day': return `£${amount}/half day`;
    case 'full-day': return `£${amount}/day`;
    case 'minimum-spend': return `From £${amount} min spend`;
    case 'per-head': return `£${amount}/person`;
    case 'package': return `From £${amount}`;
    default: return `£${amount}`;
  }
}
