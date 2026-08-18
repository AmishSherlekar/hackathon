import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../service/firebaseconfig";

interface FirebaseAuthState {
  user: User | null;
  isLoaded: boolean;
  isSignedIn: boolean;
}

/**
 * Tracks the current Firebase auth session. `isLoaded` becomes true once the
 * initial persisted-session check has resolved (mirrors Clerk's `isLoaded`
 * so screens can gate rendering the same way).
 */
export function useFirebaseAuth(): FirebaseAuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsLoaded(true);
    });
    return unsubscribe;
  }, []);

  return { user, isLoaded, isSignedIn: !!user };
}
