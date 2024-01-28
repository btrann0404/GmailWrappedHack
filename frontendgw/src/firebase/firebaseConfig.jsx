import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt1gW7dx7oapTJLmK2zYr2u0dolBN7Sf0",
  authDomain: "wrappedhack.firebaseapp.com",
  projectId: "wrappedhack",
  storageBucket: "wrappedhack.appspot.com",
  messagingSenderId: "1050595934798",
  appId: "1:1050595934798:web:39a2f571eb3f01b727b91f",
  measurementId: "G-T3LHGLTYTK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;