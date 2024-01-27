import React from "react";
import { addData } from "../firebase/firestoreService";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

const Home = () => {
  return (
    <>
      <h1>This is Home</h1>
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
        <button onClick={addData}>Add to DB</button>
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

export default Home;
