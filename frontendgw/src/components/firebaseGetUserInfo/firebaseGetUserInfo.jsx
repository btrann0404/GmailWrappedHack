//Will return a json object with all user info based off email.
//Might need to switch query to id in the future

import db from "../../firebaseConfig";
import { query, collection, where, getDocs } from "firebase/firestore";

export const getUserByEmail = async (email) => {
    const usersRef = collection(db, "matt_users_test"); // "users" is the name of your collection
    const q = query(usersRef, where("email", "==", email));
  
    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)
      const userData = [];
      querySnapshot.forEach((doc) => {
        // doc.data() contains the document data
        userData.push(doc.data());
      });
      return userData;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  };