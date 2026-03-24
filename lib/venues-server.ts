import type { Venue } from '@/lib/types';

export type { Venue };

/** Hardcoded fallback venues — used when Firestore is unavailable at build time */
const FALLBACK_VENUES: Venue[] = [
  {
    id: '1', title: 'The Glasshouse Loft', location: 'Downtown Manhattan, NY', price: 250, pricingModel: 'hourly', rating: 4.9, reviews: 128, capacity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: true, isVerified: true, isClaimed: true, venueType: 'loft',
    vibeTags: ['Industrial', 'Contemporary', 'Minimalist'], amenities: ['WiFi', 'Projector', 'Sound System', 'Kitchen', 'Natural Light'],
    eventTypesSupported: ['corporate-events', 'product-launches', 'photo-shoots'], cancellationPolicy: 'flexible', avgResponseMinutes: 45, responseRate: 98,
  },
  {
    id: '2', title: 'Industrial Warehouse Studio', location: 'Arts District, LA', price: 180, pricingModel: 'hourly', rating: 4.8, reviews: 95, capacity: 300,
    imageUrl: 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: false, isVerified: true, isClaimed: true, venueType: 'warehouse',
    vibeTags: ['Industrial', 'Raw', 'Creative'], amenities: ['WiFi', 'Parking', 'Loading Bay', 'Natural Light'],
    eventTypesSupported: ['photo-shoots', 'film-tv-production', 'product-launches'], cancellationPolicy: 'moderate', avgResponseMinutes: 120, responseRate: 92,
  },
  {
    id: '3', title: 'Rooftop Garden Oasis', location: 'West Loop, Chicago', price: 320, pricingModel: 'hourly', rating: 5.0, reviews: 210, capacity: 80,
    imageUrl: 'https://images.unsplash.com/photo-1572364769167-198dcb7b520c?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1572364769167-198dcb7b520c?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: true, isVerified: true, isClaimed: true, venueType: 'garden-outdoor',
    vibeTags: ['Rooftop', 'Intimate', 'Elegant'], amenities: ['WiFi', 'Sound System', 'Outdoor Area', 'Catering Available', 'Late Licence'],
    eventTypesSupported: ['weddings', 'engagement-parties', 'birthday-parties'], cancellationPolicy: 'flexible', avgResponseMinutes: 30, responseRate: 100,
  },
  {
    id: '4', title: 'Historic Mansion Parlor', location: 'Beacon Hill, Boston', price: 450, pricingModel: 'half-day', rating: 4.7, reviews: 64, capacity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: false, venueType: 'manor-house',
    vibeTags: ['Heritage', 'Grand', 'Elegant'], amenities: ['WiFi', 'Natural Light', 'Cloakroom', 'Catering Available'],
    eventTypesSupported: ['weddings', 'private-dining', 'corporate-events'], cancellationPolicy: 'strict', avgResponseMinutes: 180, responseRate: 85,
  },
  {
    id: '5', title: 'Modern Art Gallery', location: 'Wynwood, Miami', price: 200, pricingModel: 'hourly', rating: 4.9, reviews: 156, capacity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: true, isVerified: true, isClaimed: true, venueType: 'gallery',
    vibeTags: ['Contemporary', 'Creative', 'Minimalist'], amenities: ['WiFi', 'Projector', 'Natural Light', 'Air Conditioning'],
    eventTypesSupported: ['exhibitions', 'product-launches', 'photo-shoots'], cancellationPolicy: 'moderate', avgResponseMinutes: 60, responseRate: 96,
  },
  {
    id: '6', title: 'Minimalist Daylight Studio', location: 'Williamsburg, Brooklyn', price: 120, pricingModel: 'hourly', rating: 4.6, reviews: 82, capacity: 30,
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: false, isVerified: true, isClaimed: true, venueType: 'studio',
    vibeTags: ['Minimalist', 'Creative', 'Intimate'], amenities: ['WiFi', 'Natural Light', 'Blackout Blinds', 'Kitchen'],
    eventTypesSupported: ['photo-shoots', 'film-tv-production', 'workshops'], cancellationPolicy: 'flexible', avgResponseMinutes: 90, responseRate: 88,
  },
];

/**
 * Dynamically import Firebase to avoid SSR issues at build time.
 * Firebase client SDK uses browser globals — importing it at module level
 * in a server component can crash during `next build`.
 */
async function getFirestoreDb() {
  try {
    const { db } = await import('@/firebase');
    return db;
  } catch (error) {
    console.error('Could not load Firebase:', error);
    return null;
  }
}

/** Fetch all venues (Firestore + hardcoded fallbacks). One-time read, no listener. */
export async function getVenues(): Promise<Venue[]> {
  try {
    const db = await getFirestoreDb();
    if (!db) return FALLBACK_VENUES;

    const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
    const q = query(collection(db, 'venues'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const firestoreVenues = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Ensure arrays exist even for old-format docs
        images: data.images || (data.imageUrl ? [data.imageUrl] : []),
        vibeTags: data.vibeTags || [],
        amenities: data.amenities || [],
        eventTypesSupported: data.eventTypesSupported || [],
        pricingModel: data.pricingModel || 'hourly',
        cancellationPolicy: data.cancellationPolicy || 'flexible',
      } as Venue;
    });

    return [...firestoreVenues, ...FALLBACK_VENUES];
  } catch (error) {
    console.error('Server venue fetch failed, using hardcoded:', error);
    return FALLBACK_VENUES;
  }
}

/** Fetch venues filtered by location string (loose match). */
export async function getVenuesByLocation(locationQuery: string): Promise<Venue[]> {
  const all = await getVenues();
  const q = locationQuery.toLowerCase();
  return all.filter(
    (v) =>
      v.location.toLowerCase().includes(q) ||
      v.title.toLowerCase().includes(q)
  );
}

/** Get a single venue by ID */
export async function getVenueById(id: string): Promise<Venue | undefined> {
  const all = await getVenues();
  return all.find((v) => v.id === id);
}
