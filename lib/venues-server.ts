// ============================================================
// Server-side venue fetching
// ============================================================
// Use this in Server Components (pages) instead of the useVenues hook.
// The hook still exists for client-side real-time updates (list-venue wizard etc.)
// but listing/SEO pages should use these functions so Google crawls real HTML.
// ============================================================

import { db } from '@/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { VENUES as HARDCODED_VENUES } from '@/components/FeaturedVenues';
import type { Venue } from '@/hooks/useVenues';

export type { Venue };

/** Fetch all venues (Firestore + hardcoded fallbacks). One-time read, no listener. */
export async function getVenues(): Promise<Venue[]> {
  try {
    const q = query(collection(db, 'venues'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const firestoreVenues = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Venue[];

    return [...firestoreVenues, ...HARDCODED_VENUES];
  } catch (error) {
    // Firestore may be unavailable at build time — fall back to hardcoded
    console.error('Server venue fetch failed, using hardcoded:', error);
    return HARDCODED_VENUES;
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
