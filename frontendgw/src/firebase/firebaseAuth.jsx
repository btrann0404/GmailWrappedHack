import app from "./firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState, useEffect } from "react";

const auth = getAuth(app);

//signup user
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created successfully with email:", user.email);
    return userCredential;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

//login user
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // User signed in successfully.
    const user = userCredential.user;
    console.log("User signed in:", user.email);
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

//signout current user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// return current user info
export const useUserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, [auth]);

  return user;
};
