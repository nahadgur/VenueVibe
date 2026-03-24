import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import type { Venue } from '@/lib/types';

export type { Venue };

/** Re-export helpers so existing imports don't break */
export { formatPrice, formatResponseTime } from '@/lib/types';

/** Hardcoded showcase venues — used as fallback & for the homepage */
export const VENUES: Venue[] = [
  {
    id: '1', title: 'The Glasshouse Loft', location: 'Downtown Manhattan, NY', area: 'Manhattan', city: 'New York',
    price: 250, pricingModel: 'hourly', rating: 4.9, reviews: 128, capacity: 150, standingCapacity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop','https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop','https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: true, isVerified: true, isClaimed: true, venueType: 'loft',
    vibeTags: ['Industrial', 'Contemporary', 'Minimalist'],
    amenities: ['WiFi', 'Projector', 'Sound System', 'Kitchen', 'Natural Light', 'Air Conditioning', 'Furniture Provided'],
    eventTypesSupported: ['corporate-events', 'product-launches', 'photo-shoots', 'exhibitions', 'workshops'],
    cancellationPolicy: 'flexible', indoorOutdoor: 'indoor', floorAreaSqm: 280, avgResponseMinutes: 45, responseRate: 98,
  },
  {
    id: '2', title: 'Industrial Warehouse Studio', location: 'Arts District, LA', area: 'Arts District', city: 'Los Angeles',
    price: 180, pricingModel: 'hourly', rating: 4.8, reviews: 95, capacity: 300,
    imageUrl: 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?q=80&w=800&auto=format&fit=crop','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: false, isVerified: true, isClaimed: true, venueType: 'warehouse',
    vibeTags: ['Industrial', 'Raw', 'Creative'],
    amenities: ['WiFi', 'Parking', 'Loading Bay', 'Natural Light', 'Dry Hire Available'],
    eventTypesSupported: ['photo-shoots', 'film-tv-production', 'product-launches', 'exhibitions', 'pop-ups-markets'],
    cancellationPolicy: 'moderate', indoorOutdoor: 'indoor', floorAreaSqm: 450, avgResponseMinutes: 120, responseRate: 92,
  },
  {
    id: '3', title: 'Rooftop Garden Oasis', location: 'West Loop, Chicago', area: 'West Loop', city: 'Chicago',
    price: 320, pricingModel: 'hourly', rating: 5.0, reviews: 210, capacity: 80, standingCapacity: 120,
    imageUrl: 'https://images.unsplash.com/photo-1572364769167-198dcb7b520c?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1572364769167-198dcb7b520c?q=80&w=800&auto=format&fit=crop','https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: true, isVerified: true, isClaimed: true, venueType: 'garden-outdoor',
    vibeTags: ['Rooftop', 'Intimate', 'Elegant'],
    amenities: ['WiFi', 'Sound System', 'Outdoor Area', 'Catering Available', 'Late Licence', 'Furniture Provided'],
    eventTypesSupported: ['weddings', 'engagement-parties', 'birthday-parties', 'corporate-events', 'private-dining'],
    cancellationPolicy: 'flexible', indoorOutdoor: 'outdoor', avgResponseMinutes: 30, responseRate: 100,
  },
  {
    id: '4', title: 'Historic Mansion Parlor', location: 'Beacon Hill, Boston', area: 'Beacon Hill', city: 'Boston',
    price: 450, pricingModel: 'half-day', rating: 4.7, reviews: 64, capacity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: false, isVerified: false, isClaimed: true, venueType: 'manor-house',
    vibeTags: ['Heritage', 'Grand', 'Elegant'],
    amenities: ['WiFi', 'Natural Light', 'Cloakroom', 'Catering Available', 'On-site Coordinator'],
    eventTypesSupported: ['weddings', 'private-dining', 'corporate-events', 'engagement-parties'],
    cancellationPolicy: 'strict', indoorOutdoor: 'both', avgResponseMinutes: 180, responseRate: 85,
  },
  {
    id: '5', title: 'Modern Art Gallery', location: 'Wynwood, Miami', area: 'Wynwood', city: 'Miami',
    price: 200, pricingModel: 'hourly', rating: 4.9, reviews: 156, capacity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&auto=format&fit=crop','https://images.unsplash.com/photo-1577720643272-265f09367456?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: true, isVerified: true, isClaimed: true, venueType: 'gallery',
    vibeTags: ['Contemporary', 'Creative', 'Minimalist'],
    amenities: ['WiFi', 'Projector', 'Natural Light', 'Air Conditioning', 'Dry Hire Available', 'Loading Bay'],
    eventTypesSupported: ['exhibitions', 'product-launches', 'photo-shoots', 'networking-events', 'pop-ups-markets'],
    cancellationPolicy: 'moderate', indoorOutdoor: 'indoor', floorAreaSqm: 350, avgResponseMinutes: 60, responseRate: 96,
  },
  {
    id: '6', title: 'Minimalist Daylight Studio', location: 'Williamsburg, Brooklyn', area: 'Williamsburg', city: 'Brooklyn',
    price: 120, pricingModel: 'hourly', rating: 4.6, reviews: 82, capacity: 30,
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop'],
    isSuperhost: false, isVerified: true, isClaimed: true, venueType: 'studio',
    vibeTags: ['Minimalist', 'Creative', 'Intimate'],
    amenities: ['WiFi', 'Natural Light', 'Blackout Blinds', 'Kitchen', 'Air Conditioning'],
    eventTypesSupported: ['photo-shoots', 'film-tv-production', 'workshops', 'team-offsites'],
    cancellationPolicy: 'flexible', indoorOutdoor: 'indoor', floorAreaSqm: 80, avgResponseMinutes: 90, responseRate: 88,
  },
];

export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>(VENUES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'venues'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firestoreVenues = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          images: data.images || (data.imageUrl ? [data.imageUrl] : []),
          vibeTags: data.vibeTags || [],
          amenities: data.amenities || [],
          eventTypesSupported: data.eventTypesSupported || [],
          pricingModel: data.pricingModel || 'hourly',
          cancellationPolicy: data.cancellationPolicy || 'flexible',
        } as Venue;
      });
      setVenues([...firestoreVenues, ...VENUES]);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching venues:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { venues, loading };
}
