/* WelcomeScreen.jsx */
import './WelcomeScreen.css';
import myLogo from "../../../assets/GW_logo.png"

const WelcomeScreen = () => {

  return (
    <div className="welcome-screen">
        <img src={myLogo} />
    </div>
  );
};

export default WelcomeScreen;