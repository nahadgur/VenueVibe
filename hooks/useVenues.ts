import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { VENUES as HARDCODED_VENUES } from '@/components/FeaturedVenues';

export interface Venue {
  id: string;
  title: string;
  location: string;
  description?: string;
  price: number;
  capacity: number;
  imageUrl: string;
  hostId?: string;
  createdAt?: string;
  rating?: number;
  reviews?: number;
  isSuperhost?: boolean;
}

export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>(HARDCODED_VENUES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'venues'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firestoreVenues = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Venue[];
      
      // Combine Firestore venues with hardcoded ones, putting Firestore ones first
      setVenues([...firestoreVenues, ...HARDCODED_VENUES]);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching venues:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { venues, loading };
}
