import app from "./firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    // Handle the result as needed (e.g., extracting user info)
  } catch (error) {
    console.error("Error signing in: ", error);
    // Handle any errors during sign-in
  }
};

export const signOutWithGoogle = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    // Redirect or perform other actions post sign-out
  } catch (error) {
    console.error("Error signing out: ", error);
    // Handle any errors during sign-out
  }
};
