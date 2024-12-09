import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-helpers/firebaseConfig";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearSession, getSession, saveSession } from "./sessionHelpers";
import { useUIContext } from "./uiProvider";

type User = {
  uid: string;
  email: string;
  username?: string;
};

interface AuthContextType {
  isAuthenticated: boolean | undefined;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setShowOverlay } = useUIContext();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = await getSession();
      setIsAuthenticated(!!storedToken);

      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userDoc = doc(FIREBASE_DB, "users", firebaseUser.uid);
            const snapshot = await getDoc(userDoc);

            if (snapshot.exists()) {
              const userData = {
                uid: firebaseUser.uid,
                ...snapshot.data(),
              } as User;

              setUser(userData);
              console.log("User data fetched:", userData);
            } else {
              console.error("User document does not exist in Firestore.");
            }

            await saveSession(await firebaseUser.getIdToken());
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
          await clearSession();
          console.log("No user is authenticated.");
        }
      });

      return () => unsubscribe();
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    console.log("mounting overlay on login");
    setShowOverlay(true);

    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const firebaseUser = userCredential.user;

      const userDoc = doc(FIREBASE_DB, "users", firebaseUser.uid);
      const snapshot = await getDoc(userDoc);
      if (snapshot.exists()) {
        setUser({
          uid: firebaseUser.uid,
          ...snapshot.data(),
        } as User);
      }

      await saveSession(await firebaseUser.getIdToken());
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please try again.");
    } finally {
      // Simulate a delay to show the loading screen
      setTimeout(() => {
        console.log("Setting overlay to false");
        setShowOverlay(false); // Hide the overlay after 3 seconds
      }, 1000); // Adjust the delay duration as needed
    }
  };

  const signup = async (userName: string, email: string, password: string) => {
    console.log("mounting overlay on login");
    setShowOverlay(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const firebaseUser = userCredential.user;

      const userData = {
        username: userName,
        email: email,
        password: password,
        createdAt: Timestamp.now(),
      };

      await setDoc(doc(FIREBASE_DB, "users", firebaseUser.uid), userData);
      await saveSession(await firebaseUser.getIdToken());

      setUser({ uid: firebaseUser.uid, ...userData });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Signup failed. Please try again.");
    } finally {
      // Simulate a delay to show the loading screen
      setTimeout(() => {
        console.log("Setting overlay to false");
        setShowOverlay(false); // Hide the overlay after 3 seconds
      }, 1000); // Adjust the delay duration as needed
    }
  };

  const logout = async () => {
    console.log("mounting overlay on login");
    setShowOverlay(true);
    try {
      await signOut(FIREBASE_AUTH);
      await clearSession();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setTimeout(() => {
        console.log("Setting overlay to false");
        setShowOverlay(false); // Hide the overlay after 3 seconds
      }, 1000); // Adjust the delay duration as needed
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
