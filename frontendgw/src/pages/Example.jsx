import React from "react";
import { addData } from "../firebase/firestoreService";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { signOutWithGoogle } from "../firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";

const Example = () => {
  const navigate = useNavigate();
  const handleSignout = async (event) => {
    event.preventDefault();

    try {
      await signOutWithGoogle();
      navigate("/signup");
    } catch (error) {
      console.error("Error during sign out:", error);
      // Handle any errors that occur during sign-in here
    }
  };

  return (
    <>
      <h1>This is Example</h1>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">Gmail Wrapped</h1>
      <div className="card">
        <button onClick={handleSignout}>Signout</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Example;
