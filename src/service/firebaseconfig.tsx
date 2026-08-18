// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_HSstxHwH7USLUuzNgzqB8D4gWFmIHOM",
  authDomain: "hackathon-dfb0c.firebaseapp.com",
  projectId: "hackathon-dfb0c",
  storageBucket: "hackathon-dfb0c.firebasestorage.app",
  messagingSenderId: "605741101632",
  appId: "1:605741101632:web:341bcd594746bfe8f6e5a5",
  measurementId: "G-C59PTY992B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// `getAnalytics` requires a DOM/window and crashes on React Native, so it's
// intentionally omitted here. Plain `getAuth` (no AsyncStorage persistence)
// avoids a native-module dependency entirely — the tradeoff is the session
// doesn't survive a full app restart, only in-memory for the current run.
export const auth = getAuth(app);

export default app;
