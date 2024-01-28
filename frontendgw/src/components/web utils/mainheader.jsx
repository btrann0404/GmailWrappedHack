// Mainheader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import myLogo from "../../assets/GW_LOGO.png";
import { signOutUser, useUserInfo } from "../../firebase/firebaseAuth";
import "../../pages/cssPages/HomeCss.css";

const Mainheader = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSignout = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      console.log("Error during sign out", error);
    }
  };

  return (
    <div className="text-xl max-w-full h-24 bg-white">
      <header className="max-w-full">
        <div className="flex flex-row justify-between items-center px-4 py-2 pt-5">
          {" "}
          {/* Added justify-between */}
          <div
            className="flex-shrink-0 justify-center"
            onClick={handleLogoClick}
          >
            <img
              src={myLogo}
              alt="Logo"
              className="h-12 w-auto" // Adjusted size
            />
          </div>
          <div className="flex">
            {user && (
              <button
                className="rounded-full px-4 py-2 ml-2" // Adjusted padding
                onClick={() => navigate("/profilepage")}
              >
                <p className="underline">Profile</p>
              </button>
            )}
            {user && (
              <button
                className="rounded-full px-4 py-2 ml-2" // Adjusted padding
                onClick={() => navigate("/main")}
              >
                <p className="underline">Main</p>
              </button>
            )}
            {user && (
              <button
                className="rounded-full px-4 py-2 ml-2" // Adjusted padding
                onClick={() => handleSignout()}
              >
                <p className="underline">Sign Out</p>
              </button>
            )}
            {!user && (
              <button
                className="rounded-full px-4 py-2 ml-2" // Adjusted padding
                onClick={() => navigate("/login")}
              >
                <p className="underline">Login</p>
              </button>
            )}
            {!user && (
              <button
                className="rounded-full px-4 py-2 ml-2" // Adjusted padding
                onClick={() => navigate("/signup")}
              >
                <p className="underline">Sign Up</p>
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Mainheader;