import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../firebase/firebaseAuth";
import myLogo from "../assets/GW_LOGO.png";
import "./cssPages/HomeCss.css";

const Home = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <header>
        <div className="home-logo">
          <img
            src={myLogo}
            alt="Logo"
            className="logo-button"
            onClick={handleLogoClick}
          />
        </div>
      </header>

      {user && (
        <button className="p-2" onClick={() => navigate("/main")}>
          Back To Main
        </button>
      )}
      <h1>Get Started Here!</h1>
      <div></div>

      <div className="card">
        <button className="p-2" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="p-2" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </>
  );
};

export default Home;
