// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-8cd36.firebaseapp.com",
  projectId: "genwebai-8cd36",
  storageBucket: "genwebai-8cd36.firebasestorage.app",
  messagingSenderId: "6773907101",
  appId: "1:6773907101:web:ebe3d93ecb3197f2737e74",
  measurementId: "G-62L4WTVJ2D"
};

// Initialize
const app = initializeApp(firebaseConfig);

// Optional analytics
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export
export { auth, provider };