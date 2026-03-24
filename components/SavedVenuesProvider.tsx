'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import type { SavedVenue, Shortlist } from '@/lib/types';

// --------------- Context Types ---------------

interface SavedVenuesContextType {
  savedVenues: SavedVenue[];
  shortlists: Shortlist[];
  isSaved: (venueId: string) => boolean;
  toggleSave: (venueId: string) => void;
  addNote: (venueId: string, note: string) => void;
  createShortlist: (title: string, venueIds: string[]) => Promise<string | null>;
  loading: boolean;
}

const SavedVenuesContext = createContext<SavedVenuesContextType>({
  savedVenues: [],
  shortlists: [],
  isSaved: () => false,
  toggleSave: () => {},
  addNote: () => {},
  createShortlist: async () => null,
  loading: false,
});

export function useSavedVenues() {
  return useContext(SavedVenuesContext);
}

// --------------- Provider ---------------

export function SavedVenuesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [savedVenues, setSavedVenues] = useState<SavedVenue[]>([]);
  const [shortlists, setShortlists] = useState<Shortlist[]>([]);
  const [loading, setLoading] = useState(false);

  // Load saved venues from Firestore
  useEffect(() => {
    if (!user) {
      setSavedVenues([]);
      setShortlists([]);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        // Load saved venues
        const savedRef = doc(db, 'userSaved', user.uid);
        const savedSnap = await getDoc(savedRef);
        if (savedSnap.exists()) {
          setSavedVenues(savedSnap.data().venues || []);
        }

        // Load shortlists
        const shortlistQuery = query(
          collection(db, 'shortlists'),
          where('userId', '==', user.uid)
        );
        const shortlistSnap = await getDocs(shortlistQuery);
        setShortlists(shortlistSnap.docs.map(d => ({ id: d.id, ...d.data() } as Shortlist)));
      } catch (err) {
        console.error('Error loading saved venues:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  // Persist to Firestore
  const persist = useCallback(async (venues: SavedVenue[]) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'userSaved', user.uid), {
        userId: user.uid,
        venues,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error saving:', err);
    }
  }, [user]);

  const isSaved = useCallback((venueId: string) => {
    return savedVenues.some(sv => sv.venueId === venueId);
  }, [savedVenues]);

  const toggleSave = useCallback((venueId: string) => {
    if (!user) return;
    setSavedVenues(prev => {
      const exists = prev.find(sv => sv.venueId === venueId);
      const updated = exists
        ? prev.filter(sv => sv.venueId !== venueId)
        : [...prev, { venueId, savedAt: new Date().toISOString() }];
      persist(updated);
      return updated;
    });
  }, [user, persist]);

  const addNote = useCallback((venueId: string, note: string) => {
    if (!user) return;
    setSavedVenues(prev => {
      const updated = prev.map(sv =>
        sv.venueId === venueId ? { ...sv, notes: note } : sv
      );
      persist(updated);
      return updated;
    });
  }, [user, persist]);

  const createShortlist = useCallback(async (title: string, venueIds: string[]) => {
    if (!user) return null;
    try {
      // Generate a shareable slug
      const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;

      const docRef = await addDoc(collection(db, 'shortlists'), {
        userId: user.uid,
        title,
        venueIds,
        isPublic: true,
        sharedSlug: slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const newShortlist: Shortlist = {
        id: docRef.id,
        userId: user.uid,
        title,
        venueIds,
        isPublic: true,
        sharedSlug: slug,
        createdAt: new Date().toISOString(),
      };

      setShortlists(prev => [...prev, newShortlist]);
      return slug;
    } catch (err) {
      console.error('Error creating shortlist:', err);
      return null;
    }
  }, [user]);

  return (
    <SavedVenuesContext.Provider value={{
      savedVenues,
      shortlists,
      isSaved,
      toggleSave,
      addNote,
      createShortlist,
      loading,
    }}>
      {children}
    </SavedVenuesContext.Provider>
  );
}
