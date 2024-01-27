// for testing. makes the call to database to add user based on inputs from user-form-test

import db from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addUser = async(name, email, bannedWords, keywords) => {
        try {
        const collectionRef = collection(db, "matt_users_test");
        // Replace with an object containing the data fields you want to store
        const docData = {
            name, // Equivalent to name: name
            email, // Equivalent to email: email
            bannedWords, // Assuming this is an array
            keywords, // Assuming this is an array
        };
        const docRef = await addDoc(collectionRef, docData);
        console.log("Document written with ID: ", docRef.id);
        console.log("add to database");
        return docRef.id;
      } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
      }
  }