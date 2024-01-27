import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("./pages/Home"));
const Example = React.lazy(() => import("./pages/Example"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/example" element={<Example />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
