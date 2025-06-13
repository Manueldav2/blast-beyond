import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBp1XSOH6IDTFiqTuZcN3Z4w9Er12iy_A4",
  authDomain: "blast-beyond.firebaseapp.com",
  projectId: "blast-beyond",
  storageBucket: "blast-beyond.firebasestorage.app",
  messagingSenderId: "927592184818",
  appId: "1:927592184818:web:6651f0569dfa3127a2496b",
  measurementId: "G-L8HSTB29SG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics conditionally (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

export { app, auth, db, analytics }; 