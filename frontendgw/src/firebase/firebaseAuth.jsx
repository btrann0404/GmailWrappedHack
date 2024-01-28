import app from "./firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);

export const getEmails = async () => {};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/gmail.readonly"); // Adjust the scope as needed

  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return credential.accessToken; // Return the Google OAuth token
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
// export const signInWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
// //   provider.addScope("https://www.googleapis.com/auth/gmail.readonly");

//   try {
//     const auth = getAuth();
//     const result = await signInWithPopup(auth, provider);

//     // This gives you a Google Access Token.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     console.log("credential: " , credential)
//     const googleToken = credential.accessToken;
//     console.log("googleToken: " , credential)

//     return googleToken; // This is the Google OAuth token
//   } catch (error) {
//     console.error("Error signing in with Google: ", error);
//     throw error;
//   }
// };

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
