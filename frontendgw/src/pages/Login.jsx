/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmail,
  useUserInfo,
  signOutUser,
} from "../firebase/firebaseAuth";
import Mainheader from "../components/web utils/mainheader";
import "./cssPages/LoginCss.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useUserInfo();

  useEffect(() => {
    if (user) {
      console.log("User is already logged in. Signing out...");
      signOutUser().then(() => {
        console.log("User signed out successfully.");
      });
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginWithEmail(email, password);
    navigate("/main");
  };

  return (
    <div>
      <Mainheader></Mainheader>
      <div className="body">
      <div className="welcome-container">
        <p className="welcome">Welcome Back!</p>
      </div>
      <div className="login-container">
        <button className="p-2" onClick={() => navigate("/")}>
        ⬅ Go back
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              className="outline"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              className="outline"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
        <div className="centered-text">
        Don't have an account? {' '}
        <button
          className="signup-button"
          onClick={() => navigate("/signup")}
        >
           Sign Up Here
        </button>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Login;

