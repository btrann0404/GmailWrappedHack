import { useState, useEffect } from "react";
import {
  signUpWithEmail,
  useUserInfo,
  signOutUser,
} from "../firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firestoreService";
import { doc, setDoc } from "firebase/firestore";
import './cssPages/SignupCss.css'
import Mainheader from "../components/web utils/mainheader";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(""); // State for error messages

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
    setError("");

    // Check if passwords match
    if (password !== password2) {
      setError("Passwords do not match.");
      return; // Stop the submission if passwords don't match
    }

    try {
      const userCredential = await signUpWithEmail(email, password); // Capture the result in userCredential
      const userID = userCredential.user.uid;

      const userProfileRef = doc(db, "profiles", userID);

      await setDoc(userProfileRef, {
        userID,
        name,
        gmail_list: [],
        profile_pic: "",
        keywords: [],
        bannedwords: [],
      });

      navigate("/main"); // Redirect on successful sign up
    } catch (err) {
      setError(err.message); // Display a user-friendly error message
    }
  };

  return (
    <div>
    <Mainheader></Mainheader>
    <div className='body'>
            <div className="welcome-container">
              
        <p className="welcome">Tell us about yourself!</p>
        
      </div>
      <div className="login-container">
      <button className="p-2" onClick={() => navigate("/")}>
        ⬅ Go back
        </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
        <div>
          <label>Name:</label>
          <input
            className="outline"
            type="text"
            value={name} // Corrected to lowercase 'n'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div>
          <label>Confirm Password:</label>
          <input
            className="outline"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="button-container">
        <button type="submit-button" className='submit-button'>Submit</button>
        </div>
        <div className="centered-text">
        Already have an account? {' '}
        <button className='signup-button' onClick={() => navigate("/login")}>Login</button>
        </div>
      </form>
      </div>
    </div>
    </div>
  );
}

export default Signup;
