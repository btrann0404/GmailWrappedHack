import React, { useState, useEffect } from "react";
import { useUserInfo } from "../firebase/firebaseAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firestoreService";
import "./cssPages/ProfilePage.css";
import FormModal from "../components/chakra/formmodal";
import { Divider } from "@chakra-ui/react";
import Mainheader from "../components/web utils/mainheader";

const ProfilePage = () => {
  const currentUser = useUserInfo();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser && currentUser.uid) {
        const docRef = doc(db, "profiles", currentUser.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [currentUser, db]);

  if (!currentUser) {
    return <div>User not found or not logged in.</div>;
  }

  // check if userProfile is not null before rendering
  return (
    <>
      <Mainheader></Mainheader>
      <div className=" max-w-[100vw]">
        <h1 className="p-5 justify-center">Profile Page</h1>
        <div className="flex justify-center">
          <div className="bg-gradient-to-tr from-blue-300 to-blue-700 rounded-2xl w-[95vw] h-[15vw] overflow-auto flex flex-col justify-end">
            <div className="pl-10 flex flex-row items-center justify-start">
              <div className="pl-10 mx-32 pb-5">
                {userProfile && (
                  <h1 className="text-center ml-2 text-5xl font-medium">
                    Welcome {userProfile.name}
                  </h1>
                )}
                <h1 className="ml-3">Wrapper Wizard</h1>
              </div>
            </div>
          </div>
        </div>
        {/* <Avatar
          size="2xl"
          className="-my-20 mx-20"
          name="Segun Adebayo"
          src="https://gravatar.com/avatar/133cf6f493b3cc1386dc65feed59d1b0?s=400&d=robohash&r=x"
        /> */}
        <div className="avatar w-36 h-36 rounded-full overflow-hidden flex justify-center outline absolute -my-20 mx-20 bg-white">
          <img
            src="https://gravatar.com/avatar/133cf6f493b3cc1386dc65feed59d1b0?s=400&d=robohash&r=x"
            alt="Avatar"
            className="w-full h-full object-contain z-10"
          />
        </div>
        <div className=" text-black flex flex-row pt-20 pl-10 pr-10 justify-end gap-24 text-lg">
          <div className="flex flex-col bg-white h-[80vh] w-[30vw] rounded-xl p-5 overflow-auto">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-3xl font-bold mb-4">Gmail List</h1>
              <FormModal subject="Form Here"></FormModal>
            </div>
            <Divider></Divider>
            <div className="flex flex-col">
              {userProfile &&
                userProfile.gmail_list &&
                userProfile.gmail_list.map((email, index) => (
                  <p key={index} className="py-1">
                    <div className=" text-base justify-between flex flex-row p-5 bg-blue-100 rounded-lg">
                      <div>Gmail</div>
                      <div>{email}</div>
                    </div>
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col bg-white h-[80vh] w-[30vw] rounded-xl p-5 overflow-auto">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-3xl font-bold mb-4">Keyword List</h1>
              <FormModal subject="Add Keyword"></FormModal>
            </div>
            <Divider></Divider>
            <div className="flex flex-col">
              {userProfile &&
                userProfile.keywords &&
                userProfile.keywords.map((keyword, index) => (
                  <p key={index} className="py-1">
                    <div className=" text-base justify-between flex flex-row p-5 bg-blue-100 rounded-lg">
                      <div>Keyword {index + 1} </div>
                      <div>{keyword}</div>
                    </div>
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col bg-white h-[80vh] w-[30vw] rounded-xl p-5 overflow-auto">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-3xl font-bold mb-4">Banned Words List</h1>
              <FormModal subject="Add Banned Words"></FormModal>
            </div>
            <Divider></Divider>
            <div className="flex flex-col">
              {userProfile &&
                userProfile.bannedwords &&
                userProfile.bannedwords.map((word, index) => (
                  <p key={index} className="py-1">
                    <div className=" text-base justify-between flex flex-row p-5 bg-blue-100 rounded-lg">
                      <div>Word {index + 1}</div>
                      <div>{word}</div>
                    </div>
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
