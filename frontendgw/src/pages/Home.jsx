import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../firebase/firebaseAuth";
import homeImage from "../assets/home_page.png";
import "./cssPages/HomeCss.css";
import Mainheader from "../components/web utils/mainheader";

const Home = () => {
  return (
    <>
      <Mainheader></Mainheader>
      {/* Container for the home image */}
      <div className="home-image-container">
        <div className="home-image">
          <img src={homeImage} alt="mainImage" />
        </div>
      </div>
    </>
  );
};

export default Home;
