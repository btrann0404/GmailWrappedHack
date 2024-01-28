import React from 'react';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';
import './App.css';
import SplitScreen from './SplitScreen';
import Inbox from './Inbox/Inbox';

const App = () => {
  return (
    <div>
      <WelcomeScreen />
      <SplitScreen />
    </div>
  );
};

export default App;