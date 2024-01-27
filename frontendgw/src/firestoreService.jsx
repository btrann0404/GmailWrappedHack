import db from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

//example adding to database
export const addData = async () => {
  try {
    const collectionRef = collection(db, "your_collection_name");
    // Replace with an object containing the data fields you want to store
    const docData = {
      field1: "value1",
      field2: "value2",
      // ... other data fields
    };
    const docRef = await addDoc(collectionRef, docData);
    console.log("Document written with ID: ", docRef.id);
    console.log("add to database");
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
