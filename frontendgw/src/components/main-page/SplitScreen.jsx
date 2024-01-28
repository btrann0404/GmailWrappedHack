import { useState, useEffect } from "react";
import Inbox from './InboxPanel/Inbox';
import EmailPanel from './EmailPanel/EmailPanel';
import "./WelcomeScreen/WelcomeScreen.css"
import GetUsersEmails from '../get-user-emails/get-user-emails';

import { db } from "../../firebase/firestoreService";
import { useNavigate } from "react-router-dom";
import { useUserInfo, signOutUser } from "../../firebase/firebaseAuth";

const SplitScreen = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailData, setEmailData] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const currentUser = useUserInfo();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser && currentUser.uid) {
        const docRef = db.collection("profiles").doc(currentUser.uid);
        const docSnap = await docRef.get();

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
  
  const handleProfileOpen = async (event) => {
    event.preventDefault();
    navigate("/profile");
  };

  // Callback function to receive data from GetUsersEmails
  const onDataReceived = (data) => {
    console.log("In split-screen")
    console.log(data)
    setEmailData(data);
  };

  return (
    <div className="main-page fade-in">
      <header className="main-header">
        <button className="signs" onClick={handleProfileOpen}>Open Profile</button>
        {userProfile && <h2 className="welcome-user">Welcome {userProfile.name}</h2>}
        <div className="signs-container">
          <button className="signs" onClick={handleSignout}>Signout</button>
        </div>
      </header>

      <div style={{ display: 'flex'}}>
        <GetUsersEmails onDataFetched={onDataReceived} />
        <Inbox onEmailClick={handleEmailClick} emailData={emailData} />
        <EmailPanel selectedEmail={selectedEmail} />
      </div>
    </div>
  );
};

export default SplitScreen;
