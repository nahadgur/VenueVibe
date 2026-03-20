import type { Venue } from '@/hooks/useVenues';

export type { Venue };

/** Hardcoded fallback venues — used when Firestore is unavailable at build time */
const FALLBACK_VENUES: Venue[] = [
  { id: '1', title: 'The Glasshouse Loft', location: 'Downtown Manhattan, NY', price: 250, rating: 4.9, reviews: 128, capacity: 150, imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop', isSuperhost: true },
  { id: '2', title: 'Industrial Warehouse Studio', location: 'Arts District, LA', price: 180, rating: 4.8, reviews: 95, capacity: 300, imageUrl: 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?q=80&w=800&auto=format&fit=crop', isSuperhost: false },
  { id: '3', title: 'Rooftop Garden Oasis', location: 'West Loop, Chicago', price: 320, rating: 5.0, reviews: 210, capacity: 80, imageUrl: 'https://images.unsplash.com/photo-1572364769167-198dcb7b520c?q=80&w=800&auto=format&fit=crop', isSuperhost: true },
  { id: '4', title: 'Historic Mansion Parlor', location: 'Beacon Hill, Boston', price: 450, rating: 4.7, reviews: 64, capacity: 50, imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop', isSuperhost: false },
  { id: '5', title: 'Modern Art Gallery', location: 'Wynwood, Miami', price: 200, rating: 4.9, reviews: 156, capacity: 200, imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&auto=format&fit=crop', isSuperhost: true },
  { id: '6', title: 'Minimalist Daylight Studio', location: 'Williamsburg, Brooklyn', price: 120, rating: 4.6, reviews: 82, capacity: 30, imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop', isSuperhost: false },
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
    const firestoreVenues = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Venue[];

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
