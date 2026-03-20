import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// ── Config ──
// Using inline config instead of JSON import for better tree-shaking
// and to avoid build issues with JSON module resolution.
// Replace these values with your own Firebase project credentials.
const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'gen-lang-client-0895216895',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:211616885315:web:846347e0bbceb7cb7742f6',
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAdsltmWN0jgUCjW0dtrp2R6CCrFndhh-0',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'gen-lang-client-0895216895.firebaseapp.com',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'gen-lang-client-0895216895.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '211616885315',
};

// Custom Firestore database ID (leave empty string for default database)
const firestoreDatabaseId = process.env.NEXT_PUBLIC_FIRESTORE_DATABASE_ID || 'ai-studio-604ca443-0027-45aa-b520-5acccae1df79';

// ── Initialize ──
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  // If custom database ID is set and not empty, use it. Otherwise use default.
  if (firestoreDatabaseId && firestoreDatabaseId.length > 0) {
    db = getFirestore(app, firestoreDatabaseId);
  } else {
    db = getFirestore(app);
  }

  auth = getAuth(app);
} catch (error) {
  console.error('Firebase initialization error:', error);

  // Create fallback instances so imports don't crash
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
}

export { app, db, auth };
