import { useState, useEffect } from 'react';
import WelcomeScreen from '../components/main-page/WelcomeScreen/WelcomeScreen';
import SplitScreen from '../components/main-page/SplitScreen';

import { db } from "../firebase/firestoreService";
import { useUserInfo } from "../firebase/firebaseAuth";
import { doc, getDoc } from "firebase/firestore";

const Main = () => {
  // eslint-disable-next-line no-unused-vars
  const [userProfile, setUserProfile] = useState(null);
  const currentUser = useUserInfo();
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [welcomeScreenFaded, setWelcomeScreenFaded] = useState(false);

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

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setShowWelcomeScreen(false);
      setWelcomeScreenFaded(true);
    }, 3000);

    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div className={`app-container ${welcomeScreenFaded ? 'fade-out' : ''}`}>
      {showWelcomeScreen ? (
        <WelcomeScreen />
      ) : (
        <SplitScreen />
      )}
    </div>
  );
};

export default Main;