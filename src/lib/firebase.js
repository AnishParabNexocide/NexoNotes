import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBrtKK_izlT0_xiVidLA9zkls400QOhupo",
  authDomain: "nexo-notes.firebaseapp.com",
  projectId: "nexo-notes",
  storageBucket: "nexo-notes.firebasestorage.app",
  messagingSenderId: "133337654732",
  appId: "1:133337654732:web:1029e6f96580a51bc86969",
  measurementId: "G-13FGXQBT7X"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
