'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      try {
        const { auth, db } = await import('@/firebase');
        const { doc, setDoc, getDoc } = await import('firebase/firestore');

        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          setError(null);

          if (currentUser) {
            try {
              const userRef = doc(db, 'users', currentUser.uid);
              const userSnap = await getDoc(userRef);

              if (!userSnap.exists()) {
                await setDoc(userRef, {
                  uid: currentUser.uid,
                  email: currentUser.email,
                  displayName: currentUser.displayName,
                  photoURL: currentUser.photoURL,
                  createdAt: new Date().toISOString(),
                });
              }
            } catch (err) {
              // Firestore write failed — user is still authenticated, just can't write profile
              console.error('Error syncing user to Firestore:', err);
            }
          }

          setLoading(false);
        }, (err) => {
          console.error('Auth state error:', err);
          setError('Authentication service unavailable. Please try again later.');
          setLoading(false);
        });
      } catch (err) {
        console.error('Firebase init failed in AuthProvider:', err);
        setError('Could not connect to authentication service.');
        setLoading(false);
      }
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setError(null);
      const { auth } = await import('@/firebase');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Error signing in with Google:', err);

      // User-friendly error messages
      if (err?.code === 'auth/popup-closed-by-user') {
        // User closed the popup — not an error
        return;
      }
      if (err?.code === 'auth/popup-blocked') {
        setError('Pop-up was blocked by your browser. Please allow pop-ups for this site.');
        return;
      }
      if (err?.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorised for sign-in. The site admin needs to add it in Firebase Console → Authentication → Settings → Authorised domains.');
        return;
      }
      setError('Sign-in failed. Please try again.');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const { auth } = await import('@/firebase');
      await signOut(auth);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
