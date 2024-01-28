import React, { useState, useEffect } from 'react';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import SplitScreen from '../SplitScreen';
// import './App.css';

const WelcomePage = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [welcomeScreenFaded, setWelcomeScreenFaded] = useState(false);

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

export default WelcomePage;