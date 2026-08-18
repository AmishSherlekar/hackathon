// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// `getReactNativePersistence` ships only in firebase/auth's React Native
// build, which Metro resolves correctly at bundle time via the package's
// "react-native" export condition — but tsc's node resolution always sees
// the web typings, which omit it. This is a known Firebase JS SDK + TS gap.
// @ts-expect-error - see comment above
import { getReactNativePersistence } from "firebase/auth";

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
// intentionally omitted here. Requires a real dev-client / production build
// (not Expo Go) since @react-native-async-storage/async-storage needs its
// native module properly linked — see the EAS development build workflow.
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
