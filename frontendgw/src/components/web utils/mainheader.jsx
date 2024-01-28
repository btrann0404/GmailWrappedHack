// Mainheader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import myLogo from "../../assets/GW_LOGO.png";
import { useUserInfo } from "../../firebase/firebaseAuth";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import "../../pages/cssPages/HomeCss.css";

const Mainheader = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="max-w-full">
      <header className="max-w-full">
        <div className="flex flex-row justify-between items-center px-4 py-2">
          {" "}
          {/* Added justify-between */}
          <div className="flex-shrink-0" onClick={handleLogoClick}>
            <img
              src={myLogo}
              alt="Logo"
              className="h-8 w-auto" // Adjusted size
            />
          </div>
          <div className="flex">
            {user && (
              <button
                className="rounded-full px-4 py-2 ml-2" // Adjusted padding
                onClick={() => navigate("/profilepage")}
              >
                Profile
              </button>
            )}
            {user && (
              <button
                className="rounded-full px-4 py-2 ml-2" // Adjusted padding
                onClick={() => navigate("/main")}
              >
                Main
              </button>
            )}
            <button
              className="rounded-full px-4 py-2 ml-2" // Adjusted padding and added margin-left for spacing
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="rounded-full bg-blue-600 px-4 py-2 ml-2" // Adjusted padding and added margin-left for spacing
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Mainheader;
