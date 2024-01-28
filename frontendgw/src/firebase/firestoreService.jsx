import app from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);