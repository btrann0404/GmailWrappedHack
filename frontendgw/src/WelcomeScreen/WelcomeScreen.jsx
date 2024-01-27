/* WelcomeScreen.jsx */

import React, { useState, useEffect } from 'react';
import './WelcomeScreen.css';
import myLogo from "../assets/GW_LOGO.png"

const WelcomeScreen = () => {

  return (
    <div className="welcome-screen">
        <img src={myLogo} />
    </div>
  );
};

export default WelcomeScreen;