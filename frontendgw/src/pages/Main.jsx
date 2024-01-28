import { db } from "../firebase/firestoreService";
import { useNavigate } from "react-router-dom";
import { useUserInfo, signOutUser } from "../firebase/firebaseAuth";
import  { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import GetUsersEmails from "../components/get-user-emails/get-user-emails";
import AuthenticateUser from "../components/authenticate-user/authenticate-user";

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
      <div>
      </div>
      <h1 className="text-3xl font-bold underline">Gmail Wrapped</h1>
      {userProfile && <h2>Welcome {userProfile.name}</h2>}
      <div className="card">
        <button onClick={handleSignout}>Signout</button>
      </div>

      <GetUsersEmails></GetUsersEmails>
      <AuthenticateUser></AuthenticateUser>
    </>
  );
};

export default Main;
