import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../firebase/firebaseAuth";

const Home = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  return (
    <>
      {user && (
        <button className="p-2" onClick={() => navigate("/main")}>
          Back To Main
        </button>
      )}
      <h1>This is Home</h1>
      <div>
      
      </div>
      <h1 className="text-3xl font-bold underline">Gmail Wrapped</h1>
      <div className="card">
        <button className="p-2" onClick={() => navigate("/login")}>
          Login Here
        </button>
        <button className="p-2" onClick={() => navigate("/signup")}>
          Signup Here
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Home;
