import { db } from "../firebase/firestoreService";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useNavigate } from "react-router-dom";
import Testing from "../testing";
import { useUserInfo, signOutUser } from "../firebase/firebaseAuth";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import Mainheader from "../components/web utils/mainheader";

const Main = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const currentUser = useUserInfo();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser && currentUser.uid) {
        const docRef = doc(db, "profiles", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleSignout = async (event) => {
    event.preventDefault();
    signOutUser();
    navigate("/login");
  };

  return (
    <>
      <Mainheader></Mainheader>
      <button className="p-2" onClick={() => navigate("/")}>
        Home Page
      </button>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">Gmail Wrapped</h1>
      {userProfile && <h2>Welcome {userProfile.name}</h2>}
      <Testing></Testing>
      <div className="card">
        <button onClick={handleSignout}>Signout</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Main;
