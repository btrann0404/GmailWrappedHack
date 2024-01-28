import { db } from "../firebase/firestoreService";
import { useNavigate } from "react-router-dom";
import Testing from "../testing";
import { useUserInfo, signOutUser } from "../firebase/firebaseAuth";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import myLogo from "../assets/GW_LOGO.png";

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
      <button className="p-2" onClick={() => navigate("/")}>
        Home Page
      </button>

      <div className="home-logo">
        <img src={myLogo} />
      </div>
      
      {userProfile && <h2>Welcome {userProfile.name}</h2>}
      <Testing></Testing>
      <div className="card">
        <button onClick={handleSignout}>Signout</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
};

export default Main;
